import Link from "next/link";
import { Category } from "@/data/categories";
import { Tool } from "@/data/tools";
import { ToolCard } from "@/components/tool-card";
import { Locale, localePath } from "@/lib/i18n/config";
import { Dictionary } from "@/lib/i18n/dictionaries";

type CategoryDirectorySectionProps = {
  category: Category;
  tools: Tool[];
  lang: Locale;
  dict: Dictionary;
};

export function CategoryDirectorySection({
  category,
  tools,
  lang,
  dict,
}: CategoryDirectorySectionProps) {
  const t = dict.categoryShelf;

  return (
    <section
      id={`section-${category.slug}`}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_80px_-35px_rgba(15,23,42,0.25)] lg:p-8"
    >
      <div className="flex flex-col gap-5 border-b border-slate-100 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-linear-to-br ${category.accent} text-3xl text-white shadow-lg`}
          >
            {category.icon}
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold tracking-[0.18em] text-cyan-700 uppercase">
              {t.eyebrow}
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              {category.name[lang]}
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {category.description[lang]}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-center">
            <p className="text-2xl font-semibold text-slate-950">{tools.length}</p>
            <p className="text-xs text-slate-500">{t.toolsCount}</p>
          </div>
          <Link
            href={localePath(lang, `/category/${category.slug}`)}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            {t.viewAll}
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {tools.slice(0, 6).map((tool) => (
          <ToolCard key={tool.slug} tool={tool} lang={lang} dict={dict} />
        ))}
      </div>
    </section>
  );
}
