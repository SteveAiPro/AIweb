import type { MetadataRoute } from "next";
import { SITE_HOST, absoluteUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/auth/",
        // 登录/账户页已 noindex；再 disallow 减少无效抓取
        "/login",
        "/zh/login",
        "/account",
        "/zh/account",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    // host 应为主机名，不要带 https://
    host: SITE_HOST,
  };
}
