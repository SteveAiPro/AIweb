import Link from "next/link";
import { Category } from "@/data/categories";
import { Locale, localePath } from "@/lib/i18n/config";
import { Dictionary } from "@/lib/i18n/dictionaries";

type CategoryGridItem = { category: Category; count: number };

type CategoryGridSectionProps = {
  items: CategoryGridItem[];
  lang: Locale;
  dict: Dictionary;
};

export function CategoryGridSection({ items, lang, dict }: CategoryGridSectionProps) {
  const t = dict.sections.categories;

  return (
    <section
      id="categories"
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_80px_-35px_rgba(15,23,42,0.25)] lg:p-8"
    >
      <div className="mb-6 space-y-2">
        <p className="text-sm font-semibold tracking-[0.18em] text-cyan-700 uppercase">
          {t.eyebrow}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{t.title}</h2>
        <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          {t.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ category, count }) => (
          <Link
            key={category.slug}
            href={localePath(lang, `/category/${category.slug}`)}
            className="group flex items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50/60 p-4 transition hover:border-cyan-300 hover:bg-white hover:shadow-md"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${category.accent} text-2xl text-white shadow`}
            >
              {category.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-base font-semibold leading-snug text-slate-950">
                  {category.name[lang]}
                </p>
                <span className="mt-0.5 shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                  {count}
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                {category.description[lang]}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
