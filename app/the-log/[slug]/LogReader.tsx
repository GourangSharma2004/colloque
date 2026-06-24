"use client";

import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "sanity";
import Navbar from "@/components/Navbar";
import { urlFor } from "@/sanity/lib/image";

interface LogReaderProps {
  title: string;
  publishedAt?: string;
  coverImageUrl?: string;
  body: PortableTextBlock[];
  categories: string[];
  isPremium: boolean;
  likesCount: number;
  slug: string;
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(44,44,44,0.40)",
};

export default function LogReader({
  title,
  publishedAt,
  coverImageUrl,
  body,
  categories,
  isPremium,
  likesCount,
  slug,
}: LogReaderProps) {
  return (
    <div style={{ backgroundColor: "#F5EFE6", minHeight: "100vh" }}>
      <Navbar active="the-log" />

      {/* Hero with cover image */}
      {coverImageUrl && (
        <section style={{ position: "relative", lineHeight: 0 }}>
          <img
            src={coverImageUrl}
            alt={title}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.52)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              zIndex: 10,
              padding: "2rem",
            }}
          >
            {publishedAt && (
              <p
                style={{
                  ...labelStyle,
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  color: "#C9A84C",
                  marginBottom: "1.6rem",
                }}
              >
                {new Date(publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            )}
            <h1
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(52px, 9vw, 120px)",
                fontStyle: "italic",
                fontWeight: 900,
                color: "#F5EFE6",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                marginBottom: "1.8rem",
                textShadow: "0 2px 40px rgba(0,0,0,0.5)",
              }}
            >
              {title}
            </h1>
            {categories.length > 0 && (
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(245,239,230,0.70)",
                }}
              >
                {categories.join(" · ")}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Content */}
      <article
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "4rem 2rem",
        }}
      >
        <PortableText
          value={body}
          components={{
            block: {
              normal: ({ children }) => (
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "18px",
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: "#2C2C2C",
                    marginBottom: "1.5rem",
                  }}
                >
                  {children}
                </p>
              ),
              h2: ({ children }) => (
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(28px, 4vw, 42px)",
                    fontStyle: "italic",
                    fontWeight: 700,
                    color: "#1C1A17",
                    lineHeight: 1.2,
                    marginTop: "3rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(22px, 3vw, 32px)",
                    fontStyle: "italic",
                    fontWeight: 600,
                    color: "#1C1A17",
                    lineHeight: 1.3,
                    marginTop: "2.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  {children}
                </h3>
              ),
            },
            marks: {
              strong: ({ children }) => (
                <strong
                  style={{
                    fontWeight: 600,
                    color: "#1C1A17",
                  }}
                >
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em
                  style={{
                    fontStyle: "italic",
                  }}
                >
                  {children}
                </em>
              ),
            },
          }}
        />
      </article>

      {/* Footer */}
      <footer
        style={{
          padding: "4rem 2rem",
          textAlign: "center",
          borderTop: "1px solid rgba(44,44,44,0.10)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            color: "rgba(44,44,44,0.60)",
            marginBottom: "1rem",
          }}
        >
          {likesCount} likes
        </p>
        <a
          href="/the-log"
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: "#1C1A17",
            textDecoration: "none",
            borderBottom: "1px solid #C9A84C",
            paddingBottom: "2px",
          }}
        >
          ← Back to The Log
        </a>
      </footer>
    </div>
  );
}
