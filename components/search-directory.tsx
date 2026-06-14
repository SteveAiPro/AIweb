"use client";

import { useMemo, useState } from "react";
import { Category } from "@/data/categories";
import { Tool } from "@/data/tools";
import { cn } from "@/lib/cn";
import { ToolCard } from "@/components/tool-card";

type SearchDirectoryProps = {
  tools: Tool[];
  categories: Category[];
};

export function SearchDirectory({ tools, categories }: SearchDirectoryProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
      const haystack = [tool.name, tool.summary, tool.description, ...tool.tags].join(" ").toLowerCase();
      const matchesQuery = !query.trim() || haystack.includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query, tools]);

  return (
    <section id="directory" className="w-full">
      <div className="flex flex-col gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_120px_-40px_rgba(15,23,42,0.35)] lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <span className="text-sm font-semibold tracking-[0.2em] text-cyan-700 uppercase">
              Explore directory
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              按分类和关键词快速找到合适工具
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              先按分类粗筛，再用关键词搜索具体能力。适合内容团队、产品经理、设计师与开发者快速建立工具候选清单。
            </p>
          </div>

          <div className="w-full max-w-xl">
            <label className="block text-sm font-medium text-slate-700" htmlFor="tool-search">
              搜索工具、能力或标签
            </label>
            <input
              id="tool-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例如：会议纪要、代码审查、短视频、知识库"
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3" id="categories">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              activeCategory === "all"
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
            )}
          >
            全部分类
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setActiveCategory(category.slug)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                activeCategory === category.slug
                  ? "border-cyan-500 bg-cyan-500 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
              )}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <p>找到 {filteredTools.length} 个结果</p>
          {(query || activeCategory !== "all") && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("all");
              }}
              className="font-medium text-cyan-700 transition hover:text-cyan-800"
            >
              清空筛选
            </button>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        {!filteredTools.length && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
            没有找到符合条件的工具，试试更宽泛的关键词或切换其他分类。
          </div>
        )}
      </div>
    </section>
  );
}
