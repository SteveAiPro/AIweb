import Link from "next/link";
import { Tool } from "@/data/tools";
import { categoryMap } from "@/data/categories";

const badgeStyles = {
  Featured: "bg-cyan-500/10 text-cyan-700 ring-cyan-600/20",
  Popular: "bg-amber-500/10 text-amber-700 ring-amber-600/20",
  New: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20",
} as const;

export function ToolCard({ tool }: { tool: Tool }) {
  const category = categoryMap.get(tool.category);
  const badges = [
    tool.featured ? "Featured" : null,
    tool.popular ? "Popular" : null,
    tool.isNew ? "New" : null,
  ].filter(Boolean) as Array<keyof typeof badgeStyles>;

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
              <p className="text-sm text-slate-500">{category?.name ?? "AI Tool"}</p>
            </div>
          </div>
        </div>

        <div className="rounded-full bg-slate-950 px-3 py-1 text-sm font-semibold text-white">
          {tool.score}
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600">{tool.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge}
            className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${badgeStyles[badge]}`}
          >
            {badge}
          </span>
        ))}
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {tool.pricing}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {tool.tags.map((tag) => (
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
            href={`/tools/${tool.slug}`}
            className="text-sm font-semibold text-slate-900 transition hover:text-cyan-700"
          >
            查看详情
          </Link>
          <a
            href={tool.website}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            访问官网
          </a>
        </div>
      </div>
    </article>
  );
}
