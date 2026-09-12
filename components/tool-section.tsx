"use client";

import { motion } from "framer-motion";
import { Tool } from "@/data/tools";
import { ToolCard } from "@/components/tool-card";
import { Locale } from "@/lib/i18n/config";
import { Dictionary } from "@/lib/i18n/dictionaries";

type ToolSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  tools: Tool[];
  lang: Locale;
  dict: Dictionary;
};

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export function ToolSection({
  id,
  eyebrow,
  title,
  description,
  tools,
  lang,
  dict,
}: ToolSectionProps) {
  return (
    <section id={id} className="w-full">
      <motion.div
        className="mb-8 flex flex-col gap-3"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <span className="text-sm font-semibold tracking-[0.2em] text-cyan-700 uppercase">{eyebrow}</span>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>
        <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
      </motion.div>

      <motion.div
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {tools.map((tool) => (
          <motion.div key={tool.slug} variants={item}>
            <ToolCard tool={tool} lang={lang} dict={dict} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
