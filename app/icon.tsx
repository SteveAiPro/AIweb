import { ImageResponse } from "next/og";

// 站点 favicon：呼应 site-header 的青→蓝渐变方块 + "AI" 字样。
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          fontWeight: 700,
          color: "white",
          background: "linear-gradient(135deg, #22d3ee, #2563eb)",
          borderRadius: 7,
        }}
      >
        AI
      </div>
    ),
    { ...size },
  );
}
