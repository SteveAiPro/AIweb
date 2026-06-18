import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryDirectorySection } from "@/components/category-directory-section";
import { DirectoryShell } from "@/components/directory-shell";
import { HeroSection } from "@/components/hero-section";
import { SearchDirectory } from "@/components/search-directory";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolSection } from "@/components/tool-section";
import { categories } from "@/data/categories";
import { featuredTools, newTools, popularTools, tools } from "@/data/tools";
import { getToolsByCategory } from "@/lib/site-data";
import { OG_IMAGE } from "@/lib/site-config";
import { alternateLanguages, hasLocale, localePath } from "@/lib/i18n/config";
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
    alternates: { canonical: localePath(lang, "/"), languages: alternateLanguages("/") },
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <SiteHeader lang={lang} dict={dict} />
      <main>
        <HeroSection
          totalTools={tools.length}
          totalCategories={categories.length}
          dict={dict}
        />

        <DirectoryShell categories={categories} lang={lang} dict={dict}>
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

          <ToolSection
            id="popular"
            eyebrow={dict.sections.popular.eyebrow}
            title={dict.sections.popular.title}
            description={dict.sections.popular.description}
            tools={popularTools}
            lang={lang}
            dict={dict}
          />

          {categories.map((category) => (
            <CategoryDirectorySection
              key={category.slug}
              category={category}
              tools={getToolsByCategory(category.slug)}
              lang={lang}
              dict={dict}
            />
          ))}

          <ToolSection
            id="new"
            eyebrow={dict.sections.latest.eyebrow}
            title={dict.sections.latest.title}
            description={dict.sections.latest.description}
            tools={newTools}
            lang={lang}
            dict={dict}
          />
        </DirectoryShell>
      </main>
      <SiteFooter lang={lang} dict={dict} />
    </div>
  );
}
