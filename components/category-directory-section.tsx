import Link from "next/link";
import { Category } from "@/data/categories";
import { Tool } from "@/data/tools";
import { ToolCard } from "@/components/tool-card";

type CategoryDirectorySectionProps = {
  category: Category;
  tools: Tool[];
};

export function CategoryDirectorySection({ category, tools }: CategoryDirectorySectionProps) {
  return (
    <section
      id={`section-${category.slug}`}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_80px_-35px_rgba(15,23,42,0.25)] lg:p-8"
    >
      <div className="flex flex-col gap-5 border-b border-slate-100 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-linear-to-br ${category.accent} text-3xl text-white shadow-lg`}
          >
            {category.icon}
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold tracking-[0.18em] text-cyan-700 uppercase">
              Category shelf
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{category.name}</h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {category.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-center">
            <p className="text-2xl font-semibold text-slate-950">{tools.length}</p>
            <p className="text-xs text-slate-500">收录工具</p>
          </div>
          <Link
            href={`/category/${category.slug}`}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            查看全部
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {tools.slice(0, 6).map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
