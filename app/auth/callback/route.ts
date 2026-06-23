import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getLoginPathForNext, getSafeAuthNext, hasSupabaseConfig } from "@/lib/auth-redirect";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = getSafeAuthNext(searchParams.get("next"));
  const loginPath = getLoginPathForNext(next);

  if (!hasSupabaseConfig()) {
    return NextResponse.redirect(`${origin}${loginPath}?error=not-configured&next=${encodeURIComponent(next)}`);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const response = NextResponse.redirect(`${origin}${next}`);
      return response;
    }
  }

  return NextResponse.redirect(`${origin}${loginPath}?error=auth-callback&next=${encodeURIComponent(next)}`);
}
