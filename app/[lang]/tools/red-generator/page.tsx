import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug } from "@/lib/site-data";
import { OG_IMAGE, SITE_NAME } from "@/lib/site-config";
import { JsonLd, softwareApplicationJsonLd } from "@/lib/structured-data";
import { alternateLanguages, hasLocale, localePath, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { RedGeneratorClient } from "./red-generator-client";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);

  return {
    title: dict.meta.redGeneratorTitle,
    description: dict.meta.redGeneratorDescription,
    alternates: {
      canonical: localePath(lang, "/tools/red-generator"),
      languages: alternateLanguages("/tools/red-generator"),
    },
    openGraph: {
      title: `${dict.meta.redGeneratorTitle} | ${SITE_NAME}`,
      description: dict.meta.redGeneratorDescription,
      url: localePath(lang, "/tools/red-generator"),
      images: OG_IMAGE,
    },
  };
}

export default async function RedGeneratorPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const tool = getToolBySlug("red-generator");

  return (
    <>
      {tool ? <JsonLd data={softwareApplicationJsonLd(tool, lang)} /> : null}
      <RedGeneratorClient t={dict.redGenerator} />
    </>
  );
}
