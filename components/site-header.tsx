import Link from "next/link";

const navItems = [
  { label: "首页", href: "/" },
  { label: "热门分类", href: "#categories" },
  { label: "精选工具", href: "#featured" },
  { label: "最新上架", href: "#new" },
  { label: "小红书生成器", href: "/tools/red-generator" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 text-lg font-bold text-white shadow-lg shadow-cyan-500/20">
            AI
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.28em] text-cyan-300 uppercase">
              AI Navigator
            </p>
            <p className="text-sm text-slate-300">发现值得尝试的 AI 工具</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#directory"
          className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400/20"
        >
          立即探索
        </a>
      </div>
    </header>
  );
}
