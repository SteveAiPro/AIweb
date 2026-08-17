"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
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
        className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-3xl space-y-7">
          <motion.span variants={itemVariants} className="inline-flex rounded-full bg-cyan-100 px-4 py-1.5 text-sm font-semibold text-cyan-800">
            {t.eyebrow}
          </motion.span>

          <motion.div variants={itemVariants} className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{t.subtitle}</p>
          </motion.div>

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
          {stats.map((item) => (
            <motion.div
              key={item.label}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5"
            >
              <p className="text-2xl font-semibold text-slate-950 sm:text-3xl">
                <AnimatedCounter target={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-2 text-sm text-slate-500">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
