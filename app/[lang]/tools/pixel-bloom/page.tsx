import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug } from "@/lib/site-data";
import { OG_IMAGE, SITE_NAME } from "@/lib/site-config";
import { JsonLd, softwareApplicationJsonLd } from "@/lib/structured-data";
import { alternateLanguages, hasLocale, localePath, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PixelBloomClient } from "./pixel-bloom-client";

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
    title: dict.meta.pixelBloomTitle,
    description: dict.meta.pixelBloomDescription,
    alternates: {
      canonical: localePath(lang, "/tools/pixel-bloom"),
      languages: alternateLanguages("/tools/pixel-bloom"),
    },
    openGraph: {
      title: `${dict.meta.pixelBloomTitle} | ${SITE_NAME}`,
      description: dict.meta.pixelBloomDescription,
      url: localePath(lang, "/tools/pixel-bloom"),
      images: OG_IMAGE,
    },
  };
}

export default async function PixelBloomPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const tool = getToolBySlug("pixel-bloom");

  return (
    <>
      {tool ? <JsonLd data={softwareApplicationJsonLd(tool, lang)} /> : null}
      <PixelBloomClient t={dict.pixelBloom} />
    </>
  );
}
