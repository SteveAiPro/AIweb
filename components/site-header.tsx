import Link from "next/link";
import { Locale, localePath } from "@/lib/i18n/config";
import { Dictionary } from "@/lib/i18n/dictionaries";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/auth-redirect";

export async function SiteHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.nav;
  const a = dict.auth;
  const home = localePath(lang, "/");
  const navItems = [
    { label: t.home, href: home },
    { label: t.categories, href: `${home}#directory` },
    { label: t.featured, href: `${home}#featured` },
    { label: t.latest, href: `${home}#new` },
    { label: t.blog, href: localePath(lang, "/blog") },
    { label: t.about, href: localePath(lang, "/about") },
    { label: t.whitebg, href: "https://whitebg.app/", external: true },
  ];

  // Supabase 未配置时安全降级：不显示登录入口
  let userName: string | null = null;
  if (hasSupabaseConfig()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();
      console.log("[SiteHeader] getUser result:", {
        hasUser: !!data.user,
        email: data.user?.email,
        fullName: data.user?.user_metadata?.full_name,
        error: error?.message,
      });
      // 优先显示 Google OAuth 返回的全名，其次用邮箱
      userName =
        (data.user?.user_metadata?.full_name as string) ??
        data.user?.email ??
        null;
    } catch (err) {
      console.error("[SiteHeader] getUser threw:", err);
      userName = null;
    }
  } else {
    console.log("[SiteHeader] hasSupabaseConfig returned false");
  }

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
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <MobileNav
            items={navItems}
            loginHref={localePath(lang, "/login")}
            accountHref={localePath(lang, "/account")}
            signInLabel={a.signIn}
            signOutLabel={a.signOut}
            userName={userName}
          />
          <LanguageSwitcher />
          {userName ? (
            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href={localePath(lang, "/account")}
                className="max-w-[10rem] truncate text-sm text-slate-600 transition hover:text-slate-950"
                title={userName}
              >
                {userName}
              </Link>
              <form action="/auth/signout" method="post">
                <input type="hidden" name="next" value={home} />
                <button
                  type="submit"
                  className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  {a.signOut}
                </button>
              </form>
            </div>
          ) : (
            <Link
              href={localePath(lang, "/login")}
              className="hidden rounded-full border border-cyan-500 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100 lg:inline-flex"
            >
              {a.signIn}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
