export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  accent: string;
};

export const categories: Category[] = [
  {
    slug: "chatbots",
    name: "AI Chat",
    description: "通用对话、个人助理与工作流协同工具。",
    icon: "💬",
    accent: "from-sky-500 to-cyan-400",
  },
  {
    slug: "image",
    name: "Image & Design",
    description: "图片生成、平面设计、品牌素材与视觉灵感。",
    icon: "🎨",
    accent: "from-fuchsia-500 to-pink-400",
  },
  {
    slug: "video",
    name: "Video",
    description: "视频生成、剪辑增强、数字人和广告素材。",
    icon: "🎬",
    accent: "from-violet-500 to-indigo-400",
  },
  {
    slug: "productivity",
    name: "Productivity",
    description: "写作、会议纪要、文档助手与自动化协作。",
    icon: "⚡",
    accent: "from-amber-500 to-orange-400",
  },
  {
    slug: "developer",
    name: "Developer",
    description: "代码生成、调试、测试与 API/Agent 开发平台。",
    icon: "🧠",
    accent: "from-emerald-500 to-teal-400",
  },
  {
    slug: "audio",
    name: "Audio",
    description: "语音生成、转录、配音和播客创作。",
    icon: "🎧",
    accent: "from-rose-500 to-red-400",
  },
];

export const categoryMap = new Map(categories.map((category) => [category.slug, category]));
