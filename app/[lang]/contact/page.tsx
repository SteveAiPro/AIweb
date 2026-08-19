import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CONTACT_EMAIL, OG_IMAGE, SITE_NAME, canonicalUrl } from "@/lib/site-config";
import { JsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
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
    title: dict.contact.title,
    description: dict.contact.intro,
    alternates: { canonical: canonicalUrl(lang, "/contact") },
    openGraph: {
      title: `${dict.contact.title} | ${SITE_NAME}`,
      description: dict.contact.intro,
      url: localePath(lang, "/contact"),
      images: OG_IMAGE,
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.contact;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <HreflangTags lang={lang} path="/contact" />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: dict.nav.home, path: "/" },
            { name: t.title, path: "/contact" },
          ],
          lang,
        )}
      />
      <SiteHeader lang={lang} dict={dict} />
      <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700 uppercase">{t.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-6 text-base leading-8 text-slate-600">{t.intro}</p>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            {t.emailLabel}
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-2 block text-lg font-semibold text-cyan-700 underline-offset-4 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="mt-1 text-sm text-slate-500">{t.emailHint}</p>
        </div>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">{t.noteTitle}</h2>
          <p className="text-base leading-8 text-slate-600">{t.noteBody}</p>
        </section>

        <div className="mt-12">
          <Link
            href={localePath(lang, "/")}
            className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-600"
          >
            {dict.about.backHome}
          </Link>
        </div>
      </main>
      <SiteFooter lang={lang} dict={dict} />
    </div>
  );
}
