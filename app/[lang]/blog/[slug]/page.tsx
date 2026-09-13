import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { OG_IMAGE, SITE_NAME, absoluteUrl, canonicalUrl } from "@/lib/site-config";
import { JsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { HreflangTags } from "@/components/hreflang-tags";
import { hasLocale, localePath, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getPostBySlug, posts, type BlogBlock } from "@/data/blog";
import { tools } from "@/data/tools";

// 工具 slug → 工具对象。文章底部的「相关工具」靠它解析。
const toolMap = new Map(tools.map((tool) => [tool.slug, tool]));

export function generateStaticParams() {
  return locales.flatMap((lang) => posts.map((post) => ({ lang, slug: post.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };

  return {
    title: post.title[lang],
    description: post.excerpt[lang],
    alternates: {
      canonical: canonicalUrl(lang, `/blog/${post.slug}`),
    },
    openGraph: {
      title: `${post.title[lang]} | ${SITE_NAME}`,
      description: post.excerpt[lang],
      url: localePath(lang, `/blog/${post.slug}`),
      type: "article",
      images: OG_IMAGE,
    },
  };
}

function Block({ block, lang }: { block: BlogBlock; lang: "en" | "zh" }) {
  switch (block.type) {
    case "p":
      return <p className="text-base leading-8 text-slate-700">{block.text[lang]}</p>;
    case "h2":
      return <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">{block.text[lang]}</h2>;
    case "h3":
      return <h3 className="mt-4 text-xl font-semibold text-slate-950">{block.text[lang]}</h3>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-5 text-base leading-8 text-slate-700">
          {block.items.map((item, i) => (
            <li key={i}>{item[lang]}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-5 text-base leading-8 text-slate-700">
          {block.items.map((item, i) => (
            <li key={i}>{item[lang]}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-cyan-400 bg-cyan-50/50 px-4 py-3 text-base italic leading-8 text-slate-700">
          {block.text[lang]}
        </blockquote>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const dict = getDictionary(lang);
  const t = dict.blog;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[lang],
    description: post.excerpt[lang],
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: lang,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: absoluteUrl(localePath(lang, `/blog/${post.slug}`)),
  };

  // 相关阅读：优先同分类，其余按日期由新到旧补齐。
  // 原先只按数组顺序取前两篇，导致全站每篇文章底部都指向同样两篇最老的帖子，与当前内容无关。
  const byDateDesc = (a: (typeof posts)[number], b: (typeof posts)[number]) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
  const related = [
    ...posts.filter((p) => p.slug !== post.slug && p.category === post.category).sort(byDateDesc),
    ...posts.filter((p) => p.slug !== post.slug && p.category !== post.category).sort(byDateDesc),
  ].slice(0, 2);

  // 相关工具：把文章权重导向对应的工具详情页（如闲鱼黑话的 6 篇文章都指向 /tools/xianyu-slang）
  const relatedTools = (post.relatedTools ?? [])
    .map((slug) => toolMap.get(slug))
    .filter((tool): tool is (typeof tools)[number] => Boolean(tool));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <HreflangTags lang={lang} path={`/blog/${post.slug}`} />
      <JsonLd
        data={[
          articleJsonLd,
          breadcrumbJsonLd(
            [
              { name: dict.nav.home, path: "/" },
              { name: t.title, path: "/blog" },
              { name: post.title[lang], path: `/blog/${post.slug}` },
            ],
            lang,
          ),
        ]}
      />
      <SiteHeader lang={lang} dict={dict} />
      <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="rounded-full bg-cyan-50 px-3 py-1 font-medium text-cyan-700">{post.category}</span>
          <span>
            {t.publishedOn} {post.date} · {post.readingMinutes} {t.minRead}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {post.title[lang]}
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          {t.by} {post.author}
        </p>

        <article className="mt-8 space-y-6">
          {post.content.map((block, i) => (
            <Block key={i} block={block} lang={lang} />
          ))}
        </article>

        {related.length > 0 && (
          <section className="mt-14 border-t border-slate-200 pt-10">
            <h2 className="text-lg font-semibold text-slate-950">{t.relatedTitle}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={localePath(lang, `/blog/${r.slug}`)}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-cyan-200 hover:shadow-md"
                >
                  <p className="text-sm font-medium text-slate-950">{r.title[lang]}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{r.excerpt[lang]}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {relatedTools.length > 0 && (
          <section className="mt-14 border-t border-slate-200 pt-10">
            <h2 className="text-lg font-semibold text-slate-950">{t.relatedToolsTitle}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={localePath(lang, `/tools/${tool.slug}`)}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-cyan-200 hover:shadow-md"
                >
                  <p className="text-sm font-medium text-slate-950">{tool.name}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{tool.summary[lang]}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12">
          <Link
            href={localePath(lang, "/blog")}
            className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white"
          >
            ← {t.backToBlog}
          </Link>
        </div>
      </main>
      <SiteFooter lang={lang} dict={dict} />
    </div>
  );
}
