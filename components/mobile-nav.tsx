"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type NavItem = { label: string; href: string; external?: boolean };

type MobileNavProps = {
  items: NavItem[];
  loginHref: string;
  accountHref: string;
  signInLabel: string;
  signOutLabel: string;
  userName: string | null;
};

export function MobileNav({
  items,
  loginHref,
  accountHref,
  signInLabel,
  signOutLabel,
  userName,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative lg:hidden" ref={ref}>
      <button
        type="button"
        aria-label="打开菜单"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
          {items.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-cyan-700"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-cyan-700"
              >
                {item.label}
              </Link>
            ),
          )}

          <div className="my-2 border-t border-slate-100" />

          {userName ? (
            <>
              <Link
                href={accountHref}
                onClick={() => setOpen(false)}
                className="block truncate rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-cyan-700"
                title={userName}
              >
                {userName}
              </Link>
              <form action="/auth/signout" method="post">
                <input type="hidden" name="next" value={loginHref} />
                <button
                  type="submit"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-cyan-700"
                >
                  {signOutLabel}
                </button>
              </form>
            </>
          ) : (
            <Link
              href={loginHref}
              onClick={() => setOpen(false)}
              className="block rounded-xl bg-cyan-50 px-4 py-3 text-center text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100"
            >
              {signInLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
