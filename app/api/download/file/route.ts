import { NextRequest } from "next/server";

// 仅允许转发抖音 / TikTok 系媒体 CDN，避免被当作通用代理滥用。
//
// 注意：这里必须用「域名后缀精确匹配」，不能用关键词子串匹配。
// 子串匹配会把 douyin.attacker.com、tiktokcdn.evil.io、internal.douyin.corp.local
// 全部放行，等于开了一个任意域名的 HTTPS 代理。
const ALLOWED_HOST_SUFFIXES = [
  // 抖音
  "douyin.com",
  "douyinpic.com",
  "douyinvod.com",
  "douyinstatic.com",
  "iesdouyin.com",
  "snssdk.com",
  "amemv.com",
  "zjcdn.com",
  "ixigua.com",
  // 字节系图床 / CDN
  "byteimg.com",
  "ibyteimg.com",
  "bytedance.com",
  "akamaized.net",
  // TikTok
  "tiktokcdn.com",
  "tiktokcdn-us.com",
  "tiktok.com",
  "tikwm.com",
  "musical.ly",
];

function isAllowedHost(host: string) {
  const h = host.toLowerCase();
  return ALLOWED_HOST_SUFFIXES.some((suffix) => h === suffix || h.endsWith(`.${suffix}`));
}

// 抖音 CDN 会拒绝 tiktok referer（403），反之亦然，所以按目标域名分别设置。
function refererFor(host: string) {
  return /(douyin|snssdk|zjcdn|amemv|bytedance|ixigua)/i.test(host)
    ? "https://www.douyin.com/"
    : "https://www.tiktok.com/";
}

// 把文件名清成可安全放入 Content-Disposition 的 ASCII 串
function safeName(name: string | null) {
  return (name || "download").replace(/[\r\n"]/g, "").replace(/[^\w.\-]+/g, "_").slice(0, 100) || "download";
}

const MAX_REDIRECTS = 3;

/**
 * 逐跳校验的抓取。fetch 默认会自动跟随重定向，而重定向的目标不会被
 * 上面的白名单校验到 —— 一个合法的抖音 CDN 链接可以把请求 302 到
 * 内网地址，绕过整个白名单。这里改成手动跟随，每一跳都重新校验协议和域名。
 */
async function fetchValidated(start: URL): Promise<Response | null> {
  let current = start;

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    if (current.protocol !== "https:" || !isAllowedHost(current.hostname)) return null;

    const res = await fetch(current.toString(), {
      headers: { "User-Agent": "Mozilla/5.0", Referer: refererFor(current.hostname) },
      redirect: "manual",
      signal: AbortSignal.timeout(60000),
    });

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) return null;
      try {
        current = new URL(location, current);
      } catch {
        return null;
      }
      continue;
    }

    return res;
  }

  return null; // 重定向次数超限
}

export async function GET(req: NextRequest) {
  const rawUrl = req.nextUrl.searchParams.get("url");
  const filename = safeName(req.nextUrl.searchParams.get("filename"));

  if (!rawUrl) return new Response("missing url", { status: 400 });

  let target: URL;
  try {
    target = new URL(rawUrl);
  } catch {
    return new Response("bad url", { status: 400 });
  }

  if (target.protocol !== "https:" || !isAllowedHost(target.hostname)) {
    return new Response("forbidden host", { status: 403 });
  }

  try {
    const upstream = await fetchValidated(target);

    if (!upstream || !upstream.ok || !upstream.body) {
      return new Response("upstream error", { status: 502 });
    }

    return new Response(upstream.body, {
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("fetch failed", { status: 504 });
  }
}
