import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Colloque";
  const cover = searchParams.get("cover");

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F5EFE6",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {cover && (
          <img
            src={cover}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.18,
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: cover
              ? "linear-gradient(135deg, rgba(245,239,230,0.95) 0%, rgba(245,239,230,0.75) 100%)"
              : "linear-gradient(135deg, #F5EFE6 0%, #EDE4D5 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "64px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#C9A84C",
              }}
            />
            <span
              style={{
                fontFamily: "serif",
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#9A8E7A",
              }}
            >
              Colloque
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                width: "48px",
                height: "3px",
                backgroundColor: "#C9A84C",
              }}
            />
            <h1
              style={{
                fontFamily: "serif",
                fontSize: title.length > 40 ? "52px" : "68px",
                fontWeight: 700,
                fontStyle: "italic",
                color: "#2C2C2C",
                lineHeight: 1.1,
                margin: 0,
                maxWidth: "900px",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: "18px",
                fontWeight: 300,
                color: "#6B5E4E",
                letterSpacing: "0.06em",
                margin: 0,
              }}
            >
              Read well. Think sharp. Speak with weight.
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
