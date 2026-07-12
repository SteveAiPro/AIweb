"use client";

import { useMemo, useState } from "react";
import type { SlangEntry } from "@/data/xianyu-slang";

type Labels = {
  placeholder: string;
  count: string;
  countUnit: string;
  noResult: string;
};

export function SlangSearch({ entries, labels }: { entries: SlangEntry[]; labels: Labels }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((e) => {
      if (e.name.toLowerCase().includes(q)) return true;
      return e.aliases.some((a) => a.toLowerCase().includes(q));
    });
  }, [entries, query]);

  return (
    <div>
      <div className="sticky top-20 z-10 -mx-1 mb-4 bg-white/95 px-1 py-2 backdrop-blur">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.placeholder}
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
        <p className="mt-2 px-1 text-xs text-slate-400">
          {labels.count} {filtered.length} {labels.countUnit}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          {labels.noResult}
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-100">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100">
              {filtered.map((row) => (
                <tr key={row.name} className="align-top">
                  <td className="w-32 shrink-0 whitespace-nowrap px-4 py-3 font-medium text-slate-950 sm:w-44">
                    {row.name}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {row.aliases.map((a) => (
                        <span key={a} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                          {a}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
