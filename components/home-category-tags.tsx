"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Category } from "@/data/categories";
import { Locale, localePath } from "@/lib/i18n/config";
import { Dictionary } from "@/lib/i18n/dictionaries";

type HomeCategoryTagsProps = {
  items: { category: Category; count: number }[];
  lang: Locale;
  dict: Dictionary;
};

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.08 } },
};

const chip = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export function HomeCategoryTags({ items, lang, dict }: HomeCategoryTagsProps) {
  const t = dict.sections.categories;

  return (
    <section id="directory" className="mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_80px_-35px_rgba(15,23,42,0.25)] lg:p-8"
      >
        <p className="text-sm font-semibold tracking-[0.18em] text-cyan-700 uppercase">{t.eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{t.title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{t.description}</p>

        <motion.div
          className="mt-6 flex flex-wrap gap-3"
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {items.map(({ category, count }) => (
            <motion.div key={category.slug} variants={chip}>
              <Link
                href={localePath(lang, `/category/${category.slug}`)}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-800"
              >
                <span className="mr-2">{category.icon}</span>
                {category.name[lang]}
                <span className="ml-2 text-xs text-slate-400">{count}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
