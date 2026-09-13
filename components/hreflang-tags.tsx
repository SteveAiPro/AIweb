import { absoluteUrl } from "@/lib/site-config";
import { localePath, type Locale } from "@/lib/i18n/config";

type HreflangTagsProps = {
  lang: Locale;
  path?: string;
};

// 手工输出标准小写 hreflang 标签。
// 说明：Next 内置 metadata 与 JSX 的 hrefLang 属性都会被 React 原样渲染成驼峰 hrefLang；
// 为输出严格小写 hreflang（HTML 大小写不敏感、Google 同样识别，但部分审计工具要求小写），
// 这里用 dangerouslySetInnerHTML 直接注入原始小写标签。各页面改用本组件后，metadata 中不再设置 languages 以免重复。
//
// 注意：两个语言的 URL 都由 path 推导得出，不需要 lang。props 里保留 lang 只是为了
// 让调用方保持一致的传参形状（14 处调用点），这里刻意不解构，避免引入未使用变量。
export function HreflangTags({ path = "/" }: HreflangTagsProps) {
  const zhUrl = absoluteUrl(localePath("zh", path));
  const enUrl = absoluteUrl(localePath("en", path));

  const html = [
    `<link rel="alternate" hreflang="en" href="${enUrl}" />`,
    `<link rel="alternate" hreflang="zh-CN" href="${zhUrl}" />`,
    `<link rel="alternate" hreflang="x-default" href="${zhUrl}" />`,
  ].join("");

  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}
