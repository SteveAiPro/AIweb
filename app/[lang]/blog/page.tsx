import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { OG_IMAGE, SITE_NAME, absoluteUrl, canonicalUrl } from "@/lib/site-config";
import { JsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { alternateLanguages, hasLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { posts } from "@/data/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  const t = dict.blog;

  return {
    title: t.title,
    description: t.subtitle,
    alternates: { canonical: canonicalUrl(lang, "/blog"), languages: alternateLanguages("/blog") },
    openGraph: {
      title: `${t.title} | ${SITE_NAME}`,
      description: t.subtitle,
      url: localePath(lang, "/blog"),
      images: OG_IMAGE,
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.blog;
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: t.title,
    url: absoluteUrl(localePath(lang, "/blog")),
    description: t.subtitle,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <JsonLd
        data={[
          listJsonLd,
          breadcrumbJsonLd(
            [
              { name: dict.nav.home, path: "/" },
              { name: t.title, path: "/blog" },
            ],
            lang,
          ),
        ]}
      />
      <SiteHeader lang={lang} dict={dict} />
      <main className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700 uppercase">Blog</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">{t.subtitle}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {sorted.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl"
            >
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="rounded-full bg-cyan-50 px-3 py-1 font-medium text-cyan-700">
                  {post.category}
                </span>
                <span>
                  {post.date} · {post.readingMinutes} {t.minRead}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-slate-950">{post.title[lang]}</h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{post.excerpt[lang]}</p>
              <Link
                href={localePath(lang, `/blog/${post.slug}`)}
                className="mt-5 text-sm font-semibold text-slate-900 transition hover:text-cyan-700"
              >
                {t.readMore} →
              </Link>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter lang={lang} dict={dict} />
    </div>
  );
}
