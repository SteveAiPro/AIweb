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
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
