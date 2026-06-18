import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CONTACT_EMAIL, OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site-config";
import { JsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
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
    title: dict.meta.aboutTitle,
    description: dict.meta.aboutDescription,
    alternates: { canonical: localePath(lang, "/about"), languages: alternateLanguages("/about") },
    openGraph: {
      title: `${dict.meta.aboutTitle} | ${SITE_NAME}`,
      description: dict.meta.aboutDescription,
      url: localePath(lang, "/about"),
      images: OG_IMAGE,
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.about;

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t.title,
    url: absoluteUrl(localePath(lang, "/about")),
    description: dict.meta.aboutDescription,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <JsonLd
        data={[
          aboutJsonLd,
          breadcrumbJsonLd(
            [
              { name: dict.nav.home, path: "/" },
              { name: t.title, path: "/about" },
            ],
            lang,
          ),
        ]}
      />
      <SiteHeader lang={lang} dict={dict} />
      <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700 uppercase">{t.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-6 text-base leading-8 text-slate-600">{t.intro}</p>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">{t.whatTitle}</h2>
          <p className="text-base leading-8 text-slate-600">{t.whatBody}</p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">{t.principlesTitle}</h2>
          <p className="text-base leading-8 text-slate-600">{t.principlesBody}</p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">{t.linksTitle}</h2>
          <p className="text-base leading-8 text-slate-600">{t.linksBody}</p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">{t.contactTitle}</h2>
          <p className="text-base leading-8 text-slate-600">
            {t.contactPrefix}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-cyan-700 underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            {t.contactSuffix}
          </p>
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href={localePath(lang, "/")}
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {t.backHome}
          </Link>
          <Link
            href={localePath(lang, "/privacy")}
            className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
          >
            {t.viewPrivacy}
          </Link>
        </div>
      </main>
      <SiteFooter lang={lang} dict={dict} />
    </div>
  );
}
