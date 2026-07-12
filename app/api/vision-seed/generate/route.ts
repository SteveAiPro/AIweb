import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateImages, generateWithProvider } from "@/lib/vision-seed/generator";

const COUNT = 4;

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

  // 已登录：校验并扣 1 积分
  if (user) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .single();

    if (error || !profile || profile.credits <= 0) {
      return NextResponse.json({ error: "积分不足，请登录或充值后重试。" }, { status: 402 });
    }

    const { error: deductError } = await supabase
      .from("profiles")
      .update({ credits: profile.credits - 1 })
      .eq("id", user.id);
    if (deductError) {
      return NextResponse.json({ error: "扣减积分失败" }, { status: 500 });
    }
  }

  // 优先真实模型，未配置则程序化生成
  const images =
    (await generateWithProvider(prompt, aspect, COUNT)) ??
    generateImages({ prompt, model, category, aspect, count: COUNT });

  // 已登录：落库（画廊 / 历史）
  if (user) {
    await supabase.from("generations").insert({
      user_id: user.id,
      prompt,
      model,
      category,
      aspect,
      image_data: JSON.stringify(images),
    });
  }

  // 返回最新积分（已登录时）
  let credits: number | undefined;
  if (user) {
    const { data: p } = await supabase.from("profiles").select("credits").eq("id", user.id).single();
    credits = p?.credits;
  }

  return NextResponse.json({ images, credits });
}
