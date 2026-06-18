import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CONTACT_EMAIL, SITE_NAME, absoluteUrl } from "@/lib/site-config";
import { JsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

const DESCRIPTION = "了解 AI Navigator 的定位、AI 工具收录原则，以及外链与商标说明。";

export const metadata: Metadata = {
  title: "关于本站",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `关于本站 | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: "/about",
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `关于 ${SITE_NAME}`,
  url: absoluteUrl("/about"),
  description: DESCRIPTION,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <JsonLd
        data={[
          aboutJsonLd,
          breadcrumbJsonLd([
            { name: "首页", path: "/" },
            { name: "关于本站", path: "/about" },
          ]),
        ]}
      />
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700 uppercase">
          About
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          关于 {SITE_NAME}
        </h1>
        <p className="mt-6 text-base leading-8 text-slate-600">
          {SITE_NAME} 是一个原创的 AI 工具导航与灵感目录，按分类、标签和场景帮助你快速发现值得尝试的
          AI 产品，更高效地搭建属于自己的 AI 工具箱。
        </p>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">我们做什么</h2>
          <p className="text-base leading-8 text-slate-600">
            我们整理并分类常见的 AI
            工具，覆盖聊天助理、图像设计、视频创作、效率办公、开发平台与音频处理等方向；同时提供站内自研的实用工具，例如「小红书爆款生成器」，方便你即开即用。
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">收录原则</h2>
          <p className="text-base leading-8 text-slate-600">
            我们以「是否容易上手」「是否契合团队或个人的真实使用场景」为主要考量来组织内容，并持续维护精选、热门与最新上架，帮助你在海量选择中更快建立候选名单。
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">关于外链与商标</h2>
          <p className="text-base leading-8 text-slate-600">
            本站为独立的目录站，不隶属于任何第三方产品。站内出现的产品名称、商标与外链归各自所有者所有，仅用于信息归类与展示。如果你是相关产品方，希望调整信息或下架链接，欢迎与我们联系。
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">联系我们</h2>
          <p className="text-base leading-8 text-slate-600">
            合作、纠错或建议，请发送邮件至{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-cyan-700 underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            。
          </p>
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/"
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            返回首页浏览工具
          </Link>
          <Link
            href="/privacy"
            className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
          >
            查看隐私政策
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
