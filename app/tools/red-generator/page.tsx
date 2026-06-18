import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/site-data";
import { SITE_NAME } from "@/lib/site-config";
import { JsonLd, softwareApplicationJsonLd } from "@/lib/structured-data";
import { RedGeneratorClient } from "./red-generator-client";

const TITLE = "小红书爆款生成器";
const DESCRIPTION =
  "输入主题即可生成小红书爆款图文方案，包含封面设计、爆款标题、KOC 风格正文和话题标签，适合内容创作者和运营团队快速产出种草文案。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/red-generator" },
  openGraph: {
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: "/tools/red-generator",
  },
};

export default function RedGeneratorPage() {
  const tool = getToolBySlug("red-generator");

  return (
    <>
      {tool ? <JsonLd data={softwareApplicationJsonLd(tool)} /> : null}
      <RedGeneratorClient />
    </>
  );
}
