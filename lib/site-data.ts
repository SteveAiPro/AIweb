import { categoryMap } from "@/data/categories";
import { tools } from "@/data/tools";

export function getCategoryBySlug(slug: string) {
  return categoryMap.get(slug);
}

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(slug: string) {
  return tools.filter((tool) => tool.category === slug);
}

export function searchTools(query: string) {
  const keyword = query.trim().toLowerCase();

  if (!keyword) {
    return tools;
  }

  return tools.filter((tool) => {
    const haystack = [tool.name, tool.summary, tool.description, ...tool.tags].join(" ").toLowerCase();
    return haystack.includes(keyword);
  });
}
