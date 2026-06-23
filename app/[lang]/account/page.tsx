import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { OG_IMAGE, SITE_NAME } from "@/lib/site-config";
import { alternateLanguages, hasLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/auth-redirect";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);

  return {
    title: dict.account.accountTitle,
    description: dict.account.accountDescription,
    alternates: { canonical: localePath(lang, "/account"), languages: alternateLanguages("/account") },
    openGraph: {
      title: `${dict.account.accountTitle} | ${SITE_NAME}`,
      description: dict.account.accountDescription,
      url: localePath(lang, "/account"),
      images: OG_IMAGE,
    },
    robots: { index: false, follow: false },
  };
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.account;
  const accountPath = localePath(lang, "/account");
  const loginPath = `${localePath(lang, "/login")}?next=${encodeURIComponent(accountPath)}`;

  if (!hasSupabaseConfig()) {
    redirect(`${loginPath}&error=not-configured`);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(loginPath);
  }

  // 格式化时间
  const lastSignIn = user.last_sign_in_at
    ? new Date(user.last_sign_in_at).toLocaleString(lang === "zh" ? "zh-CN" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : t.unknown;

  const createdAt = user.created_at
    ? new Date(user.created_at).toLocaleString(lang === "zh" ? "zh-CN" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : t.unknown;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <SiteHeader lang={lang} dict={dict} />
      <main className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700 uppercase">
          {t.accountEyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{t.accountHeading}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">{t.accountSubheading}</p>

        <div className="mt-8 space-y-6">
          {/* 基本信息 */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">{t.basicInfo}</h2>
            <div className="mt-4 space-y-4">
              <div className="flex flex-col gap-1 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-slate-600">{t.emailLabel}</span>
                <span className="break-all text-sm font-medium text-slate-900">{user.email}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-600">{t.accountStatus}</span>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
                  {t.statusActive}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-600">{t.createdAt}</span>
                <span className="text-sm text-slate-900">{createdAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{t.lastSignIn}</span>
                <span className="text-sm text-slate-900">{lastSignIn}</span>
              </div>
            </div>
          </div>

          {/* 安全设置 */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">{t.security}</h2>
            <p className="mt-2 text-sm text-slate-600">{t.securityHint}</p>
            <div className="mt-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-sm text-slate-600">{t.authMethod}</span>
              <span className="text-sm text-slate-900">{t.magicLink}</span>
            </div>
          </div>

          {/* 登出 */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">{t.actions}</h2>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-slate-600">{t.signOutHint}</span>
              <form action="/auth/signout" method="post">
                <input type="hidden" name="next" value={localePath(lang, "/")} />
                <button
                  type="submit"
                  className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100"
                >
                  {dict.auth.signOut}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href={localePath(lang, "/")}
            className="text-sm font-medium text-slate-500 transition hover:text-slate-800"
          >
            ← {t.backHome}
          </Link>
        </div>
      </main>
      <SiteFooter lang={lang} dict={dict} />
    </div>
  );
}
