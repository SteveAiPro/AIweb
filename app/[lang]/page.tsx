import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/hero-section";
import { HomeCategoryTags } from "@/components/home-category-tags";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolSection } from "@/components/tool-section";
import { categories } from "@/data/categories";
import { tools, featuredTools } from "@/data/tools";
import { getToolsByCategory } from "@/lib/site-data";
import { OG_IMAGE, canonicalUrl } from "@/lib/site-config";
import { HreflangTags } from "@/components/hreflang-tags";
import { hasLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);

  return {
    title: { absolute: dict.meta.homeTitle },
    description: dict.meta.siteDescription,
    alternates: { canonical: canonicalUrl(lang, "/") },
    openGraph: {
      title: dict.meta.homeTitle,
      description: dict.meta.siteDescription,
      url: localePath(lang, "/"),
      images: OG_IMAGE,
    },
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const categoriesWithTools = categories
    .map((category) => ({ category, count: getToolsByCategory(category.slug).length }))
    .filter((item) => item.count > 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <HreflangTags lang={lang} path="/" />
      <SiteHeader lang={lang} dict={dict} />
      <main>
        <HeroSection
          totalTools={tools.length}
          totalCategories={categoriesWithTools.length}
          dict={dict}
        />

        <HomeCategoryTags items={categoriesWithTools} lang={lang} dict={dict} />

        <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <ToolSection
            id="featured"
            eyebrow={dict.sections.featured.eyebrow}
            title={dict.sections.featured.title}
            description={dict.sections.featured.description}
            tools={featuredTools}
            lang={lang}
            dict={dict}
          />
        </div>
      </main>
      <SiteFooter lang={lang} dict={dict} />
    </div>
  );
}
