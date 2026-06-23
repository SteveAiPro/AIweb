"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath, type Locale } from "@/lib/i18n/config";

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
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const value = email.trim();
    if (!value) {
      setError(t.errorEmpty);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError(t.errorInvalid);
      return;
    }
    if (!supabaseConfigured) {
      setError(t.configErrorDescription);
      return;
    }

    setPending(true);
    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(
        nextPath,
      )}`;
      const { error } = await supabase.auth.signInWithOtp({
        email: value,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) {
        setError(t.errorFailed);
        return;
      }
      setSent(true);
    } catch {
      setError(t.errorNetwork);
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
        <p className="text-sm font-medium">{t.linkSent}</p>
        <p className="mt-2 text-xs leading-6 text-emerald-800/80">{t.linkSentDescription}</p>
        <p className="mt-2 break-all text-xs text-emerald-800/80">{email}</p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setError(null);
          }}
          className="mt-4 text-xs font-semibold text-emerald-900 underline-offset-4 hover:underline"
        >
          {t.useAnotherEmail}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-800">
          {t.emailLabel}
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
          disabled={pending || !supabaseConfigured}
          className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
        />
      </div>

      {error && (
        <p className="text-sm font-medium text-rose-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || !supabaseConfigured}
        className="inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? t.sending : t.sendLink}
      </button>

      <p className="text-xs text-slate-500">
        {t.privacyHint}{" "}
        <Link
          href={localePath(lang, "/privacy")}
          className="text-cyan-700 underline-offset-4 hover:underline"
        >
          {t.privacyLink}
        </Link>
        .
      </p>
    </form>
  );
}
