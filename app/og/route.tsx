import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site-config";

// 站点社交分享图，作为普通图片路由（而非文件约定 opengraph-image），
// 以便在 [lang] 根布局结构下用显式绝对 URL 引用，避免 metadataBase 解析问题。
// 文案用英文以规避 satori 默认字体不含中文字形的问题。
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #020617 60%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 36 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 88,
              height: 88,
              borderRadius: 24,
              fontSize: 40,
              fontWeight: 700,
              background: "linear-gradient(135deg, #22d3ee, #2563eb)",
            }}
          >
            AI
          </div>
          <div
            style={{
              fontSize: 28,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#67e8f9",
            }}
          >
            Original AI tools directory
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700 }}>AI Navigator</div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 24, color: "#cbd5e1", maxWidth: 900 }}>
          Discover the AI tools that fit your workflow.
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 48, color: "#64748b" }}>
          {SITE_URL.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
