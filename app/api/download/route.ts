import { NextRequest } from "next/server";

// 解析服务（默认 douyin.wtf 公共实例，可用环境变量替换为自建实例）
const API_BASE =
  process.env.DOWNLOADER_API_BASE ?? "https://douyin.wtf/api/hybrid/video_data";

// 仅支持抖音系链接
const LINK_RE = /(douyin\.com|v\.douyin\.com|iesdouyin\.com|snssdk\.com)/i;

type ParseResult = {
  title: string;
  cover: string;
  author: string;
  duration: number;
  play: string; // 无水印视频
  hdplay: string; // 高清无水印（可能为空）
  music: string; // 背景音乐（可能为空）
};

/**
 * douyin.wtf 返回的 JSON 里，desc 等字符串字段可能包含未转义的控制字符
 * （原始换行），会导致 res.json() 抛错。这里只在字符串字面量内部把控制字符
 * 转义为合法的 \n / \r / \t，结构性空白保持不变，从而得到可解析的 JSON。
 */
function sanitizeJsonText(raw: string): string {
  let out = "";
  let inStr = false;
  let escaped = false;
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    const code = raw.charCodeAt(i);
    if (inStr) {
      if (escaped) {
        out += ch;
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        out += ch;
        escaped = true;
        continue;
      }
      if (ch === '"') {
        out += ch;
        inStr = false;
        continue;
      }
      if (code < 0x20) {
        out += code === 0x0a ? "\\n" : code === 0x0d ? "\\r" : code === 0x09 ? "\\t" : "";
        continue;
      }
      out += ch;
    } else {
      if (ch === '"') inStr = true;
      out += ch;
    }
  }
  return out;
}

// douyin.wtf 的 url 字段可能是字符串、{uri,url_list} 或 {url_list:[...]}
function firstUrl(v: unknown): string {
  if (typeof v === "string") return v;
  if (v && typeof v === "object") {
    const o = v as Record<string, unknown>;
    if (Array.isArray(o.url_list) && typeof o.url_list[0] === "string") return o.url_list[0];
    if (typeof o.uri === "string" && o.uri.startsWith("http")) return o.uri;
  }
  return "";
}

async function parseDouyin(url: string): Promise<ParseResult | null> {
  try {
    // 不带 minimal：保留封面 / 时长 / 高清等字段（响应约 20KB，服务端拉取可接受）
    const apiUrl = `${API_BASE}?url=${encodeURIComponent(url)}`;
    const res = await fetch(apiUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(30000),
    });
    if (!res.ok) return null;

    // 接口偶发返回非法 JSON（控制字符未转义），需先清洗
    const raw = await res.text();
    let json: any;
    try {
      json = JSON.parse(raw);
    } catch (e) {
      try {
        json = JSON.parse(sanitizeJsonText(raw));
      } catch (e2) {
        console.error("[download] JSON parse failed:", (e2 as Error).message, "raw head:", raw.slice(0, 200));
        return null;
      }
    }

    if (json.code !== 200 || !json.data) {
      console.error("[download] upstream code:", json.code, "hasData:", !!json.data, "msg:", json.msg);
      return null;
    }

    const d = json.data;
    const vd = d.video_data ?? {};
    const v = d.video ?? {};
    const m = d.music ?? {};

    const play = vd.nwm_video_url ?? ""; // 无水印视频
    const hdplay = vd.nwm_video_url_HQ ?? ""; // 高清无水印
    if (!play && !hdplay) return null;

    return {
      title: d.desc ?? "",
      cover: firstUrl(v.cover) || firstUrl(v.origin_cover) || "",
      author: d.author?.nickname ?? d.author?.unique_id ?? "",
      duration: Math.round((d.duration ?? v.duration ?? 0) / 1000),
      play: play || hdplay,
      hdplay: hdplay && hdplay !== play ? hdplay : "",
      music: firstUrl(m.play_url),
    };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  let url = "";
  try {
    const body = await req.json();
    url = (body?.url ?? "").trim();
  } catch {
    return Response.json({ error: "INVALID_BODY" }, { status: 400 });
  }

  if (!url) return Response.json({ error: "EMPTY" }, { status: 400 });
  if (!LINK_RE.test(url)) return Response.json({ error: "INVALID_URL" }, { status: 400 });

  const result = await parseDouyin(url);
  if (!result) {
    return Response.json({ error: "PARSE_FAILED" }, { status: 422 });
  }
  return Response.json(result);
}
