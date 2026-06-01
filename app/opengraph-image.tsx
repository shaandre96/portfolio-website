import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Blueprint OG card: construction grid, accent rail + node, name & tagline.
export default function OpengraphImage() {
  const bg = "#FBFAF7";
  const ink = "#172A3A";
  const ink2 = "#4A5A66";
  const accent = "#1B6FB8";
  const border = "#D8D4C8";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: bg,
        backgroundImage:
          "linear-gradient(rgba(27,58,92,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(27,58,92,0.06) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 9999,
            background: accent,
          }}
        />
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: accent,
          }}
        >
          node.00 — portfolio
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            fontSize: 84,
            fontWeight: 600,
            letterSpacing: -2,
            color: ink,
            lineHeight: 1.05,
          }}
        >
          Systems that scale.
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 600,
            letterSpacing: -2,
            color: ink2,
            lineHeight: 1.05,
          }}
        >
          Interfaces that feel.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: `1px solid ${border}`,
          paddingTop: 28,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 40, fontWeight: 600, color: ink }}>
            {site.name}
          </div>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ink2,
            }}
          >
            {site.role}
          </div>
        </div>
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: accent,
          }}
        >
          x: 040 — 1240 · eof
        </div>
      </div>
    </div>,
    size,
  );
}
