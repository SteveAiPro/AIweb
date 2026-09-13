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
  {
    slug: "xianyu-slang-complete-guide",
    title: {
      zh: "闲鱼黑话大全：高频暗号对照表（2026 版）",
      en: "Xianyu Slang, Complete: A 2026 Reference of Coded Terms",
    },
    excerpt: {
      zh: "在闲鱼搜「Claude」什么都没有，换成「克劳德」却出来一屏。这份按品类整理的对照表，帮你看懂商品标题到底在说什么。",
      en: "Search \"Claude\" on Xianyu and you get nothing; search \"克劳德\" and the screen fills up. A category-by-category reference to what listing titles actually mean.",
    },
    category: "闲鱼黑话",
    date: "2026-08-18",
    readingMinutes: 9,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "在闲鱼搜「Claude」往往一无所获，但把关键词换成「克劳德」「小克」甚至「cld」，商品立刻出来一屏。这不是卖家故弄玄虚，而是平台的关键词拦截让买卖双方自然形成了一套替代叫法。看不懂这套叫法，你既搜不到东西，也读不懂商品标题。",
          en: "Search \"Claude\" on Xianyu and you'll usually get nothing. Swap it for \"克劳德\", \"小克\", or even \"cld\" and the results appear instantly. Sellers aren't being cryptic for fun — platform keyword filtering pushes both sides into an alternate vocabulary. If you don't know it, you can neither find listings nor read their titles.",
        },
      },
      { type: "h2", text: { zh: "黑话是怎么长出来的", en: "How the slang grows" } },
      {
        type: "p",
        text: {
          zh: "平台会对品牌名、敏感品类词做搜索与发布拦截。卖家为了商品能被搜到，就用谐音、缩写、emoji、梗名替代。久而久之，同一个东西会积累出十几个叫法——其中一部分因为太好用而固化下来，另一部分过一阵就失效了。所以黑话不是一份固定词表，而是一套持续迭代的民间约定。",
          en: "Platforms filter brand names and sensitive category words at both search and listing time. To stay findable, sellers substitute homophones, abbreviations, emoji, and meme names. Over time one product accumulates a dozen aliases — some stick because they work well, others die off. The slang isn't a fixed list; it's a folk convention that keeps rotating.",
        },
      },
      { type: "h2", text: { zh: "AI 会员与账号类：密度最高的一组", en: "AI memberships and accounts: the densest group" } },
      {
        type: "p",
        text: {
          zh: "这是目前更新最快的一类，因为 AI 产品本身迭代快、地区限制多。同一个模型往往有多个并行叫法：",
          en: "This group churns fastest — AI products iterate quickly and carry regional restrictions. A single model often runs several aliases in parallel:",
        },
      },
      {
        type: "ul",
        items: [
          { zh: "Gemini Pro → 哈基米、美国豆包、哥迷你、杰米奈、基迷你、结木奈、双子座 pro", en: "Gemini Pro → 哈基米, 美国豆包, 哥迷你, 杰米奈, 基迷你, 结木奈, 双子座 pro" },
          { zh: "Claude → 克劳德、小克、克牢弟、cld、安特罗匹克", en: "Claude → 克劳德, 小克, 克牢弟, cld, 安特罗匹克" },
          { zh: "GPT / ChatGPT → 狗屁通、奥特曼、鸡皮提、g老师、c0dex、chatppt", en: "GPT / ChatGPT → 狗屁通, 奥特曼, 鸡皮提, g老师, c0dex, chatppt" },
          { zh: "Grok → 马斯克、gr0k、gr克会员", en: "Grok → 马斯克, gr0k, gr克会员" },
          { zh: "Cursor → 光标", en: "Cursor → 光标" },
          { zh: "OpenAI → oai", en: "OpenAI → oai" },
          { zh: "订阅形态词 → 月抛、拼车、车队、business team", en: "Subscription-shape words → 月抛, 拼车, 车队, business team" },
        ],
      },
      {
        type: "p",
        text: {
          zh: "「月抛」指按月使用的短周期订阅，「拼车 / 车队」指多人分摊一个团队席位。看懂这两个词，你就能立刻判断一件商品的计费方式和风险水平——拼车类通常共享账号，稳定性天然更差。",
          en: "\"月抛\" means a short monthly subscription; \"拼车 / 车队\" means several people splitting one team seat. Knowing these two immediately tells you a listing's billing model and risk level — shared-seat arrangements are inherently less stable.",
        },
      },
      { type: "h2", text: { zh: "数字商品与虚拟资产", en: "Digital goods and virtual assets" } },
      {
        type: "ul",
        items: [
          { zh: "虚拟货币 → U、大饼、二饼、usdt、烧饼", en: "Crypto → U, 大饼, 二饼, usdt, 烧饼" },
          { zh: "美国礼品卡 → gift卡、水果卡、DLC 拓展", en: "US gift cards → gift卡, 水果卡, DLC 拓展" },
          { zh: "Google Play → 谷歌商店、咕噜咕噜", en: "Google Play → 谷歌商店, 咕噜咕噜" },
          { zh: "会员 / 点卡 → 88vip 权益出、权益出", en: "Memberships / top-ups → 88vip 权益出, 权益出" },
        ],
      },
      {
        type: "p",
        text: {
          zh: "这一组的风险明显高于 AI 订阅：礼品卡和虚拟资产涉及汇率、来源与合规问题，且几乎无法通过平台售后维权。看到这些词，先假设「出了问题没人能帮你」。",
          en: "This group carries materially higher risk than AI subscriptions: gift cards and virtual assets raise sourcing, FX, and compliance questions, and platform dispute resolution rarely helps. Assume that if something goes wrong, no one can recover it for you.",
        },
      },
      { type: "h2", text: { zh: "硬件与数码", en: "Hardware and gadgets" } },
      {
        type: "ul",
        items: [
          { zh: "显卡 → 大矿卡、矿卡、战术核显卡", en: "GPUs → 大矿卡, 矿卡, 战术核显卡" },
          { zh: "AMD → 农企、按摩店", en: "AMD → 农企, 按摩店" },
          { zh: "苹果 → 果子、水果", en: "Apple → 果子, 水果" },
          { zh: "游戏机 → 红白机、学习机、路由器", en: "Consoles → 红白机, 学习机, 路由器" },
        ],
      },
      {
        type: "p",
        text: {
          zh: "「矿卡」是关键词：它指的是被用于加密货币挖矿的显卡，长期高负载运行、寿命不可控。有些卖家会把矿卡写成「大矿卡」半开玩笑地明示，也有些用「自用」掩盖。买二手显卡前，先确认这一条。",
          en: "\"矿卡\" is the keyword that matters: a GPU previously used for crypto mining, run at sustained high load with unpredictable remaining life. Some sellers openly joke about it as \"大矿卡\"; others hide it behind \"自用\". Confirm this before buying any used GPU.",
        },
      },
      { type: "h2", text: { zh: "社区与内容平台", en: "Communities and content platforms" } },
      {
        type: "ul",
        items: [
          { zh: "X（原 Twitter）→ 推特、黑叉、蓝鸟", en: "X (formerly Twitter) → 推特, 黑叉, 蓝鸟" },
          { zh: "Netflix → 奈飞、网飞、奶飞", en: "Netflix → 奈飞, 网飞, 奶飞" },
          { zh: "小红书 → 小黄书、集美聚集地", en: "Xiaohongshu → 小黄书, 集美聚集地" },
          { zh: "Telegram → 纸飞机、电报、飞机", en: "Telegram → 纸飞机, 电报, 飞机" },
        ],
      },
      { type: "h2", text: { zh: "怎么用这份对照表", en: "How to actually use this" } },
      {
        type: "ol",
        items: [
          { zh: "用别名搜，不要用原名——原名基本被拦截。", en: "Search by alias, not the real name — the real name is usually filtered." },
          { zh: "搜到之后加品类词缩小范围，比如「哈基米 年卡」。", en: "Once you get hits, narrow with a qualifier, e.g. \"哈基米 年卡\"." },
          { zh: "遇到没见过的词先查再聊，别在对话里暴露自己不懂行情。", en: "Look up unfamiliar terms before chatting; don't reveal you're unfamiliar in the thread." },
          { zh: "把「拼车 / 月抛 / 权益出」这类计费词当成风险标签看。", en: "Read billing words like 拼车 / 月抛 / 权益出 as risk labels." },
        ],
      },
      {
        type: "quote",
        text: {
          zh: "黑话只解决「搜不到」的问题，不解决「能不能买」的问题。平台规则和法律法规，不会因为你换了个说法就失效。",
          en: "Slang solves findability, not legitimacy. Platform rules and the law don't change because the wording did.",
        },
      },
    ],
  },
  {
    slug: "xianyu-slang-latest-2026",
    title: {
      zh: "闲鱼最新黑话 2026：今年新增的，和已经失效的",
      en: "Xianyu's Latest Slang in 2026: What's New and What's Dead",
    },
    excerpt: {
      zh: "黑话是一份会过期的词表。Gemini 的叫法一年内换了好几轮，老词还在但已经搜不到东西了——这篇讲清楚它为什么会失效。",
      en: "Slang expires. Gemini's aliases rotated several times in a single year, and the old ones still exist but no longer return results. Here's why.",
    },
    category: "闲鱼黑话",
    date: "2026-09-13",
    readingMinutes: 7,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "「闲鱼黑话」不是一个静态词库。它的生命周期通常是这样的：一个词被发明出来避开拦截，用了几个月开始被平台识别，然后逐渐失效，卖家转向新词。所以你搜不到东西，很多时候不是词错了，而是那个词过期了。",
          en: "\"Xianyu slang\" is not a static dictionary. The life cycle is predictable: a word is invented to dodge filtering, works for a few months, gets recognized by the platform, fades out, and sellers move on. So when a search returns nothing, the term is often not wrong — just expired.",
        },
      },
      { type: "h2", text: { zh: "一个词的完整生命周期", en: "The full life cycle of a term" } },
      {
        type: "ol",
        items: [
          { zh: "发明期：卖家造一个新叫法，圈内先流通。", en: "Invention: a seller coins a new alias, circulating first among insiders." },
          { zh: "扩散期：买家学会之后，搜索量上来，词变得好用。", en: "Diffusion: buyers learn it, search volume rises, the term works well." },
          { zh: "识别期：平台把词加进拦截表，结果开始变少。", en: "Detection: the platform adds it to filters, results thin out." },
          { zh: "衰减期：老词还在用，但基本搜不到有效结果。", en: "Decay: the old term is still in use but returns little of value." },
        ],
      },
      {
        type: "p",
        text: {
          zh: "理解这条曲线，你就知道为什么「别人给我的词」经常不管用——它很可能已经走到第三、第四阶段了。",
          en: "Once you see that curve, it's obvious why \"the word someone gave me\" often fails — it's probably already in stage three or four.",
        },
      },
      { type: "h2", text: { zh: "2026 年变化最快的品类：AI 订阅", en: "The fastest-moving category in 2026: AI subscriptions" } },
      {
        type: "p",
        text: {
          zh: "AI 产品是黑话迭代最猛的领域，原因是双重的：产品本身在快速迭代（新模型、新套餐），同时它们又高度依赖地区与支付方式，天然容易被拦截。以 Gemini Pro 为例，市面上并行流通的叫法至少有七八个：",
          en: "AI products churn hardest, for two compounding reasons: the products themselves iterate fast (new models, new plans), and they're heavily tied to region and payment method, which makes them natural filtering targets. Take Gemini Pro — at least seven or eight aliases circulate in parallel:",
        },
      },
      {
        type: "ul",
        items: [
          { zh: "哈基米——从谐音梗演化而来，传播最广的一个", en: "哈基米 — evolved from a homophone meme, the most widely spread" },
          { zh: "美国豆包 / 美国大豆包——用国内产品做类比命名", en: "美国豆包 / 美国大豆包 — named by analogy to a domestic product" },
          { zh: "哥迷你 / 基迷你 / 杰米奈 / 结木奈 / 哥摸乃——纯谐音变体", en: "哥迷你 / 基迷你 / 杰米奈 / 结木奈 / 哥摸乃 — pure phonetic variants" },
          { zh: "双子座 pro——直译，最接近本名的写法", en: "双子座 pro — a literal translation, closest to the real name" },
        ],
      },
      {
        type: "p",
        text: {
          zh: "同一时期，Claude 这边也有「克劳德 → 小克 → 克牢弟 → cld」的迁移路径。你会发现规律：越短的缩写越晚出现，因为短词更容易被批量匹配。",
          en: "In the same window, Claude moved along 克劳德 → 小克 → 克牢弟 → cld. The pattern is visible: shorter abbreviations appear later, because short strings are easier to match in bulk.",
        },
      },
      { type: "h2", text: { zh: "怎么判断一个词还活着", en: "How to tell whether a term is still alive" } },
      {
        type: "ul",
        items: [
          { zh: "搜出来结果多、且是近几天发布的——说明还在流通。", en: "Many results, posted within the last few days — still in circulation." },
          { zh: "搜出来全是几个月前的老链接——大概率已衰减。", en: "All results are months old — likely decaying." },
          { zh: "搜出来大量不相关商品——平台已经在做模糊匹配，词基本废了。", en: "Mostly irrelevant listings — the platform is fuzzy-matching; the term is effectively dead." },
          { zh: "同时试两三个并行叫法，取结果最集中的那个。", en: "Try two or three parallel aliases and use whichever concentrates results." },
        ],
      },
      {
        type: "quote",
        text: {
          zh: "与其收藏一份词表，不如记住「同一件东西至少有三种叫法」这个事实，然后自己交叉验证。",
          en: "Rather than bookmarking a word list, internalize one fact — every item has at least three names — and cross-check for yourself.",
        },
      },
    ],
  },
  {
    slug: "xianyu-ai-membership-slang",
    title: {
      zh: "闲鱼 AI 会员黑话对照：Gemini、Claude、GPT 都被叫什么",
      en: "Xianyu AI Membership Slang: What Gemini, Claude, and GPT Get Called",
    },
    excerpt: {
      zh: "AI 订阅是闲鱼上黑话最密集的品类。把「哈基米」「狗屁通」「小克」这些叫法拆开看，能直接读出一件商品的计费方式和风险等级。",
      en: "AI subscriptions are Xianyu's densest slang category. Decoding names like 哈基米, 狗屁通, and 小克 lets you read a listing's billing model and risk level straight off the title.",
    },
    category: "闲鱼黑话",
    date: "2026-08-22",
    readingMinutes: 8,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "如果你在做出海或者独立开发，大概率会关心 AI 订阅的成本。闲鱼上确实能买到比官方价低不少的订阅，但前提是你能看懂商品标题——那里的叫法和官网完全是两套语言。",
          en: "If you build for overseas markets or work indie, AI subscription cost matters. Xianyu does offer plans well below list price, but only if you can read the listing titles — they're written in a vocabulary entirely separate from the vendors'.",
        },
      },
      { type: "h2", text: { zh: "模型名：三巨头各自的叫法", en: "Model names: how the big three get renamed" } },
      {
        type: "h3",
        text: { zh: "Gemini 系", en: "Gemini family" },
      },
      {
        type: "p",
        text: {
          zh: "哈基米、美国豆包、美国大豆包、哥迷你、基迷你、杰米奈、结木奈、哥摸乃、这么奶、双子座 pro。其中「美国豆包」用国内产品做类比，是圈内最好懂的一个；「双子座 pro」是直译，最接近本名。",
          en: "哈基米, 美国豆包, 美国大豆包, 哥迷你, 基迷你, 杰米奈, 结木奈, 哥摸乃, 这么奶, 双子座 pro. \"美国豆包\" works by analogy to a domestic product and is the most intuitive; \"双子座 pro\" is a literal translation, closest to the real name.",
        },
      },
      { type: "h3", text: { zh: "Claude 系", en: "Claude family" } },
      {
        type: "p",
        text: {
          zh: "克劳德、小克、克牢弟、cld、cc、安特罗匹克、a/。注意「kyc」也出现在这一组里——它指的是实名认证环节，而不是某个模型。看到 KYC 字样，通常意味着卖家在强调账号已经过验证。",
          en: "克劳德, 小克, 克牢弟, cld, cc, 安特罗匹克, a/. Note that \"kyc\" also appears in this cluster — it refers to the identity-verification step, not a model. Seeing KYC usually means the seller is emphasizing a verified account.",
        },
      },
      { type: "h3", text: { zh: "GPT / ChatGPT 系", en: "GPT / ChatGPT family" } },
      {
        type: "p",
        text: {
          zh: "狗屁通、狗屁提、奥特曼、鸡皮提、g老师、c0dex、chatppt、openai 写作 oai。「奥特曼」指的是 OpenAI 的 CEO，被拿来代指整个产品线；「c0dex」用数字 0 替换字母 o 来规避匹配。",
          en: "狗屁通, 狗屁提, 奥特曼, 鸡皮提, g老师, c0dex, chatppt, and oai for OpenAI. \"奥特曼\" points at OpenAI's CEO and stands in for the whole product line; \"c0dex\" swaps the letter o for a zero to dodge matching.",
        },
      },
      { type: "h2", text: { zh: "比模型名更重要的：计费词", en: "More important than model names: billing words" } },
      {
        type: "p",
        text: {
          zh: "模型名只告诉你是哪个产品，真正决定风险的是这几个计费词。看懂它们，比认出十个谐音更有用。",
          en: "The model name only tells you which product. What actually determines risk are these billing terms — knowing them beats recognizing ten homophones.",
        },
      },
      {
        type: "ul",
        items: [
          { zh: "月抛：按月为周期，到期即失效。便宜，但别指望长期稳定。", en: "月抛 — a monthly cycle that expires at term. Cheap, but don't expect stability." },
          { zh: "拼车 / 车队 / business team：多人共享一个团队席位。单价最低，但随时可能因风控掉线。", en: "拼车 / 车队 / business team — several people sharing one team seat. Lowest unit price, but can drop out anytime to risk control." },
          { zh: "满血版 / 5.5 满血版：强调非阉割、非降级版本。这个词存在本身就说明市场上有很多降级货。", en: "满血版 / 5.5 满血版 — emphasizing a non-crippled, non-downgraded tier. The fact that this word exists tells you downgraded stock is common." },
          { zh: "权益出：把某个大套餐里自己用不上的权益单独转卖，通常是转赠形式。", en: "权益出 — reselling an unused perk from a larger bundle, usually as a transfer." },
        ],
      },
      {
        type: "p",
        text: {
          zh: "一个实用的判断：如果标题同时出现「拼车」和「年卡」，基本可以判定是共享席位，别按独享的预期去买。",
          en: "A practical read: if a title carries both \"拼车\" and \"年卡\", assume a shared seat and don't buy expecting exclusive access.",
        },
      },
      { type: "h2", text: { zh: "三个必须先想清楚的问题", en: "Three questions to settle first" } },
      {
        type: "ol",
        items: [
          { zh: "你买的是「账号」还是「权益」？账号涉及登录权移交，权益通常只是转赠，两者售后完全不同。", en: "Are you buying an account or a perk? Accounts involve handing over login; perks are usually just a transfer. After-sales support differs completely." },
          { zh: "如果中途失效，你的工作流能不能承受？用来做生产环境的账号，不要走拼车。", en: "If it dies mid-term, can your workflow absorb that? Never route production work through a shared seat." },
          { zh: "这个价格低到什么程度？低于官方价太多，通常意味着来源有问题。", en: "How low is the price? Far below list price usually signals a sourcing problem." },
        ],
      },
      {
        type: "quote",
        text: {
          zh: "便宜的订阅省的是钱，贵的是随时可能断掉的风险。把这两个成本放在一起算，答案往往不一样。",
          en: "A cheap subscription saves money and costs you the risk of it vanishing. Weigh both, and the answer often changes.",
        },
      },
    ],
  },
  {
    slug: "xianyu-slang-lookup-methods",
    title: {
      zh: "闲鱼黑话怎么查？3 种方法 + 一个在线词典",
      en: "How to Look Up Xianyu Slang: 3 Methods and an Online Dictionary",
    },
    excerpt: {
      zh: "遇到看不懂的词，别急着问卖家——问出口就等于告诉对方你是新手。三种自查方法，从快到慢排好了。",
      en: "When you hit a term you don't know, don't ask the seller — asking announces you're new. Three self-serve methods, ordered fastest to slowest.",
    },
    category: "闲鱼黑话",
    date: "2026-08-26",
    readingMinutes: 6,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "在闲鱼聊天框里问「这个词是什么意思」，是一步很亏的棋：卖家立刻知道你不在行，议价空间和信任度同时下降。更好的做法是先自查。下面三种方法按速度排序。",
          en: "Typing \"what does this mean?\" into a Xianyu chat is a losing move: the seller instantly knows you're new, and both your bargaining room and their trust drop. Look it up yourself first. Three methods, fastest first.",
        },
      },
      { type: "h2", text: { zh: "方法一：在线黑话词典（最快）", en: "Method 1: An online slang dictionary (fastest)" } },
      {
        type: "p",
        text: {
          zh: "我们做了一份闲鱼黑话速查表，按商品名和别名双向索引，输入任意一个叫法就能反查它指代的真实商品。词条只收录中性的品类替代叫法，敏感类目已经剔除。",
          en: "We maintain a Xianyu slang lookup indexed both ways — by product name and by alias — so you can enter any term and reverse-lookup what it actually refers to. It only covers neutral category substitutes; sensitive categories are excluded.",
        },
      },
      {
        type: "p",
        text: {
          zh: "地址在 AI Navigator 工具页的「闲鱼黑话」条目下，浏览器直接打开就能用，不需要登录。查完再回闲鱼聊天，对话会顺畅很多。",
          en: "It lives under the \"Xianyu Slang\" entry on AI Navigator's tools page — open it in the browser, no login needed. Look it up, then go back to the chat and the conversation flows much better.",
        },
      },
      { type: "h2", text: { zh: "方法二：用平台自己反查（次快）", en: "Method 2: Reverse-search the platform itself (next fastest)" } },
      {
        type: "ol",
        items: [
          { zh: "把不认识的词直接丢进闲鱼搜索框。", en: "Drop the unfamiliar term straight into Xianyu's search box." },
          { zh: "看结果里的商品图片——图片比文字更诚实，往往一眼就知道是什么。", en: "Look at the result thumbnails — images are more honest than titles and usually answer it at a glance." },
          { zh: "如果结果里出现大量同款，说明这个词还在流通；如果结果零散且陈旧，词可能已经衰减。", en: "Many identical listings means the term is live; sparse, dated results mean it may be decaying." },
        ],
      },
      {
        type: "p",
        text: {
          zh: "这一步还能顺便帮你判断价格区间：同一个词的搜索结果里，价格的中位数就是这个品类的市场价。",
          en: "This step also gives you a price band: across results for one term, the median price is the going rate for that category.",
        },
      },
      { type: "h2", text: { zh: "方法三：看词形猜构词法（兜底）", en: "Method 3: Read the word's shape (last resort)" } },
      {
        type: "p",
        text: {
          zh: "大多数黑话逃不出四种构词方式，看懂规律就能猜个八九不离十：",
          en: "Almost all slang falls into four patterns. Learn them and you can make a solid guess:",
        },
      },
      {
        type: "ul",
        items: [
          { zh: "谐音替换：杰米奈、基迷你、克牢弟——读音接近原名。", en: "Phonetic swap: 杰米奈, 基迷你, 克牢弟 — close to the original sound." },
          { zh: "类比命名：美国豆包、酱香科技——拿熟悉的东西打比方。", en: "Analogy: 美国豆包, 酱香科技 — borrowed from something familiar." },
          { zh: "字符变体：c0dex、gr0k、a/——用数字或符号替换字母，专为绕过匹配。", en: "Character variants: c0dex, gr0k, a/ — digits or symbols swapped in specifically to dodge matching." },
          { zh: "梗与缩写：哈基米、cld、oai——来自社区梗或首字母缩写。", en: "Memes and abbreviations: 哈基米, cld, oai — from community memes or initials." },
        ],
      },
      { type: "h2", text: { zh: "不建议做的事", en: "What not to do" } },
      {
        type: "ul",
        items: [
          { zh: "不要在聊天里问「这是什么」。", en: "Don't ask \"what is this?\" in the chat." },
          { zh: "不要用原名去搜，大概率被拦截。", en: "Don't search the real name — it's likely filtered." },
          { zh: "不要因为看懂了一个词就直接下单，先确认计费方式。", en: "Don't order just because you decoded one word — confirm the billing model first." },
        ],
      },
      {
        type: "quote",
        text: {
          zh: "自查的成本是两分钟，问出口的成本是整场议价。",
          en: "Self-checking costs two minutes; asking out loud costs you the whole negotiation.",
        },
      },
    ],
  },
  {
    slug: "xianyu-scam-risk-signals",
    title: {
      zh: "闲鱼避坑：哪些黑话是风险信号",
      en: "Xianyu Safety Guide: Which Slang Terms Are Red Flags",
    },
    excerpt: {
      zh: "黑话本身是中性的，但其中一部分词几乎只出现在高风险交易里。这篇把常见的风险信号按严重程度排了序。",
      en: "Slang itself is neutral, but a subset of terms shows up almost exclusively in high-risk deals. Here they are, ordered by severity.",
    },
    category: "闲鱼黑话",
    date: "2026-09-02",
    readingMinutes: 8,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "先说清楚一件事：用黑话不等于有问题。绝大多数替代叫法只是为了绕开关键词审核，让商品能被搜到。但确实有一小部分词，出现频率和纠纷率高度相关。把它们当成风险标签来读，是性价比很高的习惯。",
          en: "One thing up front: using slang isn't itself a problem. The vast majority of aliases exist only to dodge keyword filters so a listing can be found. But a small subset correlates strongly with disputes. Reading those as risk labels is a cheap habit with real payoff.",
        },
      },
      { type: "h2", text: { zh: "第一级：几乎必然有坑", en: "Tier 1: almost certainly trouble" } },
      {
        type: "ul",
        items: [
          { zh: "要求脱离平台交易：任何「加微信私聊」「走其他渠道付款」的提议，都意味着你放弃了平台的全部售后保护。", en: "Off-platform payment: any \"add me on WeChat\" or \"pay elsewhere\" proposal means you're giving up every layer of platform protection." },
          { zh: "只发收款码、拒绝走担保交易：平台担保是唯一能约束卖家的机制，主动放弃它的人，动机通常不单纯。", en: "Payment QR only, refusing escrow: platform escrow is the only real leverage over a seller. Anyone actively avoiding it rarely has good reasons." },
          { zh: "价格显著低于市场价且催促下单：「今天最后一天」「马上涨价」配合异常低价，是典型的紧迫感话术。", en: "Far-below-market price plus urgency: \"last day\" or \"price goes up\" paired with an anomalous price is textbook pressure selling." },
        ],
      },
      { type: "h2", text: { zh: "第二级：需要额外核实", en: "Tier 2: verify before proceeding" } },
      {
        type: "ul",
        items: [
          { zh: "拼车 / 车队 / business team：共享席位，随时可能因平台风控掉线。价格低是有原因的。", en: "拼车 / 车队 / business team — shared seats that can drop out anytime to risk control. The low price has a cause." },
          { zh: "月抛：短周期订阅，到期即失效。适合试用，不适合承载正式工作。", en: "月抛 — short-cycle subscriptions that expire at term. Fine for testing, not for real work." },
          { zh: "权益出：转赠性质的权益，通常不支持退换，也无法转回。", en: "权益出 — transferred perks, typically non-returnable and non-transferable back." },
          { zh: "来源不明的礼品卡 / 虚拟资产：涉及汇率、来源与合规问题，出问题基本无解。", en: "Gift cards or virtual assets of unclear origin — FX, sourcing, and compliance issues with essentially no recourse." },
        ],
      },
      { type: "h2", text: { zh: "第三级：读法而非风险，但影响判断", en: "Tier 3: not risk, but they shape your read" } },
      {
        type: "ul",
        items: [
          { zh: "满血版 / 5.5 满血版：这个词的存在说明市场上有大量降级版本，务必确认具体版本号。", en: "满血版 / 5.5 满血版 — the word's existence implies lots of downgraded stock. Confirm the exact version." },
          { zh: "矿卡 / 大矿卡：显卡曾被用于挖矿，寿命不可控。有些卖家会半开玩笑地明示。", en: "矿卡 / 大矿卡 — a GPU previously mined on, with unpredictable life. Some sellers admit it half-jokingly." },
          { zh: "自用 / 全新未拆：这类词不构成任何保证，只是卖家自述，别当证据。", en: "自用 / 全新未拆 — these are seller claims, not guarantees. Don't treat them as evidence." },
        ],
      },
      { type: "h2", text: { zh: "一个通用判断框架", en: "A general framework" } },
      {
        type: "ol",
        items: [
          { zh: "这笔交易受不受平台保护？脱离平台 = 直接放弃。", en: "Is this transaction covered by the platform? Off-platform means no." },
          { zh: "这个价格合理吗？低于市场价太多，先找原因再找理由。", en: "Is the price sane? If it's far below market, find the cause before finding excuses." },
          { zh: "卖家是否在制造时间压力？真正的便宜货不需要催你。", en: "Is the seller manufacturing time pressure? Genuine bargains don't need to rush you." },
          { zh: "出问题我能不能举证？聊天记录、商品页截图、付款凭证要留全。", en: "Could you prove your case? Keep the chat log, listing screenshots, and payment records." },
        ],
      },
      {
        type: "quote",
        text: {
          zh: "所有被骗的案例里，受害者都不是看不懂黑话，而是看懂了却仍然跳过了平台担保。",
          en: "In every scam case, the victim didn't fail to understand the slang — they understood it and skipped escrow anyway.",
        },
      },
    ],
  },
  {
    slug: "xianyu-bargain-scripts",
    title: {
      zh: "闲鱼砍价话术：从看懂「米」到成交的完整对话模板",
      en: "Xianyu Bargaining Scripts: From Decoding Slang to Closing a Deal",
    },
    excerpt: {
      zh: "砍价不是硬压价格，而是让卖家觉得你是「爽快且靠谱」的买家。附三段可以直接改用的对话模板。",
      en: "Bargaining isn't about forcing the price down — it's about reading as a decisive, low-friction buyer. Three copy-ready scripts included.",
    },
    category: "闲鱼黑话",
    date: "2026-09-06",
    readingMinutes: 7,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "闲鱼上的议价有一条反直觉的规律：越是表现得急需、越是不懂行情，价格越谈不下来。卖家每天面对几十个砍价的人，能让他愿意让价的，往往不是「求你了」，而是「你看起来会立刻成交且不会添麻烦」。",
          en: "Bargaining on Xianyu follows a counterintuitive rule: the more eager you look, the worse your price. Sellers field dozens of hagglers daily. What actually moves them isn't pleading — it's the impression that you'll close fast and cause no trouble.",
        },
      },
      { type: "h2", text: { zh: "先看懂价格词，再开口", en: "Decode the price words before you speak" } },
      {
        type: "ul",
        items: [
          { zh: "米 / 软妹币 / 圆子 / 馒头 / 🥕——都是「元」的替代写法。", en: "米 / 软妹币 / 圆子 / 馒头 / 🥕 — all substitutes for \"yuan\"." },
          { zh: "私 / DM / 厮 / 4️⃣——让对方私聊，通常是价格不好公开说。", en: "私 / DM / 厮 / 4️⃣ — an invitation to DM, usually because the price can't be stated publicly." },
          { zh: "小刀 / 大刀——「小刀」指可小幅议价，「大刀」指可大幅议价。这两个词能帮你判断报价是否已含水分。", en: "小刀 / 大刀 — a small cut versus a big cut. These two tell you how much padding is baked into the asking price." },
          { zh: "包邮 / 不包邮——运费是谈判筹码，别忽略。", en: "包邮 / 不包邮 — shipping is a bargaining chip; don't ignore it." },
        ],
      },
      {
        type: "p",
        text: {
          zh: "很多卖家在标题写「小刀」其实是礼貌性让步，写「大刀」才是真的急出。看到「大刀」，你可以更从容地报低。",
          en: "Sellers who write \"小刀\" are usually offering a courtesy concession; \"大刀\" means they genuinely want it gone. See \"大刀\" and you can open lower with confidence.",
        },
      },
      { type: "h2", text: { zh: "模板一：标准开场（适用大多数商品）", en: "Script 1: The standard opener (works for most items)" } },
      {
        type: "quote",
        text: {
          zh: "「你好，这个还在吗？我看了下详情，如果 XX 元能出，我现在就拍。价格不合适也没关系，麻烦你回复一下。」",
          en: "\"Hi, is this still available? I've read the listing — if you can do XX, I'll take it right now. If the price doesn't work, no problem, just let me know.\"",
        },
      },
      {
        type: "p",
        text: {
          zh: "这段话做了四件事：确认库存、给出明确报价、表达立即成交意愿、给对方留台阶。没有一句是废话，卖家看完会认真考虑。",
          en: "Four things happen: availability confirmed, a concrete number given, immediate-close intent signaled, and an easy exit offered. Nothing is filler, and the seller takes it seriously.",
        },
      },
      { type: "h2", text: { zh: "模板二：卖家拒绝后的第二次报价", en: "Script 2: Your second offer after a rejection" } },
      {
        type: "quote",
        text: {
          zh: "「理解，那我再问一句：XX 元不包邮可以吗？或者你告诉我一个底价，我看看能不能接受，不浪费你时间。」",
          en: "\"Understood. One more ask: how about XX without shipping included? Or just tell me your floor and I'll say yes or no — won't waste your time.\"",
        },
      },
      {
        type: "p",
        text: {
          zh: "关键是「不浪费你时间」这句。它把议价重新定义为效率问题，而不是拉锯战，卖家配合的意愿会明显上升。",
          en: "The operative phrase is \"won't waste your time\". It reframes the haggle as an efficiency question rather than a tug-of-war, and sellers cooperate noticeably more.",
        },
      },
      { type: "h2", text: { zh: "模板三：有瑕疵商品的压价", en: "Script 3: Pushing back on a flawed item" } },
      {
        type: "quote",
        text: {
          zh: "「图片上 XX 位置有磨损，这个不影响使用的话我能接受，按 XX 元拍可以吗？如果不方便，我再看看。」",
          en: "\"There's wear visible at XX in the photos. If it doesn't affect function I can live with it — can we do XX? If not, I'll keep looking.\"",
        },
      },
      {
        type: "p",
        text: {
          zh: "要点是「具体指出问题」+「表示可以接受」+「给出价格」。只挑毛病不给方案，卖家只会觉得你在找茬。",
          en: "The formula: name the specific flaw, signal you can accept it, then name a price. Complaints without a proposal just read as nitpicking.",
        },
      },
      { type: "h2", text: { zh: "三条不要做的事", en: "Three things not to do" } },
      {
        type: "ol",
        items: [
          { zh: "不要一上来砍一半。幅度过大时卖家会直接不回复。", en: "Don't open at half price. Too big a cut and sellers simply stop replying." },
          { zh: "不要说「我很喜欢这个」。喜欢是溢价信号，和你要降价的目标相反。", en: "Don't say \"I really love this\". Liking is a premium signal — the opposite of what you want." },
          { zh: "不要在议价阶段问太多细节。先谈价，成交后再确认细节，否则容易被判断为「事多」。", en: "Don't interrogate details during price talks. Settle price first, confirm details after — otherwise you read as high-maintenance." },
        ],
      },
      {
        type: "quote",
        text: {
          zh: "砍价的目标不是最低价，是一个双方都不会反悔的价格。",
          en: "The goal isn't the lowest price — it's a price neither side regrets.",
        },
      },
    ],
  },
  {
    slug: "douyin-video-downloader-explained",
    title: {
      zh: "抖音视频下载工具为什么经常失效？技术原因与替代方案",
      en: "Why Douyin Downloaders Keep Breaking — And What Works Instead",
    },
    excerpt: {
      zh: "搜「douyin video downloader」能找到几百个工具，但大部分装好就报错。问题不在工具，在抖音的链接签名机制。",
      en: "Hundreds of tools rank for \"douyin video downloader\", yet most break the moment you paste a link. The problem isn't the tool — it's how Douyin signs its media URLs.",
    },
    category: "视频创作",
    date: "2026-08-20",
    readingMinutes: 8,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "如果你搜过「douyin video downloader」或者「抖音去水印」，会发现结果多到挑不过来，评论区却满是「解析失败」「下载不了」。这不是运气问题，而是这类工具的结构性缺陷。搞清楚原理，你就不会再浪费时间去试第十个网站。",
          en: "Search \"douyin video downloader\" and you'll find more options than you can try — while the comments are full of \"parse failed\" and \"won't download\". That's not bad luck; it's a structural flaw in how these tools work. Understand the mechanism and you stop wasting time on the tenth site.",
        },
      },
      { type: "h2", text: { zh: "失效的根本原因：签名会过期", en: "The root cause: signed URLs expire" } },
      {
        type: "p",
        text: {
          zh: "抖音的视频文件并不在固定地址上。播放时，客户端先请求一次接口，拿到一个带签名参数（时间戳、随机串、校验位）的临时播放地址，这个地址通常几分钟内就会失效。所有下载工具的本质，都是替你去调那个接口、拿到临时地址、再把文件拉回来。",
          en: "Douyin's video files don't live at fixed URLs. On playback, the client calls an API, receives a temporary playback URL carrying signature parameters (timestamp, nonce, checksum), and that URL typically expires within minutes. Every downloader essentially calls that same API for you, grabs the temporary URL, and pulls the file down.",
        },
      },
      {
        type: "ul",
        items: [
          { zh: "签名算法会变——平台每次调整，所有第三方工具同时失效，直到有人逆向出新版本。", en: "The signing algorithm changes — each time it does, every third-party tool breaks simultaneously until someone reverse-engineers the new one." },
          { zh: "风控会识别非客户端请求——没有正确的 Referer、User-Agent 和 Cookie，接口直接拒绝。", en: "Risk control flags non-client requests — without the right Referer, User-Agent, and cookies, the API simply refuses." },
          { zh: "批量调用会被限流——免费工具通常共享一个出口 IP，高峰期集体失败。", en: "Bulk calls get rate-limited — free tools usually share one egress IP and fail together at peak." },
        ],
      },
      { type: "h2", text: { zh: "怎么挑一个不容易坏的", en: "How to pick one that doesn't rot" } },
      {
        type: "ol",
        items: [
          { zh: "优先选服务端解析、不要求你装插件的。要求装扩展的工具，权限风险更大。", en: "Prefer server-side parsing that doesn't ask you to install anything. Extensions requesting broad permissions carry more risk." },
          { zh: "看它支不支持「分享链接」而不只是「复制链接」——前者容错更好。", en: "Check whether it accepts share links, not only copied URLs — share links are more forgiving." },
          { zh: "确认它支持你要的画质。很多工具默认只给最低码率版本。", en: "Confirm it supports the quality you need. Many default to the lowest bitrate rendition." },
          { zh: "看它的更新时间。超过半年没更新的解析类工具，基本可以放弃。", en: "Check the last update. A parsing tool untouched for six months is effectively abandoned." },
        ],
      },
      { type: "h2", text: { zh: "一个务实的用法", en: "A practical workflow" } },
      {
        type: "p",
        text: {
          zh: "我们自己在工具页维护了一个抖音视频下载入口，走服务端解析，支持无水印视频和 MP3 音频提取，不用装任何插件。它同样会受平台签名变更影响——这是所有同类工具共同的宿命——但至少不用你把权限交出去。",
          en: "We maintain a Douyin downloader entry on our tools page: server-side parsing, watermark-free video plus MP3 audio extraction, no plugin required. It's subject to the same signature changes as everything else — that's the shared fate of this category — but at least you're not handing over permissions.",
        },
      },
      { type: "h2", text: { zh: "关于合法使用的边界", en: "Where legitimate use ends" } },
      {
        type: "p",
        text: {
          zh: "下载自己的作品、或已获授权的素材，是正常的内容管理需求——创作者需要备份原始素材、做跨平台分发，这完全可以理解。但把他人的原创视频去掉水印再二次发布，无论技术上多容易，都构成侵权，也可能违反平台协议。工具是中性的，用法不是。",
          en: "Downloading your own work, or material you're licensed to use, is ordinary content management — creators need to back up source files and republish across platforms, and that's entirely reasonable. Stripping the watermark from someone else's original video and reposting it is infringement no matter how easy the tool makes it, and likely violates platform terms too. Tools are neutral; usage isn't.",
        },
      },
      {
        type: "quote",
        text: {
          zh: "判断标准很简单：这段视频是不是你的，或者你有没有得到许可。答案是否定的话，工具再稳也不该用。",
          en: "The test is simple: is this your video, or do you have permission? If not, it doesn't matter how reliable the tool is.",
        },
      },
    ],
  },
  {
    slug: "unblocked-games-traffic-model",
    title: {
      zh: "Unblocked Games 站为什么流量这么大：一个可复制的流量站模型",
      en: "Why Unblocked Games Sites Pull So Much Traffic: A Replicable Model",
    },
    excerpt: {
      zh: "Duckmath 这类站点长期占据大量长尾搜索。拆开看，它其实是一套「零内容成本 + 极低维护」的流量站模型，出海开发者可以直接借鉴。",
      en: "Sites like Duckmath hold huge long-tail search volume. Unpacked, it's a zero-content-cost, near-zero-maintenance traffic-site model that overseas developers can borrow directly.",
    },
    category: "出海增长",
    date: "2026-08-28",
    readingMinutes: 8,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "如果你做需求挖掘，一定在关键词工具里见过这一簇：unblocked games、duckmath、以及一堆以 .io、.games、.cloud 结尾的域名。它们的共同点是搜索量极大、竞争看起来激烈但头部并不集中、内容成本几乎为零。这套模型值得拆开看。",
          en: "If you do demand research, you've seen this cluster in keyword tools: unblocked games, duckmath, and a swarm of .io, .games, and .cloud domains. What they share is enormous search volume, competition that looks fierce yet stays fragmented at the top, and essentially zero content cost. The model is worth unpacking.",
        },
      },
      { type: "h2", text: { zh: "需求从哪里来", en: "Where the demand comes from" } },
      {
        type: "p",
        text: {
          zh: "搜索意图非常明确：用户想找一个「能直接打开就能玩」的网页游戏。这类需求有几个特征，对做站的人来说全是优点：",
          en: "The intent is unambiguous: users want a web game that opens and just plays. That demand has features that are all advantages for a site operator:",
        },
      },
      {
        type: "ul",
        items: [
          { zh: "决策成本极低——用户不比较，打开能玩就留下。", en: "Near-zero decision cost — users don't compare; if it loads and plays, they stay." },
          { zh: "复访率高——同一个游戏会反复回来玩。", en: "High return rate — people come back to the same game repeatedly." },
          { zh: "长尾极长——每个游戏名本身就是一个搜索词，词量以千计。", en: "Very long tail — every game name is its own keyword, numbering in the thousands." },
          { zh: "地域分散——不依赖单一市场，天然适合做英文站。", en: "Geographically diffuse — not tied to one market, which suits an English-language site." },
        ],
      },
      { type: "h2", text: { zh: "成本结构：为什么它能规模化", en: "The cost structure: why it scales" } },
      {
        type: "p",
        text: {
          zh: "关键在于「内容不是自己生产的」。绝大多数游戏是第三方开发者免费发布的 HTML5 作品，站点只做聚合和嵌入。这意味着边际成本接近零：加第一百个游戏和加第一个游戏的成本几乎一样。",
          en: "The key is that the content isn't produced in-house. Most of these games are free HTML5 titles published by third-party developers; the site only aggregates and embeds them. Marginal cost is near zero: adding the hundredth game costs about what the first one did.",
        },
      },
      {
        type: "p",
        text: {
          zh: "这一点和工具站、导航站是同一个逻辑——用别人的供给填自己的流量池。区别在于游戏站的停留时长明显更长，对广告变现更友好。",
          en: "That's the same logic as tool sites and directories — filling your own traffic pool with someone else's supply. The difference is that game sessions run much longer, which suits ad monetization better.",
        },
      },
      { type: "h2", text: { zh: "变现方式与天花板", en: "Monetization and its ceiling" } },
      {
        type: "ul",
        items: [
          { zh: "展示广告是主力，游戏内插屏和侧边栏都有位置。", en: "Display ads lead, with room for in-game interstitials and sidebar units." },
          { zh: "停留时长久意味着单次会话的展示次数高，eCPM 不一定高但总量可观。", en: "Long sessions mean many impressions per visit — eCPM isn't necessarily high, but volume is." },
          { zh: "缺点是用户画像模糊，广告主出价偏低，且广告平台对这类流量审核更严。", en: "The downside is a vague user profile, lower advertiser bids, and stricter review from ad networks on this traffic." },
        ],
      },
      { type: "h2", text: { zh: "这个模型的风险在哪", en: "Where the risks sit" } },
      {
        type: "ol",
        items: [
          { zh: "版权与授权：嵌入他人游戏需要确认许可方式，很多站点在这点上做得不规范。", en: "Rights and licensing: embedding third-party games requires confirming the license, and many sites are sloppy here." },
          { zh: "安全口碑：这类站长期与恶意弹窗、诱导下载关联，新站要花力气建立可信度。", en: "Security reputation: this niche is long associated with malicious pop-ups and drive-by downloads, so a new site must work to earn trust." },
          { zh: "域名依赖：用户靠域名记忆回访，一旦被墙或被封，流量归零。", en: "Domain dependence: users return by remembering the domain, so a block or takedown zeroes your traffic." },
          { zh: "广告政策：部分广告平台明确限制这类内容，接广告前先确认政策。", en: "Ad policies: some networks explicitly restrict this content — check the policy before applying." },
        ],
      },
      { type: "h2", text: { zh: "想借鉴的话，怎么做才不踩线", en: "If you borrow the model, stay clean" } },
      {
        type: "ul",
        items: [
          { zh: "只聚合明确允许嵌入的作品，优先选开源或 CC 授权的游戏。", en: "Only aggregate games that explicitly allow embedding — prefer open-source or CC-licensed titles." },
          { zh: "不要做任何绕过网络管理的暗示。合规的定位是「免费在线游戏」，不是别的。", en: "Never hint at bypassing network controls. The compliant positioning is simply \"free online games\", nothing more." },
          { zh: "把站做干净：无诱导下载、无弹窗劫持。这是这类站唯一的差异化空间。", en: "Keep the site clean: no drive-by downloads, no pop-up hijacking. That's the only real differentiator left in this niche." },
        ],
      },
      {
        type: "quote",
        text: {
          zh: "这个模型的本质是「用免费供给换注意力」，能复制的地方是结构，不能复制的地方是合规底线。",
          en: "The model is fundamentally trading free supply for attention. The structure is copyable; the compliance floor is not optional.",
        },
      },
    ],
  },
  {
    slug: "saas-boilerplate-comparison",
    title: {
      zh: "SaaS Boilerplate 怎么选：MkSaaS、ShipAny、NEXTY 横向对比",
      en: "Choosing a SaaS Boilerplate: MkSaaS vs ShipAny vs NEXTY",
    },
    excerpt: {
      zh: "模板能省掉两周的脚手架工作，但选错会把成本推迟到上线后。从技术栈、支付集成、多语言和授权条款四个维度拆开比。",
      en: "A template saves two weeks of scaffolding — but the wrong pick defers the cost until after launch. Compared across stack, payments, i18n, and licensing.",
    },
    category: "独立开发",
    date: "2026-09-04",
    readingMinutes: 9,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "SaaS 模板（boilerplate）解决的是同一个问题：登录、支付、订阅管理、邮件、后台这些和你的产品创意无关、但必须有的部分。买模板省的是时间，风险在于你被绑在别人的技术选型上。",
          en: "SaaS boilerplates solve one problem: auth, payments, subscription management, email, and admin — the parts unrelated to your product idea but mandatory anyway. Buying one saves time; the risk is being locked into someone else's technical choices.",
        },
      },
      { type: "h2", text: { zh: "先明确：什么情况下该买模板", en: "First: when a boilerplate is actually worth it" } },
      {
        type: "ul",
        items: [
          { zh: "你验证过需求，准备认真做一个要收费的产品。", en: "You've validated demand and are building something you'll charge for." },
          { zh: "你不打算在鉴权和支付上做任何创新。", en: "You have no intention of innovating on auth or payments." },
          { zh: "你能接受模板的技术栈，而不是想换成自己熟悉的。", en: "You can live with the template's stack rather than swapping in your own." },
        ],
      },
      {
        type: "p",
        text: {
          zh: "反过来，如果你还在找方向，或者只是想快速做个落地页验证，模板是过度投资——先用最简单的方案上线，等有付费用户了再补。",
          en: "Conversely, if you're still hunting for a direction or just need a landing page to validate, a boilerplate is overkill. Ship the simplest thing, then upgrade once paying users exist.",
        },
      },
      { type: "h2", text: { zh: "四个真正影响决策的维度", en: "Four dimensions that actually drive the decision" } },
      {
        type: "h3",
        text: { zh: "一、技术栈是否主流", en: "1. Is the stack mainstream?" },
      },
      {
        type: "p",
        text: {
          zh: "Next.js + Tailwind + 某个数据库服务是目前的主流组合。主流的意义不是先进，而是你遇到问题时搜得到答案、招得到人、AI 也更容易帮你改。MkSaaS、ShipAny、NEXTY 都属于这一系。",
          en: "Next.js plus Tailwind plus a managed database is today's mainstream combination. Mainstream matters not because it's superior but because problems have searchable answers, hiring is easier, and AI tools patch it more reliably. MkSaaS, ShipAny, and NEXTY all sit in this family.",
        },
      },
      {
        type: "h3",
        text: { zh: "二、支付集成覆盖哪些地区", en: "2. Which regions do the payment integrations cover?" },
      },
      {
        type: "p",
        text: {
          zh: "这是国内开发者最容易踩的坑。模板通常默认集成 Stripe，但 Stripe 对大陆主体不友好。如果你的收款方案是 Creem、Polar 这类替代品，先确认模板有没有对应适配，否则买回来第一件事就是改支付层。",
          en: "This is where mainland developers trip most often. Boilerplates default to Stripe, which is unfriendly to mainland entities. If your rail is an alternative like Creem or Polar, confirm the template supports it — otherwise your first task after purchase is rewriting the payment layer.",
        },
      },
      {
        type: "h3",
        text: { zh: "三、多语言与 SEO 基础", en: "3. i18n and SEO groundwork" },
      },
      {
        type: "p",
        text: {
          zh: "如果你打算做英文市场，多语言路由、hreflang、sitemap、结构化数据这些基础如果模板已经做好，能省下大量时间。这一点比多一个 UI 组件库重要得多——它是上线后很难补的。",
          en: "If you're targeting English markets, having locale routing, hreflang, sitemaps, and structured data pre-wired saves enormous time. This matters far more than one extra component library, because it's painful to retrofit after launch.",
        },
      },
      {
        type: "h3",
        text: { zh: "四、授权条款", en: "4. Licensing terms" },
      },
      {
        type: "p",
        text: {
          zh: "一次性买断还是按项目授权？能不能用于客户项目？后续版本更新要不要另外付费？这三条必须在下单前读清楚，它决定的是长期成本。",
          en: "One-time purchase or per-project license? Can you use it for client work? Are future updates extra? Settle all three before ordering — they determine long-term cost.",
        },
      },
      { type: "h2", text: { zh: "几个可直接对比的选项", en: "Options you can compare directly" } },
      {
        type: "ul",
        items: [
          { zh: "MkSaaS——功能覆盖全面，文档和展示案例都比较完整，适合想要「开箱即用」的人。", en: "MkSaaS — broad feature coverage with solid docs and showcases; good if you want turnkey." },
          { zh: "ShipAny——定位偏 AI SaaS，内置了不少 AI 相关集成，适合做 AI 产品的团队。", en: "ShipAny — positioned toward AI SaaS with built-in AI integrations; suits teams shipping AI products." },
          { zh: "NEXTY.DEV——强调开发体验与代码组织，适合打算长期维护、会深度改造的人。", en: "NEXTY.DEV — emphasizes developer experience and code organization; good if you'll maintain and modify deeply." },
          { zh: "开源自托管——SaaS-Boilerplate、Next-js-Boilerplate、Open-Launch 这类完全免费，代价是自己解决所有集成问题。", en: "Open-source self-hosted — SaaS-Boilerplate, Next-js-Boilerplate, Open-Launch and similar are free, at the cost of solving every integration yourself." },
        ],
      },
      {
        type: "p",
        text: {
          zh: "我们的工具页里收录了这几个模板的展示站，可以直接看别人用它们做出来的产品长什么样——这比看官网的营销页更接近真实。",
          en: "Our tools page lists showcase sites built on these templates, so you can see what people actually shipped with them — closer to reality than the marketing pages.",
        },
      },
      {
        type: "quote",
        text: {
          zh: "模板省的是前期的时间，不省后期的理解成本。买之前先问自己：这个技术栈我愿不愿意维护两年。",
          en: "A boilerplate saves early time, not later comprehension. Ask first: would I maintain this stack for two years?",
        },
      },
    ],
  },
  {
    slug: "ai-domain-search-guide",
    title: {
      zh: "怎么查 .ai 域名：4 个查询工具对比 + 命名思路",
      en: "How to Check .ai Domains: 4 Tools Compared, Plus Naming Notes",
    },
    excerpt: {
      zh: "做 AI 产品第一步是找域名。.ai 后缀比 .com 便宜得多也更容易拿到，但查询方式和注册商选择都有讲究。",
      en: "Finding a domain is step one for an AI product. .ai is far cheaper and easier to secure than .com — but both lookup and registrar choice matter.",
    },
    category: "独立开发",
    date: "2026-09-10",
    readingMinutes: 7,
    author: "AI Navigator 编辑部",
    content: [
      {
        type: "p",
        text: {
          zh: "给 AI 产品起名时，.com 的好词基本被占完了，而 .ai 后缀的可用率高得多，价格也在可接受范围。这篇文章讲清楚怎么高效查询、以及几个容易忽略的细节。",
          en: "Naming an AI product, the good .com words are long gone while .ai availability is far higher and pricing reasonable. Here's how to search efficiently and the details people miss.",
        },
      },
      { type: "h2", text: { zh: "查询工具怎么选", en: "Choosing a lookup tool" } },
      {
        type: "h3",
        text: { zh: "Instant Domain Search——最快看到结果", en: "Instant Domain Search — fastest results" },
      },
      {
        type: "p",
        text: {
          zh: "边输入边显示多个后缀的注册状态，不用反复提交查询。起名阶段一次性扫几十个候选词效率最高，还会顺带推荐相似的可用域名。",
          en: "Shows registration status across suffixes as you type, no repeated submissions. Best for sweeping dozens of candidates in one sitting, and it suggests similar available names.",
        },
      },
      {
        type: "h3",
        text: { zh: "Query.Domains / NameBeta——批量与比价", en: "Query.Domains / NameBeta — bulk and price comparison" },
      },
      {
        type: "p",
        text: {
          zh: "这两个更偏批量查询和跨注册商比价。同一后缀在不同注册商的首年价差可能很大，续费价差更大，值得先比一遍再决定在哪买。",
          en: "These lean toward bulk queries and cross-registrar price comparison. First-year prices for the same suffix can differ widely between registrars — and renewal prices differ even more, so compare before buying.",
        },
      },
      {
        type: "h3",
        text: { zh: "VirusTotal——买之前查黑历史", en: "VirusTotal — check the history before buying" },
      },
      {
        type: "p",
        text: {
          zh: "这一步经常被跳过，但很重要。一个到期释放的域名可能曾经被用于垃圾邮件或恶意内容，带着现成的黑名单记录。买之前跑一次，能避开一类很难清理的麻烦。",
          en: "This step gets skipped and shouldn't be. An expired domain may have been used for spam or malicious content and carries an existing blacklist record. One check before purchase avoids a class of problems that's very hard to clean up.",
        },
      },
      { type: "h2", text: { zh: "注册商：在哪买", en: "Registrars: where to buy" } },
      {
        type: "ul",
        items: [
          { zh: "Namecheap——老牌，界面简单，支持支付宝，首年常有优惠码。", en: "Namecheap — established, simple UI, Alipay support, frequent first-year promo codes." },
          { zh: "Spaceship——Namecheap 团队推出的新品牌，首年与续费价通常更低。", en: "Spaceship — a newer brand from the Namecheap team, usually cheaper on both first year and renewal." },
        ],
      },
      {
        type: "p",
        text: {
          zh: "两个实操建议：一是优先看续费价而不是首年价，很多注册商用低价首年吸引，第二年开始翻倍；二是确认 WHOIS 隐私保护是否包含在价格里，有些注册商单独收费。",
          en: "Two practical notes: prioritize renewal price over first-year price, since many registrars bait with cheap entry and double it in year two; and confirm whether WHOIS privacy is bundled, because some charge separately.",
        },
      },
      { type: "h2", text: { zh: "命名上的几个思路", en: "A few naming angles" } },
      {
        type: "ol",
        items: [
          { zh: "短词优先。域名越短越容易被记住和口头传播，这在冷启动阶段很值钱。", en: "Shorter is better. Short domains are easier to remember and say aloud, which is valuable during cold start." },
          { zh: "避开连字符和数字。它们在口播和输入时都是额外摩擦。", en: "Avoid hyphens and digits. Both add friction when spoken or typed." },
          { zh: "用功能词而不是抽象词。用户搜索时用的是功能词，域名里带上它有利于被搜到。", en: "Prefer functional words over abstract ones. Users search by function, and having it in the domain helps discoverability." },
          { zh: "注册前先查商标。尤其是面向欧美市场时，撞上已有商标可能导致被迫改名。", en: "Check trademarks before registering. Especially for Western markets, a collision can force a rename." },
        ],
      },
      {
        type: "quote",
        text: {
          zh: "域名不决定产品成败，但一个难记的域名会持续消耗你的传播效率。花一小时选好，比上线后换域名便宜得多。",
          en: "A domain won't make or break a product, but a forgettable one quietly taxes every share. An hour of choosing beats migrating after launch.",
        },
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
