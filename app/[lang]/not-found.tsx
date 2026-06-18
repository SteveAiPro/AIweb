import Link from "next/link";
import { en } from "@/lib/i18n/en";

// 404 在 [lang] 段内由 [lang]/layout 包裹（已含 html/body）。
// 该组件拿不到 lang 参数，使用默认语言（英文）文案作为兜底。
export default function NotFound() {
  const t = en.notFound;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center backdrop-blur">
        <p className="text-sm font-semibold tracking-[0.2em] text-cyan-300 uppercase">{t.code}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-4 text-base leading-8 text-slate-300">{t.description}</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          {t.backHome}
        </Link>
      </div>
    </div>
  );
}
