import { Category } from "@/data/categories";

type DirectoryShellProps = {
  categories: Category[];
  children: React.ReactNode;
};

export function DirectoryShell({ categories, children }: DirectoryShellProps) {
  return (
    <section id="directory" className="mx-auto flex w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:px-8">
      <aside className="hidden w-72 shrink-0 xl:block">
        <div className="sticky top-24 space-y-6">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold tracking-[0.18em] text-cyan-700 uppercase">
              Quick index
            </p>
            <h2 className="mt-3 text-lg font-semibold text-slate-950">分类速览</h2>
            <div className="mt-5 space-y-2">
              {categories.map((category) => (
                <a
                  key={category.slug}
                  href={`#section-${category.slug}`}
                  className="flex items-center justify-between rounded-2xl px-3 py-3 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">{category.icon}</span>
                    {category.name}
                  </span>
                  <span className="text-slate-300">→</span>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-lg shadow-slate-900/10">
            <p className="text-sm font-semibold tracking-[0.18em] text-cyan-300 uppercase">Browse tips</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              <li>先看精选与热门，再进入分类深挖。</li>
              <li>用关键词搜索能力词，比如“会议纪要”“代码审查”。</li>
              <li>进入详情页查看标签与相似工具，便于快速对比。</li>
            </ul>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1 space-y-10">{children}</div>
    </section>
  );
}
