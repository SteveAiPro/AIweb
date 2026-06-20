import { NextRequest } from "next/server";

// 仅允许转发 TikTok / 抖音 系媒体 CDN，避免被当作通用代理滥用
function isAllowedHost(host: string) {
  return /(tiktokcdn|tiktokcdn-us|tikwm\.com|byteimg|ibyteimg|douyin|douyinvod|douyinpic|douyinstatic|akamaized|musical|snssdk|zjcdn|amemv|bytedance|ixigua)/i.test(
    host,
  );
}

// 把文件名清成可安全放入 Content-Disposition 的 ASCII 串
function safeName(name: string | null) {
  return (name || "download").replace(/[\r\n"]/g, "").replace(/[^\w.\-]+/g, "_").slice(0, 100) || "download";
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
    // 按目标域名选择 Referer：抖音 CDN 会拒绝 tiktok referer（403），反之亦然
    const referer = /(douyin|snssdk|zjcdn|amemv|bytedance|ixigua)/i.test(target.hostname)
      ? "https://www.douyin.com/"
      : "https://www.tiktok.com/";
    const upstream = await fetch(target.toString(), {
      headers: { "User-Agent": "Mozilla/5.0", Referer: referer },
      signal: AbortSignal.timeout(60000),
    });

    if (!upstream.ok || !upstream.body) {
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
