import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const CANONICAL_HOST = "www.gaoqian2580.com";
const APEX_HOST = "gaoqian2580.com";

// Next 16 的中间件（原 middleware）：
// 0) 生产环境裸域 → www（与 CDN 规则一致，保证 canonical 主机唯一）
// 1) 处理 i18n 路由（英文默认无前缀，中文 /zh；/en 永久重定向到无前缀）
// 2) 在路由解析前刷新 Supabase 会话 cookie
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();

  // ---------- 规范主机：裸域 → www ----------
  // 仅在生产主机名上生效，避免影响 localhost / 预览域名。
  if (host === APEX_HOST) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 308);
  }

  // ---------- 去掉尾部斜杠（根路径除外），减少重复 URL ----------
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/+$/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

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
