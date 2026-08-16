import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryDirectorySection } from "@/components/category-directory-section";
import { DirectoryShell } from "@/components/directory-shell";
import { HeroSection } from "@/components/hero-section";
import { SearchDirectory } from "@/components/search-directory";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CategoryGridSection } from "@/components/category-grid-section";
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

  // 仅保留有工具的分类，供首页分类网格展示（避免空货架）
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
          totalCategories={categories.length}
          dict={dict}
        />

        <DirectoryShell categories={categories} lang={lang} dict={dict}>
          <CategoryGridSection items={categoriesWithTools} lang={lang} dict={dict} />

          <ToolSection
            id="featured"
            eyebrow={dict.sections.featured.eyebrow}
            title={dict.sections.featured.title}
            description={dict.sections.featured.description}
            tools={featuredTools}
            lang={lang}
            dict={dict}
          />

          <SearchDirectory tools={tools} categories={categories} lang={lang} dict={dict} />

          {categories.map((category) => (
            <CategoryDirectorySection
              key={category.slug}
              category={category}
              tools={getToolsByCategory(category.slug)}
              lang={lang}
              dict={dict}
            />
          ))}
        </DirectoryShell>
      </main>
      <SiteFooter lang={lang} dict={dict} />
    </div>
  );
}
