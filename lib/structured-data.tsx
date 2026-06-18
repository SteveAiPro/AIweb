import { Category } from "@/data/categories";
import { Tool } from "@/data/tools";
import { SITE_NAME, SITE_URL, absoluteUrl } from "./site-config";
import { Locale, htmlLang, localePath } from "./i18n/config";

// 在 Server Component 中直接渲染结构化数据脚本（Next 官方推荐方式）。
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify 的输出仅来自本站可信数据，可安全注入。
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function websiteJsonLd(lang: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl(localePath(lang, "/")),
    description,
    inLanguage: htmlLang[lang],
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/icon"),
  };
}

export function softwareApplicationJsonLd(tool: Tool, lang: Locale) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.summary[lang],
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: absoluteUrl(localePath(lang, `/tools/${tool.slug}`)),
    keywords: tool.tags[lang].join(", "),
  };

  // 仅对真正免费的工具声明价格，避免编造定价/评分数据。
  if (tool.pricing === "free") {
    data.offers = { "@type": "Offer", price: "0", priceCurrency: "CNY" };
  }

  return data;
}

export function collectionPageJsonLd(category: Category, tools: Tool[], lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name[lang]} - ${SITE_NAME}`,
    description: category.description[lang],
    url: absoluteUrl(localePath(lang, `/category/${category.slug}`)),
    inLanguage: htmlLang[lang],
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(localePath(lang, `/tools/${tool.slug}`)),
        name: tool.name,
      })),
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  lang: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localePath(lang, item.path)),
    })),
  };
}
