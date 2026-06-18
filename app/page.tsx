import type { Metadata } from "next";
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
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <SiteHeader />
      <main>
        <HeroSection totalTools={tools.length} totalCategories={categories.length} />

        <DirectoryShell categories={categories}>
          <ToolSection
            id="featured"
            eyebrow="Editor picks"
            title="精选推荐"
            description="优先展示更容易上手、适合团队落地的工具，帮助你从海量选择里更快建立第一批候选名单。"
            tools={featuredTools}
          />

          <SearchDirectory tools={tools} categories={categories} />

          <ToolSection
            id="popular"
            eyebrow="Popular now"
            title="热门工具"
            description="更偏向高频使用场景，包括代码协作、图像设计、短视频和语音工作流。"
            tools={popularTools}
          />

          {categories.map((category) => (
            <CategoryDirectorySection
              key={category.slug}
              category={category}
              tools={getToolsByCategory(category.slug)}
            />
          ))}

          <ToolSection
            id="new"
            eyebrow="New arrivals"
            title="最新上架"
            description="适合喜欢尝鲜的团队快速关注新产品方向，观察哪些能力正在变得更实用。"
            tools={newTools}
          />
        </DirectoryShell>
      </main>
      <SiteFooter />
    </div>
  );
}
