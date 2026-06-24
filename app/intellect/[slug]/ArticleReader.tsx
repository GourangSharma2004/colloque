"use client";

import { useState } from "react";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Bookmark, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

interface ArticleReaderProps {
  title: string;
  author?: string;
  publishedAt?: string;
  coverImageUrl?: string;
  body: any[];
  categories: string[];
  isPremium: boolean;
  slug: string;
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "17px",
          fontWeight: 300,
          lineHeight: 1.85,
          color: "#2C2C2C",
          marginBottom: "1.5rem",
        }}
      >
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h1
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(32px, 5vw, 52px)",
          fontStyle: "italic",
          fontWeight: 700,
          lineHeight: 1.15,
          color: "#2C2C2C",
          marginTop: "3rem",
          marginBottom: "1rem",
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(24px, 3.5vw, 38px)",
          fontStyle: "italic",
          fontWeight: 700,
          lineHeight: 1.2,
          color: "#2C2C2C",
          marginTop: "2.5rem",
          marginBottom: "0.75rem",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(20px, 2.5vw, 28px)",
          fontStyle: "italic",
          fontWeight: 600,
          lineHeight: 1.3,
          color: "#2C2C2C",
          marginTop: "2rem",
          marginBottom: "0.5rem",
        }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: "3px solid #C9A84C",
          paddingLeft: "1.5rem",
          marginLeft: 0,
          marginRight: 0,
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "22px",
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "#4A4035",
          }}
        >
          {children}
        </p>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong style={{ fontWeight: 600, color: "#1C1914" }}>{children}</strong>
    ),
    em: ({ children }) => <em style={{ fontStyle: "italic" }}>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#C9A84C", textDecoration: "underline" }}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <figure style={{ margin: "2.5rem 0" }}>
          <img
            src={value.asset.url}
            alt={value.alt ?? ""}
            style={{
              width: "100%",
              borderRadius: "4px",
              display: "block",
            }}
          />
          {value.caption && (
            <figcaption
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "12px",
                fontWeight: 300,
                color: "#9A8E7A",
                marginTop: "0.5rem",
                textAlign: "center",
              }}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      ) : null,
  },
};

export default function ArticleReader({
  title,
  author,
  publishedAt,
  coverImageUrl,
  body,
  categories,
  isPremium,
  slug,
}: ArticleReaderProps) {
  const bookmarkId = `article-${slug}`;
  const [isBookmarked, setIsBookmarked] = useState(() => {
    if (typeof window === "undefined") return false;
    const bm = JSON.parse(localStorage.getItem("colloque_bookmarks") || "[]");
    return bm.some((b: any) => b.id === bookmarkId);
  });

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("colloque_bookmarks") || "[]");
    let updated;
    if (isBookmarked) {
      updated = bookmarks.filter((b: any) => b.id !== bookmarkId);
    } else {
      updated = [
        {
          id: bookmarkId,
          label: title,
          href: `/intellect/${slug}`,
          lastRead: Date.now(),
        },
        ...bookmarks,
      ];
    }
    localStorage.setItem("colloque_bookmarks", JSON.stringify(updated));
    setIsBookmarked(!isBookmarked);
  };

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F5EFE6" }}>
      <Navbar active="intellect" />

      {/* ── Cover image ── */}
      {coverImageUrl && (
        <div
          style={{
            width: "100%",
            height: "clamp(280px, 45vh, 520px)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={coverImageUrl}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent 50%, rgba(245,239,230,0.95) 100%)",
            }}
          />
        </div>
      )}

      {/* ── Article body ── */}
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "3rem 1.5rem 6rem",
        }}
      >
        {/* Back link */}
        <Link
          href="/intellect"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#9A8E7A",
            textDecoration: "none",
            marginBottom: "2.5rem",
          }}
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Back to Intellect
        </Link>

        {/* Categories */}
        {categories.length > 0 && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            {categories.map((cat) => (
              <span
                key={cat}
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  border: "1px solid rgba(201,168,76,0.4)",
                  borderRadius: "2px",
                  padding: "3px 8px",
                }}
              >
                {cat}
              </span>
            ))}
            {isPremium && (
              <span
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#F5EFE6",
                  background: "#C9A84C",
                  borderRadius: "2px",
                  padding: "3px 8px",
                }}
              >
                Premium
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontStyle: "italic",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#2C2C2C",
            marginBottom: "1.25rem",
          }}
        >
          {title}
        </h1>

        {/* Meta */}
        {(author || formattedDate) && (
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              marginBottom: "2.5rem",
              paddingBottom: "1.5rem",
              borderBottom: "1px solid #E0D9D0",
            }}
          >
            {author && (
              <span
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#6B5E4E",
                }}
              >
                {author}
              </span>
            )}
            {formattedDate && (
              <span
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "#9A8E7A",
                }}
              >
                {formattedDate}
              </span>
            )}
          </div>
        )}

        {/* Body */}
        <div>
          <PortableText value={body} components={portableTextComponents} />
        </div>
      </div>

      {/* ── Bookmark FAB ── */}
      <button
        onClick={toggleBookmark}
        style={{
          position: "fixed",
          top: "80px",
          right: "2rem",
          zIndex: 1000,
          background: "rgba(20, 20, 20, 0.9)",
          border: "1px solid rgba(201, 168, 76, 0.3)",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
          backdropFilter: "blur(10px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(201, 168, 76, 0.2)";
          e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(20, 20, 20, 0.9)";
          e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.3)";
        }}
        title={isBookmarked ? "Remove bookmark" : "Bookmark this article"}
      >
        <Bookmark
          size={20}
          strokeWidth={1.5}
          fill={isBookmarked ? "#C9A84C" : "none"}
          color={isBookmarked ? "#C9A84C" : "rgba(245, 239, 230, 0.7)"}
        />
      </button>
    </div>
  );
}
