"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function stripLangPrefix(path: string) {
  if (path === "/en" || path.startsWith("/en/")) {
    return path.replace(/^\/en(?=\/|$)/, "") || "/";
  }
  if (path === "/zh" || path.startsWith("/zh/")) {
    return path.replace(/^\/zh(?=\/|$)/, "") || "/";
  }
  return path;
}

export function LanguageSwitcher() {
  const raw = usePathname() || "/";
  const isEn = raw === "/en" || raw.startsWith("/en/");
  const basePath = stripLangPrefix(raw);

  const zhHref = basePath;
  const enHref = basePath === "/" ? "/en" : `/en${basePath}`;

  const active = "rounded-full bg-cyan-100 px-2.5 py-1 font-semibold text-cyan-800";
  const inactive = "rounded-full px-2.5 py-1 text-slate-500 transition hover:text-slate-900";

  return (
    <div className="flex items-center rounded-full border border-slate-200 p-0.5 text-xs">
      <Link href={enHref} className={isEn ? active : inactive} aria-label="Switch to English">
        EN
      </Link>
      <Link href={zhHref} className={!isEn ? active : inactive} aria-label="切换到中文">
        中文
      </Link>
    </div>
  );
}
