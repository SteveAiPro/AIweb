import Link from "next/link";
import { Category } from "@/data/categories";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900 p-6 text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className={`absolute inset-0 opacity-80 bg-linear-to-br ${category.accent}`} />
            <div className="absolute inset-0 bg-slate-950/55" />
            <div className="relative space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur">
                {category.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="mt-2 text-sm leading-7 text-white/80">{category.description}</p>
              </div>
              <div className="text-sm font-medium text-cyan-100 transition group-hover:text-white">
                浏览本类工具 →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
