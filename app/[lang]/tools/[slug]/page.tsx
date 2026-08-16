import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolCard } from "@/components/tool-card";
import { SlangSearch } from "@/components/slang-search";
import { categoryMap } from "@/data/categories";
import { tools } from "@/data/tools";
import { xianyuSlang } from "@/data/xianyu-slang";
import { getToolBySlug, getToolsByCategory } from "@/lib/site-data";
import { OG_IMAGE, SITE_NAME, canonicalUrl } from "@/lib/site-config";
import {
  JsonLd,
  breadcrumbJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/structured-data";
import { alternateLanguages, hasLocale, localePath, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type ToolDetailPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export function generateStaticParams() {
  // red-generator、video-downloader、pixel-bloom、vision-seed 有各自独立的静态页，此处排除以免重复预渲染。
  return locales.flatMap((lang) =>
    tools
      .filter(
        (tool) =>
          tool.slug !== "red-generator" &&
          tool.slug !== "video-downloader" &&
          tool.slug !== "pixel-bloom" &&
          tool.slug !== "vision-seed",
      )
      .map((tool) => ({ lang, slug: tool.slug })),
  );
}

export async function generateMetadata({ params }: ToolDetailPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  const tool = getToolBySlug(slug);

  if (!tool) {
    return { title: dict.notFound.title };
  }

  return {
    title: tool.name,
    description: tool.summary[lang],
    alternates: {
      canonical: canonicalUrl(lang, `/tools/${tool.slug}`),
      languages: alternateLanguages(`/tools/${tool.slug}`),
    },
    openGraph: {
      title: `${tool.name} | ${SITE_NAME}`,
      description: tool.summary[lang],
      url: localePath(lang, `/tools/${tool.slug}`),
      images: OG_IMAGE,
    },
  };
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const dict = getDictionary(lang);
  const t = dict.toolDetail;
  const category = categoryMap.get(tool.category);
  const relatedTools = getToolsByCategory(tool.category)
    .filter((item) => item.slug !== tool.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <JsonLd
        data={[
          softwareApplicationJsonLd(tool, lang),
          breadcrumbJsonLd(
            [
              { name: t.home, path: "/" },
              ...(category
                ? [{ name: category.name[lang], path: `/category/${category.slug}` }]
                : []),
              { name: tool.name, path: `/tools/${tool.slug}` },
            ],
            lang,
          ),
        ]}
      />
      <SiteHeader lang={lang} dict={dict} />
      <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_360px]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.25)]">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Link href={localePath(lang, "/")} className="text-slate-500 transition hover:text-slate-900">
                {t.home}
              </Link>
              <span className="text-slate-300">/</span>
              {category ? (
                <Link
                  href={localePath(lang, `/category/${category.slug}`)}
                  className="text-slate-500 transition hover:text-slate-900"
                >
                  {category.name[lang]}
                </Link>
              ) : null}
            </div>

            <div className="mt-8 flex flex-col gap-6 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-4">
                <div className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-linear-to-br ${category?.accent ?? "from-slate-400 to-slate-600"} text-3xl text-white`}>
                  {category?.icon ?? "✨"}
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700 uppercase">
                    {t.profile}
                  </p>
                  <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
                    {tool.name}
                  </h1>
                </div>
              </div>

              <p className="max-w-3xl text-base leading-8 text-slate-600">{tool.summary[lang]}</p>

              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                  {t.score} {tool.score}
                </span>
                <span className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700">
                  {dict.pricing[tool.pricing]}
                </span>
                {category ? (
                  <span className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700">
                    {category.name[lang]}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="mt-8 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">{t.intro}</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">{tool.description[lang]}</p>
              </div>

              {tool.longDescription && (
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">{t.longIntro}</h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">{tool.longDescription[lang]}</p>
                </div>
              )}

              {tool.features && tool.features[lang].length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">{t.features}</h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {tool.features[lang].map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-sm leading-7 text-slate-700"
                      >
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-700">
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tool.steps && tool.steps.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">{t.howToUse}</h2>
                  <ol className="mt-4 space-y-4">
                    {tool.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-sm font-semibold text-cyan-800">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-medium text-slate-950">{step.title[lang]}</p>
                          <p className="mt-1 text-sm leading-7 text-slate-600">{step.desc[lang]}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {tool.faqs && tool.faqs.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">{t.faq}</h2>
                  <dl className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-100">
                    {tool.faqs.map((item, i) => (
                      <div key={i} className="p-5">
                        <dt className="font-medium text-slate-950">{item.q[lang]}</dt>
                        <dd className="mt-2 text-sm leading-7 text-slate-600">{item.a[lang]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {tool.slug === "xianyu-slang" && (
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">{t.slangTitle}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-500">{t.slangHint}</p>
                  <div className="mt-4">
                    <SlangSearch
                      entries={xianyuSlang}
                      labels={{
                        placeholder: t.slangSearchPlaceholder,
                        count: t.slangCount,
                        countUnit: t.slangCountUnit,
                        noResult: t.slangNoResult,
                      }}
                    />
                  </div>
                  <p className="mt-3 text-[10px] leading-4 text-slate-300">{t.slangSource}</p>
                </div>
              )}

              <div>
                <h2 className="text-xl font-semibold text-slate-950">{t.useCases}</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {tool.tags[lang].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700 uppercase">
                {t.related}
              </p>
              <div className="mt-5 grid gap-4">
                {relatedTools.map((relatedTool) => (
                  <ToolCard key={relatedTool.slug} tool={relatedTool} lang={lang} dict={dict} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter lang={lang} dict={dict} />
    </div>
  );
}
