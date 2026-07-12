import type { Palette } from "./types";

const ASPECT_SIZE: Record<string, { w: number; h: number }> = {
  "1:1": { w: 512, h: 512 },
  "4:3": { w: 640, h: 480 },
  "3:4": { w: 480, h: 640 },
  "16:9": { w: 640, h: 360 },
};

const MODEL_PALETTES: Record<string, Palette> = {
  all: { bg: ["#e2e8f0", "#cbd5e1"], colors: ["#64748b", "#0ea5e9", "#f59e0b", "#ec4899", "#10b981"] },
  "nano-banana": { bg: ["#fde68a", "#fb923c"], colors: ["#f59e0b", "#ea580c", "#fbbf24", "#f97316", "#fffbeb"] },
  "gpt-image": { bg: ["#e0e7ff", "#cffafe"], colors: ["#6366f1", "#06b6d4", "#3b82f6", "#22d3ee", "#e0f2fe"] },
};

const CATEGORY_PALETTES: Record<string, Palette> = {
  all: { bg: ["#f1f5f9", "#e2e8f0"], colors: ["#94a3b8", "#64748b", "#cbd5e1", "#0ea5e9", "#f472b6"] },
  "food-drink": { bg: ["#fef3c7", "#fde68a"], colors: ["#f59e0b", "#ea580c", "#ef4444", "#f97316", "#fcd34d"] },
  "illustration-3d": { bg: ["#fce7f3", "#e0e7ff"], colors: ["#c4b5fd", "#93c5fd", "#f9a8d4", "#a5f3fc", "#fbcfe8"] },
  photography: { bg: ["#cbd5e1", "#94a3b8"], colors: ["#475569", "#64748b", "#e2e8f0", "#0ea5e9", "#1e293b"] },
  "poster-design": { bg: ["#fee2e2", "#fbcfe8"], colors: ["#ef4444", "#ec4899", "#8b5cf6", "#f59e0b", "#0ea5e9"] },
  "product-brand": { bg: ["#ecfdf5", "#e0f2fe"], colors: ["#10b981", "#06b6d4", "#3b82f6", "#6366f1", "#f59e0b"] },
  "ui-graphic": { bg: ["#f1f5f9", "#ede9fe"], colors: ["#6366f1", "#8b5cf6", "#ec4899", "#0ea5e9", "#14b8a6"] },
};

function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

// 程序化生成的抽象 SVG（无需任何 API Key）。接入真实图像模型时替换 generateImages 中的调用即可。
export function generateSvg(opts: {
  prompt: string;
  model: string;
  category: string;
  aspect: string;
  seed: number;
  index: number;
}): string {
  const size = ASPECT_SIZE[opts.aspect] ?? ASPECT_SIZE["1:1"];
  const bgPal = MODEL_PALETTES[opts.model] ?? MODEL_PALETTES.all;
  const fgPal = CATEGORY_PALETTES[opts.category] ?? CATEGORY_PALETTES.all;
  const rng = mulberry32(hashString([opts.prompt, opts.model, opts.category, opts.aspect, opts.seed, opts.index].join("|")));
  const { w: W, h: H } = size;
  const blobCount = 6 + Math.floor(rng() * 6);
  let shapes = "";
  for (let i = 0; i < blobCount; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const r = (0.12 + rng() * 0.38) * Math.min(W, H);
    const col = pick(fgPal.colors, rng);
    const op = (0.25 + rng() * 0.4).toFixed(2);
    shapes += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(0)}" fill="${col}" opacity="${op}"/>`;
  }
  const blur = (Math.min(W, H) * 0.04).toFixed(0);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="${bgPal.bg[0]}"/><stop offset="1" stop-color="${bgPal.bg[1]}"/></linearGradient>` +
    `<filter id="blur"><feGaussianBlur stdDeviation="${blur}"/></filter>` +
    `<filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>` +
    `<g filter="url(#blur)">${shapes}</g>` +
    `<rect width="${W}" height="${H}" filter="url(#noise)" opacity="0.06"/></svg>`
  );
}

export function generateImages(opts: {
  prompt: string;
  model: string;
  category: string;
  aspect: string;
  count: number;
}): string[] {
  const seed = Math.floor(Math.random() * 1e9);
  return Array.from({ length: opts.count }, (_, i) =>
    `data:image/svg+xml,${encodeURIComponent(
      generateSvg({ ...opts, seed, index: i }),
    )}`,
  );
}

// 真实图像模型入口（可选）：配置 IMAGE_API_KEY 后生效，否则返回 null 走程序化生成。
const OPENAI_SIZE: Record<string, string> = {
  "1:1": "1024x1024",
  "16:9": "1792x1024",
  "4:3": "1792x1024",
  "3:4": "1024x1792",
};

export async function generateWithProvider(
  prompt: string,
  aspect: string,
  count: number,
): Promise<string[] | null> {
  const key = process.env.IMAGE_API_KEY;
  if (!key) return null;
  const size = OPENAI_SIZE[aspect] ?? "1024x1024";
  const base = process.env.IMAGE_API_BASE_URL ?? "https://api.openai.com/v1";
  const model = process.env.IMAGE_MODEL ?? "gpt-image-1";
  const out: string[] = [];
  try {
    for (let i = 0; i < count; i++) {
      const r = await fetch(`${base}/images/generations`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({ model, prompt, size, n: 1 }),
      });
      if (!r.ok) return null;
      const j = await r.json();
      const item = j.data?.[0];
      if (item?.b64_json) out.push(`data:image/png;base64,${item.b64_json}`);
      else if (item?.url) out.push(item.url);
      else return null;
    }
    return out;
  } catch {
    return null;
  }
}
