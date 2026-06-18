import { Category } from "@/data/categories";
import { Locale } from "@/lib/i18n/config";
import { Dictionary } from "@/lib/i18n/dictionaries";

type DirectoryShellProps = {
  categories: Category[];
  lang: Locale;
  dict: Dictionary;
  children: React.ReactNode;
};

export function DirectoryShell({ categories, lang, dict, children }: DirectoryShellProps) {
  const t = dict.directory;

  return (
    <section id="directory" className="mx-auto flex w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:px-8">
      <aside className="hidden w-72 shrink-0 xl:block">
        <div className="sticky top-24 space-y-6">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold tracking-[0.18em] text-cyan-700 uppercase">
              {t.quickIndex}
            </p>
            <h2 className="mt-3 text-lg font-semibold text-slate-950">{t.quickIndexTitle}</h2>
            <div className="mt-5 space-y-2">
              {categories.map((category) => (
                <a
                  key={category.slug}
                  href={`#section-${category.slug}`}
                  className="flex items-center justify-between rounded-2xl px-3 py-3 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">{category.icon}</span>
                    {category.name[lang]}
                  </span>
                  <span className="text-slate-300">→</span>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-lg shadow-slate-900/10">
            <p className="text-sm font-semibold tracking-[0.18em] text-cyan-300 uppercase">
              {t.browseTips}
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {t.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1 space-y-10">{children}</div>
    </section>
  );
}
