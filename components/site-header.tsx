import Link from "next/link";
import { Locale, localePath } from "@/lib/i18n/config";
import { Dictionary } from "@/lib/i18n/dictionaries";
import { LanguageSwitcher } from "@/components/language-switcher";

export function SiteHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.nav;
  const home = localePath(lang, "/");
  const navItems = [
    { label: t.home, href: home },
    { label: t.categories, href: `${home}#directory` },
    { label: t.featured, href: `${home}#featured` },
    { label: t.latest, href: `${home}#new` },
    { label: t.redGenerator, href: localePath(lang, "/tools/red-generator") },
    { label: t.videoDownloader, href: localePath(lang, "/tools/video-downloader") },
    { label: t.about, href: localePath(lang, "/about") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href={home} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 text-lg font-bold text-white shadow-lg shadow-cyan-500/20">
            AI
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.28em] text-cyan-300 uppercase">
              {t.brand}
            </p>
            <p className="text-sm text-slate-300">{t.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href={`${home}#directory`}
            className="hidden rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400/20 sm:inline-flex"
          >
            {t.explore}
          </Link>
        </div>
      </div>
    </header>
  );
}
