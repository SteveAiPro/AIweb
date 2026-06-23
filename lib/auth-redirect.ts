import { localePath, type Locale } from "@/lib/i18n/config";

export function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function getSafeAuthNext(value: string | null | undefined, lang?: Locale) {
  const fallback = lang ? localePath(lang, "/") : "/";
  if (!value) return fallback;

  const next = value.trim();
  if (!next.startsWith("/") || next.startsWith("//")) return fallback;
  if (next.startsWith("/auth/") || next === "/auth") return fallback;
  if (next === "/login" || next.startsWith("/login?")) return fallback;
  if (next === "/zh/login" || next.startsWith("/zh/login?")) return fallback;

  return next;
}

export function getLoginPathForNext(next: string) {
  return next === "/zh" || next.startsWith("/zh/") ? "/zh/login" : "/login";
}
