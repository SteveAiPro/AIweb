import { Category, categoryMap } from "@/data/categories";
import { Tool } from "@/data/tools";
import {
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "./site-config";

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

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: SITE_LOCALE,
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

export function softwareApplicationJsonLd(tool: Tool) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.summary,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: absoluteUrl(`/tools/${tool.slug}`),
    keywords: tool.tags.join(", "),
  };

  // 仅对真正免费的工具声明价格，避免编造定价/评分数据。
  if (tool.pricing === "免费") {
    data.offers = { "@type": "Offer", price: "0", priceCurrency: "CNY" };
  }

  return data;
}

export function collectionPageJsonLd(category: Category, tools: Tool[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} - ${SITE_NAME}`,
    description: category.description,
    url: absoluteUrl(`/category/${category.slug}`),
    inLanguage: SITE_LOCALE,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/tools/${tool.slug}`),
        name: tool.name,
      })),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

// 提供一个统一的分类名查询，供面包屑等复用。
export function categoryName(slug: string) {
  return categoryMap.get(slug)?.name ?? slug;
}
