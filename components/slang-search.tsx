"use client";

import { useMemo, useState } from "react";
import type { SlangEntry, SlangCategory } from "@/data/xianyu-slang";

type Labels = {
  placeholder: string;
  count: string;
  countUnit: string;
  noResult: string;
};

const CATEGORIES: { id: SlangCategory; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "trading", label: "砍价与交易" },
  { id: "hardware", label: "手机数码" },
  { id: "ai", label: "AI与会员" },
  { id: "anime", label: "谷圈二次元" },
  { id: "gaming", label: "游戏主机" },
  { id: "fashion", label: "潮牌美妆" },
  { id: "security", label: "防封暗语" },
];

export function SlangSearch({ entries, labels }: { entries: SlangEntry[]; labels: Labels }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<SlangCategory>("all");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      // 类别筛选
      if (activeCategory !== "all" && e.category !== activeCategory) {
        return false;
      }
      // 文本搜索
      if (!q) return true;
      if (e.name.toLowerCase().includes(q)) return true;
      return e.aliases.some((a) => a.toLowerCase().includes(q));
    });
  }, [entries, query, activeCategory]);

  const handleCopy = (alias: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(alias);
      setCopiedText(alias);
      setTimeout(() => setCopiedText(null), 1800);
    }
  };

  return (
    <div>
      {/* 搜索框与分类标签 */}
      <div className="sticky top-20 z-10 -mx-1 mb-6 bg-white/95 px-1 py-3 backdrop-blur">
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
            placeholder={labels.placeholder || "搜索商品或黑话（如：Claude、大刀、卡贴机、谷子）..."}
            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none shadow-xs transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>

        {/* 分类筛选 Chips */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-between px-1 text-xs text-slate-400">
          <p>
            {labels.count} {filtered.length} {labels.countUnit}
          </p>
          <p className="hidden sm:block text-[11px] text-slate-400">
            💡 点击暗号标签可一键复制去闲鱼搜索
          </p>
        </div>
      </div>

      {/* 结果表格 */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-12 text-center text-sm text-slate-500">
          <p className="font-medium text-slate-700">{labels.noResult}</p>
          <p className="mt-1 text-xs text-slate-400">尝试输入其他关键词，或切换至「全部」分类</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100">
              {filtered.map((row) => (
                <tr key={row.name} className="align-top transition hover:bg-slate-50/60">
                  <td className="w-36 shrink-0 whitespace-nowrap px-4 py-3.5 font-medium text-slate-950 sm:w-48">
                    <div className="flex flex-col gap-0.5">
                      <span>{row.name}</span>
                      {row.category && (
                        <span className="text-[10px] text-slate-400 font-normal">
                          {CATEGORIES.find((c) => c.id === row.category)?.label}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-2">
                      {row.aliases.map((a) => {
                        const isCopied = copiedText === a;
                        return (
                          <button
                            key={a}
                            type="button"
                            onClick={() => handleCopy(a)}
                            title="点击复制该暗号"
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs transition cursor-pointer ${
                              isCopied
                                ? "bg-emerald-500 text-white font-medium shadow-xs"
                                : "bg-slate-100 text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 hover:ring-1 hover:ring-cyan-300"
                            }`}
                          >
                            <span>{a}</span>
                            {isCopied && <span className="text-[10px]">✓ 已复制</span>}
                          </button>
                        );
                      })}
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
