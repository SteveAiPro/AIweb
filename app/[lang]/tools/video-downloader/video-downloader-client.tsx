"use client";

import { useState } from "react";
import { Dictionary } from "@/lib/i18n/dictionaries";

type ParseResult = {
  title: string;
  cover: string;
  author: string;
  duration: number;
  play: string;
  hdplay: string;
  music: string;
};

function formatDuration(seconds: number) {
  if (!seconds) return "";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function VideoDownloaderClient({ t }: { t: Dictionary["videoDownloader"] }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ParseResult | null>(null);

  const handleParse = async () => {
    if (!url.trim()) {
      setError(t.errorEmpty);
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error === "INVALID_URL" || data?.error === "EMPTY" ? t.errorInvalid : t.errorFailed);
        return;
      }
      setResult(data as ParseResult);
    } catch {
      setError(t.errorNetwork);
    } finally {
      setLoading(false);
    }
  };

  const fileHref = (mediaUrl: string, ext: string) =>
    `/api/download/file?url=${encodeURIComponent(mediaUrl)}&filename=${encodeURIComponent(
      `video-downloader.${ext}`,
    )}`;

  return (
    <main>
      {/* Hero + 输入 */}
      <section className="relative overflow-hidden border-b border-white/10 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_45%)]" />
        <div className="relative mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-200">
            {t.heroEyebrow}
          </span>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.heroTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">{t.heroSubtitle}</p>

          <div className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
            <input
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleParse();
              }}
              placeholder={t.inputPlaceholder}
              disabled={loading}
              className="h-12 flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white/10"
            />
            <button
              onClick={handleParse}
              disabled={loading}
              className="h-12 rounded-full bg-cyan-400 px-8 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:bg-slate-600 disabled:text-slate-300"
            >
              {loading ? t.parsing : t.parseButton}
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-400">{t.supported}</p>
          {error && <p className="mt-4 text-sm text-rose-300">⚠️ {error}</p>}
        </div>
      </section>

      <div className="mx-auto w-full max-w-3xl space-y-16 px-4 py-14 sm:px-6">
        {/* 解析结果 */}
        {result && (
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_80px_-35px_rgba(15,23,42,0.3)]">
            <div className="flex flex-col gap-5 sm:flex-row">
              {result.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={result.cover}
                  alt={result.title}
                  referrerPolicy="no-referrer"
                  className="h-44 w-32 shrink-0 rounded-2xl object-cover"
                />
              ) : null}
              <div className="min-w-0 flex-1">
                <p className="line-clamp-3 text-base font-medium text-slate-900">{result.title}</p>
                <p className="mt-2 text-sm text-slate-500">
                  {result.author ? `${t.resultBy} ${result.author}` : ""}
                  {result.duration ? ` · ${t.durationLabel} ${formatDuration(result.duration)}` : ""}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {result.play ? (
                    <a
                      href={fileHref(result.play, "mp4")}
                      className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      {t.downloadVideo}
                    </a>
                  ) : null}
                  {result.hdplay ? (
                    <a
                      href={fileHref(result.hdplay, "mp4")}
                      className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      {t.downloadHd}
                    </a>
                  ) : null}
                  {result.music ? (
                    <a
                      href={fileHref(result.music, "mp3")}
                      className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      {t.downloadMusic}
                    </a>
                  ) : null}
                </div>

                <button
                  onClick={() => {
                    setResult(null);
                    setUrl("");
                  }}
                  className="mt-4 text-sm font-medium text-cyan-700 transition hover:text-cyan-800"
                >
                  {t.newDownload}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 教程 */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{t.tutorialTitle}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {t.steps.map((step, i) => (
              <div key={step.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-700">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 优势 */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{t.advantagesTitle}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {t.advantages.map((adv) => (
              <div key={adv.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <h3 className="text-base font-semibold text-slate-900">{adv.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{adv.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{t.faqTitle}</h2>
          <div className="mt-6 space-y-3">
            {t.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-[1.25rem] border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer list-none text-base font-medium text-slate-900 marker:hidden">
                  {faq.q}
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 免责声明 */}
        <p className="rounded-[1.25rem] border border-slate-200 bg-slate-100/60 p-5 text-xs leading-6 text-slate-500">
          {t.disclaimer}
        </p>
      </div>
    </main>
  );
}
