import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import "../globals.css";
import { OG_IMAGE, SITE_KEYWORDS, SITE_NAME, SITE_URL } from "@/lib/site-config";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import {
  alternateLanguages,
  hasLocale,
  htmlLang,
  locales,
  localePath,
  ogLocale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

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
    metadataBase: new URL(SITE_URL),
    title: { default: dict.meta.siteTitle, template: `%s | ${SITE_NAME}` },
    description: dict.meta.siteDescription,
    keywords: SITE_KEYWORDS,
    applicationName: SITE_NAME,
    alternates: { canonical: localePath(lang, "/"), languages: alternateLanguages("/") },
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      url: localePath(lang, "/"),
      siteName: SITE_NAME,
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      images: OG_IMAGE,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      images: [`${SITE_URL}/og`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={htmlLang[lang]} className="h-full antialiased">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4117981861526348" />
        <Script
          id="adsbygoogle-init"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4117981861526348"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full bg-slate-50 font-sans text-slate-950">
        {children}
        <JsonLd data={[websiteJsonLd(lang, dict.meta.siteDescription), organizationJsonLd()]} />
      </body>
    </html>
  );
}
