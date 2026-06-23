import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { OG_IMAGE, SITE_NAME } from "@/lib/site-config";
import { alternateLanguages, hasLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { createClient } from "@/lib/supabase/server";
import { getSafeAuthNext, hasSupabaseConfig } from "@/lib/auth-redirect";
import { LoginForm } from "./login-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);

  return {
    title: dict.auth.loginTitle,
    description: dict.auth.loginDescription,
    alternates: { canonical: localePath(lang, "/login"), languages: alternateLanguages("/login") },
    openGraph: {
      title: `${dict.auth.loginTitle} | ${SITE_NAME}`,
      description: dict.auth.loginDescription,
      url: localePath(lang, "/login"),
      images: OG_IMAGE,
    },
    robots: { index: false, follow: false },
  };
}

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { error: errorCode, next } = await searchParams;
  const dict = getDictionary(lang);
  const t = dict.auth;
  const nextPath = getSafeAuthNext(next, lang);
  const supabaseConfigured = hasSupabaseConfig();

  if (supabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect(nextPath);
  }

  const callbackError = errorCode === "auth-callback";
  const configError = errorCode === "not-configured" || !supabaseConfigured;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <SiteHeader lang={lang} dict={dict} />
      <main className="mx-auto w-full max-w-md px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700 uppercase">
          {t.loginEyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{t.loginHeading}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">{t.loginSubheading}</p>

        {callbackError && (
          <div
            role="alert"
            className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-900"
          >
            <p className="text-sm font-semibold">{t.callbackErrorTitle}</p>
            <p className="mt-1 text-xs text-rose-800/80">{t.callbackErrorDescription}</p>
          </div>
        )}

        {configError && (
          <div
            role="alert"
            className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950"
          >
            <p className="text-sm font-semibold">{t.configErrorTitle}</p>
            <p className="mt-1 text-xs text-amber-900/80">{t.configErrorDescription}</p>
          </div>
        )}

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <LoginForm
            lang={lang}
            dict={dict}
            nextPath={nextPath}
            supabaseConfigured={supabaseConfigured}
          />
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
