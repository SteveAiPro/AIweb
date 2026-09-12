import Link from "next/link";
import { Locale, localePath } from "@/lib/i18n/config";
import { Dictionary } from "@/lib/i18n/dictionaries";
import { LanguageSwitcher } from "@/components/language-switcher";
import { HeaderAuth } from "@/components/header-auth";

export function SiteHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.nav;
  const a = dict.auth;
  const home = localePath(lang, "/");
  const navItems = [
    { label: t.home, href: home },
    { label: t.categories, href: `${home}#directory` },
    { label: t.featured, href: `${home}#featured` },
    { label: t.blog, href: localePath(lang, "/blog") },
    { label: t.about, href: localePath(lang, "/about") },
    { label: t.contact, href: localePath(lang, "/contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href={home} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 text-lg font-bold text-white shadow-lg shadow-cyan-500/20">
            AI
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.28em] text-cyan-700 uppercase">
              {t.brand}
            </p>
            <p className="text-sm text-slate-500">{t.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <HeaderAuth
            items={navItems}
            loginHref={localePath(lang, "/login")}
            accountHref={localePath(lang, "/account")}
            signInLabel={a.signIn}
            signOutLabel={a.signOut}
            home={home}
          >
            <LanguageSwitcher />
          </HeaderAuth>
        </div>
      </div>
    </header>
  );
}
