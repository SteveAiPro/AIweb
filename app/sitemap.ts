import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import { SITE_URL } from "@/lib/site-config";
import { localePath } from "@/lib/i18n/config";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
};

// 基于真实数据生成全量、多语言（en 无前缀 + zh /zh）sitemap，并标注 hreflang。
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: Entry[] = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/about", priority: 0.3, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    ...categories.map(
      (category): Entry => ({
        path: `/category/${category.slug}`,
        priority: 0.8,
        changeFrequency: "weekly",
      }),
    ),
    ...tools.map(
      (tool): Entry => ({
        path: `/tools/${tool.slug}`,
        priority: 0.7,
        changeFrequency: "weekly",
      }),
    ),
  ];

  return entries.flatMap(({ path, priority, changeFrequency }) => {
    const enUrl = `${SITE_URL}${localePath("en", path)}`;
    const zhUrl = `${SITE_URL}${localePath("zh", path)}`;

    return (["en", "zh"] as const).map((lang) => ({
      url: lang === "en" ? enUrl : zhUrl,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: enUrl,
          "zh-CN": zhUrl,
          "x-default": enUrl,
        },
      },
    }));
  });
}
