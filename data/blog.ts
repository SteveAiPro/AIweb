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
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
