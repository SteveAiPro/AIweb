// 站点级常量：统一管理域名、名称等。SITE_URL 默认线上域名，可用 SITE_URL 环境变量覆盖。
// 生产环境主机为 www（裸域 gaoqian2580.com 会 308 到 www）。canonical / sitemap / robots
// 必须与最终落地主机一致，否则 GSC 会出现「自动重定向」「备用网页（规范标记）」问题。
const rawSiteUrl = process.env.SITE_URL?.trim() || "https://www.gaoqian2580.com";

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");
export const SITE_NAME = "AI Navigator";
export const CONTACT_EMAIL = "hello@gaoqian2580.com";

/** 生产规范主机名（不含协议）。用于 Host 归一与 robots。 */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "").split("/")[0] || "www.gaoqian2580.com";

export const SITE_KEYWORDS = [
  "AI tools",
  "AI directory",
  "AI navigator",
  "AI 工具",
  "AI 导航",
  "AI 工具导航",
  "Xiaohongshu generator",
  "小红书爆款生成器",
];

// 把站内相对路径拼成绝对 URL（用于 sitemap、JSON-LD 等需要完整链接的场景）。
export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// 生成绝对 canonical URL，确保始终使用 www 版本避免 GSC "备用网页（规范标记）" 问题。
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";

export function canonicalUrl(lang: Locale, path = "/"): string {
  return `${SITE_URL}${localePath(lang, path)}`;
}

// 社交分享图（绝对 URL）。每个页面的 openGraph 都需显式带上——
// 因为子页 openGraph 会整体覆盖 layout 的 openGraph（含 images）。
export const OG_IMAGE = [{ url: `${SITE_URL}/og`, width: 1200, height: 630, alt: SITE_NAME }];
