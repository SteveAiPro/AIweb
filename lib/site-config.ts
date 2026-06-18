// 站点级常量：统一管理域名、名称等。SITE_URL 默认线上域名，可用 SITE_URL 环境变量覆盖。
const rawSiteUrl = process.env.SITE_URL?.trim() || "https://gaoqian2580.com";

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");
export const SITE_NAME = "AI Navigator";
export const CONTACT_EMAIL = "hello@gaoqian2580.com";

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

// 社交分享图（绝对 URL）。每个页面的 openGraph 都需显式带上——
// 因为子页 openGraph 会整体覆盖 layout 的 openGraph（含 images）。
export const OG_IMAGE = [{ url: `${SITE_URL}/og`, width: 1200, height: 630, alt: SITE_NAME }];
