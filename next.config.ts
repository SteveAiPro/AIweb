import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
