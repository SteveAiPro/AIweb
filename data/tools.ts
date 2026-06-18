import { categories } from "@/data/categories";

type LocalizedText = { en: string; zh: string };
type LocalizedTags = { en: string[]; zh: string[] };

export type Tool = {
  slug: string;
  name: string;
  summary: LocalizedText;
  description: LocalizedText;
  website: string;
  category: (typeof categories)[number]["slug"];
  tags: LocalizedTags;
  pricing: "free" | "freemium" | "paid";
  featured?: boolean;
  popular?: boolean;
  isNew?: boolean;
  score: string;
};

export const tools: Tool[] = [
  {
    slug: "red-generator",
    name: "小红书爆款生成器",
    summary: {
      zh: "输入主题即可生成小红书爆款图文方案，包含封面设计、标题、正文和话题标签。",
      en: "Generate a complete Xiaohongshu post plan from a topic — cover design, headlines, body copy, and topic tags.",
    },
    description: {
      zh: "基于 AI 技术的小红书内容生成工具，支持流式输出。输入产品或主题即可自动生成封面设计方案、爆款标题、KOC 风格正文和 SEO 话题标签，适合内容创作者和运营团队快速产出种草文案。",
      en: "An AI-powered Xiaohongshu content generator with streaming output. Enter a product or topic to auto-generate cover design, viral headlines, KOC-style body copy, and SEO topic tags — built for creators and operations teams to ship posts fast.",
    },
    website: "/tools/red-generator",
    category: "productivity",
    tags: {
      zh: ["小红书", "文案生成", "内容创作"],
      en: ["Xiaohongshu", "Copywriting", "Content creation"],
    },
    pricing: "free",
    featured: true,
    isNew: true,
    score: "9.4",
  },
  {
    slug: "nova-chat",
    name: "Nova Chat",
    summary: {
      zh: "面向团队协作的多模型 AI 助手，适合知识问答与工作台整合。",
      en: "A multi-model AI assistant for team collaboration, great for knowledge Q&A and workspace integration.",
    },
    description: {
      zh: "Nova Chat 提供统一的工作入口，支持知识库问答、文件总结、团队共享提示词与常见流程模板，适合内容团队和运营团队日常使用。",
      en: "Nova Chat offers a unified workspace with knowledge-base Q&A, file summarization, shared team prompts, and common workflow templates — ideal for content and operations teams.",
    },
    website: "https://example.com/nova-chat",
    category: "chatbots",
    tags: {
      zh: ["知识库", "多模型", "团队协作"],
      en: ["Knowledge base", "Multi-model", "Team collaboration"],
    },
    pricing: "freemium",
    featured: true,
    popular: true,
    score: "9.6",
  },
  {
    slug: "pixel-bloom",
    name: "Pixel Bloom",
    summary: {
      zh: "专注品牌视觉与社媒封面的 AI 设计工具。",
      en: "An AI design tool focused on brand visuals and social media covers.",
    },
    description: {
      zh: "Pixel Bloom 内置风格预设、品牌色板和文案排版建议，可快速生成海报、社媒封面和活动 KV 草案。",
      en: "Pixel Bloom ships with style presets, brand palettes, and layout suggestions to quickly produce posters, social covers, and campaign key-visual drafts.",
    },
    website: "https://example.com/pixel-bloom",
    category: "image",
    tags: {
      zh: ["海报", "品牌设计", "社媒"],
      en: ["Posters", "Brand design", "Social media"],
    },
    pricing: "freemium",
    featured: true,
    score: "9.4",
  },
  {
    slug: "clipforge",
    name: "ClipForge",
    summary: {
      zh: "将脚本快速转为短视频，适合投放素材和内容分发。",
      en: "Turn scripts into short videos fast — ideal for ad creatives and content distribution.",
    },
    description: {
      zh: "ClipForge 支持从脚本生成镜头拆分、素材建议、字幕与配音，适合短视频团队快速验证内容方向。",
      en: "ClipForge generates shot breakdowns, footage suggestions, subtitles, and voiceover from a script, helping short-video teams validate directions quickly.",
    },
    website: "https://example.com/clipforge",
    category: "video",
    tags: {
      zh: ["短视频", "配音", "字幕"],
      en: ["Short video", "Voiceover", "Subtitles"],
    },
    pricing: "paid",
    popular: true,
    score: "9.2",
  },
  {
    slug: "flownote-ai",
    name: "FlowNote AI",
    summary: {
      zh: "会议纪要、待办提取和文档草稿一站式整理。",
      en: "Meeting notes, action-item extraction, and document drafts in one place.",
    },
    description: {
      zh: "FlowNote AI 可从会议录音、访谈记录或网页素材中提炼行动项，自动生成摘要和执行清单。",
      en: "FlowNote AI distills action items from meeting recordings, interview transcripts, or web sources, and auto-generates summaries and to-do checklists.",
    },
    website: "https://example.com/flownote-ai",
    category: "productivity",
    tags: {
      zh: ["会议纪要", "摘要", "待办"],
      en: ["Meeting notes", "Summaries", "To-dos"],
    },
    pricing: "freemium",
    featured: true,
    isNew: true,
    score: "9.5",
  },
  {
    slug: "agent-dock",
    name: "Agent Dock",
    summary: {
      zh: "为开发者准备的 Agent、RAG 和工具调用实验台。",
      en: "An experimentation bench for developers building agents, RAG, and tool calling.",
    },
    description: {
      zh: "Agent Dock 面向 AI 应用开发，提供日志追踪、提示词实验、工具调用面板和简单评测能力。",
      en: "Agent Dock targets AI app development with trace logging, prompt experiments, a tool-calling panel, and lightweight evaluation.",
    },
    website: "https://example.com/agent-dock",
    category: "developer",
    tags: {
      zh: ["Agent", "RAG", "开发平台"],
      en: ["Agent", "RAG", "Dev platform"],
    },
    pricing: "paid",
    featured: true,
    popular: true,
    score: "9.7",
  },
  {
    slug: "echo-studio",
    name: "Echo Studio",
    summary: {
      zh: "高拟真中文配音和播客后期增强工具。",
      en: "High-fidelity Chinese voiceover and podcast post-production enhancement.",
    },
    description: {
      zh: "Echo Studio 支持多角色配音、情绪控制、降噪和音频修复，适合播客、课程和宣传片制作。",
      en: "Echo Studio supports multi-character voiceover, emotion control, noise reduction, and audio repair — great for podcasts, courses, and promo videos.",
    },
    website: "https://example.com/echo-studio",
    category: "audio",
    tags: {
      zh: ["配音", "音频修复", "播客"],
      en: ["Voiceover", "Audio repair", "Podcast"],
    },
    pricing: "freemium",
    score: "9.1",
  },
  {
    slug: "briefly",
    name: "Briefly",
    summary: {
      zh: "帮助市场团队快速生成 campaign brief 与创意方向。",
      en: "Helps marketing teams quickly generate campaign briefs and creative directions.",
    },
    description: {
      zh: "Briefly 针对品牌传播、活动策划和内容日历场景，能够生成 campaign brief、素材建议和多渠道改写内容。",
      en: "Briefly targets brand communications, campaign planning, and content calendars — generating briefs, asset suggestions, and multi-channel copy rewrites.",
    },
    website: "https://example.com/briefly",
    category: "productivity",
    tags: {
      zh: ["营销", "Campaign", "创意策划"],
      en: ["Marketing", "Campaign", "Creative planning"],
    },
    pricing: "free",
    score: "8.9",
  },
  {
    slug: "vision-seed",
    name: "Vision Seed",
    summary: {
      zh: "适合灵感探索的图像生成器，支持多风格参考图。",
      en: "An image generator for inspiration exploration with multi-style reference images.",
    },
    description: {
      zh: "Vision Seed 强调灵感探索与参考图混合，适合插画师、创意策划和品牌视觉团队建立 moodboard。",
      en: "Vision Seed emphasizes inspiration exploration and reference-image blending, ideal for illustrators, creatives, and brand teams building moodboards.",
    },
    website: "https://example.com/vision-seed",
    category: "image",
    tags: {
      zh: ["插画", "灵感板", "参考图"],
      en: ["Illustration", "Moodboard", "Reference images"],
    },
    pricing: "free",
    isNew: true,
    score: "9.0",
  },
  {
    slug: "stackpilot",
    name: "StackPilot",
    summary: {
      zh: "代码理解、单测生成与 PR 辅助审查工具。",
      en: "Code comprehension, unit-test generation, and PR review assistance.",
    },
    description: {
      zh: "StackPilot 可以分析仓库结构、理解上下文并生成测试建议，适合中小型研发团队提升交付效率。",
      en: "StackPilot analyzes repository structure, understands context, and generates test suggestions — helping small and mid-size engineering teams ship faster.",
    },
    website: "https://example.com/stackpilot",
    category: "developer",
    tags: {
      zh: ["代码审查", "测试", "开发效率"],
      en: ["Code review", "Testing", "Dev productivity"],
    },
    pricing: "freemium",
    score: "9.3",
  },
  {
    slug: "spark-voice",
    name: "Spark Voice",
    summary: {
      zh: "适合客服与销售团队的实时语音转录和话术建议平台。",
      en: "Real-time voice transcription and talk-track suggestions for support and sales teams.",
    },
    description: {
      zh: "Spark Voice 提供实时转录、情绪识别和标准话术建议，可用于客服质检与销售复盘。",
      en: "Spark Voice provides real-time transcription, emotion detection, and standard talk-track suggestions for support QA and sales reviews.",
    },
    website: "https://example.com/spark-voice",
    category: "audio",
    tags: {
      zh: ["转录", "客服", "销售"],
      en: ["Transcription", "Support", "Sales"],
    },
    pricing: "paid",
    popular: true,
    score: "8.8",
  },
  {
    slug: "orbit-assist",
    name: "Orbit Assist",
    summary: {
      zh: "聚焦个人效率的 AI 工作助理，集成日历、邮件和任务。",
      en: "A personal-productivity AI assistant integrating calendar, email, and tasks.",
    },
    description: {
      zh: "Orbit Assist 能整理邮件、生成回复建议、安排日程并输出周报，适合个人工作流管理。",
      en: "Orbit Assist organizes email, drafts reply suggestions, schedules your calendar, and produces weekly reports for personal workflow management.",
    },
    website: "https://example.com/orbit-assist",
    category: "chatbots",
    tags: {
      zh: ["邮件", "日历", "个人助理"],
      en: ["Email", "Calendar", "Personal assistant"],
    },
    pricing: "freemium",
    score: "9.1",
  },
  {
    slug: "reelcraft",
    name: "ReelCraft",
    summary: {
      zh: "适合品牌内容团队的长视频切片与多平台分发助手。",
      en: "Long-video clipping and multi-platform distribution for brand content teams.",
    },
    description: {
      zh: "ReelCraft 能识别高光片段、自动排版字幕并生成多平台标题建议，提高视频分发效率。",
      en: "ReelCraft detects highlight clips, auto-formats subtitles, and generates multi-platform title suggestions to boost distribution efficiency.",
    },
    website: "https://example.com/reelcraft",
    category: "video",
    tags: {
      zh: ["切片", "分发", "字幕"],
      en: ["Clipping", "Distribution", "Subtitles"],
    },
    pricing: "freemium",
    isNew: true,
    score: "9.0",
  },
];

export const featuredTools = tools.filter((tool) => tool.featured);
export const popularTools = tools.filter((tool) => tool.popular);
export const newTools = tools.filter((tool) => tool.isNew);
