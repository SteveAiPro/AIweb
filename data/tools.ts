import { categories } from "@/data/categories";

type LocalizedText = { en: string; zh: string };
type LocalizedTags = { en: string[]; zh: string[] };

export type ToolStep = { title: LocalizedText; desc: LocalizedText };
export type ToolFaq = { q: LocalizedText; a: LocalizedText };

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
  // 详情页深度内容（提升原创价值，便于通过 AdSense 内容审核）
  longDescription?: LocalizedText;
  features?: LocalizedTags;
  steps?: ToolStep[];
  faqs?: ToolFaq[];
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
    longDescription: {
      zh: "「小红书爆款生成器」是 AI Navigator 自研的免费工具，专门解决「每天要发笔记却没有灵感」的痛点。它把选题、封面文案、标题库、正文和话题标签拆成一条流水线，几秒内给出可直接复制使用的结构化草稿。我们刻意让输出保持 KOC（关键意见消费者）的口语化风格，而不是生硬的机器腔，这样更容易被真实用户点赞收藏。",
      en: "The Xiaohongshu Post Generator is an in-house free tool built to solve the daily 'no idea what to post' problem. It breaks a topic into cover copy, a headline bank, body text, and topic tags, returning a ready-to-use structured draft in seconds. Outputs keep a natural KOC (key opinion consumer) tone instead of stiff machine phrasing, which tends to earn more saves and likes.",
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
    features: {
      zh: ["封面文案与标题库一次生成", "KOC 口语化风格，避免机器腔", "自带 SEO 话题标签", "流式输出，边写边看结果"],
      en: ["Cover copy and headline bank in one pass", "Natural KOC tone, not robotic", "Built-in SEO topic tags", "Streaming output so you see results as they form"],
    },
    steps: [
      { title: { zh: "填写主题", en: "Enter a topic" }, desc: { zh: "输入产品、品牌或话题，例如「平价护肤好物」。", en: "Type a product, brand, or topic, e.g. 'affordable skincare finds'." } },
      { title: { zh: "补充定位", en: "Add context" }, desc: { zh: "选填你的账号人设、粉丝画像，让文案更精准。", en: "Optionally add your persona and audience for more precise copy." } },
      { title: { zh: "复制发布", en: "Copy and post" }, desc: { zh: "一键复制标题、正文与标签，直接发布到小红书。", en: "Copy headlines, body, and tags in one click and post to Xiaohongshu." } },
    ],
    faqs: [
      { q: { zh: "生成的内容会保存吗？", en: "Are results stored?" }, a: { zh: "不会。内容只用于当次生成，不会写入数据库长期保存。", en: "No. Content is used only for the current generation and is not stored long-term." } },
      { q: { zh: "需要付费吗？", en: "Is it paid?" }, a: { zh: "完全免费，无需注册即可使用。", en: "Completely free, no sign-up required." } },
      { q: { zh: "可以直接发布吗？", en: "Can I post directly?" }, a: { zh: "可以复制后手动发布；我们建议稍作改写以更贴合你的风格。", en: "You can copy and post manually; we suggest light edits to match your voice." } },
    ],
  },
  {
    slug: "video-downloader",
    name: "Video Downloader",
    summary: {
      zh: "无水印下载抖音视频，支持高清视频与 MP3 音频。",
      en: "Download Douyin videos without watermark, in HD video or MP3 audio.",
    },
    description: {
      zh: "在线抖音去水印视频下载工具。粘贴视频链接即可解析并下载无水印高清视频或背景音乐，免费、无需安装 App，适合内容备份与二次创作素材收集。",
      en: "An online Douyin no-watermark video downloader. Paste a link to parse and download the clean HD video or background music — free, no app required, great for backups and creative sourcing.",
    },
    longDescription: {
      zh: "「抖音视频下载器」是 AI Navigator 自研的免费在线工具，主要服务于两类场景：一是创作者备份自己发布或授权使用的素材，二是把视频背景音乐单独导出为 MP3 用于剪辑参考。整个解析过程在浏览器内完成，不要求登录、不收集视频内容。请仅将下载内容用于个人备份与合法用途，并尊重原作者的版权。",
      en: "The Douyin Video Downloader is an in-house free online tool serving two main needs: creators backing up their own or licensed clips, and exporting the background music as MP3 for editing reference. Parsing happens in the browser, requires no login, and collects no video content. Use downloads only for personal backup and lawful purposes, and respect original creators' rights.",
    },
    website: "/tools/video-downloader",
    category: "video",
    tags: {
      zh: ["视频下载", "去水印", "抖音"],
      en: ["Video download", "No watermark", "Douyin"],
    },
    pricing: "free",
    featured: true,
    isNew: true,
    score: "9.3",
    features: {
      zh: ["一键去水印", "高清画质下载", "背景音乐导出为 MP3", "浏览器内免费使用"],
      en: ["One-tap watermark removal", "HD quality download", "Background music to MP3", "Free in the browser"],
    },
    steps: [
      { title: { zh: "复制链接", en: "Copy the link" }, desc: { zh: "在抖音 App 中点击分享，复制视频链接。", en: "In the Douyin app, tap Share and copy the video link." } },
      { title: { zh: "粘贴解析", en: "Paste and parse" }, desc: { zh: "把链接粘贴到输入框，点击「下载」。", en: "Paste the link into the box and click Download." } },
      { title: { zh: "保存文件", en: "Save the file" }, desc: { zh: "预览结果，下载无水印视频或 MP3 音频。", en: "Preview and download the no-watermark video or MP3." } },
    ],
    faqs: [
      { q: { zh: "免费吗？", en: "Is it free?" }, a: { zh: "是的，本工具完全免费。", en: "Yes, this tool is completely free." } },
      { q: { zh: "需要安装东西吗？", en: "Do I need to install anything?" }, a: { zh: "不需要，电脑和手机浏览器中即可直接使用。", en: "No. It works entirely in your browser on desktop and mobile." } },
      { q: { zh: "支持哪些平台？", en: "Which platforms are supported?" }, a: { zh: "目前支持抖音，后续可能增加更多平台。", en: "Currently Douyin; more platforms may be added later." } },
    ],
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
    longDescription: {
      zh: "「Pixel Bloom」是 AI Navigator 自研的灵感图像工具，把一句文字描述变成多张风格草图。它不追求照片级写实，而是帮助你在动笔设计前先建立视觉方向和 moodboard——这对插画师、社媒运营和品牌视觉团队尤其有用。当前为程序化生成演示模式，接入图像模型后可输出真实图片。",
      en: "Pixel Bloom is an in-house inspiration tool that turns a sentence into multiple style sketches. It doesn't chase photo-realism; it helps you establish a visual direction and moodboard before you start designing — useful for illustrators, social operators, and brand teams. It currently runs in a procedural demo mode and can output real images once an image model is connected.",
    },
    website: "/tools/pixel-bloom",
    category: "image",
    tags: {
      zh: ["海报", "品牌设计", "社媒"],
      en: ["Posters", "Brand design", "Social media"],
    },
    pricing: "freemium",
    featured: true,
    score: "9.4",
    features: {
      zh: ["多风格预设", "6 种画面比例", "批量生成草图", "一键下载"],
      en: ["Multiple style presets", "6 aspect ratios", "Batch sketch generation", "One-click download"],
    },
    steps: [
      { title: { zh: "描述画面", en: "Describe the scene" }, desc: { zh: "用一句话写出想要的画面与氛围。", en: "Write one sentence about the scene and mood." } },
      { title: { zh: "选风格与比例", en: "Pick style & ratio" }, desc: { zh: "选择风格预设和画面比例。", en: "Choose a style preset and aspect ratio." } },
      { title: { zh: "生成与下载", en: "Generate & download" }, desc: { zh: "生成多张草图并下载你满意的一张。", en: "Generate several sketches and download the one you like." } },
    ],
    faqs: [
      { q: { zh: "生成的是真实图片吗？", en: "Are outputs real images?" }, a: { zh: "演示模式为程序化草图，接入图像模型后可输出真实图片。", en: "Demo mode uses procedural sketches; connect an image model for real pictures." } },
      { q: { zh: "可以商用吗？", en: "Can I use it commercially?" }, a: { zh: "草图可用于灵感探索，商用前请确认最终素材的授权。", en: "Sketches are fine for inspiration; confirm licensing before commercial use." } },
      { q: { zh: "支持哪些比例？", en: "Which ratios are supported?" }, a: { zh: "1:1、4:3、3:4、16:9 等多种比例。", en: "1:1, 4:3, 3:4, 16:9 and more." } },
    ],
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
    longDescription: {
      zh: "「Vision Seed」是 AI Navigator 仿照主流图像社区打造的灵感探索工具。它把提示词画廊、风格筛选和历史记录整合在一个界面里，登录后每次生成都会消耗积分并留存在你的历史中，方便复看和收藏。它更像一个创作工作台，而不是單次出图的小工具。",
      en: "Vision Seed is an inspiration tool modeled on mainstream image communities. It combines a prompt gallery, style filters, and history in one interface. After signing in, each generation costs credits and is saved to your history for revisiting and favoriting. It's a creative workbench rather than a one-shot generator.",
    },
    website: "/tools/vision-seed",
    category: "image",
    tags: {
      zh: ["插画", "灵感板", "参考图"],
      en: ["Illustration", "Moodboard", "Reference images"],
    },
    pricing: "free",
    isNew: true,
    score: "9.0",
    features: {
      zh: ["提示词画廊灵感参考", "多模型与分类筛选", "登录后历史与收藏", "积分制可控成本"],
      en: ["Prompt gallery for inspiration", "Model & category filters", "History and favorites after sign-in", "Credit system keeps cost predictable"],
    },
    steps: [
      { title: { zh: "写提示词", en: "Write a prompt" }, desc: { zh: "描述想看的画面，参考画廊里的示例。", en: "Describe the scene, using gallery examples as reference." } },
      { title: { zh: "选模型与比例", en: "Pick model & ratio" }, desc: { zh: "切换模型与画面比例后生成。", en: "Switch model and ratio, then generate." } },
      { title: { zh: "收藏与复用", en: "Save and reuse" }, desc: { zh: "登录后结果进入历史，可收藏复看。", en: "After sign-in, results go to history and can be favorited." } },
    ],
    faqs: [
      { q: { zh: "免费积分有多少？", en: "How many free credits?" }, a: { zh: "新用户注册即送 10 积分，每生成一次消耗 1 积分。", en: "New users get 10 free credits; each generation costs 1." } },
      { q: { zh: "需要登录吗？", en: "Do I need to sign in?" }, a: { zh: "浏览画廊无需登录；生成与收藏需要登录。", en: "Browsing the gallery is open; generating and saving require sign-in." } },
      { q: { zh: "图片是真实生成的吗？", en: "Are images really generated?" }, a: { zh: "演示为程序化草图，接入图像模型后输出真实图片。", en: "Demo uses procedural sketches; real images after an image model is connected." } },
    ],
  },

  /* ----------------------------- 8 个真实外部工具（替换原 example.com 占位链接） ----------------------------- */

  {
    slug: "chatgpt",
    name: "ChatGPT",
    summary: {
      zh: "OpenAI 出品的通用对话助手，覆盖写作、编程、分析与日常问答。",
      en: "OpenAI's general-purpose chatbot for writing, coding, analysis, and everyday Q&A.",
    },
    description: {
      zh: "ChatGPT 是当前使用最广泛的 AI 对话产品，支持多轮对话、代码解释、文档总结和联网搜索。免费版即可完成绝大多数日常任务，Plus 订阅解锁更快的模型与高级功能。",
      en: "ChatGPT is the most widely used AI chatbot, supporting multi-turn chat, code explanation, document summarization, and web search. The free tier covers most daily tasks, while Plus unlocks faster models and advanced features.",
    },
    longDescription: {
      zh: "ChatGPT 由 OpenAI 开发，是很多人接触 AI 的第一站。它的强项在于通用性：写邮件、改文案、解释概念、排查代码、把长文压缩成要点都不在话下。配合 GPTs 和插件生态，还能把它变成特定场景的助手。对刚起步的团队，免费版已经足够日常使用。",
      en: "Built by OpenAI, ChatGPT is where many people first meet AI. Its strength is generality: writing emails, polishing copy, explaining concepts, debugging code, and condensing long docs. With GPTs and plugins, it becomes a scoped assistant for specific workflows. For new teams, the free tier already covers daily use.",
    },
    website: "https://chat.openai.com",
    category: "chatbots",
    tags: {
      zh: ["对话", "写作", "编程助手"],
      en: ["Chat", "Writing", "Coding assistant"],
    },
    pricing: "freemium",
    featured: true,
    popular: true,
    score: "9.7",
    features: {
      zh: ["多轮对话与上下文记忆", "代码解释与调试", "文档总结与联网搜索", "GPTs 自定义助手"],
      en: ["Multi-turn chat with memory", "Code explanation and debugging", "Doc summarization and web search", "Custom GPTs"],
    },
    steps: [
      { title: { zh: "注册账号", en: "Create an account" }, desc: { zh: "用邮箱或第三方账号注册，免费版即可使用。", en: "Sign up with email or a third-party account; free tier works." } },
      { title: { zh: "发起对话", en: "Start chatting" }, desc: { zh: "直接描述需求，必要时补充背景与格式要求。", en: "Describe your need directly, add context and format requirements." } },
      { title: { zh: "迭代优化", en: "Iterate" }, desc: { zh: "用追问让结果更贴近你的预期。", en: "Use follow-ups to steer results closer to what you want." } },
    ],
    faqs: [
      { q: { zh: "免费版够用吗？", en: "Is the free tier enough?" }, a: { zh: "对日常写作、问答和简单编程足够；高频或重度使用建议 Plus。", en: "Enough for daily writing, Q&A, and light coding; heavy use may want Plus." } },
      { q: { zh: "数据会被用来训练吗？", en: "Is my data used for training?" }, a: { zh: "可在设置中关闭聊天记录用于模型改进；企业版有更严格的隔离。", en: "You can disable chat history for model improvement in settings; enterprise plans isolate data." } },
      { q: { zh: "能代替搜索引擎吗？", en: "Can it replace search?" }, a: { zh: "它能总结与推理，但事实类问题建议开启联网搜索并交叉核对。", en: "It summarizes and reasons well, but verify facts via web search and cross-check." } },
    ],
  },
  {
    slug: "claude",
    name: "Claude",
    summary: {
      zh: "Anthropic 出品的 AI 助手，以长文本理解与稳健写作见长。",
      en: "Anthropic's assistant known for long-context understanding and careful writing.",
    },
    description: {
      zh: "Claude 由 Anthropic 开发，擅长处理超长文档、代码库分析与结构化写作。其回复通常更克制、更少幻觉，适合需要可靠性的工作场景，如合同审阅、研究报告和长篇内容润色。",
      en: "Built by Anthropic, Claude excels at very long documents, codebase analysis, and structured writing. Its replies tend to be measured and less hallucinated, suiting reliability-critical work like contract review, research, and long-form editing.",
    },
    longDescription: {
      zh: "如果你经常要「读完一整本书或一个代码仓库再回答问题」，Claude 的长上下文能力会很有用。它把大段材料喂进去后，能稳定地做摘要、对比和问答，且语气更谨慎。很多写作者和研究者把它当作「不会跑题的协作伙伴」。",
      en: "If you often need to 'read a whole book or repo, then answer questions', Claude's long context helps. Feed large material in and it summarizes, compares, and answers steadily, with a careful tone. Many writers and researchers treat it as a focused collaborator.",
    },
    website: "https://claude.ai",
    category: "chatbots",
    tags: {
      zh: ["长文本", "写作", "代码分析"],
      en: ["Long context", "Writing", "Code analysis"],
    },
    pricing: "freemium",
    popular: true,
    score: "9.6",
    features: {
      zh: ["超长上下文窗口", "稳健的结构化写作", "代码库级分析", "文件上传与解读"],
      en: ["Very large context window", "Steady structured writing", "Repo-level analysis", "File upload and interpretation"],
    },
    steps: [
      { title: { zh: "上传材料", en: "Upload material" }, desc: { zh: "拖入文档、代码或表格，让它先理解上下文。", en: "Drop in docs, code, or sheets so it understands context first." } },
      { title: { zh: "提出任务", en: "Give the task" }, desc: { zh: "要求摘要、对比、改写或按规范出稿。", en: "Ask for summary, comparison, rewrite, or spec-compliant drafts." } },
      { title: { zh: "交叉核对", en: "Cross-check" }, desc: { zh: "重要结论让它标注出处或引用原文。", en: "For key claims, ask it to cite or quote the source." } },
    ],
    faqs: [
      { q: { zh: "和 ChatGPT 怎么选？", en: "Claude or ChatGPT?" }, a: { zh: "长文档与严谨写作偏好 Claude；通用创意与生态广度看 ChatGPT。", en: "Prefer Claude for long docs and careful writing; ChatGPT for broad creative use." } },
      { q: { zh: "支持中文吗？", en: "Does it support Chinese?" }, a: { zh: "支持，中文理解与写作表现都很扎实。", en: "Yes, Chinese understanding and writing are solid." } },
      { q: { zh: "有 API 吗？", en: "Is there an API?" }, a: { zh: "有，开发者可接入 Anthropic 官方 API。", en: "Yes, developers can use the official Anthropic API." } },
    ],
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    summary: {
      zh: "以艺术质感著称的 AI 图像生成工具，出图风格统一且高级。",
      en: "An AI image generator celebrated for artistic, cohesive, high-end visuals.",
    },
    description: {
      zh: "Midjourney 凭借电影级的光影与构图在创作者中口碑极高。它最初在 Discord 中通过指令使用，现已提供网页版。适合概念艺术、海报、品牌视觉和插画方向的探索。",
      en: "Midjourney is beloved for cinematic lighting and composition. It started as Discord slash-commands and now has a web app. Great for concept art, posters, brand visuals, and illustration exploration.",
    },
    longDescription: {
      zh: "如果你要的是「好看」而不是「精准」，Midjourney 往往是首选。它的审美一致性很强，英文提示词配合参数（如 --ar 比例、--style 风格）能稳定产出有设计感的图。缺点是可控性不如专业设计软件，且需要订阅。",
      en: "If you want 'beautiful' rather than 'precise', Midjourney is often the first pick. Its aesthetic is consistent; English prompts with parameters (--ar ratio, --style) yield design-forward images. The trade-off is less control than pro design tools and a paid plan.",
    },
    website: "https://www.midjourney.com",
    category: "image",
    tags: {
      zh: ["图像生成", "概念艺术", "插画"],
      en: ["Image generation", "Concept art", "Illustration"],
    },
    pricing: "paid",
    popular: true,
    score: "9.5",
    features: {
      zh: ["电影级光影与构图", "风格一致性强", "网页版与 Discord 双入口", "参数化精细控制"],
      en: ["Cinematic lighting and composition", "Strong style consistency", "Web app and Discord", "Parametric fine control"],
    },
    steps: [
      { title: { zh: "构思提示词", en: "Craft a prompt" }, desc: { zh: "用具体画面描述 + 风格词 + 参数。", en: "Use concrete scene + style words + parameters." } },
      { title: { zh: "生成并筛选", en: "Generate and pick" }, desc: { zh: "一次出多张，挑选再放大。", en: "Produce several, then upscale the best." } },
      { title: { zh: "迭代微调", en: "Refine" }, desc: { zh: "用变体（vary）和重绘（remix）逼近目标。", en: "Use vary and remix to approach the target." } },
    ],
    faqs: [
      { q: { zh: "免费吗？", en: "Is it free?" }, a: { zh: "需要订阅，目前没有长期免费额度。", en: "It requires a subscription; no long-term free tier." } },
      { q: { zh: "提示词用英文更好吗？", en: "Are English prompts better?" }, a: { zh: "是的，英文提示词通常产出更稳定的风格。", en: "Yes, English prompts usually yield more stable styles." } },
      { q: { zh: "能商用吗？", en: "Can I use it commercially?" }, a: { zh: "付费套餐通常允许商用，具体以官方授权条款为准。", en: "Paid plans generally allow commercial use, per the official license." } },
    ],
  },
  {
    slug: "canva",
    name: "Canva",
    summary: {
      zh: "人人都能上手的在线设计平台，模板海量、协作方便。",
      en: "An online design platform anyone can use, with huge template libraries and easy collaboration.",
    },
    description: {
      zh: "Canva 把海报、PPT、社媒图、视频剪辑都收进一个拖拽式编辑器。内置大量正版模板与 AI 功能（Magic Design、文案生成），适合非设计师快速产出可用物料。",
      en: "Canva puts posters, decks, social images, and video editing into one drag-and-drop editor. With vast licensed templates and AI features (Magic Design, copy generation), it lets non-designers ship usable assets fast.",
    },
    longDescription: {
      zh: "对个人和小团队来说，Canva 的最大价值是「不用学 PS 也能出图」。它的模板体系覆盖了从朋友圈到路演 PPT 的几乎所有场景，配合品牌套件（Brand Kit）还能统一视觉规范。AI 功能则进一步把「从空白到初稿」的时间压到几分钟。",
      en: "For individuals and small teams, Canva's value is 'design without learning Photoshop'. Its templates span almost every scenario from social posts to pitch decks, and Brand Kit keeps visuals consistent. AI shrinks the blank-page-to-draft time to minutes.",
    },
    website: "https://www.canva.com",
    category: "image",
    tags: {
      zh: ["设计", "模板", "协作"],
      en: ["Design", "Templates", "Collaboration"],
    },
    pricing: "freemium",
    featured: true,
    score: "9.3",
    features: {
      zh: ["海量正版模板", "拖拽式编辑器", "品牌套件统一规范", "AI 文案与配图"],
      en: ["Huge licensed template library", "Drag-and-drop editor", "Brand Kit for consistency", "AI copy and imagery"],
    },
    steps: [
      { title: { zh: "选模板", en: "Pick a template" }, desc: { zh: "按场景搜索模板，从成品出发最快。", en: "Search templates by scenario; start from a finished layout." } },
      { title: { zh: "替换内容", en: "Swap content" }, desc: { zh: "改文字、换图、套用品牌色。", en: "Edit text, swap images, apply brand colors." } },
      { title: { zh: "导出分享", en: "Export & share" }, desc: { zh: "一键导出 PNG/PDF，或直接协作分享。", en: "Export PNG/PDF in one click or share for collaboration." } },
    ],
    faqs: [
      { q: { zh: "免费版有什么限制？", en: "What's limited in the free tier?" }, a: { zh: "部分高级模板、素材和 AI 功能需付费。", en: "Some premium templates, assets, and AI features are paid." } },
      { q: { zh: "适合团队吗？", en: "Good for teams?" }, a: { zh: "支持多人实时协作与品牌套件。", en: "Yes, it supports real-time collaboration and Brand Kit." } },
      { q: { zh: "能导出透明背景吗？", en: "Can it export transparent backgrounds?" }, a: { zh: "付费版可导出 PNG 透明背景。", en: "Paid plans can export transparent PNGs." } },
    ],
  },
  {
    slug: "runway",
    name: "Runway",
    summary: {
      zh: "面向创作者的 AI 视频工具，文字/图片即可生成动态画面。",
      en: "A creator-focused AI video tool that turns text or images into motion.",
    },
    description: {
      zh: "Runway 提供文生视频、图生视频、视频擦除与补帧等能力，被大量独立创作者用于广告片、MV 和短剧预演。它的 Gen 系列模型在生成可控性上处于第一梯队。",
      en: "Runway offers text-to-video, image-to-video, video inpainting, and interpolation, used by indie creators for ads, MV, and short-drama previews. Its Gen-series models sit in the top tier for controllability.",
    },
    longDescription: {
      zh: "Runway 的定位是「给创作者用的 AI 视频工作室」。相比单纯出一段炫酷片段，它更强调可编辑：绿幕擦除、镜头运动控制、风格迁移都能在浏览器里完成。对短视频团队，它适合做概念预演和素材增强，而不是完全替代实拍。",
      en: "Runway positions itself as 'an AI video studio for creators'. Beyond cool clips, it stresses editability: green-screen removal, camera motion, style transfer — all in the browser. For short-video teams, it's best for previews and asset enhancement, not a full shoot replacement.",
    },
    website: "https://runwayml.com",
    category: "video",
    tags: {
      zh: ["视频生成", "文生视频", "后期"],
      en: ["Video generation", "Text-to-video", "Post-production"],
    },
    pricing: "freemium",
    popular: true,
    score: "9.2",
    features: {
      zh: ["文生视频 / 图生视频", "视频擦除与补帧", "镜头运动控制", "浏览器内完成"],
      en: ["Text-to-video / image-to-video", "Inpainting and interpolation", "Camera motion control", "Runs in the browser"],
    },
    steps: [
      { title: { zh: "准备素材", en: "Prepare assets" }, desc: { zh: "写一段描述，或上传一张起始图。", en: "Write a description or upload a starting image." } },
      { title: { zh: "生成片段", en: "Generate clips" }, desc: { zh: "选择模型与运动参数生成短视频。", en: "Pick a model and motion params to generate short clips." } },
      { title: { zh: "精修导出", en: "Refine & export" }, desc: { zh: "用擦除/补帧等工具精修后导出。", en: "Polish with inpainting/interpolation, then export." } },
    ],
    faqs: [
      { q: { zh: "免费额度有多少？", en: "How much free credit?" }, a: { zh: "有免费试用额度，生成按积分消耗。", en: "There's a free trial allowance, spent by credits." } },
      { q: { zh: "能生成多长？", en: "How long can clips be?" }, a: { zh: "单次通常为数秒，可拼接成更长成片。", en: "Each clip is usually a few seconds; stitch them into longer videos." } },
      { q: { zh: "需要下载软件吗？", en: "Do I need to install software?" }, a: { zh: "不需要，网页端即可使用。", en: "No, it runs in the web app." } },
    ],
  },
  {
    slug: "notion",
    name: "Notion",
    summary: {
      zh: "集文档、知识库、任务与 AI 写作于一体的工作空间。",
      en: "A workspace combining docs, knowledge base, tasks, and AI writing.",
    },
    description: {
      zh: "Notion 用模块化块（block）构建文档、数据库和看板，配合 Notion AI 可做摘要、续写、翻译和问答。适合团队知识沉淀与项目管理。",
      en: "Notion builds docs, databases, and boards from modular blocks; with Notion AI it summarizes, continues writing, translates, and answers. Great for team knowledge and project management.",
    },
    longDescription: {
      zh: "Notion 的价值在于「一个工具代替一堆工具」。文档、表格、看板、日历都能互相链接，AI 则在这些结构之上做智能处理——比如把会议记录自动整理成行动项。对喜欢自搭系统的团队，它的可塑性很高。",
      en: "Notion's value is 'one tool replacing many'. Docs, tables, boards, and calendars link together, and AI processes them smartly — e.g. turning meeting notes into action items. For teams that like to build their own systems, it's highly flexible.",
    },
    website: "https://www.notion.so",
    category: "productivity",
    tags: {
      zh: ["知识库", "文档", "项目管理"],
      en: ["Knowledge base", "Docs", "Project management"],
    },
    pricing: "freemium",
    featured: true,
    score: "9.4",
    features: {
      zh: ["模块化块编辑器", "数据库与看板", "Notion AI 写作助手", "团队实时协作"],
      en: ["Modular block editor", "Databases and boards", "Notion AI writing assistant", "Real-time team collaboration"],
    },
    steps: [
      { title: { zh: "建页面", en: "Create a page" }, desc: { zh: "从空白或模板开始，用块拼装内容。", en: "Start blank or from a template; assemble with blocks." } },
      { title: { zh: "连数据库", en: "Link databases" }, desc: { zh: "把任务、笔记用数据库关联起来。", en: "Connect tasks and notes via databases." } },
      { title: { zh: "用 AI 提效", en: "Use AI" }, desc: { zh: "选中文字让 AI 总结、续写或翻译。", en: "Select text and ask AI to summarize, continue, or translate." } },
    ],
    faqs: [
      { q: { zh: "免费版够团队用吗？", en: "Is the free tier enough for teams?" }, a: { zh: "小团队可用，协作人数与高级权限需升级。", en: "Small teams can use it; more collaborators and advanced permissions need a plan." } },
      { q: { zh: "AI 怎么计费？", en: "How is AI billed?" }, a: { zh: "AI 作为附加项按席位订阅。", en: "AI is an add-on billed per seat." } },
      { q: { zh: "能导入其他笔记吗？", en: "Can I import other notes?" }, a: { zh: "支持从多种格式和工具导入。", en: "Yes, it imports from several formats and tools." } },
    ],
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    summary: {
      zh: "嵌入编辑器的 AI 编程助手，实时补全与对话式编码。",
      en: "An in-editor AI coding assistant with real-time completion and chat.",
    },
    description: {
      zh: "GitHub Copilot 由 GitHub 与 OpenAI 合作打造，在 VS Code 等编辑器里提供整行/整块代码补全，并能就当前仓库答疑。适合日常开发提效。",
      en: "Built by GitHub and OpenAI, Copilot offers line/block completion inside editors like VS Code and can answer questions about your repo. Great for everyday dev productivity.",
    },
    longDescription: {
      zh: "Copilot 最适合「把样板代码交给它写」。它读着你的上下文给建议，写测试用例、补样板、解释报错都很顺手。配合 Copilot Chat，还能针对整个工程提问。对追求速度的开发者，它更像副驾而非替代司机。",
      en: "Copilot shines at 'let it write the boilerplate'. It reads your context to suggest code, tests, and explanations of errors. With Copilot Chat you can ask about the whole project. For speed-focused devs, it's a copilot, not a replacement driver.",
    },
    website: "https://github.com/features/copilot",
    category: "developer",
    tags: {
      zh: ["代码补全", "编程助手", "VS Code"],
      en: ["Code completion", "Coding assistant", "VS Code"],
    },
    pricing: "paid",
    popular: true,
    score: "9.3",
    features: {
      zh: ["行内实时补全", "Copilot Chat 问答", "多语言支持", "测试用例生成"],
      en: ["Inline real-time completion", "Copilot Chat Q&A", "Multi-language support", "Test generation"],
    },
    steps: [
      { title: { zh: "安装插件", en: "Install the extension" }, desc: { zh: "在 VS Code 等编辑器安装 Copilot。", en: "Install Copilot in editors like VS Code." } },
      { title: { zh: "开始编码", en: "Start coding" }, desc: { zh: "正常写代码，接受它的补全建议。", en: "Code normally and accept its completions." } },
      { title: { zh: "对话式求助", en: "Ask in chat" }, desc: { zh: "选中代码或就工程提问。", en: "Select code or ask about the project in chat." } },
    ],
    faqs: [
      { q: { zh: "免费吗？", en: "Is it free?" }, a: { zh: "对学生和开源维护者有免费额度，一般用户需订阅。", en: "Free for students and open-source maintainers; others need a plan." } },
      { q: { zh: "支持哪些语言？", en: "Which languages?" }, a: { zh: "主流语言都支持，补全质量因语言而异。", en: "Most mainstream languages, with quality varying by language." } },
      { q: { zh: "会泄露我的代码吗？", en: "Does it leak my code?" }, a: { zh: "可配置不用于训练；企业版有额外隔离策略。", en: "You can opt out of training; enterprise plans add isolation." } },
    ],
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    summary: {
      zh: "高拟真 AI 语音合成与克隆，适合配音、有声书与播客。",
      en: "High-fidelity AI voice synthesis and cloning for voiceover, audiobooks, and podcasts.",
    },
    description: {
      zh: "ElevenLabs 以自然度和多语种支持著称，可把文本转成带情绪起伏的语音，也支持声音克隆。广泛用于短视频配音、课程音频和游戏 NPC 对白。",
      en: "ElevenLabs is known for naturalness and multilingual support, turning text into emotionally varied speech and supporting voice cloning. Used widely for short-video voiceover, course audio, and game NPC dialogue.",
    },
    longDescription: {
      zh: "如果你的内容需要「说话」，ElevenLabs 几乎是拟真度最高的选择之一。它不只是朗读，还能控制停顿、语气和节奏，中文表现也相当自然。声音克隆功能让品牌能用固定音色持续产出，但要注意授权与合规。",
      en: "If your content needs to 'speak', ElevenLabs is among the most natural. It controls pauses, tone, and pacing, not just reads; Chinese is quite natural too. Voice cloning keeps a brand voice consistent, but mind licensing and compliance.",
    },
    website: "https://elevenlabs.io",
    category: "audio",
    tags: {
      zh: ["配音", "语音合成", "有声书"],
      en: ["Voiceover", "Voice synthesis", "Audiobook"],
    },
    pricing: "freemium",
    score: "9.1",
    features: {
      zh: ["高拟真多语种语音", "声音克隆", "情绪与节奏控制", "批量文本转语音"],
      en: ["Lifelike multilingual voice", "Voice cloning", "Emotion and pacing control", "Batch text-to-speech"],
    },
    steps: [
      { title: { zh: "输入文本", en: "Enter text" }, desc: { zh: "粘贴要配音的文案，选语言与音色。", en: "Paste the script, pick language and voice." } },
      { title: { zh: "调整参数", en: "Tune settings" }, desc: { zh: "设置稳定性、风格与语速。", en: "Set stability, style, and speed." } },
      { title: { zh: "生成下载", en: "Generate & download" }, desc: { zh: "生成后导出 MP3 或直接使用。", en: "Generate, then export MP3 or use directly." } },
    ],
    faqs: [
      { q: { zh: "免费版能用吗？", en: "Is the free tier usable?" }, a: { zh: "有免费额度，但字数与时长有限。", en: "There's a free allowance, limited in characters and duration." } },
      { q: { zh: "中文自然吗？", en: "Is Chinese natural?" }, a: { zh: "自然度很高，适合中文配音场景。", en: "Very natural, suitable for Chinese voiceover." } },
      { q: { zh: "克隆声音合规吗？", en: "Is voice cloning compliant?" }, a: { zh: "需获得声音所有者授权，遵守平台与当地法规。", en: "You need the voice owner's consent and must follow platform and local laws." } },
    ],
  },
];

export const featuredTools = tools.filter((tool) => tool.featured);
export const popularTools = tools.filter((tool) => tool.popular);
export const newTools = tools.filter((tool) => tool.isNew);
