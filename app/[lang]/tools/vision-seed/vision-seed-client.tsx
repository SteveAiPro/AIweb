"use client";

import { useState, useRef, useEffect, useMemo } from "react";

/* ----------------------------- 选项数据（逐字复刻 mkimage.ai） ----------------------------- */

const MODELS = [
  { value: "all", label: "All Models" },
  { value: "nano-banana", label: "Nano Banana" },
  { value: "gpt-image", label: "GPT Image" },
];

const CATEGORIES = [
  { value: "all", label: "All Prompts" },
  { value: "food-drink", label: "Food & Drink" },
  { value: "illustration-3d", label: "Illustration & 3D" },
  { value: "photography", label: "Photography" },
  { value: "poster-design", label: "Poster Design" },
  { value: "product-brand", label: "Product & Brand" },
  { value: "ui-graphic", label: "UI & Graphic" },
];

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Popular" },
  { value: "random", label: "Random" },
];

const ASPECTS = [
  { value: "1:1", label: "1:1" },
  { value: "4:3", label: "4:3" },
  { value: "3:4", label: "3:4" },
  { value: "16:9", label: "16:9" },
];

const ASPECT_CLASS: Record<string, string> = {
  "1:1": "aspect-square",
  "4:3": "aspect-[4/3]",
  "3:4": "aspect-[3/4]",
  "16:9": "aspect-video",
};

const ASPECT_SIZE: Record<string, { w: number; h: number }> = {
  "1:1": { w: 512, h: 512 },
  "4:3": { w: 640, h: 480 },
  "3:4": { w: 480, h: 640 },
  "16:9": { w: 640, h: 360 },
};

// 示例提示词（mkimage 风格，覆盖各分类），用于首屏画廊的卡片文案。
const EXAMPLE_PROMPTS = [
  "A cozy reading nook by a sunlit window, plants and warm wood, soft morning light",
  "Cinematic portrait of a cyberpunk hacker, neon reflections, bokeh, 35mm",
  "Minimalist poster for a jazz festival, bold typography, duotone",
  "Overhead flat lay of a healthy brunch bowl, natural light, food photography",
  "Dreamy watercolor landscape, misty mountains and a calm lake at dawn",
  "Product shot of a minimalist ceramic vase on a stone pedestal, studio light",
  "Isometric 3D illustration of a cozy coffee shop, pastel colors",
  "Retro futuristic UI dashboard concept, glassmorphism, neon accents",
  "A red panda wearing tiny glasses reading a book, children's book illustration",
  "Moody editorial fashion photo, monochrome, dramatic shadows",
  "Flat vector infographic of a plant care routine, soft palette",
  "A magical library at night, shelves of glowing books, fantasy concept art",
];

/* ----------------------------- 程序化生成（首屏示例画廊用；后端也会用同源逻辑） ----------------------------- */

type Palette = { bg: [string, string]; colors: string[] };

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

function generateSvg(opts: {
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

type Generated = { id: number; prompt: string; src: string; score: number };

/* ----------------------------- 下拉组件 ----------------------------- */

function Dropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === value)?.label ?? label;
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
      >
        {current}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-slate-400">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute left-0 z-30 mt-1 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
            {options.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm hover:bg-slate-100 ${
                  o.value === value ? "font-semibold text-slate-900" : "text-slate-700"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ----------------------------- 主组件（1:1 复刻 mkimage.ai，已接后端） ----------------------------- */

type Me = { authenticated: boolean; email?: string; displayName?: string; credits?: number };

export function VisionSeedClient() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("all");
  const [category, setCategory] = useState("all");
  const [aspect, setAspect] = useState("1:1");
  const [sort, setSort] = useState("newest");
  const [images, setImages] = useState<Generated[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [me, setMe] = useState<Me | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const activeFilters = (model !== "all" ? 1 : 0) + (category !== "all" ? 1 : 0);

  // 拉取登录态与积分
  useEffect(() => {
    fetch("/api/vision-seed/me")
      .then((r) => r.json())
      .then((d: Me) => setMe(d))
      .catch(() => {});
  }, []);

  // 首屏示例画廊（程序化）
  const runGenerate = (
    override: Partial<{ prompt: string; model: string; category: string; aspect: string }> = {},
    withLoading = false,
  ) => {
    const promptV = (override.prompt ?? prompt).trim();
    const modelV = override.model ?? model;
    const categoryV = override.category ?? category;
    const aspectV = override.aspect ?? aspect;
    const seed = Math.floor(Math.random() * 1e9);
    const n = 12;
    const captions = promptV ? Array.from({ length: n }, () => promptV) : EXAMPLE_PROMPTS;
    const generated: Generated[] = Array.from({ length: n }, (_, i) => ({
      id: i,
      prompt: captions[i],
      src: `data:image/svg+xml,${encodeURIComponent(
        generateSvg({ prompt: captions[i], model: modelV, category: categoryV, aspect: aspectV, seed, index: i }),
      )}`,
      score: hashString(`${seed}-${i}`) % 100,
    }));
    if (withLoading) {
      setLoading(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setImages(generated);
        setLoading(false);
      }, 900);
    } else {
      setImages(generated);
    }
  };

  useEffect(() => {
    runGenerate({}, false);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 真正生成：调用后端（落库 + 扣积分）
  const handleGenerate = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/vision-seed/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), model, category, aspect }),
      });
      if (res.status === 402) {
        setError("Insufficient credits. Sign in and top up to keep generating.");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        setError("Generation failed, please try again later.");
        setLoading(false);
        return;
      }
      const data = (await res.json()) as { images: string[]; credits?: number };
      const srcs = data.images ?? [];
      setImages(
        srcs.map((src, i) => ({
          id: Date.now() + i,
          prompt: prompt.trim() || "AI art",
          src,
          score: i,
        })),
      );
      if (typeof data.credits === "number") {
        setMe((m) => (m ? { ...m, credits: data.credits } : m));
      }
    } catch {
      setError("Network error, please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const sorted = useMemo(() => {
    const arr = [...images];
    if (sort === "popular") arr.sort((a, b) => b.score - a.score);
    else if (sort === "random") arr.sort(() => Math.random() - 0.5);
    return arr;
  }, [images, sort]);

  const handleDownload = (src: string, index: number) => {
    const a = document.createElement("a");
    a.href = src;
    a.download = `mkimage-${Date.now()}-${index + 1}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const goLogin = () => {
    const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
    const isEn = pathname === "/en" || pathname.startsWith("/en/");
    window.location.href = isEn ? "/en/login" : "/login";
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      {/* 顶栏（复刻 mkimage.ai 自带导航，已接真实登录态） */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
            <span className="text-base font-bold tracking-tight">MkImage</span>
          </div>

          <nav className="ml-2 hidden items-center gap-1 md:flex">
            <button className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100">Home</button>
            <button className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900">Generate</button>
            <button className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100">Favorites</button>
            <button className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100">History</button>
          </nav>

          <div className="hidden items-center gap-1 lg:flex">
            <Dropdown label="All Models" options={MODELS} value={model} onChange={(v) => { setModel(v); runGenerate({ model: v }); }} />
            <Dropdown label="All Prompts" options={CATEGORIES} value={category} onChange={(v) => { setCategory(v); runGenerate({ category: v }); }} />
          </div>

          <div className="ml-auto flex items-center gap-3">
            {me?.authenticated ? (
              <>
                <span className="hidden text-xs font-semibold text-slate-700 sm:inline">
                  {me.credits} credits
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
                    {(me.displayName?.[0] ?? "U").toUpperCase()}
                  </div>
                  <span className="hidden text-xs text-slate-500 sm:inline">{me.displayName}</span>
                </div>
                <form action="/auth/signout" method="post">
                  <button className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100">
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="hidden text-right sm:block">
                  <p className="text-xs font-semibold text-slate-700">10 free welcome credits</p>
                  <button onClick={goLogin} className="text-xs text-violet-600 hover:text-violet-700">
                    Sign in to claim credits
                  </button>
                </div>
                <button
                  onClick={goLogin}
                  className="rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Get started
                </button>
                <div className="flex items-center gap-1.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
                    G
                  </div>
                  <span className="hidden text-xs text-slate-500 sm:inline">Guest</span>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 生成面板 */}
      <section ref={topRef} className="border-b border-slate-100">
        <div className="mx-auto w-full max-w-3xl px-4 py-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleGenerate();
              }}
              placeholder="Describe what you want to see..."
              rows={3}
              className="w-full resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-slate-400"
            />
            <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
              <div className="flex flex-wrap gap-1.5">
                {ASPECTS.map((a) => (
                  <button
                    key={a.value}
                    onClick={() => setAspect(a.value)}
                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                      aspect === a.value
                        ? "border-violet-400 bg-violet-50 text-violet-700"
                        : "border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="ml-auto flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" style={{ animationDelay: "300ms" }} />
                    </span>
                    Generating
                  </>
                ) : (
                  "Generate"
                )}
              </button>
            </div>
          </div>
          {error && <p className="mt-2 text-center text-sm text-red-500">{error}</p>}
        </div>
      </section>

      {/* 画廊区（AI IMAGE PROMPT GALLERY） */}
      <section className="mx-auto flex w-full max-w-7xl flex-1 px-4 py-6">
        {sidebarOpen && (
          <aside className="mr-6 hidden w-52 shrink-0 lg:block">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Categories</p>
            <div className="space-y-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => { setCategory(c.value); runGenerate({ category: c.value }); }}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    category === c.value ? "bg-violet-50 font-medium text-violet-700" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </aside>
        )}

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">AI Image Prompt Gallery</h2>
            <button
              onClick={() => setSidebarOpen((o) => !o)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100"
            >
              Toggle Sidebar
            </button>
            <div className="ml-auto flex flex-wrap items-center gap-1">
              {MODELS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => { setModel(m.value); runGenerate({ model: m.value }); }}
                  className={`rounded-full px-3 py-1 text-xs transition-colors ${
                    model === m.value ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              {SORTS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSort(s.value)}
                  className={`rounded-full px-3 py-1 text-xs transition-colors ${
                    sort === s.value ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <button className="ml-auto flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100">
              Filters
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-slate-200 px-1 text-[10px] font-semibold text-slate-600">
                {activeFilters}
              </span>
            </button>
          </div>

          {/* 结果网格 */}
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-xl bg-slate-100" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {sorted.map((img) => (
                <div
                  key={img.id}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white"
                >
                  <div className={`relative ${ASPECT_CLASS[aspect]}`}>
                    <img src={img.src} alt={img.prompt} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 flex items-end justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => handleDownload(img.src, img.id)}
                        className="mb-3 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-white"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2">
                    <p className="line-clamp-2 flex-1 text-xs leading-snug text-slate-600">{img.prompt}</p>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(img.prompt)}
                      title="Copy prompt"
                      className="shrink-0 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="11" height="11" rx="2" />
                        <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-slate-200 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 text-center">
          <span className="text-sm font-bold text-slate-800">MkImage</span>
          <span className="text-xs text-slate-500">Make Any Images Possible</span>
          <div className="mt-2 flex flex-wrap justify-center gap-4 text-xs text-slate-500">
            <button className="hover:text-slate-700">Home</button>
            <button className="hover:text-slate-700">Generate</button>
            <button className="hover:text-slate-700">Favorites</button>
            <button className="hover:text-slate-700">History</button>
            <button className="hover:text-slate-700">Privacy</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
