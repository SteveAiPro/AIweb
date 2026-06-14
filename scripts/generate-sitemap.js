const fs = require('fs');
const path = require('path');

// 配置站点域名（开发环境使用 localhost，生产环境请设置 SITE_URL 环境变量）
const domain = process.env.SITE_URL || 'https://gaoqian2580.com';

function getSlugsFromDir(dirPath) {
  try {
    return fs.readdirSync(dirPath)
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const content = JSON.parse(fs.readFileSync(path.join(dirPath, file)));
        return content.slug;
      });
  } catch (e) {
    console.error(`读取目录失败 ${dirPath}:`, e);
    return [];
  }
}

// 获取所有分类和工具的 slug
const categories = getSlugsFromDir(path.join(__dirname, '../data/categories'));
const tools = getSlugsFromDir(path.join(__dirname, '../data/tools'));

// 生成所有 URL
const urls = [
  `${domain}/`,
  ...categories.map(slug => `${domain}/category/${encodeURIComponent(slug)}`),
  ...tools.map(slug => `${domain}/tools/${encodeURIComponent(slug)}`)
];

// 生成 sitemap XML 内容
const sitemap = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">
  ${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

// 写入 public/sitemap.xml
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

console.log('✅ 已生成 sitemap.xml 到 /public/sitemap.xml');