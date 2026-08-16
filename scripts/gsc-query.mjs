// Query GSC data from the command line. Examples:
//   node scripts/gsc-query.mjs sites
//   node scripts/gsc-query.mjs search --site https://example.com --days 28 --dim query --limit 20
//   node scripts/gsc-query.mjs sitemaps --site https://example.com
//   node scripts/gsc-query.mjs sitemap --site https://example.com --feed /sitemap.xml
//   node scripts/gsc-query.mjs inspect --site https://example.com --url https://example.com/about
import { listSites, querySearchAnalytics, listSitemaps, getSitemap, inspectUrl } from "../lib/gsc/client.ts";

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

const [cmd, ...args] = process.argv.slice(2);
const getOpt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

async function main() {
  if (cmd === "sites") {
    const sites = await listSites();
    console.log(JSON.stringify(sites, null, 2));
    return;
  }

  if (cmd === "search") {
    const site = getOpt("site");
    if (!site) throw new Error("--site is required");
    const days = Number(getOpt("days") ?? 28);
    const dim = (getOpt("dim") ?? "query").split(",");
    const limit = Number(getOpt("limit") ?? 20);
    const rows = await querySearchAnalytics({
      siteUrl: site,
      startDate: daysAgo(days),
      endDate: daysAgo(1),
      dimensions: dim,
      rowLimit: limit,
    });
    console.log(JSON.stringify(rows, null, 2));
    return;
  }

  if (cmd === "sitemaps") {
    const site = getOpt("site");
    if (!site) throw new Error("--site is required");
    const maps = await listSitemaps(site);
    console.log(JSON.stringify(maps, null, 2));
    return;
  }

  if (cmd === "sitemap") {
    const site = getOpt("site");
    const feed = getOpt("feed");
    if (!site || !feed) throw new Error("--site and --feed are required");
    const data = await getSitemap(site, feed);
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (cmd === "inspect") {
    const site = getOpt("site");
    const url = getOpt("url");
    if (!site || !url) throw new Error("--site and --url are required");
    const result = await inspectUrl(site, url);
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log("Usage:");
  console.log("  node scripts/gsc-query.mjs sites");
  console.log("  node scripts/gsc-query.mjs search --site <url> --days 28 --dim query,page --limit 20");
  console.log("  node scripts/gsc-query.mjs sitemaps --site <url>");
  console.log("  node scripts/gsc-query.mjs sitemap --site <url> --feed /sitemap.xml");
  console.log("  node scripts/gsc-query.mjs inspect --site <url> --url <page-url>");
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
