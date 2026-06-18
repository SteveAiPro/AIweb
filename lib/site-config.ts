// 站点级常量：统一管理域名、名称、描述等，避免散落在多处的硬编码。
// SITE_URL 默认线上域名，可在构建/运行时用 SITE_URL 环境变量覆盖。
const rawSiteUrl = process.env.SITE_URL?.trim() || "https://gaoqian2580.com";

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");
export const SITE_NAME = "AI Navigator";
export const SITE_TITLE = "AI Navigator | 原创 AI 工具导航";
export const SITE_DESCRIPTION =
  "一个原创的 AI 工具目录站，帮助你按分类、标签和场景快速发现值得尝试的 AI 产品。";
export const SITE_LOCALE = "zh-CN";
export const CONTACT_EMAIL = "hello@gaoqian2580.com";

export const SITE_KEYWORDS = [
  "AI 工具",
  "AI 导航",
  "AI 工具导航",
  "AI 工具目录",
  "AI 产品",
  "AI 聊天",
  "AI 绘画",
  "AI 视频",
  "小红书爆款生成器",
];

// 把站内相对路径拼成绝对 URL（用于 sitemap、JSON-LD 等需要完整链接的场景）。
export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
