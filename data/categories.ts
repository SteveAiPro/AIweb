type LocalizedText = { en: string; zh: string };

export type Category = {
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  icon: string;
  accent: string;
};

export const categories: Category[] = [
  {
    slug: "chatbots",
    name: { en: "AI Chat", zh: "AI 对话" },
    description: {
      zh: "通用对话、个人助理与工作流协同工具。",
      en: "General chat, personal assistants, and workflow collaboration tools.",
    },
    icon: "💬",
    accent: "from-sky-500 to-cyan-400",
  },
  {
    slug: "image",
    name: { en: "Image & Design", zh: "图像与设计" },
    description: {
      zh: "图片生成、平面设计、品牌素材与视觉灵感。",
      en: "Image generation, graphic design, brand assets, and visual inspiration.",
    },
    icon: "🎨",
    accent: "from-fuchsia-500 to-pink-400",
  },
  {
    slug: "video",
    name: { en: "Video", zh: "视频" },
    description: {
      zh: "视频生成、剪辑增强、数字人和广告素材。",
      en: "Video generation, editing enhancement, digital humans, and ad creatives.",
    },
    icon: "🎬",
    accent: "from-violet-500 to-indigo-400",
  },
  {
    slug: "productivity",
    name: { en: "Productivity", zh: "效率办公" },
    description: {
      zh: "写作、会议纪要、文档助手与自动化协作。",
      en: "Writing, meeting notes, document assistants, and automation.",
    },
    icon: "⚡",
    accent: "from-amber-500 to-orange-400",
  },
  {
    slug: "developer",
    name: { en: "Developer", zh: "开发者" },
    description: {
      zh: "代码生成、调试、测试与 API/Agent 开发平台。",
      en: "Code generation, debugging, testing, and API/agent dev platforms.",
    },
    icon: "🧠",
    accent: "from-emerald-500 to-teal-400",
  },
  {
    slug: "audio",
    name: { en: "Audio", zh: "音频" },
    description: {
      zh: "语音生成、转录、配音和播客创作。",
      en: "Voice generation, transcription, voiceover, and podcast creation.",
    },
    icon: "🎧",
    accent: "from-rose-500 to-red-400",
  },
];

export const categoryMap = new Map(categories.map((category) => [category.slug, category]));
