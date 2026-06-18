export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

// html lang 属性值（注意 zh 用 BCP47 的 zh-CN）
export const htmlLang: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
};

// Open Graph locale 值
export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_CN",
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// 默认 locale(en) 无前缀；zh 加 /zh 前缀
export function localePath(lang: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (lang === defaultLocale) return clean || "/";
  return `/${lang}${clean}`;
}

// 供 metadata.alternates.languages 用的 hreflang 映射（相对路径）
export function alternateLanguages(path = "/"): Record<string, string> {
  return {
    en: localePath("en", path),
    "zh-CN": localePath("zh", path),
    "x-default": localePath("en", path),
  };
}
