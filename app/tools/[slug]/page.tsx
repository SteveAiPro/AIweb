import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolCard } from "@/components/tool-card";
import { categoryMap } from "@/data/categories";
import { tools } from "@/data/tools";
import { getToolBySlug, getToolsByCategory } from "@/lib/site-data";
import { SITE_NAME } from "@/lib/site-config";
import {
  JsonLd,
  breadcrumbJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/structured-data";

type ToolDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  // red-generator 有独立的静态页（app/tools/red-generator），此处排除以免重复预渲染。
  return tools
    .filter((tool) => tool.slug !== "red-generator")
    .map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "工具不存在",
    };
  }

  return {
    title: tool.name,
    description: tool.summary,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title: `${tool.name} | ${SITE_NAME}`,
      description: tool.summary,
      url: `/tools/${tool.slug}`,
    },
  };
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const category = categoryMap.get(tool.category);
  const relatedTools = getToolsByCategory(tool.category)
    .filter((item) => item.slug !== tool.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <JsonLd
        data={[
          softwareApplicationJsonLd(tool),
          breadcrumbJsonLd([
            { name: "首页", path: "/" },
            ...(category
              ? [{ name: category.name, path: `/category/${category.slug}` }]
              : []),
            { name: tool.name, path: `/tools/${tool.slug}` },
          ]),
        ]}
      />
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_360px]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.25)]">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Link href="/" className="text-slate-500 transition hover:text-slate-900">
                首页
              </Link>
              <span className="text-slate-300">/</span>
              {category ? (
                <Link
                  href={`/category/${category.slug}`}
                  className="text-slate-500 transition hover:text-slate-900"
                >
                  {category.name}
                </Link>
              ) : null}
            </div>

            <div className="mt-8 flex flex-col gap-6 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900 text-3xl text-white">
                  {category?.icon ?? "✨"}
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700 uppercase">
                    Tool profile
                  </p>
                  <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
                    {tool.name}
                  </h1>
                </div>
              </div>

              <p className="max-w-3xl text-base leading-8 text-slate-600">{tool.summary}</p>

              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                  评分 {tool.score}
                </span>
                <span className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700">
                  {tool.pricing}
                </span>
                <span className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700">
                  {category?.name}
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">产品简介</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">{tool.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-950">适合场景</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {tool.tags.map((tag) => (
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
              <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700 uppercase">Quick actions</p>
              <div className="mt-5 space-y-3">
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  前往官网
                </a>
                {category ? (
                  <Link
                    href={`/category/${category.slug}`}
                    className="flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    查看同类工具
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700 uppercase">相关推荐</p>
              <div className="mt-5 grid gap-4">
                {relatedTools.map((relatedTool) => (
                  <ToolCard key={relatedTool.slug} tool={relatedTool} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
