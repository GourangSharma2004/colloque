"use client";

import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { ArrowLeft, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import ColloqueBot from "@/components/ColloqueBot";

interface BookReaderProps {
  title: string;
  author: string;
  publishedAt?: string;
  coverImageUrl?: string;
  body: any[];
  categories: string[];
  isPremium: boolean;
  rating?: number;
  readTime?: number;
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
    h2: ({ children }) => (
      <h2
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(22px, 3vw, 34px)",
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
          fontSize: "clamp(18px, 2.5vw, 26px)",
          fontStyle: "italic",
          fontWeight: 600,
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
          margin: "2rem 0",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "21px",
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
};

export default function BookReader({
  title,
  author,
  publishedAt,
  coverImageUrl,
  body,
  categories,
  isPremium,
  rating,
  readTime,
  slug,
}: BookReaderProps) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F5EFE6" }}>
      <Navbar active="book-summaries" />

      {/* ── Cover ── */}
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

      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "3rem 1.5rem 6rem",
        }}
      >
        {/* Back */}
        <Link
          href="/book-summaries"
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
          Back to Books
        </Link>

        {/* Categories + Premium */}
        {(categories.length > 0 || isPremium) && (
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
            marginBottom: "0.75rem",
          }}
        >
          {title}
        </h1>

        {/* Author + meta */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            alignItems: "center",
            marginBottom: "2.5rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid #E0D9D0",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: "#6B5E4E",
            }}
          >
            {author}
          </span>
          {rating && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                color: "#C9A84C",
              }}
            >
              <Star size={14} fill="#C9A84C" strokeWidth={0} />
              {rating}/5
            </span>
          )}
          {readTime && (
            <span
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "12px",
                fontWeight: 300,
                color: "#9A8E7A",
              }}
            >
              {readTime} min read
            </span>
          )}
        </div>

        {/* Body */}
        <div>
          <PortableText value={body} components={portableTextComponents} />
        </div>
      </div>

      <ColloqueBot />
    </div>
  );
}
