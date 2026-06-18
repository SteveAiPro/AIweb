import Link from "next/link";
import { Tool } from "@/data/tools";
import { categoryMap } from "@/data/categories";
import { Locale, localePath } from "@/lib/i18n/config";
import { Dictionary } from "@/lib/i18n/dictionaries";

const badgeStyles = {
  featured: "bg-cyan-500/10 text-cyan-700 ring-cyan-600/20",
  popular: "bg-amber-500/10 text-amber-700 ring-amber-600/20",
  new: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20",
} as const;

export function ToolCard({
  tool,
  lang,
  dict,
}: {
  tool: Tool;
  lang: Locale;
  dict: Dictionary;
}) {
  const category = categoryMap.get(tool.category);
  const t = dict.toolCard;
  const badges = [
    tool.featured ? { label: t.badges.featured, cls: badgeStyles.featured } : null,
    tool.popular ? { label: t.badges.popular, cls: badgeStyles.popular } : null,
    tool.isNew ? { label: t.badges.new, cls: badgeStyles.new } : null,
  ].filter(Boolean) as { label: string; cls: string }[];

  return (
    <article className="group flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-100/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-xl text-white shadow-lg shadow-slate-900/15">
              {category?.icon ?? "✨"}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-950">{tool.name}</h3>
              <p className="text-sm text-slate-500">{category?.name[lang] ?? t.aiTool}</p>
            </div>
          </div>
        </div>

        <div className="rounded-full bg-slate-950 px-3 py-1 text-sm font-semibold text-white">
          {tool.score}
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600">{tool.summary[lang]}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge.label}
            className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${badge.cls}`}
          >
            {badge.label}
          </span>
        ))}
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {dict.pricing[tool.pricing]}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {tool.tags[lang].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
          <Link
            href={localePath(lang, `/tools/${tool.slug}`)}
            className="text-sm font-semibold text-slate-900 transition hover:text-cyan-700"
          >
            {t.detail}
          </Link>
          <a
            href={tool.website}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            {t.visit}
          </a>
        </div>
      </div>
    </article>
  );
}
