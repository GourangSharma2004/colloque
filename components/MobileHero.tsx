"use client";

import Link from "next/link";

type Pillar = {
  label: string;
  title: string;
  tagline: string;
  body: string;
  href: string;
  ctaLabel: string;
};

const PILLARS: Pillar[] = [
  {
    label: "01 — PILLAR",
    title: "Intellect",
    tagline: "The ideas that change how you see everything else.",
    body: "Deep documentation on concepts, phenomena, and essays most people encounter but never truly understand. One topic. Every week.",
    href: "/intellect",
    ctaLabel: "Explore →",
  },
  {
    label: "02 — PILLAR",
    title: "Book Summaries",
    tagline: "The book took years to write. You'll feel it in thirty minutes.",
    body: "Not what it says. What it does to you — and what you do differently after.",
    href: "/book-summaries",
    ctaLabel: "Explore →",
  },
  {
    label: "03 — PILLAR",
    title: "AI Resources",
    tagline: "AI is only as sharp as the mind behind it.",
    body: "Tools, guides, frameworks, and models for people who want to think with AI — not hand their thinking over to it.",
    href: "/ai-resources",
    ctaLabel: "Explore →",
  },
  {
    label: "04 — PILLAR",
    title: "Community",
    tagline: "This is where the thinking gets loud.",
    body: "A space to discuss, disagree, and go deeper — with people who actually read before they speak.",
    href: "/community",
    ctaLabel: "Enter the conversation →",
  },
  {
    label: "",
    title: "The Log",
    tagline: "No performance. Just thinking out loud.",
    body: "A weekly record of what's being read, questioned, and reconsidered. A mind working in public.",
    href: "/the-log",
    ctaLabel: "Explore →",
  },
];

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#C9A84C",
  marginBottom: "0.6rem",
};

export default function MobileHero() {
  return (
    <div style={{ backgroundColor: "#F5EFE6" }}>
      {/* ── Hero: static, no scroll-jack ── */}
      <section
        style={{
          position: "relative",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          backgroundColor: "#2C2C2C",
        }}
      >
        <img
          src="/Phone.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
            zIndex: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 1, padding: "0 1.5rem" }}>
          <img
            src="/logo.png"
            alt="Colloque"
            style={{
              width: "min(78vw, 420px)",
              height: "auto",
              display: "block",
              margin: "0 auto",
              filter: "drop-shadow(0 2px 40px rgba(0,0,0,0.3))",
            }}
          />
          <p
            style={{
              marginTop: "0.75rem",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(0.9rem, 4vw, 1.05rem)",
              fontWeight: 300,
              letterSpacing: "0.02em",
              color: "#F5EFE6",
              textShadow: "0 1px 20px rgba(0,0,0,0.5)",
            }}
          >
            Read well. Think sharp. Speak with weight.
          </p>
          <p
            style={{
              marginTop: "2.5rem",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.4rem, 6vw, 1.9rem)",
              fontStyle: "italic",
              fontWeight: 600,
              lineHeight: 1.3,
              color: "#F5EFE6",
              textShadow: "0 1px 20px rgba(0,0,0,0.5)",
            }}
          >
            Colloque is made to be carried.
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "1.75rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.65rem",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(245,239,230,0.6)",
            }}
          >
            Scroll to explore
          </p>
        </div>
      </section>

      {/* ── Pillars: stacked cards, plain scroll ── */}
      {PILLARS.map((pillar, i) => (
        <section
          key={pillar.title}
          style={{
            padding: "3.5rem 1.5rem",
            textAlign: "center",
            borderTop: i === 0 ? "none" : "1px solid rgba(44,44,44,0.08)",
          }}
        >
          {pillar.label && <p style={labelStyle}>{pillar.label}</p>}
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 9vw, 2.6rem)",
              fontWeight: 700,
              fontStyle: "italic",
              lineHeight: 1.15,
              color: "#2C2C2C",
            }}
          >
            {pillar.title}
          </h2>
          <p
            style={{
              marginTop: "0.75rem",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "1rem",
              fontWeight: 400,
              color: "#2C2C2C",
            }}
          >
            {pillar.tagline}
          </p>
          <p
            style={{
              marginTop: "0.75rem",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.9rem",
              fontWeight: 300,
              lineHeight: 1.7,
              color: "rgba(44,44,44,0.70)",
              maxWidth: "440px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {pillar.body}
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <Link
              href={pillar.href}
              style={{
                display: "inline-block",
                border: "1px solid rgba(44,44,44,0.30)",
                color: "#2C2C2C",
                padding: "0.65rem 1.75rem",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textDecoration: "none",
              }}
            >
              {pillar.ctaLabel}
            </Link>
          </div>
        </section>
      ))}

      <p
        style={{
          textAlign: "center",
          padding: "1.5rem",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "0.7rem",
          fontWeight: 500,
          letterSpacing: "0.08em",
          color: "rgba(44,44,44,0.45)",
        }}
      >
        Made by Gourang Sharma
      </p>
    </div>
  );
}
