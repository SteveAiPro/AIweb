import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Next 16 的中间件（原 middleware）：
// 1) 处理 i18n 路由（英文默认无前缀，中文 /zh）
// 2) 在路由解析前刷新 Supabase 会话 cookie
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ---------- i18n 重写/重定向 ----------
  let response: NextResponse;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    response = NextResponse.redirect(url, 308);
  } else if (pathname === "/zh" || pathname.startsWith("/zh/")) {
    response = NextResponse.next();
  } else {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    response = NextResponse.rewrite(url);
  }

  // ---------- Supabase 会话续期 ----------
  // 仅当配置了 Supabase 环境变量时才挂载，避免本地未配置时报错
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
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
    });
    await supabase.auth.getUser();
  }

  return response;
}

export const config = {
  // 排除内部路径、API、auth 回调、根级特殊文件（图标/OG/站点地图/robots）与含扩展名的静态资源
  matcher: [
    "/((?!_next|api|auth|icon|og|sitemap.xml|robots.txt|favicon.ico|.*\\..*).*)",
  ],
};
