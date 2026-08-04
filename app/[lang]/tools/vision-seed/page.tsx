import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug } from "@/lib/site-data";
import { OG_IMAGE, SITE_NAME, canonicalUrl } from "@/lib/site-config";
import { JsonLd, softwareApplicationJsonLd } from "@/lib/structured-data";
import { alternateLanguages, hasLocale, localePath, locales } from "@/lib/i18n/config";
import { VisionSeedClient } from "./vision-seed-client";

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
  const path = "/tools/vision-seed";

  return {
    title: "MkImage - Make Any Images Possible",
    description: "Make Any Images Possible. Generate AI images from a text prompt and browse the AI image prompt gallery.",
    alternates: {
      canonical: canonicalUrl(lang, path),
      languages: alternateLanguages(path),
    },
    openGraph: {
      title: `Vision Seed — AI Image Generator | ${SITE_NAME}`,
      description:
        "Create AI images from a text prompt. Pick a model, category, and aspect ratio, then generate concept art in one click.",
      url: localePath(lang, path),
      images: OG_IMAGE,
    },
  };
}

export default async function VisionSeedPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const tool = getToolBySlug("vision-seed");

  return (
    <>
      {tool ? <JsonLd data={softwareApplicationJsonLd(tool, lang)} /> : null}
      <VisionSeedClient />
    </>
  );
}
