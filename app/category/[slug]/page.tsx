import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolCard } from "@/components/tool-card";
import { categories } from "@/data/categories";
import { getCategoryBySlug, getToolsByCategory } from "@/lib/site-data";
import { SITE_NAME } from "@/lib/site-config";
import {
  JsonLd,
  breadcrumbJsonLd,
  collectionPageJsonLd,
} from "@/lib/structured-data";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "分类不存在",
    };
  }

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      title: `${category.name} | ${SITE_NAME}`,
      description: category.description,
      url: `/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryTools = getToolsByCategory(slug);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <JsonLd
        data={[
          collectionPageJsonLd(category, categoryTools),
          breadcrumbJsonLd([
            { name: "首页", path: "/" },
            { name: category.name, path: `/category/${category.slug}` },
          ]),
        ]}
      />
      <SiteHeader />
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
                      Category view
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold tracking-tight">{category.name}</h1>
                  </div>
                  <p className="max-w-2xl text-base leading-8 text-slate-300">{category.description}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-slate-300 backdrop-blur">
                  <p className="text-3xl font-semibold text-white">{categoryTools.length}</p>
                  <p className="mt-2">当前分类收录工具</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
