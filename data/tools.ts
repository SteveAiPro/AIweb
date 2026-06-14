import { categories } from "@/data/categories";

export type Tool = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  website: string;
  category: (typeof categories)[number]["slug"];
  tags: string[];
  pricing: "免费" | "免费增值" | "付费";
  featured?: boolean;
  popular?: boolean;
  isNew?: boolean;
  score: string;
};

export const tools: Tool[] = [
  {
    slug: "red-generator",
    name: "小红书爆款生成器",
    summary: "输入主题即可生成小红书爆款图文方案，包含封面设计、标题、正文和话题标签。",
    description:
      "基于 AI 技术的小红书内容生成工具，支持流式输出。输入产品或主题即可自动生成封面设计方案、爆款标题、KOC 风格正文和 SEO 话题标签，适合内容创作者和运营团队快速产出种草文案。",
    website: "/tools/red-generator",
    category: "productivity",
    tags: ["小红书", "文案生成", "内容创作"],
    pricing: "免费",
    featured: true,
    isNew: true,
    score: "9.4",
  },
  {
    slug: "nova-chat",
    name: "Nova Chat",
    summary: "面向团队协作的多模型 AI 助手，适合知识问答与工作台整合。",
    description:
      "Nova Chat 提供统一的工作入口，支持知识库问答、文件总结、团队共享提示词与常见流程模板，适合内容团队和运营团队日常使用。",
    website: "https://example.com/nova-chat",
    category: "chatbots",
    tags: ["知识库", "多模型", "团队协作"],
    pricing: "免费增值",
    featured: true,
    popular: true,
    score: "9.6",
  },
  {
    slug: "pixel-bloom",
    name: "Pixel Bloom",
    summary: "专注品牌视觉与社媒封面的 AI 设计工具。",
    description:
      "Pixel Bloom 内置风格预设、品牌色板和文案排版建议，可快速生成海报、社媒封面和活动 KV 草案。",
    website: "https://example.com/pixel-bloom",
    category: "image",
    tags: ["海报", "品牌设计", "社媒"],
    pricing: "免费增值",
    featured: true,
    score: "9.4",
  },
  {
    slug: "clipforge",
    name: "ClipForge",
    summary: "将脚本快速转为短视频，适合投放素材和内容分发。",
    description:
      "ClipForge 支持从脚本生成镜头拆分、素材建议、字幕与配音，适合短视频团队快速验证内容方向。",
    website: "https://example.com/clipforge",
    category: "video",
    tags: ["短视频", "配音", "字幕"],
    pricing: "付费",
    popular: true,
    score: "9.2",
  },
  {
    slug: "flownote-ai",
    name: "FlowNote AI",
    summary: "会议纪要、待办提取和文档草稿一站式整理。",
    description:
      "FlowNote AI 可从会议录音、访谈记录或网页素材中提炼行动项，自动生成摘要和执行清单。",
    website: "https://example.com/flownote-ai",
    category: "productivity",
    tags: ["会议纪要", "摘要", "待办"],
    pricing: "免费增值",
    featured: true,
    isNew: true,
    score: "9.5",
  },
  {
    slug: "agent-dock",
    name: "Agent Dock",
    summary: "为开发者准备的 Agent、RAG 和工具调用实验台。",
    description:
      "Agent Dock 面向 AI 应用开发，提供日志追踪、提示词实验、工具调用面板和简单评测能力。",
    website: "https://example.com/agent-dock",
    category: "developer",
    tags: ["Agent", "RAG", "开发平台"],
    pricing: "付费",
    featured: true,
    popular: true,
    score: "9.7",
  },
  {
    slug: "echo-studio",
    name: "Echo Studio",
    summary: "高拟真中文配音和播客后期增强工具。",
    description:
      "Echo Studio 支持多角色配音、情绪控制、降噪和音频修复，适合播客、课程和宣传片制作。",
    website: "https://example.com/echo-studio",
    category: "audio",
    tags: ["配音", "音频修复", "播客"],
    pricing: "免费增值",
    score: "9.1",
  },
  {
    slug: "briefly",
    name: "Briefly",
    summary: "帮助市场团队快速生成 campaign brief 与创意方向。",
    description:
      "Briefly 针对品牌传播、活动策划和内容日历场景，能够生成 campaign brief、素材建议和多渠道改写内容。",
    website: "https://example.com/briefly",
    category: "productivity",
    tags: ["营销", "Campaign", "创意策划"],
    pricing: "免费",
    score: "8.9",
  },
  {
    slug: "vision-seed",
    name: "Vision Seed",
    summary: "适合灵感探索的图像生成器，支持多风格参考图。",
    description:
      "Vision Seed 强调灵感探索与参考图混合，适合插画师、创意策划和品牌视觉团队建立 moodboard。",
    website: "https://example.com/vision-seed",
    category: "image",
    tags: ["插画", "灵感板", "参考图"],
    pricing: "免费",
    isNew: true,
    score: "9.0",
  },
  {
    slug: "stackpilot",
    name: "StackPilot",
    summary: "代码理解、单测生成与 PR 辅助审查工具。",
    description:
      "StackPilot 可以分析仓库结构、理解上下文并生成测试建议，适合中小型研发团队提升交付效率。",
    website: "https://example.com/stackpilot",
    category: "developer",
    tags: ["代码审查", "测试", "开发效率"],
    pricing: "免费增值",
    score: "9.3",
  },
  {
    slug: "spark-voice",
    name: "Spark Voice",
    summary: "适合客服与销售团队的实时语音转录和话术建议平台。",
    description:
      "Spark Voice 提供实时转录、情绪识别和标准话术建议，可用于客服质检与销售复盘。",
    website: "https://example.com/spark-voice",
    category: "audio",
    tags: ["转录", "客服", "销售"],
    pricing: "付费",
    popular: true,
    score: "8.8",
  },
  {
    slug: "orbit-assist",
    name: "Orbit Assist",
    summary: "聚焦个人效率的 AI 工作助理，集成日历、邮件和任务。",
    description:
      "Orbit Assist 能整理邮件、生成回复建议、安排日程并输出周报，适合个人工作流管理。",
    website: "https://example.com/orbit-assist",
    category: "chatbots",
    tags: ["邮件", "日历", "个人助理"],
    pricing: "免费增值",
    score: "9.1",
  },
  {
    slug: "reelcraft",
    name: "ReelCraft",
    summary: "适合品牌内容团队的长视频切片与多平台分发助手。",
    description:
      "ReelCraft 能识别高光片段、自动排版字幕并生成多平台标题建议，提高视频分发效率。",
    website: "https://example.com/reelcraft",
    category: "video",
    tags: ["切片", "分发", "字幕"],
    pricing: "免费增值",
    isNew: true,
    score: "9.0",
  },
];

export const featuredTools = tools.filter((tool) => tool.featured);
export const popularTools = tools.filter((tool) => tool.popular);
export const newTools = tools.filter((tool) => tool.isNew);
