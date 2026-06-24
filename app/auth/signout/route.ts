import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSafeAuthNext, hasSupabaseConfig } from "@/lib/auth-redirect";

export async function POST(request: NextRequest) {
  let next = "/";
  try {
    const formData = await request.formData();
    next = getSafeAuthNext(String(formData.get("next") ?? "/"));
  } catch {
    next = "/";
  }

  const response = NextResponse.redirect(new URL(next, request.url), { status: 303 });

  if (hasSupabaseConfig()) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );
    await supabase.auth.signOut();
  }

  return response;
}
