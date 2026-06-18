import Link from "next/link";
import { SITE_NAME } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950/95">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 text-sm text-slate-400 sm:px-6 lg:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md space-y-3">
          <p className="text-base font-semibold text-white">{SITE_NAME}</p>
          <p>
            一个原创的 AI 工具导航与灵感目录，帮助团队更快找到适合自己工作流的产品。
          </p>
          <p className="text-xs text-slate-500">
            本站为独立目录站，不隶属于任何第三方产品，外链名称与商标归各自所有者所有，仅用于信息归类展示。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-2">
          <div className="grid content-start gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              浏览
            </p>
            <Link href="/#featured" className="transition hover:text-white">
              精选工具
            </Link>
            <Link href="/#directory" className="transition hover:text-white">
              分类目录
            </Link>
            <Link href="/#new" className="transition hover:text-white">
              最新上架
            </Link>
            <Link href="/tools/red-generator" className="transition hover:text-white">
              小红书生成器
            </Link>
          </div>
          <div className="grid content-start gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              站点
            </p>
            <Link href="/about" className="transition hover:text-white">
              关于本站
            </Link>
            <Link href="/privacy" className="transition hover:text-white">
              隐私政策
            </Link>
            <a href="/sitemap.xml" className="transition hover:text-white">
              网站地图
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto w-full max-w-7xl px-4 py-5 text-xs text-slate-500 sm:px-6 lg:px-8">
          © {year} {SITE_NAME}. 保留所有权利。
        </div>
      </div>
    </footer>
  );
}
