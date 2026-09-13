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
    //
    // 只保留无前缀路径：proxy.ts 的中间件会先把 /zh/* 308 到无前缀路径，而中间件
    // 先于 next.config 的 redirects 执行，所以 /zh/tools/* 那几条永远命中不到。
    // 更麻烦的是它们的 destination 写的是 /zh，真命中会形成 308 循环。
    const removedTools = ["briefly", "echo-studio", "stackpilot", "spark-voice"];
    return removedTools.map((slug) => ({
      source: `/tools/${slug}`,
      destination: "/",
      permanent: true,
    }));
  },
};

export default nextConfig;
