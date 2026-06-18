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
    <section className="relative overflow-hidden border-b border-white/10 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.14),_transparent_26%),linear-gradient(180deg,_rgba(15,23,42,0),_rgba(15,23,42,0.92))]" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-18 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-24">
        <div className="max-w-3xl space-y-8">
          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-200">
            {t.eyebrow}
          </span>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {t.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#directory"
              className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {t.browseAll}
            </a>
            <a
              href="#featured"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              {t.viewFeatured}
            </a>
          </div>
        </div>

        <div className="grid w-full max-w-xl grid-cols-3 gap-4 lg:pb-2">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/25 backdrop-blur"
            >
              <p className="text-2xl font-semibold text-white sm:text-3xl">{item.value}</p>
              <p className="mt-2 text-sm text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
