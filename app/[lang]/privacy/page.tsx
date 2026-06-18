import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CONTACT_EMAIL, OG_IMAGE, SITE_NAME } from "@/lib/site-config";
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
    title: dict.meta.privacyTitle,
    description: dict.meta.privacyDescription,
    alternates: { canonical: localePath(lang, "/privacy"), languages: alternateLanguages("/privacy") },
    openGraph: {
      title: `${dict.meta.privacyTitle} | ${SITE_NAME}`,
      description: dict.meta.privacyDescription,
      url: localePath(lang, "/privacy"),
      images: OG_IMAGE,
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.privacy;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: dict.nav.home, path: "/" },
            { name: t.title, path: "/privacy" },
          ],
          lang,
        )}
      />
      <SiteHeader lang={lang} dict={dict} />
      <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700 uppercase">{t.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-4 text-sm text-slate-500">{t.updated}</p>
        <p className="mt-6 text-base leading-8 text-slate-600">{t.intro}</p>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">{t.s1Title}</h2>
          <ul className="list-disc space-y-2 pl-5 text-base leading-8 text-slate-600">
            <li>
              <span className="font-medium text-slate-800">{t.s1LogTitle}</span>
              {t.s1LogBody}
            </li>
            <li>
              <span className="font-medium text-slate-800">{t.s1NoAccountTitle}</span>
              {t.s1NoAccountBody}
            </li>
          </ul>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">{t.s2Title}</h2>
          <p className="text-base leading-8 text-slate-600">
            {t.s2Body1Prefix}
            <Link
              href={localePath(lang, "/tools/red-generator")}
              className="font-medium text-cyan-700 underline-offset-4 hover:underline"
            >
              {t.s2ToolName}
            </Link>
            {t.s2Body1Mid}
          </p>
          <p className="text-base leading-8 text-slate-600">{t.s2Body2}</p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">{t.s3Title}</h2>
          <p className="text-base leading-8 text-slate-600">{t.s3Body}</p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">{t.s4Title}</h2>
          <p className="text-base leading-8 text-slate-600">{t.s4Body}</p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">{t.s5Title}</h2>
          <p className="text-base leading-8 text-slate-600">{t.s5Body}</p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">{t.s6Title}</h2>
          <p className="text-base leading-8 text-slate-600">
            {t.s6Prefix}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-cyan-700 underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            {t.s6Suffix}
          </p>
        </section>
      </main>
      <SiteFooter lang={lang} dict={dict} />
    </div>
  );
}
