type LocalizedText = { en: string; zh: string };

export type BlogBlock =
  | { type: "p"; text: LocalizedText }
  | { type: "h2"; text: LocalizedText }
  | { type: "h3"; text: LocalizedText }
  | { type: "ul"; items: LocalizedText[] }
  | { type: "ol"; items: LocalizedText[] }
  | { type: "quote"; text: LocalizedText };

export type Post = {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  category: string;
  date: string; // ISO yyyy-mm-dd
  readingMinutes: number;
  author: string;
  content: BlogBlock[];
};

export const posts: Post[] = [
  {
    slug: "xiaohongshu-viral-titles",
    title: {
      zh: "小红书爆款标题的 10 个 AI 生成技巧",
      en: "10 AI Tips for Writing Viral Xiaohongshu Titles",
    },
    excerpt: {
      zh: "标题决定了一半的点击率。本文用 AI Navigator 自研的小红书生成器，拆解 10 个能直接套用的爆款标题公式。",
      en: "Your title decides half the click-through. Using our in-house generator, here are 10 reusable formulas for viral Xiaohongshu titles.",
    },
    category: "内容创作",
    date: "2026-07-01",
    readingMinutes: 6,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "在小红书，用户刷到你的笔记只有不到一秒做决定。标题不是装饰，而是第一道转化闸门。下面 10 个技巧都经过「小红书爆款生成器」反复验证，可以直接套用。",
          en: "On Xiaohongshu, users decide in under a second whether to tap. The title isn't decoration — it's the first conversion gate. These 10 tips are validated with our Xiaohongshu generator and ready to reuse.",
        },
      },
      { type: "h2", text: { zh: "1. 数字具象化", en: "1. Make numbers concrete" } },
      {
        type: "p",
        text: {
          zh: "「3 个平价好物」比「一些好物」更有可信度。AI 生成时强制要求带数字，点击率通常更高。",
          en: "'3 affordable finds' reads more credible than 'some finds'. Ask the AI to always include a number and CTR usually improves.",
        },
      },
      { type: "h2", text: { zh: "2. 给读者一个身份", en: "2. Give the reader an identity" } },
      {
        type: "p",
        text: {
          zh: "「租房党必看」「学生党友好」让特定人群一眼对号入座。生成时把目标人群写进提示词。",
          en: "'For renters' or 'student-friendly' makes a segment feel seen. Put the target audience in the prompt.",
        },
      },
      { type: "h2", text: { zh: "3. 制造反差", en: "3. Create contrast" } },
      {
        type: "p",
        text: {
          zh: "「月薪 5k 也能有的高级感」用反差制造好奇。让 AI 同时输出「前提」和「结果」两个极端。",
          en: "'A luxe feel on a 5k salary' uses contrast to spark curiosity. Have the AI output both the premise and the opposite result.",
        },
      },
      { type: "h2", text: { zh: "4–10. 其余可套用公式", en: "4–10. More reusable formulas" } },
      {
        type: "ul",
        items: [
          { zh: "避坑型：「别再踩这 5 个坑」", en: "Pitfall: 'Stop making these 5 mistakes'" },
          { zh: "测评型：「实测 30 天后的真实反馈」", en: "Review: 'My honest 30-day result'" },
          { zh: "清单型：「一张图搞定全部流程」", en: "Checklist: 'One image for the whole flow'" },
          { zh: "情绪型：「真的会谢，太好用了」", en: "Emotion: 'Genuinely saved me, so good'" },
          { zh: "场景型：「通勤路上也能做」", en: "Scenario: 'Do it on your commute'" },
          { zh: "权威型：「内行人不会告诉你的事」", en: "Insider: 'What pros won't tell you'" },
          { zh: "对比型：「A 和 B 到底差在哪」", en: "Compare: 'What really differs between A and B'" },
        ],
      },
      {
        type: "quote",
        text: {
          zh: "好标题不是写出来的，是「替用户说出他还没说的话」。",
          en: "A good title isn't written — it says what the user hasn't said yet.",
        },
      },
      {
        type: "p",
        text: {
          zh: "把这些公式喂给生成器，每次让它产出 8–10 个候选，再挑最顺眼的。持续迭代，你的标题库会越来越准。",
          en: "Feed these formulas to the generator, ask for 8–10 candidates each time, and pick the smoothest. Iterate and your title bank gets sharper.",
        },
      },
    ],
  },
  {
    slug: "douyin-watermark-download-guide",
    title: {
      zh: "抖音创作者必备：如何合法下载自己的无水印素材",
      en: "For Douyin Creators: How to Legally Download Your Own Watermark-free Clips",
    },
    excerpt: {
      zh: "很多创作者不知道：下载自己发布或获授权的视频用于二次剪辑，是合理用途。本文讲清边界与正确姿势。",
      en: "Many creators don't know: downloading your own or licensed clips for re-editing is fair use. Here's the boundary and the right way to do it.",
    },
    category: "视频创作",
    date: "2026-07-05",
    readingMinutes: 5,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "做短视频的人常遇到一个尴尬：想把自己发过的视频剪成合集，却找不到无水印的原片。本文用 AI Navigator 的「抖音视频下载器」说明合法、安全的使用方式。",
          en: "Short-video creators often hit an awkward spot: they want to cut their own posts into a reel but can't find the clean original. Here's the legal, safe way using our Douyin downloader.",
        },
      },
      { type: "h2", text: { zh: "什么情况可以下载", en: "When downloading is OK" } },
      {
        type: "ul",
        items: [
          { zh: "下载你自己发布的视频做备份或二次剪辑", en: "Download your own videos for backup or re-edit" },
          { zh: "下载已获原作者明确授权的素材", en: "Download clips you're explicitly authorized to use" },
          { zh: "仅用于个人离线观看", en: "For personal offline viewing only" },
        ],
      },
      { type: "h2", text: { zh: "什么情况不建议", en: "When to hold off" } },
      {
        type: "ul",
        items: [
          { zh: "下载他人作品并声称原创", en: "Downloading others' work and claiming it as yours" },
          { zh: "搬运竞品内容用于商业获利", en: "Reuploading competitors' content for profit" },
          { zh: "绕过付费或私密限制获取内容", en: "Bypassing paywalls or private restrictions" },
        ],
      },
      { type: "h2", text: { zh: "三步正确姿势", en: "The right 3-step flow" } },
      {
        type: "ol",
        items: [
          { zh: "在抖音 App 内复制自己的视频链接", en: "Copy the link of your own video in the app" },
          { zh: "粘贴到下载器，解析后保存无水印版", en: "Paste into the downloader and save the no-watermark version" },
          { zh: "二次剪辑时保留原作者与来源说明", en: "Keep creator and source credits when re-editing" },
        ],
      },
      {
        type: "quote",
        text: {
          zh: "工具本身中立，合不合规取决于你拿来做什么。",
          en: "The tool is neutral; compliance depends on what you do with it.",
        },
      },
      {
        type: "p",
        text: {
          zh: "把下载器当成「素材保险箱」而不是「搬运捷径」，你的账号和口碑都会更稳。",
          en: "Treat the downloader as a 'material safe' rather than a 'reupload shortcut', and both your account and reputation stay safer.",
        },
      },
    ],
  },
  {
    slug: "ai-image-tools-compared",
    title: {
      zh: "AI 图像生成工具横评：像素灵感 vs 主流工具",
      en: "AI Image Tools Compared: Pixel Bloom vs the Mainstream",
    },
    excerpt: {
      zh: "Midjourney 好看，Canva 好上手，Pixel Bloom 适合找方向。我们按「审美、可控、成本」三个维度横向对比，帮你选对工具。",
      en: "Midjourney looks great, Canva is easy, Pixel Bloom is good for direction. We compare across aesthetics, control, and cost to help you pick.",
    },
    category: "图像设计",
    date: "2026-07-09",
    readingMinutes: 7,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "AI 图像工具越来越多，但「哪个适合我」依然难答。我们挑了三款定位不同的产品，从三个维度横向对比。",
          en: "There are more AI image tools every month, but 'which fits me' is still hard. We picked three differently-positioned products and compare them on three axes.",
        },
      },
      { type: "h2", text: { zh: "维度一：审美", en: "Axis 1: Aesthetics" } },
      {
        type: "p",
        text: {
          zh: "Midjourney 的电影级光影几乎无敌，适合概念艺术和海报；Pixel Bloom 偏灵感草图，胜在快和多；Canva 胜在「成品感」，模板即正义。",
          en: "Midjourney's cinematic light is nearly unbeatable for concept art and posters; Pixel Bloom leans toward fast, varied sketches; Canva wins on 'finished feel' with templates.",
        },
      },
      { type: "h2", text: { zh: "维度二：可控", en: "Axis 2: Control" } },
      {
        type: "p",
        text: {
          zh: "要精修就去 Canva 拖拽；要风格统一看 Midjourney 的参数；要快速试方向，Pixel Bloom 的画廊和比例切换最轻量。",
          en: "For precise edits, drag in Canva; for style consistency, use Midjourney's params; for quick direction-testing, Pixel Bloom's gallery and ratios are lightest.",
        },
      },
      { type: "h2", text: { zh: "维度三：成本", en: "Axis 3: Cost" } },
      {
        type: "ul",
        items: [
          { zh: "Pixel Bloom：免费起步，积分制可控", en: "Pixel Bloom: free to start, predictable credits" },
          { zh: "Canva：免费版够用，高级素材付费", en: "Canva: free tier works, premium assets paid" },
          { zh: "Midjourney：需订阅，无长期免费", en: "Midjourney: subscription required, no long free tier" },
        ],
      },
      {
        type: "quote",
        text: {
          zh: "没有最好的工具，只有最适合当前这一步的工具。",
          en: "There's no best tool, only the best tool for this step.",
        },
      },
      {
        type: "p",
        text: {
          zh: "建议工作流：用 Pixel Bloom 找方向 → 用 Midjourney 出主视觉 → 用 Canva 排版成品。三者互补，比单押一个更高效。",
          en: "Suggested flow: find direction in Pixel Bloom → make hero visuals in Midjourney → lay out the final in Canva. They complement each other better than betting on one.",
        },
      },
    ],
  },
  {
    slug: "ai-writing-tools-guide",
    title: {
      zh: "AI 写作工具怎么选：从大纲到成稿的完整流程",
      en: "How to Choose AI Writing Tools: A Full Outline-to-Draft Workflow",
    },
    excerpt: {
      zh: "不是工具越多越好。本文按「选题→大纲→初稿→润色」四步拆解，告诉你每一步该用哪类 AI 写作工具，少走弯路。",
      en: "More tools isn't better. We break writing into four steps — topic, outline, draft, polish — and match the right AI tool to each.",
    },
    category: "效率工具",
    date: "2026-07-15",
    readingMinutes: 6,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "市面上的 AI 写作工具多到让人选择困难：通用大模型、垂直写作助手、润色插件各有定位。与其逐个试用，不如先想清楚自己处于写作流程的哪一步。",
          en: "AI writing tools are overwhelming: general models, vertical assistants, polishing plugins. Instead of trying all, figure out which step of your workflow you're at.",
        },
      },
      { type: "h2", text: { zh: "第一步：选题与大纲", en: "Step 1: Topic and outline" } },
      {
        type: "p",
        text: {
          zh: "这个阶段要的是「结构感」。用通用大模型（如 ChatGPT、Claude）生成 5–8 个角度和详细大纲，比直接让它写全文更可控。",
          en: "Here you want structure. Use a general model (ChatGPT, Claude) to generate 5–8 angles and a detailed outline — more controllable than asking for a full draft.",
        },
      },
      { type: "h2", text: { zh: "第二步：初稿与扩写", en: "Step 2: Draft and expand" } },
      {
        type: "p",
        text: {
          zh: "把大纲交给擅长长文生成的工具，一次产出一节。分节写能避免「中间崩坏」，也方便后面局部重写。",
          en: "Feed the outline to a long-form tool, one section at a time. Section-by-section avoids mid-text collapse and makes local rewrites easy.",
        },
      },
      { type: "h2", text: { zh: "第三步：润色与统一语气", en: "Step 3: Polish and tone" } },
      {
        type: "ul",
        items: [
          { zh: "用润色插件统一术语和语气，避免前后不一致", en: "Use a polishing plugin to unify terms and tone" },
          { zh: "让 AI 检查逻辑断点和重复表述", en: "Ask AI to flag logic gaps and repetition" },
          { zh: "保留你自己的观点和案例，AI 只做语言层", en: "Keep your own views and examples; let AI handle language only" },
        ],
      },
      {
        type: "quote",
        text: {
          zh: "选工具的本质，是选「它在你流程里的那一步最擅长什么」。",
          en: "Choosing a tool is really choosing which step of your flow it does best.",
        },
      },
      {
        type: "p",
        text: {
          zh: "按这个四步法，你只需要 2–3 个工具就能覆盖全部写作场景，而不是在十几个产品间反复横跳。",
          en: "With this four-step method, two or three tools cover all your writing — no more jumping between a dozen products.",
        },
      },
    ],
  },
  {
    slug: "chatgpt-vs-claude-2026",
    title: {
      zh: "ChatGPT vs Claude：2026 年写作与编程实测对比",
      en: "ChatGPT vs Claude: 2026 Hands-on Comparison for Writing and Coding",
    },
    excerpt: {
      zh: "两个头部模型到底差在哪？我们从写作质感、代码能力、长上下文、价格四个维度实测，给你一份可直接照抄的选择清单。",
      en: "Where do the two flagship models really differ? We tested writing, coding, long context, and price to give you a copy-ready pick list.",
    },
    category: "AI 评测",
    date: "2026-07-20",
    readingMinutes: 8,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "ChatGPT 和 Claude 是很多人每天都会用的两个模型。它们都能写能编，但风格和强项差别明显，选错了会一直别扭。",
          en: "ChatGPT and Claude are daily drivers for many. Both write and code, but their style and strengths differ — pick wrong and it feels off.",
        },
      },
      { type: "h2", text: { zh: "写作：谁更自然", en: "Writing: who sounds natural" } },
      {
        type: "p",
        text: {
          zh: "Claude 在长文结构和语气一致性上更稳，适合报告、邮件、文档；ChatGPT 在创意发散和联网检索上更灵活，适合头脑风暴。",
          en: "Claude is steadier on long-structure and tone consistency — great for reports, emails, docs. ChatGPT is more flexible for ideation and web search.",
        },
      },
      { type: "h2", text: { zh: "编程：谁更省心", en: "Coding: who saves effort" } },
      {
        type: "p",
        text: {
          zh: "两者都能写可用代码，但 Claude 在多文件重构和「读懂大仓库」上略胜；ChatGPT 在配合插件和即时执行上更顺手。",
          en: "Both ship usable code, but Claude edges multi-file refactors and big repos; ChatGPT pairs better with plugins and instant runs.",
        },
      },
      { type: "h2", text: { zh: "长上下文与价格", en: "Long context and price" } },
      {
        type: "ul",
        items: [
          { zh: "需要喂几百页资料做综述，优先看上下文窗口", en: "For hundreds of pages of research, prioritize context window" },
          { zh: "高频日常使用，按调用量和订阅价对比总成本", en: "For daily use, compare total cost by volume and subscription" },
          { zh: "关键任务建议两个都试，再固定主用模型", en: "For critical tasks, try both, then commit to a primary" },
        ],
      },
      {
        type: "quote",
        text: {
          zh: "没有常胜模型，只有「这个任务交给谁更稳」。",
          en: "No model wins everything — only 'who is steadier for this task'.",
        },
      },
      {
        type: "p",
        text: {
          zh: "建议把 Claude 设为长文与代码主用，ChatGPT 负责检索与发散，两套配合比单押一个更顺。",
          en: "Set Claude as your long-form and coding default, ChatGPT for search and ideation; the combo beats betting on one.",
        },
      },
    ],
  },
  {
    slug: "short-video-ai-tools",
    title: {
      zh: "做短视频必备的 6 个 AI 工具",
      en: "6 Must-Have AI Tools for Short-Video Creators",
    },
    excerpt: {
      zh: "从选题、脚本、剪辑到去水印，一条视频要过好几道关。这 6 个 AI 工具覆盖全流程，帮你在更短时间内产出更稳的内容。",
      en: "From topic, script, editing to watermark removal, a video crosses many steps. These 6 AI tools cover the whole pipeline.",
    },
    category: "视频创作",
    date: "2026-07-25",
    readingMinutes: 6,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "短视频竞争越来越卷，单靠手工很难稳定更新。把重复环节交给 AI，把精力留给创意和选题，是更可持续的打法。",
          en: "Short video is brutal; manual-only can't sustain posting. Hand repetitive steps to AI, keep your energy for creativity.",
        },
      },
      { type: "h2", text: { zh: "选题与脚本", en: "Topic and script" } },
      {
        type: "p",
        text: {
          zh: "用 AI 写作工具批量产出选题和口播脚本，再人工挑最顺的。关键是「多产候选、精选落地」。",
          en: "Use AI writing tools to batch topics and talking scripts, then pick the smoothest manually. Generate many, land few.",
        },
      },
      { type: "h2", text: { zh: "剪辑与素材", en: "Editing and assets" } },
      {
        type: "ul",
        items: [
          { zh: "字幕与配音：自动生成字幕、克隆音色", en: "Captions and voice: auto-subtitle, voice clone" },
          { zh: "去水印：下载自己或获授权的素材做二次剪辑", en: "Watermark removal: grab your own or licensed clips for re-edit" },
          { zh: "封面：用图像工具一键出多版封面候选", en: "Thumbnails: one-click multiple covers from image tools" },
        ],
      },
      { type: "h2", text: { zh: "一条龙工作流", en: "An end-to-end flow" } },
      {
        type: "ol",
        items: [
          { zh: "AI 出 10 个选题，挑 1 个", en: "AI gives 10 topics, pick 1" },
          { zh: "AI 写口播脚本，人工润色", en: "AI writes the script, you polish" },
          { zh: "录制后用工具自动字幕与去水印", en: "After recording, auto-caption and de-watermark" },
          { zh: "出 3 版封面，数据好的留用", en: "Make 3 thumbnails, keep the best performer" },
        ],
      },
      {
        type: "quote",
        text: {
          zh: "工具负责「快」，你负责「准」。别让 AI 替你做口味判断。",
          en: "Tools handle speed, you handle taste. Don't let AI make the taste call.",
        },
      },
      {
        type: "p",
        text: {
          zh: "把这套流程跑顺，你会发现更新频率和质量都能同时往上走。",
          en: "Once this flow is smooth, both posting frequency and quality can rise together.",
        },
      },
    ],
  },
  {
    slug: "indie-dev-ai-toolkit",
    title: {
      zh: "独立开发者如何用 AI 工具把点子做成产品",
      en: "How Indie Developers Turn Ideas into Products with AI Tools",
    },
    excerpt: {
      zh: "一个人也要跑完需求、设计、开发、运营。本文给独立开发者一套可落地的 AI 工具组合，把「做出来」和「让人知道」都跑通。",
      en: "Solo founders must cover reqs, design, dev, and marketing. Here's a practical AI toolkit to ship and get noticed.",
    },
    category: "独立开发",
    date: "2026-07-30",
    readingMinutes: 7,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "独立开发者最大的敌人不是技术，而是「样样都要自己来」带来的精力稀释。AI 工具的价值，是让你在关键环节提速，把有限时间留给决策。",
          en: "The enemy isn't tech — it's energy spread too thin. AI's value is speeding key steps so you keep time for decisions.",
        },
      },
      { type: "h2", text: { zh: "需求与设计", en: "Requirements and design" } },
      {
        type: "p",
        text: {
          zh: "用 AI 把模糊点子写成用户故事和验收标准，再用图像工具快速出界面草图，避免一上来就写代码。",
          en: "Use AI to turn a vague idea into user stories and acceptance criteria, then sketch UI fast — don't code first.",
        },
      },
      { type: "h2", text: { zh: "开发与测试", en: "Development and testing" } },
      {
        type: "ul",
        items: [
          { zh: "代码助手帮你补样板、写单测、解释报错", en: "Coding assistants for boilerplate, tests, error fixes" },
          { zh: "让 AI 扮演代码审查员，提前发现明显问题", en: "Let AI act as reviewer to catch obvious issues early" },
          { zh: "用 AI 生成文档和 onboarding 文案", en: "Generate docs and onboarding copy with AI" },
        ],
      },
      { type: "h2", text: { zh: "上线与运营", en: "Launch and operations" } },
      {
        type: "p",
        text: {
          zh: "产品做出来只是上半场，让对的人看到才是下半场。内容、SEO、社群都能量化推进，别等 Perfect 才发布。",
          en: "Shipping is half the game; the other half is being seen by the right people. Content, SEO, community — ship before perfect.",
        },
      },
      {
        type: "quote",
        text: {
          zh: "独立开发不是比谁功能多，是比谁先验证、先被看见。",
          en: "Indie dev isn't about most features — it's about validating and being seen first.",
        },
      },
      {
        type: "p",
        text: {
          zh: "先把 MVP 跑通一个闭环，再用 AI 持续放大内容和运营，比闷头打磨三个月更高效。",
          en: "Get one MVP loop working, then use AI to scale content and ops — more efficient than polishing three months solo.",
        },
      },
    ],
  },
  {
    slug: "ai-background-remover-compared",
    title: {
      zh: "AI 抠图与去水印工具横评：白底图、电商上架这样选",
      en: "AI Background Removers Compared: Picking for White-BG and E-commerce",
    },
    excerpt: {
      zh: "电商主图要白底、社媒封面要干净。本文横评几款 AI 抠图去水印工具，重点看边缘质量、批量能力和导出格式。",
      en: "E-commerce needs white backgrounds, social covers need clean cuts. We compare AI cutout tools on edge quality, batch, and export.",
    },
    category: "图像设计",
    date: "2026-08-02",
    readingMinutes: 6,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "抠图看着简单，真要做到发丝级边缘、批量不出错，工具差别很大。选错会让你在后期反复手动修补。",
          en: "Cutout looks simple, but hair-level edges and reliable batches vary wildly. Wrong pick means manual fixes later.",
        },
      },
      { type: "h2", text: { zh: "核心看三点", en: "Three things to check" } },
      {
        type: "ul",
        items: [
          { zh: "边缘质量：发丝、玻璃、半透明是否干净", en: "Edge quality: hair, glass, translucency" },
          { zh: "批量能力：一次处理几十张是否稳定", en: "Batch: stable across dozens of images" },
          { zh: "导出格式：是否支持透明 PNG 与无水印", en: "Export: transparent PNG and no watermark" },
        ],
      },
      { type: "h2", text: { zh: "按场景选", en: "Pick by scenario" } },
      {
        type: "p",
        text: {
          zh: "电商上架统一白底，优先选能一键换白底、批量导出的轻量工具；设计稿抠复杂主体，再上更专业的修图软件精修。",
          en: "For uniform white e-commerce backgrounds, prefer a light tool with one-click white BG and batch export; refine complex subjects in pro editors.",
        },
      },
      {
        type: "quote",
        text: {
          zh: "抠图的目标是「看不出抠过」，而不是「抠出来了」。",
          en: "The goal is 'you can't tell it was cut', not just 'it was cut'.",
        },
      },
      {
        type: "p",
        text: {
          zh: "把主图处理标准化成流水线，上架效率会比逐张手动高出一个量级。",
          en: "Standardize main-image processing into a pipeline and listing efficiency jumps an order of magnitude.",
        },
      },
    ],
  },
  {
    slug: "prompt-engineering-tips",
    title: {
      zh: "提示词工程的 8 个实用技巧：让 AI 更听你的话",
      en: "8 Practical Prompt Engineering Tips to Make AI Obey",
    },
    excerpt: {
      zh: "同样一个模型，提示词写得好坏，结果天差地别。这 8 个技巧都是能马上用的硬招，覆盖角色、结构、约束与迭代。",
      en: "Same model, wildly different results by prompt quality. Eight immediately usable tips on role, structure, constraints, iteration.",
    },
    category: "提示词",
    date: "2026-08-06",
    readingMinutes: 7,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "提示词不是玄学，而是一套「把任务说清楚」的工程方法。掌握下面 8 招，你和大模型的沟通会明显变准。",
          en: "Prompting isn't magic — it's the engineering of stating tasks clearly. These 8 tips sharpen your沟通 with models.",
        },
      },
      { type: "h2", text: { zh: "基础四招", en: "Four basics" } },
      {
        type: "ol",
        items: [
          { zh: "给角色：让 AI 扮演某个专家再回答", en: "Assign a role: have AI answer as an expert" },
          { zh: "给结构：用分段、编号明确输出格式", en: "Give structure: segments and numbering for output format" },
          { zh: "给约束：限定字数、语气、禁止项", en: "Set constraints: length, tone, forbidden items" },
          { zh: "给示例：放一个 few-shot 样板最稳", en: "Show examples: a few-shot sample is the safest" },
        ],
      },
      { type: "h2", text: { zh: "进阶四招", en: "Four advanced" } },
      {
        type: "ul",
        items: [
          { zh: "分步思考：让模型先列步骤再给答案", en: "Step-by-step: ask for steps before the answer" },
          { zh: "反向提问：让它先澄清模糊需求", en: "Clarify first: have it ask back on ambiguity" },
          { zh: "自我校验：要求检查逻辑与事实", en: "Self-check: require logic and fact verification" },
          { zh: "版本迭代：保存好提示词，逐步微调", en: "Iterate: save prompts and tune gradually" },
        ],
      },
      {
        type: "quote",
        text: {
          zh: "差的提示词怪模型，好的提示词怪自己没说清。",
          en: "Bad prompts blame the model; good prompts blame unclear instructions.",
        },
      },
      {
        type: "p",
        text: {
          zh: "把常用提示词存成模板，重复任务一键调用，质量和速度都会上来。",
          en: "Save common prompts as templates for one-click reuse — quality and speed both rise.",
        },
      },
    ],
  },
  {
    slug: "indie-ai-seo-guide",
    title: {
      zh: "AI 工具出海：独立开发者如何做英文内容与 SEO",
      en: "Taking AI Tools Global: Content and SEO for Indie Developers",
    },
    excerpt: {
      zh: "国内卷完去海外，是很多独立开发者的选择。本文讲清英文内容与技术 SEO 的起步动作，帮你用更低成本被海外用户搜到。",
      en: "After China, going global is a common indie move. We cover English content and technical SEO basics to get found overseas cheaper.",
    },
    category: "出海增长",
    date: "2026-08-10",
    readingMinutes: 8,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "出海不是把中文翻译一遍。英文用户的搜索习惯、付费意愿、内容审美都不同，需要单独的内容策略和技术底座。",
          en: "Going global isn't translating Chinese. English users search, pay, and read differently — you need a separate content and tech base.",
        },
      },
      { type: "h2", text: { zh: "内容：用英语讲清楚价值", en: "Content: state value in English" } },
      {
        type: "p",
        text: {
          zh: "海外更吃「解决具体问题的教程型内容」。围绕你的工具能解决的场景写指南，比泛泛的品牌稿更容易带来精准流量。",
          en: "Overseas loves tutorial content that solves specific problems. Write guides around scenarios your tool solves — more precise traffic than brand fluff.",
        },
      },
      { type: "h2", text: { zh: "技术 SEO 起步", en: "Technical SEO basics" } },
      {
        type: "ul",
        items: [
          { zh: "干净的 URL 与规范标签（canonical），避免重复内容", en: "Clean URLs and canonical tags to avoid duplicates" },
          { zh: "多语言用 hreflang 标注，x-default 指向默认语言", en: "Use hreflang for languages; x-default to the default" },
          { zh: "全量 sitemap + 结构化数据，帮爬虫理解页面", en: "Full sitemap + structured data to help crawlers" },
          { zh: "提交 sitemap 到 Search Console，盯索引覆盖", en: "Submit sitemap to Search Console; watch index coverage" },
        ],
      },
      { type: "h2", text: { zh: "别忽略 AI 收录", en: "Don't ignore AI indexing" } },
      {
        type: "p",
        text: {
          zh: "越来越多用户通过 ChatGPT、Perplexity 找工具。保持内容原创、结构清晰、可被抓取，能同时利好传统搜索和 AI 引用。",
          en: "More users find tools via ChatGPT and Perplexity. Original, clear, crawlable content helps both classic search and AI citations.",
        },
      },
      {
        type: "quote",
        text: {
          zh: "出海的第一篇内容，应该是「教用户用你的工具解决一个问题」。",
          en: "Your first overseas post should teach a user to solve one problem with your tool.",
        },
      },
      {
        type: "p",
        text: {
          zh: "先把这一套内容 + 技术底座跑通，再逐步扩语言、扩品类，节奏比一口气铺开更稳。",
          en: "Get this content + tech base working, then expand languages and categories gradually — steadier than a big bang.",
        },
      },
    ],
  },
  {
    slug: "ai-tool-evaluation-framework",
    title: {
      zh: "如何科学评估一款 AI 工具：我们内部用的 6 维打分表",
      en: "How to evaluate an AI tool: our 6-dimension scorecard",
    },
    excerpt: {
      zh: "AI 工具层出不穷，盲目跟风最容易被割韭菜。分享我们内部用来决定「这款工具值不值得进工作流」的 6 个维度。",
      en: "New AI tools appear daily. Here is the 6-dimension scorecard we use to decide whether a tool deserves a place in our workflow.",
    },
    category: "效率办公",
    date: "2026-07-15",
    readingMinutes: 8,
    author: "AI Navigator 编辑部",
    content: [
      { type: "p", text: { zh: "每隔几天就有一个「颠覆性 AI 工具」刷屏，但真正能留在我们日常工作流里的，十年来用手指都数得过来。问题不在于工具少，而在于大多数人靠「看起来很酷」做决定，而不是靠「能不能解决我的具体问题」。我们内部用一张 6 维打分表来评估每一款新工具，分数过线才考虑接入。", en: "A 'game-changing AI tool' goes viral every few days, yet only a handful ever stay in our daily workflow. The issue isn't supply — it's that most people decide by 'looks cool' instead of 'solves my problem'. We use a 6-dimension scorecard; only above the line do we consider adopting." } },
      { type: "h2", text: { zh: "维度一：上手成本", en: "Dimension 1: Onboarding cost" } },
      { type: "p", text: { zh: "一款工具再强，如果注册要审核三天、还要你配 API key、读二十页文档才能跑通第一个例子，它大概率会躺在收藏夹里吃灰。我们给「5 分钟内出第一个结果」的工具打高分，给「需要写代码才能用」的工具扣分——除非它本来就是给开发者用的。", en: "A tool that needs 3-day approval, an API key, and 20 pages of docs before the first result will likely rot in bookmarks. We score high for 'first result in 5 minutes' and deduct for 'needs coding' unless it targets developers." } },
      { type: "h2", text: { zh: "维度二：输出稳定性", en: "Dimension 2: Output consistency" } },
      { type: "p", text: { zh: "把同一个提示词连跑三次，结果差异巨大，说明它不适合放进标准化流程。尤其是写文案、生成代码这类场景，稳定性比「偶尔惊艳」重要得多。我们用一个固定 prompt 测三次，看差异是否在可接受范围。", en: "Run the same prompt three times; huge variance means it doesn't belong in a standard pipeline. For copywriting or code, consistency beats 'occasionally brilliant'. We test one fixed prompt three times." } },
      { type: "h2", text: { zh: "维度三：场景匹配度", en: "Dimension 3: Scenario fit" } },
      { type: "p", text: { zh: "别被功能列表迷惑。关键问题是：它解决的是你本周就要面对的真实任务吗？如果是「也许以后用得上」，先标记，不要现在就纳入。工具数量越多，切换成本越高。", en: "Ignore feature lists. The real question: does it solve a task you face this week? If it's 'maybe someday', bookmark it, don't adopt now. More tools means more switching cost." } },
      { type: "h2", text: { zh: "维度四：隐私与合规", en: "Dimension 4: Privacy & compliance" } },
      { type: "ul", items: [
        { zh: "输入内容会不会被用于训练模型？", en: "Will your inputs be used to train the model?" },
        { zh: "是否支持企业级数据处理协议（如不保留日志）？", en: "Does it offer enterprise-grade handling (e.g. no logs)?" },
        { zh: "涉及客户数据或商业机密时能否放心使用？", en: "Safe to use with customer or confidential data?" },
      ] },
      { type: "p", text: { zh: "对个人玩家影响不大，但凡是涉及客户资料、内部文档的场景，这一维度一票否决。", en: "Minor for hobbyists, but for client or internal data this dimension is a veto." } },
      { type: "h2", text: { zh: "维度五：价格与性价比", en: "Dimension 5: Price & value" } },
      { type: "p", text: { zh: "免费额度够不够日常用？按量计费在用量上来后会不会比订阅还贵？团队版的人均成本是否可控？我们更看重「用得多也不心疼」的曲线，而不是「首月免费」的噱头。", en: "Is the free tier enough for daily use? Does pay-as-you-go get pricier than a sub at scale? We value a 'use-more-without-regret' curve over 'first month free'." } },
      { type: "h2", text: { zh: "维度六：锁定风险", en: "Dimension 6: Lock-in risk" } },
      { type: "p", text: { zh: "能不能导出你的内容？有没有开放 API？社区生态是否活跃？一旦服务商涨价或关停，你能多快迁移走？把「随时能走」当成安全感来源。", en: "Can you export your content? Open API? Active community? If the vendor raises prices or shuts down, how fast can you leave? Treat 'able to leave anytime' as safety." } },
      { type: "h2", text: { zh: "怎么用这张表", en: "How to use the scorecard" } },
      { type: "p", text: { zh: "六个维度各 0–5 分，加权后低于 18 分不接入。我们把它贴在团队文档里，每次有人安利新工具，先打分再开会，省掉大量无效讨论。", en: "Score each 0–5; below 18 weighted we don't adopt. We pin it in team docs — when someone pitches a tool, score first, then meet. Cuts wasted debate." } },
      { type: "quote", text: { zh: "好工具的标准不是「它能做什么」，而是「它让你少做了什么」。", en: "A good tool isn't defined by what it can do, but by what it lets you stop doing." } },
    ],
  },
  {
    slug: "ai-video-script-workflow",
    title: {
      zh: "从 0 到 1：用 AI 流水线生产短视频脚本",
      en: "From 0 to 1: an AI pipeline for short-video scripts",
    },
    excerpt: {
      zh: "脚本是短视频的命门。用一条 AI 流水线把「选题—大纲—正文—标题—标签」串起来，一个人也能稳定日更。",
      en: "The script is the lifeblood of a short video. Wire 'topic → outline → script → title → tags' into one AI pipeline and ship daily solo.",
    },
    category: "视频创作",
    date: "2026-07-18",
    readingMinutes: 9,
    author: "AI Navigator 编辑部",
    content: [
      { type: "p", text: { zh: "很多人做短视频卡在「不知道写什么、写出来又干巴巴」。其实脚本生产完全可以流水线化：把流程拆成五步，每一步交给最合适的 AI，人只做最后的判断和口播。下面是一套我们验证过、单人日更也不累的工作流。", en: "Most creators stall on 'what to write' and 'it reads dry'. Scripting can be pipelined: five steps, each to the right AI, human only judges and speaks. Here's a workflow that sustains solo daily posting." } },
      { type: "h2", text: { zh: "第一步：选题（15 分钟）", en: "Step 1: Topic (15 min)" } },
      { type: "p", text: { zh: "别凭灵感。每天固定从三个来源捞选题：评论区高频问题、竞品爆款评论里的槽点、你自己的搜索记录。把候选丢给 AI，让它按「争议性、实用性、可视觉化」打分排序，你只挑前 3 个。", en: "Skip inspiration. Pull daily from three sources: FAQ in comments, pain points in competitors' comments, your own search history. Ask AI to rank by controversy, usefulness, visualizability; pick top 3." } },
      { type: "h2", text: { zh: "第二步：大纲（5 分钟）", en: "Step 2: Outline (5 min)" } },
      { type: "p", text: { zh: "给 AI 一个固定模板：「钩子 + 3 个要点 + 反转结尾」，让它按选题展开。重点是控制节奏——前 3 秒必须抛冲突或反常识，否则完播率救不回来。", en: "Give AI a fixed template: hook + 3 points + twist ending. Control the rhythm — the first 3 seconds must spark conflict or counter-intuition, or retention dies." } },
      { type: "h2", text: { zh: "第三步：正文（10 分钟）", en: "Step 3: Script (10 min)" } },
      { type: "ul", items: [
        { zh: "每句不超过 20 字，口语化，像跟朋友说话", en: "Under 20 chars per line, spoken, like talking to a friend" },
        { zh: "多用「你」少用「我们」，增强代入感", en: "Use 'you' not 'we' to pull viewers in" },
        { zh: "关键数据加停顿提示，方便后期配画面", en: "Mark pauses at key data for editing" },
      ] },
      { type: "h2", text: { zh: "第四步：标题与封面词（5 分钟）", en: "Step 4: Title & cover text (5 min)" } },
      { type: "p", text: { zh: "同一脚本让 AI 出 10 个标题，按「好奇心缺口」选最扎心的两个做 A/B。封面大字直接用标题里最冲突的那句。", en: "Have AI write 10 titles; pick the two with the strongest curiosity gap for A/B. Cover text = the most conflicting phrase from the title." } },
      { type: "h2", text: { zh: "第五步：标签与发布文案（3 分钟）", en: "Step 5: Tags & post copy (3 min)" } },
      { type: "p", text: { zh: "让 AI 按平台调性给标签：抖音重话题、B站重分区、小红书重关键词。一套脚本多平台分发时，标签要重写，不能直接复制。", en: "AI tags per platform vibe: Douyin loves topics, Bilibili sections, Xiaohongshu keywords. When repurposing one script, rewrite tags — don't copy." } },
      { type: "quote", text: { zh: "流水线不是偷懒，是把脑力留给最值钱的判断。", en: "A pipeline isn't laziness — it frees your brain for the judgments that matter most." } },
    ],
  },
  {
    slug: "ai-design-system-for-non-designers",
    title: {
      zh: "不会设计也能做出高级感：AI 设计工作流",
      en: "High-end looks without a designer: an AI design workflow",
    },
    excerpt: {
      zh: "没有美术功底，靠 AI 也能做出统一的视觉。关键不是工具，而是先定一套「设计系统」再让 AI 填空。",
      en: "No art background? AI can still produce cohesive visuals. The key isn't the tool — it's defining a design system, then letting AI fill it.",
    },
    category: "图像设计",
    date: "2026-07-22",
    readingMinutes: 8,
    author: "AI Navigator 编辑部",
    content: [
      { type: "p", text: { zh: "「我不会设计」是很多人不敢自己做封面、海报、配图的理由。但高级感的本质是「统一」和「克制」，这两件事 AI 最擅长，前提是你先给它规矩。下面是一套零基础也能跑通的设计工作流。", en: "'I can't design' stops many from making covers or posters. But premium feel is really 'consistency' and 'restraint' — exactly what AI is good at, if you set the rules first. Here's a zero-base workflow." } },
      { type: "h2", text: { zh: "先定三件套：字体、配色、间距", en: "Start with three: font, palette, spacing" } },
      { type: "p", text: { zh: "在动手前，先用一句话写清你的视觉基调，比如「科技蓝、留白多、圆角、无衬线」。把它存成每次生成的固定前缀，所有图都套同一套规矩，统一感立刻出来。", en: "Before starting, write one sentence for your visual tone, e.g. 'tech blue, airy whitespace, rounded, sans-serif'. Save it as a fixed prefix for every generation; cohesion appears at once." } },
      { type: "h2", text: { zh: "用参考图代替长描述", en: "Use references, not long prompts" } },
      { type: "p", text: { zh: "描述「高级感」很难，但贴一张你喜欢的图做参考，AI 一下就懂。找 3 张风格一致的作品当 moodboard，生成时直接引用，比写两百字提示词管用。", en: "Describing 'premium' is hard; pasting one reference image AI gets instantly. Collect 3 consistent works as a moodboard and reference them — beats 200 words of prompt." } },
      { type: "h2", text: { zh: "批量出图再筛，不要一次求完美", en: "Batch, then curate — not one perfect shot" } },
      { type: "p", text: { zh: "让 AI 一次出 4 张变体，你只做减法：去掉杂乱背景、去掉奇怪文字、去掉不和谐的色块。筛比造快得多。", en: "Ask AI for 4 variants at once; you only subtract: drop clutter, weird text, off colors. Curating beats creating." } },
      { type: "h2", text: { zh: "最后一道人工关：对齐与留白", en: "Final human pass: alignment & whitespace" } },
      { type: "ul", items: [
        { zh: "文字别贴边，四周留 10% 以上空白", en: "Keep 10%+ margin; don't hug edges" },
        { zh: "主次要分明，一张图只讲一件事", en: "One idea per image; clear hierarchy" },
        { zh: "导出前统一尺寸，避免平台被裁", en: "Unify size before export to avoid cropping" },
      ] },
      { type: "quote", text: { zh: "设计的门槛从来不是手，而是审美上的自律。", en: "The design barrier was never the hand, but aesthetic discipline." } },
    ],
  },
  {
    slug: "ai-knowledge-base-second-brain",
    title: {
      zh: "用 AI 把收藏夹变成第二大脑：个人知识库实操",
      en: "Turn bookmarks into a second brain with AI: a personal KB guide",
    },
    excerpt: {
      zh: "收藏即遗忘是通病。用 AI 给每篇存下来的内容做摘要、打标签、连关系，收藏夹才能真正变成可调用的知识库。",
      en: "Save-and-forget is the norm. Use AI to summarize, tag, and link everything you save, so bookmarks become a queryable knowledge base.",
    },
    category: "效率办公",
    date: "2026-07-25",
    readingMinutes: 9,
    author: "AI Navigator 编辑部",
    content: [
      { type: "p", text: { zh: "浏览器收藏夹、微信收藏、备忘录里躺着的「以后看」，最终大多再也没看过。问题不是你不整理，而是整理成本高于收益。让 AI 接管「读—摘—连」三步，知识库才能真正活起来。", en: "Bookmarks, WeChat favorites, notes full of 'read later' rarely get read. Not because you don't organize, but organizing costs more than it pays. Let AI own read-extract-link, and the KB comes alive." } },
      { type: "h2", text: { zh: "第一步：存的时候就让 AI 读", en: "Step 1: Let AI read on save" } },
      { type: "p", text: { zh: "别只存链接。存的那一刻让 AI 输出三行：一句话核心观点、它解决什么问题、适合什么场景。这三行就是未来搜索的索引。", en: "Don't just save links. On save, have AI output three lines: one-sentence core idea, what problem it solves, what scenario fits. Those three lines become your future search index." } },
      { type: "h2", text: { zh: "第二步：自动打标签与归类", en: "Step 2: Auto tag & categorize" } },
      { type: "p", text: { zh: "给 AI 一组你常用的主题词（如「增长」「AI 工具」「出海」），让它把每条内容归到 1–3 个主题。以后按主题回溯，比翻时间线快十倍。", en: "Give AI your common topics (e.g. 'growth', 'AI tools', 'overseas'), let it tag each item with 1–3. Recall by topic beats scrolling a timeline 10x." } },
      { type: "h2", text: { zh: "第三步：建立内容之间的链接", en: "Step 3: Link items together" } },
      { type: "p", text: { zh: "每月让 AI 扫一遍库，挑出「观点冲突」「互为补充」「同一方法的不同案例」三组关系，主动推给你。知识一旦连起来，才会产生新想法。", en: "Monthly, have AI scan the library and surface three relations: conflicting, complementary, same-method-different-cases. Push them to you. Links spark new ideas." } },
      { type: "h2", text: { zh: "第四步：用提问代替翻找", en: "Step 4: Ask, don't dig" } },
      { type: "p", text: { zh: "真正有价值的是「我之前存过那个关于定价的案例在哪」这种提问。把库接上对话式检索，直接问，AI 把出处和原文片段一起给你。", en: "The real value is questions like 'where's that pricing case I saved'. Wire the library to chat search; ask directly, AI returns the source and excerpt." } },
      { type: "quote", text: { zh: "收藏不是终点，能被问出来的收藏才是资产。", en: "Saving isn't the finish line; a save you can query is an asset." } },
    ],
  },
  {
    slug: "ai-customer-research-for-indie",
    title: {
      zh: "独立开发者用 AI 做用户调研的 5 个低成本方法",
      en: "5 low-cost ways indie devs do user research with AI",
    },
    excerpt: {
      zh: "没预算请调研公司？一个人也能靠 AI 把访谈、评论、竞品里藏着的用户需求挖出来。",
      en: "No budget for a research firm? Solo, you can still mine user needs from interviews, reviews, and competitors with AI.",
    },
    category: "出海",
    date: "2026-07-28",
    readingMinutes: 8,
    author: "AI Navigator 编辑部",
    content: [
      { type: "p", text: { zh: "独立开发者常以为「用户调研」是有钱公司才做的事。其实在立项前花几天做轻量调研，能避开最致命的「做了一个没人要的东西」。下面 5 个方法，零预算、一个人就能跑。", en: "Indie devs often think user research is for funded companies. A few light days before building avoids the fatal 'made something nobody wants'. Five methods, zero budget, solo." } },
      { type: "h2", text: { zh: "方法一：把应用商店评论当问卷", en: "Method 1: Treat app-store reviews as a survey" } },
      { type: "p", text: { zh: "竞品的差评是最好的需求清单。把同类产品的评论导给 AI，让它归纳「用户最骂的 3 个点」和「反复要但没满足的功能」，你的产品机会就在那里。", en: "Competitors' bad reviews are the best needs list. Feed competitor product reviews to AI; ask for 'top 3 complaints' and 'wanted-but-missing features' — your opening is there." } },
      { type: "h2", text: { zh: "方法二：用 AI 模拟目标用户访谈", en: "Method 2: AI-simulated user interviews" } },
      { type: "p", text: { zh: "写清用户画像，让 AI 扮演他跟你对话，追问痛点。这不是真调研，但能帮你提前发现逻辑漏洞、练熟提问话术，再去聊真人时更高效。", en: "Define a persona; let AI play them and probe pain points. Not real research, but it exposes logic gaps and rehearses your questions before real talks." } },
      { type: "h2", text: { zh: "方法三：评论区挖掘真实语言", en: "Method 3: Mine real language from comments" } },
      { type: "p", text: { zh: "用户怎么描述痛点，你就怎么写文案。让 AI 从真实评论里提取高频原话，直接用进落地页和广告，转化通常比自己编的词好。", en: "Use the user's own words for copy. Have AI pull the most frequent phrases from real comments; drop them into the landing page and ads — usually better than invented words." } },
      { type: "h2", text: { zh: "方法四：竞品更新日志趋势分析", en: "Method 4: Competitor changelog trends" } },
      { type: "ul", items: [
        { zh: "连续几周看竞品加了什么功能", en: "Watch what competitors ship week by week" },
        { zh: "让 AI 总结他们在押注哪个方向", en: "Ask AI what direction they're betting on" },
        { zh: "顺势补齐你自己的差异点", en: "Then sharpen your own differentiator" },
      ] },
      { type: "h2", text: { zh: "方法五：小样本真人验证", en: "Method 5: Tiny real-user validation" } },
      { type: "p", text: { zh: "前面都是间接信号。最后找 5 个目标用户做 15 分钟语音，把 AI 整理的假设甩给他们确认。5 个人足够暴露 80% 的方向性错误。", en: "All above are indirect. Finally, 5 target users, 15-min calls, confirm the AI-built hypotheses. Five people expose 80% of directional errors." } },
      { type: "quote", text: { zh: "调研不是为了证明你是对的，是为了早点发现自己错了。", en: "Research isn't to prove you're right — it's to find out you're wrong, early." } },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
