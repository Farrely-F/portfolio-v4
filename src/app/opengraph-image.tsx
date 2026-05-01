import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Farrely Firenza — Front-End Engineer"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f7f5f2",
          padding: "72px 80px",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "6px",
              backgroundColor: "#b85c38",
            }}
          />
          <span
            style={{
              fontSize: "14px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#6b6560",
              fontFamily: "monospace",
            }}
          >
            Portfolio
          </span>
        </div>

        {/* Center content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "800px",
          }}
        >
          <h1
            style={{
              fontSize: "80px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            Farrely Firenza
          </h1>

          <div
            style={{
              width: "120px",
              height: "2px",
              backgroundColor: "rgba(26, 26, 26, 0.12)",
            }}
          />

          <p
            style={{
              fontSize: "28px",
              fontWeight: 600,
              lineHeight: 1.4,
              color: "#1a1a1a",
              margin: 0,
              maxWidth: "640px",
            }}
          >
            Front-End Engineer — I deconstruct ideas before I build them.
          </p>

          <p
            style={{
              fontSize: "20px",
              lineHeight: 1.5,
              color: "#6b6560",
              margin: 0,
              maxWidth: "600px",
            }}
          >
            Building interfaces where users meet emerging tech — from Web3
            payment rails to AI agent dashboards.
          </p>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(26, 26, 26, 0.08)",
            paddingTop: "32px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#a39b94",
              fontFamily: "monospace",
            }}
          >
            site.xfarr.dev
          </span>
          <span
            style={{
              fontSize: "14px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#a39b94",
              fontFamily: "monospace",
            }}
          >
            Tangerang, Indonesia
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
