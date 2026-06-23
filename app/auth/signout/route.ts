import { NextResponse, type NextRequest } from "next/server";
import { getSafeAuthNext, hasSupabaseConfig } from "@/lib/auth-redirect";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  let next = "/";
  try {
    const formData = await request.formData();
    next = getSafeAuthNext(String(formData.get("next") ?? "/"));
  } catch {
    next = "/";
  }

  if (hasSupabaseConfig()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL(next, request.url), { status: 303 });
}
