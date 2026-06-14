import { Tool } from "@/data/tools";
import { ToolCard } from "@/components/tool-card";

type ToolSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  tools: Tool[];
};

export function ToolSection({ id, eyebrow, title, description, tools }: ToolSectionProps) {
  return (
    <section id={id} className="w-full">
      <div className="mb-8 flex flex-col gap-3">
        <span className="text-sm font-semibold tracking-[0.2em] text-cyan-700 uppercase">{eyebrow}</span>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>
        <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
