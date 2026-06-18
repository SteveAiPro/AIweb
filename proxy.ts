import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next 16 的中间件（原 middleware）：实现「英文默认无前缀、中文 /zh」的路由。
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /en 或 /en/* 被直接访问 → 去掉前缀重定向，保证英文规范 URL 唯一且无前缀
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  // /zh 或 /zh/* → 放行，由 app/[lang] 以 lang=zh 渲染
  if (pathname === "/zh" || pathname.startsWith("/zh/")) {
    return NextResponse.next();
  }

  // 其余无前缀路径 → 内部 rewrite 到 /en（地址栏不变，lang=en）
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // 排除内部路径、API、根级特殊文件（图标/OG/站点地图/robots）与含扩展名的静态资源
  matcher: [
    "/((?!_next|api|icon|og|sitemap.xml|robots.txt|favicon.ico|.*\\..*).*)",
  ],
};
