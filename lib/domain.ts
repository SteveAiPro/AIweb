// 取工具官网的主域名（去掉 www.）。内部相对路径或无域名时返回 undefined。
// 纯函数，无 "use client"，可被服务端组件与客户端组件共用。
export function getDomain(website: string): string | undefined {
  if (!website || website.startsWith("/")) return undefined;
  try {
    const host = new URL(website).hostname.replace(/^www\./, "");
    return host || undefined;
  } catch {
    return undefined;
  }
}
