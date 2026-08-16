import { Dictionary } from "@/lib/i18n/dictionaries";

type HeroSectionProps = {
  totalTools: number;
  totalCategories: number;
  dict: Dictionary;
};

export function HeroSection({ totalTools, totalCategories, dict }: HeroSectionProps) {
  const t = dict.hero;
  const stats = [
    { label: t.stats.tools, value: `${totalTools}+` },
    { label: t.stats.categories, value: `${totalCategories}` },
    { label: t.stats.scenarios, value: "20+" },
  ];

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
      {/* 柔和青色渐变装饰 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.18),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.12),_transparent_30%)]" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-24">
        <div className="max-w-3xl space-y-7">
          <span className="inline-flex rounded-full bg-cyan-100 px-4 py-1.5 text-sm font-semibold text-cyan-800">
            {t.eyebrow}
          </span>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {t.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#directory"
              className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:-translate-y-0.5 hover:bg-cyan-600"
            >
              {t.browseAll}
            </a>
            <a
              href="#featured"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700"
            >
              {t.viewFeatured}
            </a>
          </div>
        </div>

        <div className="grid w-full max-w-xl grid-cols-3 gap-4 lg:pb-2">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5"
            >
              <p className="text-2xl font-semibold text-slate-950 sm:text-3xl">{item.value}</p>
              <p className="mt-2 text-sm text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
