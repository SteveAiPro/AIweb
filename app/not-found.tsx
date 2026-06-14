import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center backdrop-blur">
        <p className="text-sm font-semibold tracking-[0.2em] text-cyan-300 uppercase">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">页面不存在</h1>
        <p className="mt-4 text-base leading-8 text-slate-300">
          你访问的页面可能已经被移除，或者链接暂时不可用。返回首页继续浏览 AI 工具目录。
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
