"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { OrbitGlobe } from "@/components/orbit-globe";
import { Dictionary } from "@/lib/i18n/dictionaries";

type HeroSectionProps = {
  totalTools: number;
  totalCategories: number;
  dict: Dictionary;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
} as const;

const cardContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.35 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
} as const;

/**
 * 把标题切成动画单元。
 *
 * CJK 逐字（逐字入场最自然），拉丁字母和数字必须整体成组——否则逐字拆成
 * inline-block 后，"AI" 会被断行拆成 "A" / "I" 两行。空白单独成一个 token，
 * 直接渲染成空格，避免 inline-block 把词间空格吃掉。
 */
function splitTitle(text: string): string[] {
  return text.match(/[\u3400-\u4dbf\u4e00-\u9fff]|[A-Za-z0-9]+|\s+|[^\s]/g) ?? [text];
}

function AnimatedTitle({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const tokens = splitTitle(text);

  return (
    <h1 className={className}>
      {tokens.map((token, i) =>
        /^\s+$/.test(token) ? (
          // 用普通空格 span 保留词间距，不参与动画
          <span key={`${i}-space`}> </span>
        ) : (
          <motion.span
            key={`${i}-${token}`}
            className="inline-block"
            // initial={false} 让「减少动效」用户直接渲染到终态，DOM 结构保持一致，
            // 不会出现 SSR / 客户端结构不一致。
            initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.55, delay: 0.12 + i * 0.04, ease: "easeOut" }
            }
          >
            {token}
          </motion.span>
        ),
      )}
    </h1>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, target, {
      duration: 1.6,
      ease: "easeOut",
    });
    return controls.stop;
  }, [isInView, target, count]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

function StatCard({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const reduce = useReducedMotion();

  // 三张卡向外侧微旋，中间那张不旋——hover 时形成一个朝中心聚拢的扇形，
  // 比三张一起同方向转更像「立起来」而不是整体歪掉。
  const tilt = index === 0 ? 10 : index === 2 ? -10 : 0;

  return (
    <motion.div
      variants={cardVariants}
      style={{ transformPerspective: 900 }}
      whileHover={
        reduce
          ? undefined
          : {
              y: -6,
              rotateX: -8,
              rotateY: tilt,
              scale: 1.03,
              transition: { type: "spring", stiffness: 260, damping: 20 },
            }
      }
      className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-sm"
    >
      <motion.p
        className="text-2xl font-semibold text-slate-950 sm:text-3xl"
        // 绕底边向上翻开，而不是绕中心——绕中心翻会让数字看起来像在原地打转。
        style={{ transformPerspective: 600, transformOrigin: "50% 100%" }}
        initial={reduce ? false : { rotateX: -75, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={
          reduce ? { duration: 0 } : { duration: 0.6, delay: 0.5 + index * 0.12, ease: "easeOut" }
        }
      >
        <AnimatedCounter target={value} suffix={suffix} />
      </motion.p>
      <p className="mt-2 text-sm text-slate-500">{label}</p>
    </motion.div>
  );
}

export function HeroSection({ totalTools, totalCategories, dict }: HeroSectionProps) {
  const t = dict.hero;
  const stats = [
    { label: t.stats.tools, value: totalTools, suffix: "+" },
    { label: t.stats.categories, value: totalCategories, suffix: "" },
    { label: t.stats.scenarios, value: 20, suffix: "+" },
  ];

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
      {/* 柔和青色渐变装饰 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.18),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.12),_transparent_30%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-6rem] h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl"
        animate={{ y: [0, 18, 0], x: [0, -12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[-4rem] left-[-4rem] h-64 w-64 rounded-full bg-sky-300/25 blur-3xl"
        animate={{ y: [0, -14, 0], x: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute inset-y-0 right-[-12%] hidden w-[min(40rem,55vw)] lg:block">
        <OrbitGlobe />
      </div>
      <motion.div
        className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-3xl space-y-7">
          <motion.span variants={itemVariants} className="inline-flex rounded-full bg-cyan-100 px-4 py-1.5 text-sm font-semibold text-cyan-800">
            {t.eyebrow}
          </motion.span>

          {/* 标题不放进 itemVariants 容器：逐字动画自带 y 位移，再叠一层父级
              y 位移会让每个字多走一遍位移，看起来发飘。 */}
          <div className="space-y-5">
            <AnimatedTitle
              text={t.title}
              className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl"
            />
            <motion.p
              variants={itemVariants}
              className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg"
            >
              {t.subtitle}
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <motion.a
              href="#directory"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-600"
            >
              {t.browseAll}
            </motion.a>
            <motion.a
              href="#featured"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-cyan-300 hover:text-cyan-700"
            >
              {t.viewFeatured}
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          className="grid w-full max-w-xl grid-cols-3 gap-4 lg:pb-2"
          variants={cardContainerVariants}
          initial="hidden"
          animate="show"
        >
          {stats.map((item, index) => (
            <StatCard
              key={item.label}
              value={item.value}
              suffix={item.suffix}
              label={item.label}
              index={index}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
