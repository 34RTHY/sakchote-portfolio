import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/config";
import { projects } from "@/data/projects";
import { awards } from "@/data/awards";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          backgroundColor: "#0C0B0A",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 80,
            height: 4,
            background: "linear-gradient(to right, #E8C872, transparent)",
            marginBottom: 40,
          }}
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#f5f5f5",
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          {siteConfig.fullName}
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#a3a3a3",
            maxWidth: 800,
            marginBottom: 40,
            lineHeight: 1.4,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            display: "flex",
            gap: 32,
            fontSize: 18,
            color: "#737373",
          }}
        >
          <span>
            <span style={{ color: "#E8C872", fontWeight: 600 }}>{projects.length}</span> Projects
          </span>
          <span>
            <span style={{ color: "#E8C872", fontWeight: 600 }}>{awards.length}</span> Awards
          </span>
          <span style={{ color: "#E8C872", fontWeight: 600 }}>IEEE Published</span>
          <span>{siteConfig.keywords}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
