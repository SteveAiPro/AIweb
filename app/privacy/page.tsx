import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site-config";
import { JsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

const DESCRIPTION =
  "AI Navigator 的隐私政策：我们如何处理访问数据、Cookie，以及小红书生成器涉及的第三方 AI 数据处理。";

export const metadata: Metadata = {
  title: "隐私政策",
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `隐私政策 | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首页", path: "/" },
          { name: "隐私政策", path: "/privacy" },
        ])}
      />
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700 uppercase">
          Privacy
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">隐私政策</h1>
        <p className="mt-4 text-sm text-slate-500">最后更新：2026 年 6 月</p>
        <p className="mt-6 text-base leading-8 text-slate-600">
          我们重视你的隐私。{SITE_NAME}{" "}
          是一个 AI 工具导航站，整体上无需注册、不主动收集可识别你个人身份的信息。请在使用本站前阅读以下说明。
        </p>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">1. 我们收集的信息</h2>
          <ul className="list-disc space-y-2 pl-5 text-base leading-8 text-slate-600">
            <li>
              <span className="font-medium text-slate-800">访问日志：</span>
              服务器或第三方基础设施可能记录 IP
              地址、浏览器类型、访问时间与访问页面等常规技术日志，仅用于保障安全与统计访问情况。
            </li>
            <li>
              <span className="font-medium text-slate-800">无账户体系：</span>
              本站不提供注册登录，不收集姓名、电话、住址等个人身份信息。
            </li>
          </ul>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">
            2. 小红书生成器与第三方 AI 处理
          </h2>
          <p className="text-base leading-8 text-slate-600">
            当你使用站内「小红书爆款生成器」时，你填写的<strong>主题</strong>与<strong>补充信息</strong>
            会通过我们的服务端转发给第三方大模型 API（默认为 DeepSeek，或运营方配置的其他 OpenAI
            兼容供应商），用于实时生成文案结果。
          </p>
          <p className="text-base leading-8 text-slate-600">
            这些内容仅用于生成当次结果，本站不会将其写入数据库长期保存；但第三方 AI
            供应商会按其自身的隐私政策处理相应数据。因此，请<strong>不要</strong>在输入中提交敏感个人信息、账号密码或商业机密。
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">3. Cookie 与本地存储</h2>
          <p className="text-base leading-8 text-slate-600">
            本站核心浏览功能不依赖登录态 Cookie。若后续接入第三方统计或广告服务，可能使用 Cookie
            或类似技术，你可以随时在浏览器设置中清除或禁用它们。
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">4. 第三方链接</h2>
          <p className="text-base leading-8 text-slate-600">
            站内指向第三方产品官网的外部链接，其内容与隐私实践由对应的第三方负责，不在本政策约束范围内，本站亦不对其承担责任。
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">5. 政策更新</h2>
          <p className="text-base leading-8 text-slate-600">
            我们可能不时更新本隐私政策，更新内容将在本页公示，重大变更会同步调整页面顶部的更新日期。
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">6. 联系我们</h2>
          <p className="text-base leading-8 text-slate-600">
            如对本隐私政策有任何疑问，请发送邮件至{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-cyan-700 underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            。
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
