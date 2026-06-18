"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// 在 en（无前缀）与 zh（/zh 前缀）之间切换，保留当前子路径。
export function LanguageSwitcher() {
  const raw = usePathname() || "/";
  // 归一化：去掉可能存在的 /en 前缀（rewrite 边界情况的防御）
  const withoutEn = raw.replace(/^\/en(?=\/|$)/, "") || "/";
  const isZh = withoutEn === "/zh" || withoutEn.startsWith("/zh/");
  // 去掉 locale 前缀后的纯路径
  const basePath = isZh ? withoutEn.replace(/^\/zh(?=\/|$)/, "") || "/" : withoutEn;

  const enHref = basePath;
  const zhHref = basePath === "/" ? "/zh" : `/zh${basePath}`;

  const active = "rounded-full bg-white/15 px-2.5 py-1 font-semibold text-white";
  const inactive = "rounded-full px-2.5 py-1 text-slate-400 transition hover:text-white";

  return (
    <div className="flex items-center rounded-full border border-white/15 p-0.5 text-xs">
      <Link href={enHref} className={!isZh ? active : inactive} aria-label="Switch to English">
        EN
      </Link>
      <Link href={zhHref} className={isZh ? active : inactive} aria-label="切换到中文">
        中文
      </Link>
    </div>
  );
}
