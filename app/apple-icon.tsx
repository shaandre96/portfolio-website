import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Blueprint home-screen icon: construction grid + accent node marker.
export default function AppleIcon() {
  const bg = "#FBFAF7";
  const accent = "#1B6FB8";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: bg,
        backgroundImage:
          "linear-gradient(rgba(27,58,92,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(27,58,92,0.07) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 96,
          height: 96,
          borderRadius: 9999,
          border: `8px solid ${accent}`,
          boxShadow: `0 0 0 14px rgba(27,111,184,0.16)`,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 9999,
            background: accent,
          }}
        />
      </div>
    </div>,
    size,
  );
}
