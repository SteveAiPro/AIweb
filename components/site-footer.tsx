import Link from "next/link";
import { SITE_NAME } from "@/lib/site-config";
import { Locale, localePath } from "@/lib/i18n/config";
import { Dictionary } from "@/lib/i18n/dictionaries";

export function SiteFooter({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.footer;
  const home = localePath(lang, "/");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 text-sm text-slate-600 sm:px-6 lg:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md space-y-3">
          <p className="text-base font-semibold text-slate-950">{SITE_NAME}</p>
          <p>{t.description}</p>
          <p className="text-xs text-slate-500">{t.disclaimer}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-2">
          <div className="grid content-start gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {t.browse}
            </p>
            <Link href={`${home}#featured`} className="transition hover:text-cyan-700">
              {t.featured}
            </Link>
            <Link href={`${home}#directory`} className="transition hover:text-cyan-700">
              {t.categories}
            </Link>
            <Link href={`${home}#new`} className="transition hover:text-cyan-700">
              {t.latest}
            </Link>
            <Link href={localePath(lang, "/blog")} className="transition hover:text-cyan-700">
              {t.blog}
            </Link>
          </div>
          <div className="grid content-start gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {t.site}
            </p>
            <Link href={localePath(lang, "/about")} className="transition hover:text-cyan-700">
              {t.about}
            </Link>
            <Link href={localePath(lang, "/contact")} className="transition hover:text-cyan-700">
              {t.contact}
            </Link>
            <Link href={localePath(lang, "/privacy")} className="transition hover:text-cyan-700">
              {t.privacy}
            </Link>
            <a href="/sitemap.xml" className="transition hover:text-cyan-700">
              {t.sitemap}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <div className="mx-auto w-full max-w-7xl px-4 py-5 text-xs text-slate-500 sm:px-6 lg:px-8">
          © {year} {SITE_NAME}. {t.rights}
        </div>
      </div>
    </footer>
  );
}
