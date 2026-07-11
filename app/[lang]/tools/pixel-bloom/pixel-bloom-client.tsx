"use client";

import { useState, useRef, useEffect } from "react";
import { Dictionary } from "@/lib/i18n/dictionaries";

const ASPECT_SIZE: Record<string, { w: number; h: number }> = {
  "1:1": { w: 512, h: 512 },
  "4:3": { w: 640, h: 480 },
  "3:4": { w: 480, h: 640 },
  "16:9": { w: 640, h: 360 },
};

// 每种风格一套配色（背景渐变 + 色块），用于程序化生成灵感草图。
// 接入真实图像模型时，可替换为对应的 style prompt 前缀。
const PALETTES: Record<string, { bg: [string, string]; colors: string[] }> = {
  realistic: { bg: ["#cbd5e1", "#94a3b8"], colors: ["#64748b", "#475569", "#e2e8f0", "#0ea5e9", "#f1f5f9"] },
  illustration: { bg: ["#fde68a", "#fca5a5"], colors: ["#fb7185", "#34d399", "#60a5fa", "#fbbf24", "#a78bfa"] },
  watercolor: { bg: ["#fce7f3", "#e0e7ff"], colors: ["#c4b5fd", "#93c5fd", "#f9a8d4", "#a5f3fc", "#fbcfe8"] },
  cyberpunk: { bg: ["#0f172a", "#1e1b4b"], colors: ["#22d3ee", "#f0abfc", "#a3e635", "#fb7185", "#818cf8"] },
  minimal: { bg: ["#f8fafc", "#e2e8f0"], colors: ["#0f172a", "#64748b", "#cbd5e1"] },
  oil: { bg: ["#7c2d12", "#b45309"], colors: ["#f59e0b", "#fbbf24", "#dc2626", "#15803d", "#1e3a8a"] },
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

// 用提示词 + 风格 + 比例 + 种子生成一张抽象 SVG 草图。
// 这里用客户端程序化生成，开箱即用、无需任何 API Key；
// 接入真实图像模型时，把本函数换成对 /api/... 的调用即可。
function generateSvg(opts: { prompt: string; style: string; aspect: string; seed: number; index: number }): string {
  const size = ASPECT_SIZE[opts.aspect] ?? ASPECT_SIZE["1:1"];
  const palette = PALETTES[opts.style] ?? PALETTES.illustration;
  const rng = mulberry32(hashString([opts.prompt, opts.style, opts.aspect, opts.seed, opts.index].join("|")));
  const { w: W, h: H } = size;
  const blobCount = 6 + Math.floor(rng() * 6);
  let shapes = "";
  for (let i = 0; i < blobCount; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const r = (0.12 + rng() * 0.38) * Math.min(W, H);
    const col = pick(palette.colors, rng);
    const op = (0.25 + rng() * 0.4).toFixed(2);
    shapes += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(0)}" fill="${col}" opacity="${op}"/>`;
  }
  const blur = (Math.min(W, H) * 0.04).toFixed(0);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="${palette.bg[0]}"/><stop offset="1" stop-color="${palette.bg[1]}"/></linearGradient>` +
    `<filter id="blur"><feGaussianBlur stdDeviation="${blur}"/></filter>` +
    `<filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>` +
    `<g filter="url(#blur)">${shapes}</g>` +
    `<rect width="${W}" height="${H}" filter="url(#noise)" opacity="0.06"/></svg>`
  );
}

type Generated = { src: string; seed: number; index: number };

export function PixelBloomClient({ t }: { t: Dictionary["pixelBloom"] }) {
  const [prompt, setPrompt] = useState("");
  const [negative, setNegative] = useState("");
  const [style, setStyle] = useState(t.styles[0]?.value ?? "illustration");
  const [aspect, setAspect] = useState("1:1");
  const [count, setCount] = useState(4);
  const [images, setImages] = useState<Generated[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (images.length && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [images]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      setError(t.errorEmpty);
      return;
    }
    setError("");
    setLoading(true);
    setImages([]);
    const seed = Math.floor(Math.random() * 1e9);
    const n = Math.max(1, Math.min(4, count));
    if (timer.current) clearTimeout(timer.current);
    // 模拟生成耗时，营造“生成中”体验；接入真实模型时改为 await 接口。
    timer.current = setTimeout(() => {
      const generated: Generated[] = Array.from({ length: n }, (_, i) => ({
        src: `data:image/svg+xml,${encodeURIComponent(
          generateSvg({ prompt: prompt.trim(), style, aspect, seed, index: i }),
        )}`,
        seed,
        index: i,
      }));
      setImages(generated);
      setLoading(false);
    }, 1100);
  };

  const handleClear = () => {
    setPrompt("");
    setNegative("");
    setImages([]);
    setError("");
  };

  const handleDownload = (src: string, index: number) => {
    const a = document.createElement("a");
    a.href = src;
    a.download = `pixel-bloom-${Date.now()}-${index + 1}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDownloadAll = () => {
    images.forEach((img, i) => handleDownload(img.src, i));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            <h1 className="text-lg font-bold bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              {t.brandTitle}
            </h1>
          </div>
          <span className="text-xs text-slate-400">{t.brandTag}</span>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">{t.heroTitle}</h2>
          <p className="mt-3 text-slate-400 max-w-2xl mx-auto">{t.heroSubtitle}</p>
        </div>

        {/* 控制面板 */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 mb-6 backdrop-blur-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-200 mb-2">
              {t.promptLabel} <span className="text-pink-400">{t.promptRequired}</span>
            </label>
            <textarea
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                if (error) setError("");
              }}
              placeholder={t.promptPlaceholder}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 outline-none transition-all text-sm resize-none"
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-200 mb-2">
              {t.negativeLabel}{" "}
              <span className="text-slate-500 text-xs font-normal">{t.negativePlaceholder}</span>
            </label>
            <input
              type="text"
              value={negative}
              onChange={(e) => setNegative(e.target.value)}
              placeholder={t.negativePlaceholder}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 outline-none transition-all text-sm"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div>
              <p className="text-xs font-medium text-slate-400 mb-2">{t.styleLabel}</p>
              <div className="flex flex-wrap gap-2">
                {t.styles.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setStyle(s.value)}
                    disabled={loading}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                      style === s.value
                        ? "bg-pink-500/20 border-pink-400 text-pink-200"
                        : "border-white/10 text-slate-300 hover:border-white/30"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400 mb-2">{t.aspectLabel}</p>
              <div className="flex flex-wrap gap-2">
                {t.aspects.map((a) => (
                  <button
                    key={a.value}
                    onClick={() => setAspect(a.value)}
                    disabled={loading}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                      aspect === a.value
                        ? "bg-pink-500/20 border-pink-400 text-pink-200"
                        : "border-white/10 text-slate-300 hover:border-white/30"
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400 mb-2">{t.countLabel}</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCount(n)}
                    disabled={loading}
                    className={`w-9 h-9 text-sm rounded-lg border transition-colors ${
                      count === n
                        ? "bg-pink-500/20 border-pink-400 text-pink-200"
                        : "border-white/10 text-slate-300 hover:border-white/30"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 mb-3 flex items-center gap-1">
              <span>⚠️</span> {error}
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex-1 h-11 bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-400 hover:to-pink-400 disabled:opacity-60 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <span className="flex gap-1">
                    <span
                      className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </span>
                  {t.generating}
                </>
              ) : (
                <>
                  <span>✨</span> {t.generate}
                </>
              )}
            </button>
            <button
              onClick={handleClear}
              disabled={loading}
              className="px-5 h-11 border border-white/10 hover:bg-white/5 disabled:opacity-50 text-slate-300 rounded-xl transition-colors text-sm"
            >
              {t.clear}
            </button>
          </div>
        </div>

        {/* 结果区 */}
        {(images.length > 0 || loading) && (
          <div ref={resultRef} className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🖼️</span>
              <h3 className="text-base font-semibold">{t.resultTitle}</h3>
              {images.length > 0 && (
                <button
                  onClick={handleDownloadAll}
                  className="ml-auto text-xs text-slate-400 hover:text-pink-300 transition-colors"
                >
                  {t.downloadAll}
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {loading
                ? Array.from({ length: count }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl bg-white/5 animate-pulse border border-white/10"
                    />
                  ))
                : images.map((img) => (
                    <div
                      key={img.index}
                      className="group relative rounded-xl overflow-hidden border border-white/10 bg-slate-900"
                    >
                      <img
                        src={img.src}
                        alt={`${t.brandTitle} ${img.index + 1}`}
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                        <button
                          onClick={() => handleDownload(img.src, img.index)}
                          className="px-3 py-1.5 text-xs rounded-lg bg-white/90 text-slate-900 font-medium hover:bg-white"
                        >
                          {t.download}
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        )}

        {/* 空状态 */}
        {!loading && images.length === 0 && (
          <div className="text-center py-10">
            <div className="text-6xl mb-4">🌸</div>
            <p className="text-slate-400 text-sm">{t.emptyHint}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {t.hints.map((hint) => (
                <button
                  key={hint}
                  onClick={() => setPrompt(hint)}
                  className="px-3 py-1.5 text-xs text-slate-300 bg-white/5 hover:bg-pink-500/20 hover:text-pink-200 rounded-full transition-colors border border-white/10"
                >
                  {hint}
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs text-slate-500 max-w-md mx-auto">{t.demoNote}</p>
          </div>
        )}
      </main>

      <footer className="border-t border-white/10 py-6 text-center">
        <p className="text-xs text-slate-500">
          {t.brandTitle} · {t.brandTag}
        </p>
      </footer>
    </div>
  );
}
