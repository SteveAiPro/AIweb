import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateImages, generateWithProvider } from "@/lib/vision-seed/generator";

const COUNT = 4;
const COST = 1;

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

/**
 * 原子扣减积分。
 *
 * 不能用「先 select credits 再 update credits-1」——那是读-改-写，两个并发请求
 * 会读到同一个旧值，各自写回同一个新值，等于白送一次生成。
 * 这里用 compare-and-swap：UPDATE ... WHERE credits = <刚读到的旧值>，
 * 单条 UPDATE 在 Postgres 内是原子的；若旧值已被别的请求改掉，影响行数为 0，
 * 重读后重试。
 *
 * 返回值：扣减后的余额 / -1 表示积分不足 / null 表示扣减失败（读不到或持续冲突）。
 */
async function deductCredit(
  supabase: SupabaseServerClient,
  userId: string,
): Promise<number | null> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", userId)
      .single();

    if (error || !profile) return null;
    if (profile.credits < COST) return -1;

    const { data: updated, error: updateError } = await supabase
      .from("profiles")
      .update({ credits: profile.credits - COST })
      .eq("id", userId)
      .eq("credits", profile.credits)
      .select("credits");

    if (!updateError && updated?.length === 1) {
      return updated[0].credits as number;
    }
    // 版本冲突（并发扣分）或写入异常，重读后重试
  }
  return null;
}

export async function POST(req: NextRequest) {
  let body: { prompt?: string; model?: string; category?: string; aspect?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "无效的请求体" }, { status: 400 });
  }

  const prompt = (body.prompt ?? "").trim();
  const model = body.model ?? "all";
  const category = body.category ?? "all";
  const aspect = body.aspect ?? "1:1";

  if (!prompt) {
    return NextResponse.json({ error: "请输入提示词" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 未登录一律拒绝。匿名请求没有任何可计量的额度，放行等于把 IMAGE_API_KEY
  // 变成公开资源——任何人都能无限调用付费生图。
  if (!user) {
    return NextResponse.json(
      { error: "请先登录后再生成。", code: "AUTH_REQUIRED" },
      { status: 401 },
    );
  }

  const remaining = await deductCredit(supabase, user.id);

  if (remaining === -1) {
    return NextResponse.json(
      { error: "积分不足，请充值后重试。", code: "INSUFFICIENT_CREDITS" },
      { status: 402 },
    );
  }
  if (remaining === null) {
    return NextResponse.json({ error: "扣减积分失败，请稍后重试。" }, { status: 500 });
  }

  // 优先真实模型，未配置则程序化生成
  const images =
    (await generateWithProvider(prompt, aspect, COUNT)) ??
    generateImages({ prompt, model, category, aspect, count: COUNT });

  // 落库（画廊 / 历史）。失败不回滚积分：图已经产出并返回给用户了，
  // 回滚会让「生成成功但不扣费」变成可刷的漏洞。
  await supabase.from("generations").insert({
    user_id: user.id,
    prompt,
    model,
    category,
    aspect,
    image_data: JSON.stringify(images),
  });

  return NextResponse.json({ images, credits: remaining });
}
