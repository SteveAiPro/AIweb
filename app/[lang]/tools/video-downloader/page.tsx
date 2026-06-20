import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getToolBySlug } from "@/lib/site-data";
import { OG_IMAGE, SITE_NAME } from "@/lib/site-config";
import { JsonLd, faqPageJsonLd, softwareApplicationJsonLd } from "@/lib/structured-data";
import { alternateLanguages, hasLocale, localePath, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { VideoDownloaderClient } from "./video-downloader-client";

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
    title: dict.meta.videoDownloaderTitle,
    description: dict.meta.videoDownloaderDescription,
    alternates: {
      canonical: localePath(lang, "/tools/video-downloader"),
      languages: alternateLanguages("/tools/video-downloader"),
    },
    openGraph: {
      title: `${dict.meta.videoDownloaderTitle} | ${SITE_NAME}`,
      description: dict.meta.videoDownloaderDescription,
      url: localePath(lang, "/tools/video-downloader"),
      images: OG_IMAGE,
    },
  };
}

export default async function VideoDownloaderPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const tool = getToolBySlug("video-downloader");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <JsonLd
        data={[
          ...(tool ? [softwareApplicationJsonLd(tool, lang)] : []),
          faqPageJsonLd(dict.videoDownloader.faqs),
        ]}
      />
      <SiteHeader lang={lang} dict={dict} />
      <VideoDownloaderClient t={dict.videoDownloader} />
      <SiteFooter lang={lang} dict={dict} />
    </div>
  );
}
