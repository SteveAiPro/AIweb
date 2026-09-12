"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { hasSupabaseConfig } from "@/lib/auth-redirect";
import { createClient } from "@/lib/supabase/client";

type NavItem = { label: string; href: string; external?: boolean };

export function HeaderAuth({
  items,
  loginHref,
  accountHref,
  signInLabel,
  signOutLabel,
  home,
  children,
}: {
  items: NavItem[];
  loginHref: string;
  accountHref: string;
  signInLabel: string;
  signOutLabel: string;
  home: string;
  children?: React.ReactNode;
}) {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (!hasSupabaseConfig()) return;

    const supabase = createClient();
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUserName(
        (data.user?.user_metadata?.full_name as string | undefined) ?? data.user?.email ?? null,
      );
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      setUserName((user?.user_metadata?.full_name as string | undefined) ?? user?.email ?? null);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <MobileNav
        items={items}
        loginHref={loginHref}
        accountHref={accountHref}
        signInLabel={signInLabel}
        signOutLabel={signOutLabel}
        userName={userName}
      />
      {children}
      {userName ? (
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={accountHref}
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
              {signOutLabel}
            </button>
          </form>
        </div>
      ) : (
        <Link
          href={loginHref}
          className="hidden rounded-full border border-cyan-500 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100 lg:inline-flex"
        >
          {signInLabel}
        </Link>
      )}
    </>
  );
}
