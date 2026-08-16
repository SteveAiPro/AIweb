import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import { posts } from "@/data/blog";
import { SITE_URL } from "@/lib/site-config";

// 动态生成 /llms.txt，和 sitemap 一样永远反映最新的分类 / 工具 / 博客数据，
// 避免静态文件过期。部署时随构建固化（force-static），也可按需要改 dynamic。
export const dynamic = "force-static";

export function GET() {
  const L: string[] = [];

  L.push("# AI Navigator — AI 工具导航站");
  L.push("");
  L.push(
    "> AI Navigator 是一个面向中文与海外独立开发者的 AI 工具导航站，按场景分类收录绘画、视频、编程、音频、效率等工具，并提供原创评测与教程。所有工具描述均为原创撰写，非逐字搬运。",
  );
  L.push("");

  L.push("## 核心入口");
  L.push(`- [首页](${SITE_URL}/)`);
  L.push(`- [关于](${SITE_URL}/about)`);
  L.push(`- [隐私政策](${SITE_URL}/privacy)`);
  L.push(`- [站点地图](${SITE_URL}/sitemap.xml)`);
  L.push("");

  L.push(`## 分类导航（${categories.length}）`);
  for (const c of categories) {
    L.push(`- [${c.name.zh}](${SITE_URL}/category/${c.slug})`);
  }

  L.push("");
  L.push(`## 工具（${tools.length}，按分类）`);
  for (const c of categories) {
    const list = tools.filter((t) => t.category === c.slug);
    if (list.length === 0) continue;
    L.push("");
    L.push(`### ${c.name.zh}`);
    for (const t of list) {
      L.push(`- [${t.name}](${SITE_URL}/tools/${t.slug})`);
    }
  }

  L.push("");
  L.push(`## 博客（${posts.length} 篇原创教程与评测）`);
  for (const p of posts) {
    L.push(`- [${p.title.zh}](${SITE_URL}/blog/${p.slug})`);
  }

  L.push("");
  L.push(
    `> 英文版在路径前加 /en 前缀，例如 ${SITE_URL}/en/ 。本站默认语言为中文，x-default 指向中文页面。`,
  );

  const body = L.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
