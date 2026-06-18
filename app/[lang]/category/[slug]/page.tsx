import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolCard } from "@/components/tool-card";
import { categories } from "@/data/categories";
import { getCategoryBySlug, getToolsByCategory } from "@/lib/site-data";
import { OG_IMAGE, SITE_NAME } from "@/lib/site-config";
import { JsonLd, breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/structured-data";
import { alternateLanguages, hasLocale, localePath, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type CategoryPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    categories.map((category) => ({ lang, slug: category.slug })),
  );
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: dict.notFound.title };
  }

  return {
    title: category.name[lang],
    description: category.description[lang],
    alternates: {
      canonical: localePath(lang, `/category/${category.slug}`),
      languages: alternateLanguages(`/category/${category.slug}`),
    },
    openGraph: {
      title: `${category.name[lang]} | ${SITE_NAME}`,
      description: category.description[lang],
      url: localePath(lang, `/category/${category.slug}`),
      images: OG_IMAGE,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const dict = getDictionary(lang);
  const t = dict.categoryView;
  const categoryTools = getToolsByCategory(slug);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <JsonLd
        data={[
          collectionPageJsonLd(category, categoryTools, lang),
          breadcrumbJsonLd(
            [
              { name: dict.nav.home, path: "/" },
              { name: category.name[lang], path: `/category/${category.slug}` },
            ],
            lang,
          ),
        ]}
      />
      <SiteHeader lang={lang} dict={dict} />
      <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 text-white shadow-2xl shadow-slate-900/10">
          <div className={`bg-linear-to-r ${category.accent} p-[1px]`}>
            <div className="rounded-[calc(2rem-1px)] bg-slate-900/96 px-8 py-10">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-3xl backdrop-blur">
                    {category.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-[0.2em] text-cyan-200 uppercase">
                      {t.eyebrow}
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold tracking-tight">
                      {category.name[lang]}
                    </h1>
                  </div>
                  <p className="max-w-2xl text-base leading-8 text-slate-300">
                    {category.description[lang]}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-slate-300 backdrop-blur">
                  <p className="text-3xl font-semibold text-white">{categoryTools.length}</p>
                  <p className="mt-2">{t.toolsCountLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} lang={lang} dict={dict} />
          ))}
        </section>
      </main>
      <SiteFooter lang={lang} dict={dict} />
    </div>
  );
}
