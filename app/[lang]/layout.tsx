import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { OG_IMAGE, SITE_KEYWORDS, SITE_NAME, SITE_URL, canonicalUrl } from "@/lib/site-config";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { FloatingBackToTop } from "@/components/floating-back-to-top";
import {
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
    alternates: { canonical: canonicalUrl(lang, "/") },
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
    <html lang={htmlLang[lang]} data-scroll-behavior="smooth" className="h-full antialiased">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4117981861526348" />
        {/*
          直接用原生 <script>，不用 next/script。
          原因：next/script 会给标签注入 data-nscript 属性，AdSense 自身脚本会报
          "AdSense head tag doesn't support data-nscript attribute."
          这不影响广告加载，但会污染控制台；原生标签与 Google 官方给的代码片段一致。
        */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4117981861526348"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full bg-slate-50 font-sans text-slate-950">
        {children}
        <FloatingBackToTop />
        <JsonLd data={[websiteJsonLd(lang, dict.meta.siteDescription), organizationJsonLd()]} />
      </body>
    </html>
  );
}
