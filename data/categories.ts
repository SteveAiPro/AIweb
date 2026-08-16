type LocalizedText = { en: string; zh: string };

export type Category = {
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  icon: string;
  accent: string;
};

// 出海 / 独立开发者向分类体系（参考独立掘金网颗粒度，剔除翻墙与账号倒卖类）。
export const categories: Category[] = [
  {
    slug: "demand",
    name: { en: "Demand Research", zh: "需求挖掘" },
    description: {
      zh: "找需求、找词、找站；用流量情报和真实盈利案例挖掘可复制的增长机会。",
      en: "Find demand, keywords, and sites — mine replicable growth ideas from traffic intelligence and real revenue cases.",
    },
    icon: "🔍",
    accent: "from-sky-500 to-cyan-400",
  },
  {
    slug: "games",
    name: { en: "Game Sites", zh: "游戏站" },
    description: {
      zh: "独立游戏发布平台与免费在线游戏，适合做流量站和变现参考。",
      en: "Indie game platforms and free online games — good for traffic sites and monetization references.",
    },
    icon: "🎮",
    accent: "from-fuchsia-500 to-pink-400",
  },
  {
    slug: "saas-showcase",
    name: { en: "SaaS Showcases", zh: "SaaS 案例展示" },
    description: {
      zh: "用主流 SaaS 模板真实建出来的产品集合，看别人怎么落地。",
      en: "Real products built with popular SaaS templates — see how others ship.",
    },
    icon: "🖥️",
    accent: "from-violet-500 to-indigo-400",
  },
  {
    slug: "ai-image",
    name: { en: "AI Image", zh: "AI 图片生成与编辑" },
    description: {
      zh: "文生图、自然语言修图、参考图与风格迁移等图像创作工具。",
      en: "Text-to-image, natural-language editing, reference images, and style transfer.",
    },
    icon: "🎨",
    accent: "from-pink-500 to-rose-400",
  },
  {
    slug: "ai-video",
    name: { en: "AI Video", zh: "AI 视频生成与创作" },
    description: {
      zh: "文生视频、图生视频与后期增强，覆盖创作到成片的工作流。",
      en: "Text-to-video, image-to-video, and post enhancement across the creation pipeline.",
    },
    icon: "🎬",
    accent: "from-purple-500 to-violet-400",
  },
  {
    slug: "ai-audio",
    name: { en: "AI Music & Audio", zh: "AI 音乐与音频" },
    description: {
      zh: "AI 写歌、配音、人声分离与音频增强等音乐创作工具。",
      en: "AI songwriting, voiceover, stem splitting, and audio enhancement.",
    },
    icon: "🎵",
    accent: "from-rose-500 to-red-400",
  },
  {
    slug: "watermark",
    name: { en: "Watermark & Cleanup", zh: "去水印与内容清理" },
    description: {
      zh: "在线去除图片/视频水印、清理冗余元素的轻量工具。",
      en: "Lightweight tools to remove image/video watermarks and clean up clutter.",
    },
    icon: "🧽",
    accent: "from-teal-500 to-emerald-400",
  },
  {
    slug: "ai-allinone",
    name: { en: "All-in-One AI", zh: "综合 AI 创作平台" },
    description: {
      zh: "图像、视频、音乐一站式生成的综合创作工作台。",
      en: "Unified workspaces for image, video, and music generation.",
    },
    icon: "🧩",
    accent: "from-indigo-500 to-blue-400",
  },
  {
    slug: "tools-misc",
    name: { en: "Other Tools", zh: "其他工具" },
    description: {
      zh: "音视频转写、PDF 朗读、PPT 转换等你用得上的零散效率工具。",
      en: "Scattered productivity tools: transcription, PDF read-aloud, video-to-PPT, and more.",
    },
    icon: "🛠️",
    accent: "from-slate-500 to-gray-400",
  },
  {
    slug: "adsense",
    name: { en: "AdSense Tool Sites", zh: "Adsense 工具站" },
    description: {
      zh: "为 Adsense 流量站量身打造的小工具（时间戳相机、播放器等）。",
      en: "Small tools tailored for AdSense traffic sites (timestamp camera, players, etc.).",
    },
    icon: "💰",
    accent: "from-amber-500 to-yellow-400",
  },
  {
    slug: "boilerplate",
    name: { en: "Code Templates", zh: "代码模板" },
    description: {
      zh: "Next.js / SaaS 启动模板与 Boilerplate，加速从 0 到上线。",
      en: "Next.js / SaaS starter templates and boilerplates to go from zero to live.",
    },
    icon: "📦",
    accent: "from-orange-500 to-amber-400",
  },
  {
    slug: "api",
    name: { en: "API Providers", zh: "API 供应商" },
    description: {
      zh: "统一接入聊天/图像/视频/音乐模型的 API 平台与中转。",
      en: "Unified APIs and gateways for chat, image, video, and music models.",
    },
    icon: "🔌",
    accent: "from-cyan-500 to-blue-400",
  },
  {
    slug: "browser-ext",
    name: { en: "Browser Extensions", zh: "浏览器插件" },
    description: {
      zh: "SEO、流量分析与关键词趋势相关的浏览器插件。",
      en: "Browser extensions for SEO, traffic analytics, and keyword trends.",
    },
    icon: "🔧",
    accent: "from-blue-500 to-sky-400",
  },
  {
    slug: "prompts",
    name: { en: "Prompt Gallery", zh: "提示词专栏" },
    description: {
      zh: "精选提示词库与案例图库，覆盖生图、生视频等场景。",
      en: "Curated prompt libraries and galleries for image/video generation.",
    },
    icon: "💡",
    accent: "from-yellow-500 to-orange-400",
  },
  {
    slug: "ai-coding",
    name: { en: "AI Coding", zh: "AI 编程工具" },
    description: {
      zh: "AI 编程助手、比价与实战教程（不含账号倒卖）。",
      en: "AI coding assistants, price comparison, and hands-on tutorials (no account reselling).",
    },
    icon: "💻",
    accent: "from-emerald-500 to-teal-400",
  },
  {
    slug: "image-tools",
    name: { en: "Image Editing", zh: "图片处理" },
    description: {
      zh: "压缩、抠图、在线 PS 等通用图片处理工具。",
      en: "Compression, background removal, online PS, and general image editing.",
    },
    icon: "🖼️",
    accent: "from-rose-500 to-pink-400",
  },
  {
    slug: "logo-icon",
    name: { en: "Logo & Icons", zh: "Logo 与图标" },
    description: {
      zh: "Logo、favicon 与各平台应用图标生成器。",
      en: "Logo, favicon, and multi-platform app icon generators.",
    },
    icon: "🔷",
    accent: "from-violet-500 to-purple-400",
  },
  {
    slug: "ui-design",
    name: { en: "UI Design", zh: "UI 设计与生成" },
    description: {
      zh: "AI 设计智能体、logo 与营销物料生成。",
      en: "AI design agents and logo/marketing asset generation.",
    },
    icon: "✨",
    accent: "from-fuchsia-500 to-pink-400",
  },
  {
    slug: "og-image",
    name: { en: "Social Share Images", zh: "社交分享图" },
    description: {
      zh: "截图美化与 Open Graph / Twitter 分享图生成。",
      en: "Screenshot styling and Open Graph / Twitter share image generation.",
    },
    icon: "🖼️",
    accent: "from-sky-500 to-cyan-400",
  },
  {
    slug: "themes",
    name: { en: "Themes & Styles", zh: "主题与样式" },
    description: {
      zh: "shadcn/ui 等组件库的主题定制与样式编辑器。",
      en: "Theme customization and style editors for component libraries like shadcn/ui.",
    },
    icon: "🎭",
    accent: "from-amber-500 to-orange-400",
  },
  {
    slug: "community",
    name: { en: "Communities", zh: "社区" },
    description: {
      zh: "独立开发者、产品发布与创意工作者聚集的社区。",
      en: "Communities where indie devs, makers, and creatives gather.",
    },
    icon: "👥",
    accent: "from-blue-500 to-indigo-400",
  },
  {
    slug: "backlinks",
    name: { en: "Link Building", zh: "外链建设" },
    description: {
      zh: "外链渠道、反向链接分析与发布技巧。",
      en: "Backlink channels, reverse-link analysis, and outreach tactics.",
    },
    icon: "🔗",
    accent: "from-green-500 to-emerald-400",
  },
  {
    slug: "ai-directory",
    name: { en: "AI Directories", zh: "AI 导航站" },
    description: {
      zh: "其他 AI 工具导航与目录站，用来对标和提交。",
      en: "Other AI tool directories to benchmark against and submit to.",
    },
    icon: "🧭",
    accent: "from-cyan-500 to-teal-400",
  },
  {
    slug: "seo",
    name: { en: "SEO", zh: "SEO 优化" },
    description: {
      zh: "关键词研究、外链、权重与流量检查的 SEO 工具。",
      en: "Keyword research, backlinks, authority, and traffic-check SEO tools.",
    },
    icon: "📈",
    accent: "from-lime-500 to-green-400",
  },
  {
    slug: "hosting",
    name: { en: "Hosting", zh: "网站托管" },
    description: {
      zh: "面向开发者的部署与全栈云托管平台。",
      en: "Deployment and full-stack cloud hosting for developers.",
    },
    icon: "☁️",
    accent: "from-sky-500 to-blue-400",
  },
  {
    slug: "server",
    name: { en: "Servers", zh: "服务器推荐" },
    description: {
      zh: "高性价比 VPS 与云服务器供应商。",
      en: "Cost-effective VPS and cloud server providers.",
    },
    icon: "💾",
    accent: "from-slate-500 to-slate-400",
  },
  {
    slug: "domain",
    name: { en: "Domain", zh: "域名查询" },
    description: {
      zh: "批量域名可用性检查与注册商比价。",
      en: "Bulk domain availability checks and registrar price comparison.",
    },
    icon: "🌐",
    accent: "from-teal-500 to-cyan-400",
  },
  {
    slug: "payment",
    name: { en: "Payments", zh: "支付接入" },
    description: {
      zh: "面向 SaaS 与独立开发者的合规收款平台（不含违规开户攻略）。",
      en: "Compliant payment platforms for SaaS and indie devs (no grey-area guides).",
    },
    icon: "💳",
    accent: "from-emerald-500 to-green-400",
  },
  {
    slug: "beginner",
    name: { en: "Beginner Zone", zh: "新手专区" },
    description: {
      zh: "挖需求、做站、出海的入门方法与财富密码词根。",
      en: "Beginner methods for demand mining, building, and going global.",
    },
    icon: "🌱",
    accent: "from-lime-500 to-emerald-400",
  },
  {
    slug: "tutorials",
    name: { en: "Tutorials", zh: "教程推荐" },
    description: {
      zh: "从做 App 到全栈入门、Vibe Coding 的实战教程。",
      en: "Hands-on tutorials from building apps to full-stack and Vibe Coding.",
    },
    icon: "📚",
    accent: "from-orange-500 to-yellow-400",
  },
  {
    slug: "notes",
    name: { en: "Tech Notes", zh: "技术总结" },
    description: {
      zh: "出海实战分享与课代表笔记。",
      en: "Field notes and recaps from overseas-building practitioners.",
    },
    icon: "📝",
    accent: "from-indigo-500 to-blue-400",
  },
  {
    slug: "github",
    name: { en: "GitHub Repos", zh: "GitHub 仓库" },
    description: {
      zh: "独立开发者出海技术栈与工具清单的精选仓库。",
      en: "Curated repos of indie-dev overseas tech stacks and tool lists.",
    },
    icon: "🐙",
    accent: "from-gray-500 to-slate-400",
  },
  {
    slug: "mindset",
    name: { en: "Inspiration", zh: "心灵加油站" },
    description: {
      zh: "独立开发者的真实收入复盘与成长故事。",
      en: "Real revenue recaps and growth stories from indie devs.",
    },
    icon: "☕",
    accent: "from-rose-500 to-pink-400",
  },
  {
    slug: "wechat",
    name: { en: "WeChat Accounts", zh: "公众号推荐" },
    description: {
      zh: "出海、SEO、AI 编程方向的优质微信公众号。",
      en: "Quality WeChat accounts on going-global, SEO, and AI coding.",
    },
    icon: "📱",
    accent: "from-green-500 to-emerald-400",
  },
  {
    slug: "bloggers",
    name: { en: "Creators", zh: "博主推荐" },
    description: {
      zh: "X、B站、YouTube 上的独立开发与 AI 创作者。",
      en: "Indie-dev and AI creators on X, Bilibili, and YouTube.",
    },
    icon: "🌟",
    accent: "from-amber-500 to-yellow-400",
  },
  {
    slug: "directories",
    name: { en: "More Directories", zh: "其他导航站" },
    description: {
      zh: "出海开发者社区与独立工具箱类导航站。",
      en: "Overseas-dev communities and indie-toolbox directories.",
    },
    icon: "🗺️",
    accent: "from-cyan-500 to-blue-400",
  },
  {
    slug: "chatbots",
    name: { en: "AI Chat", zh: "AI 对话" },
    description: {
      zh: "通用对话、写作与编程助手。",
      en: "General chat, writing, and coding assistants.",
    },
    icon: "💬",
    accent: "from-sky-500 to-cyan-400",
  },
  {
    slug: "productivity",
    name: { en: "Productivity", zh: "效率办公" },
    description: {
      zh: "写作、文档、会议纪要与自动化协作。",
      en: "Writing, docs, meeting notes, and automation.",
    },
    icon: "⚡",
    accent: "from-amber-500 to-orange-400",
  },
];

export const categoryMap = new Map(categories.map((category) => [category.slug, category]));
