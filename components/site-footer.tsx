export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/95">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 text-sm text-slate-400 sm:px-6 lg:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl space-y-3">
          <p className="text-base font-semibold text-white">AI Navigator</p>
          <p>
            一个原创的 AI 工具导航与灵感目录，帮助团队更快找到适合自己工作流的产品。
          </p>
          <p className="text-xs text-slate-500">
            本站为演示型目录站，不隶属于任何第三方产品，外链名称仅用于信息归类展示。
          </p>
        </div>

        <div className="grid gap-2 text-sm text-slate-400">
          <a href="#featured" className="transition hover:text-white">
            精选工具
          </a>
          <a href="#directory" className="transition hover:text-white">
            分类目录
          </a>
          <a href="#new" className="transition hover:text-white">
            最新上架
          </a>
        </div>
      </div>
    </footer>
  );
}
