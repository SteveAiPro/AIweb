import Link from "next/link";
import { Tool } from "@/data/tools";
import { categoryMap } from "@/data/categories";
import { Locale, localePath } from "@/lib/i18n/config";
import { Dictionary } from "@/lib/i18n/dictionaries";
import { Favicon } from "@/components/favicon";
import { getDomain } from "@/lib/domain";

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
  // 站内相对路径（以 / 开头）视为内部链接，否则为外部官网
  const isInternal = tool.website.startsWith("/");
  // 取官网域名，用于加载该网站自己的 favicon
  const domain = getDomain(tool.website);
  const badges = [
    tool.featured ? { label: t.badges.featured, cls: badgeStyles.featured } : null,
    tool.popular ? { label: t.badges.popular, cls: badgeStyles.popular } : null,
    tool.isNew ? { label: t.badges.new, cls: badgeStyles.new } : null,
  ].filter(Boolean) as { label: string; cls: string }[];

  const cardClassName =
    "group flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-100/40";

  const cardContent = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${category?.accent ?? "from-slate-400 to-slate-600"} text-xl text-white shadow-lg`}
            >
              <Favicon
                domain={domain}
                alt={tool.name}
                className="h-7 w-7 rounded-md object-contain"
              >
                {category?.icon ?? "✨"}
              </Favicon>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-950">{tool.name}</h3>
              <p className="text-sm text-slate-500">{category?.name[lang] ?? t.aiTool}</p>
            </div>
          </div>
        </div>

        <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
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
    </>
  );

  if (isInternal) {
    return (
      <Link href={localePath(lang, tool.website)} className={cardClassName}>
        {cardContent}
      </Link>
    );
  }

  // 外链：非本站/非白名单域名统一加 nofollow，避免向不拥有的站点传递权重
  const doFollowDomains = ["gaoqian2580.com", "whitebg.app"];
  const isOwnSite = doFollowDomains.includes(getDomain(tool.website) ?? "");
  const rel = isOwnSite ? "noreferrer" : "nofollow noreferrer";

  return (
    <a href={tool.website} target="_blank" rel={rel} className={cardClassName}>
      {cardContent}
    </a>
  );
}
