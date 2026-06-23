"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath, type Locale } from "@/lib/i18n/config";
import { GoogleIcon } from "./google-icon";

export function LoginForm({
  lang,
  dict,
  nextPath,
  supabaseConfigured,
}: {
  lang: Locale;
  dict: Dictionary;
  nextPath: string;
  supabaseConfigured: boolean;
}) {
  const t = dict.auth;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    setError(null);
    if (!supabaseConfigured) {
      setError(t.configErrorDescription);
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(
        nextPath,
      )}`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (error) {
        setError(t.errorFailed);
      }
    } catch {
      setError(t.errorNetwork);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-900"
        >
          <p className="text-sm font-semibold">{t.errorFailed}</p>
          <p className="mt-1 text-xs text-rose-800/80">{error}</p>
        </div>
      )}

      <button
        onClick={signInWithGoogle}
        disabled={loading || !supabaseConfigured}
        className="inline-flex w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-4 text-base font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <GoogleIcon />
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>

      <p className="text-center text-xs text-slate-500">
        {t.privacyHint}{" "}
        <Link
          href={localePath(lang, "/privacy")}
          className="text-cyan-700 underline-offset-4 hover:underline"
        >
          {t.privacyLink}
        </Link>
        .
      </p>
    </div>
  );
}
