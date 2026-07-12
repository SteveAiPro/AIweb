import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// 返回当前登录态与积分（供顶栏展示）。未登录返回 { authenticated: false }。
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ authenticated: false });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, credits")
    .eq("id", user.id)
    .single();

  return NextResponse.json({
    authenticated: true,
    email: user.email,
    displayName: profile?.display_name ?? user.email,
    credits: profile?.credits ?? 0,
  });
}
