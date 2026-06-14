import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Navigator | 原创 AI 工具导航",
  description: "按分类和场景快速发现值得尝试的 AI 工具。",
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full bg-slate-50 font-sans text-slate-950">{children}</body>
    </html>
  );
}
