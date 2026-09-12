import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const cache = [
      {
        key: "CDN-Cache-Control",
        value: "public, max-age=3600, stale-while-revalidate=86400",
      },
      {
        key: "Cloudflare-CDN-Cache-Control",
        value: "public, max-age=3600, stale-while-revalidate=86400",
      },
    ];
    return [
      { source: "/", headers: cache },
      { source: "/about", headers: cache },
      { source: "/blog/:path*", headers: cache },
      { source: "/category/:path*", headers: cache },
      { source: "/contact", headers: cache },
      { source: "/privacy", headers: cache },
      { source: "/tools/:path*", headers: cache },
      { source: "/en", headers: cache },
      { source: "/en/about", headers: cache },
      { source: "/en/blog/:path*", headers: cache },
      { source: "/en/category/:path*", headers: cache },
      { source: "/en/contact", headers: cache },
      { source: "/en/privacy", headers: cache },
      { source: "/en/tools/:path*", headers: cache },
    ];
  },
  // 为已删除的工具页面做 301 重定向，避免 404 触发 GSC "网页无法被编入索引" 警告。
  async redirects() {
    // 这些工具曾存在过但现在已从 data/tools.ts 移除。
    const removedTools = ["briefly", "echo-studio", "stackpilot", "spark-voice"];
    const redirects = removedTools.flatMap((slug) => [
      {
        source: `/tools/${slug}`,
        destination: "/",
        permanent: true,
      },
      {
        source: `/zh/tools/${slug}`,
        destination: "/zh",
        permanent: true,
      },
    ]);
    return redirects;
  },
};

export default nextConfig;
