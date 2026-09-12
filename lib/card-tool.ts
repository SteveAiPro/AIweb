import type { Tool } from "@/data/tools";

export type CardTool = Pick<
  Tool,
  | "slug"
  | "name"
  | "summary"
  | "website"
  | "category"
  | "tags"
  | "pricing"
  | "featured"
  | "popular"
  | "isNew"
  | "score"
>;

export function toCardTool(tool: Tool): CardTool {
  return {
    slug: tool.slug,
    name: tool.name,
    summary: tool.summary,
    website: tool.website,
    category: tool.category,
    tags: tool.tags,
    pricing: tool.pricing,
    featured: tool.featured,
    popular: tool.popular,
    isNew: tool.isNew,
    score: tool.score,
  };
}
