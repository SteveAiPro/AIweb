import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
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
    // 在 Response 对象上直接设置 cookie，而非通过 cookies() API，
    // 确保 session cookie 正确地附着在重定向响应上
    const response = NextResponse.redirect(`${origin}${next}`);

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            console.log("[callback] setAll cookies:", cookiesToSet.map(c => c.name));
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    console.log("[callback] exchangeCodeForSession:", { hasUser: !!data.user, error: error?.message });
    if (!error) {
      return response;
    }
    console.error("[callback] exchangeCodeForSession failed:", error);
  }

  return NextResponse.redirect(`${origin}${loginPath}?error=auth-callback&next=${encodeURIComponent(next)}`);
}
