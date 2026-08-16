import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import { posts } from "@/data/blog";
import { SITE_URL } from "@/lib/site-config";

// 动态生成 /sitemap.html —— 可视化站点地图，方便人工浏览与提交 GSC 核对。
// 和 sitemap.xml / llms.txt 一样从 data 实时读取，部署即同步最新分类/工具/博客。
export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const catLinks = categories
    .map(
      (c) =>
        `      <li><a href="${SITE_URL}/category/${c.slug}">${esc(c.name.zh)}</a></li>`,
    )
    .join("\n");

  const toolSections = categories
    .map((c) => {
      const list = tools.filter((t) => t.category === c.slug);
      if (list.length === 0) return "";
      const items = list
        .map(
          (t) =>
            `        <li><a href="${SITE_URL}/tools/${t.slug}">${esc(t.name)}</a></li>`,
        )
        .join("\n");
      return `    <section>
      <h2>${esc(c.name.zh)}</h2>
      <ul>
${items}
      </ul>
    </section>`;
    })
    .filter(Boolean)
    .join("\n");

  const blogLinks = posts
    .map(
      (p) =>
        `      <li><a href="${SITE_URL}/blog/${p.slug}">${esc(p.title.zh)}</a></li>`,
    )
    .join("\n");

  const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>站点地图 — AI Navigator</title>
<style>
  body{font-family:system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;max-width:900px;margin:0 auto;padding:36px 20px;color:#0f172a;line-height:1.7}
  h1{font-size:24px;margin:0 0 4px}
  h2{font-size:18px;margin:30px 0 10px;color:#0e7490;border-bottom:1px solid #e2e8f0;padding-bottom:6px}
  ul{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:6px 16px}
  li a{color:#334155;text-decoration:none;font-size:14px}
  li a:hover{color:#0891b2;text-decoration:underline}
  .muted{color:#64748b;font-size:13px}
  .core{grid-template-columns:repeat(auto-fill,minmax(260px,1fr))}
  code{background:#f1f5f9;padding:1px 5px;border-radius:4px;font-size:12px}
</style>
</head>
<body>
  <h1>AI Navigator 站点地图</h1>
  <p class="muted">共 ${categories.length} 个分类、${tools.length} 个工具、${posts.length} 篇博客。英文版路径前加 <code>/en</code> 前缀，本站默认语言为中文。</p>

  <h2>核心页面</h2>
  <ul class="core">
    <li><a href="${SITE_URL}/">首页</a></li>
    <li><a href="${SITE_URL}/about">关于</a></li>
    <li><a href="${SITE_URL}/blog">博客</a></li>
    <li><a href="${SITE_URL}/sitemap.xml">XML 站点地图（提交 GSC 用）</a></li>
  </ul>

  <h2>分类</h2>
  <ul>
${catLinks}
  </ul>

${toolSections}

  <h2>博客</h2>
  <ul>
${blogLinks}
  </ul>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
