"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Intellect Pillar Page
// Template page — clone this file for Book Summaries, AI Resources, The Log,
// and Community. Update: pillarNumber, pillarKey, title, tagline, LATEST_DROP,
// ARCHIVE_CARDS, CURATED_READS, and the active prop on <Navbar />.
// ─────────────────────────────────────────────────────────────────────────────

import Navbar from "@/components/Navbar";

// ── Pillar metadata ───────────────────────────────────────────────────────────
const title        = "Intellect";
const tagline      = "The ideas that change how you see everything else.";

// ── Latest Drop content ───────────────────────────────────────────────────────
const LATEST_DROP = {
  concept: "The Overton Window",
  subtitle:
    "Why the ideas you're allowed to say out loud are smaller than you think",
  description:
    "Every era has an invisible frame that decides which ideas are acceptable in public discourse. Understanding it changes how you read news, politics, and your own conversations.",
  readTime: "12 min read",
};

// ── Archive cards (5 placeholder concepts) ────────────────────────────────────
const ARCHIVE_CARDS = [
  {
    title: "The Dunning-Kruger Effect",
    desc: "Why the least competent are often the most confident — and what that means for self-assessment.",
    tag: "Psychology",
    readTime: "8 min",
  },
  {
    title: "The Lindy Effect",
    desc: "How age predicts future survival better than almost any modern forecast model.",
    tag: "Systems Thinking",
    readTime: "6 min",
  },
  {
    title: "Goodhart's Law",
    desc: "When a measure becomes a target, it ceases to be a good measure. The quiet corruption of metrics.",
    tag: "Economics",
    readTime: "5 min",
  },
  {
    title: "The Mere Exposure Effect",
    desc: "We like things more simply because we've encountered them before. Here's why that's dangerous.",
    tag: "Cognitive Science",
    readTime: "6 min",
  },
  {
    title: "Survivorship Bias",
    desc: "We study winners and draw conclusions. We forget about the invisible graveyard of losers.",
    tag: "Logic & Reasoning",
    readTime: "7 min",
  },
];

// ── Curated reads (4 external essays) ────────────────────────────────────────
const CURATED_READS = [
  {
    title: "The Premium Mediocre Life of Maya Millennial",
    source: "Ribbonfarm",
  },
  {
    title: "The Tyranny of Structurelessness",
    source: "Aeon",
  },
  {
    title: "A Curation of Mental Models",
    source: "Farnam Street",
  },
  {
    title: "On Being Wrong in Public",
    source: "LessWrong",
  },
];

// ── Shared style tokens ───────────────────────────────────────────────────────
const sectionLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#A8852A",  // subtle gold
};

const sectionPadding = "px-6 md:px-16 lg:px-24";

// Cream palette tokens
const C = {
  pageBg:    "#F5EFE6",   // main cream
  heroBg:    "#EDE5D8",   // slightly deeper parchment for hero
  cardBg:    "#EDE7DC",   // warm off-white card
  cardHover: "#E3D9CC",   // card hover
  border:    "#D4CCBF",   // warm taupe divider
  gridGap:   "#D4CCBF",   // grid separator colour
  textPrimary:   "#1C1914",  // near-black warm
  textSecondary: "#4A4438",  // warm mid-tone
  textMuted:     "#9A8E7A",  // warm muted
  accent:        "#2C2C2C",  // charcoal accent
  gold:          "#C4973A",  // refined gold accent
  goldMuted:     "#A8852A",  // subtler gold for labels
};

// ─────────────────────────────────────────────────────────────────────────────

export default function IntellectPage() {
  return (
    <div style={{ backgroundColor: C.pageBg, minHeight: "100vh" }}>
      {/* A. Navbar — fixed, not on landing page */}
      <Navbar active="intellect" />

      {/* ── B. Hero Section ─────────────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: "70vh",
          minHeight: "480px",
          backgroundColor: C.heroBg,
        }}
      >
        {/* Subtle grain texture overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Centered hero content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(60px, 9vw, 96px)",
              fontStyle: "italic",
              fontWeight: 700,
              lineHeight: 1.05,
              color: C.textPrimary,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h1>

          {/* Tagline */}
          <p
            className="mt-5 max-w-lg"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "18px",
              fontWeight: 300,
              lineHeight: 1.65,
              color: C.textSecondary,
            }}
          >
            {tagline}
          </p>

          {/* Divider */}
          <div
            className="mt-8"
            style={{ width: "40px", height: "1px", backgroundColor: C.gold }}
          />
        </div>
      </section>

      {/* ── C. Latest Drop ──────────────────────────────────────────────────── */}
      <section
        className={`${sectionPadding} py-16`}
        style={{ borderTop: `1px solid ${C.border}` }}
      >
        {/* Section label */}
        <p style={sectionLabelStyle} className="mb-8">
          Latest Drop
        </p>

        {/* Large horizontal card */}
        <div
          className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 transition-all duration-300"
          style={{
            backgroundColor: C.cardBg,
            borderLeft: `2px solid ${C.gold}`,
            padding: "2rem 2.5rem",
          }}
        >
          {/* Left — concept title */}
          <div className="flex-1">
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontStyle: "italic",
                fontWeight: 600,
                lineHeight: 1.2,
                color: C.textPrimary,
              }}
            >
              {LATEST_DROP.concept}
            </h2>
            <p
              className="mt-2"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(18px, 2.5vw, 24px)",
                fontStyle: "italic",
                fontWeight: 300,
                color: C.textSecondary,
                lineHeight: 1.35,
              }}
            >
              {LATEST_DROP.subtitle}
            </p>
          </div>

          {/* Right — description + read link */}
          <div className="flex-1 flex flex-col gap-5">
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "15px",
                fontWeight: 300,
                lineHeight: 1.75,
                color: C.textSecondary,
              }}
            >
              {LATEST_DROP.description}
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="transition-all duration-300"
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: C.gold,
                  textDecoration: "none",
                  borderBottom: `1px solid rgba(196,151,58,0.35)`,
                  paddingBottom: "2px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = C.gold;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "rgba(196,151,58,0.35)";
                }}
              >
                Read →
              </a>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "12px",
                  color: C.textMuted,
                }}
              >
                {LATEST_DROP.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── D. Archive Grid ─────────────────────────────────────────────────── */}
      <section
        className={`${sectionPadding} py-16`}
        style={{ borderTop: `1px solid ${C.border}` }}
      >
        {/* Section label */}
        <p style={sectionLabelStyle} className="mb-8">
          Archive
        </p>

        {/* 3-column responsive grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ backgroundColor: C.gridGap }}
        >
          {ARCHIVE_CARDS.map((card, idx) => (
            <a
              key={idx}
              href="#"
              className="block transition-all duration-300"
              style={{
                backgroundColor: C.pageBg,
                padding: "1.75rem 2rem",
                textDecoration: "none",
                borderLeft: "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = C.gold;
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.cardBg;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.pageBg;
              }}
            >
              {/* Concept name */}
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "24px",
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: C.textPrimary,
                  lineHeight: 1.2,
                  marginBottom: "0.6rem",
                }}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: C.textSecondary,
                  marginBottom: "1.25rem",
                }}
              >
                {card.desc}
              </p>

              {/* Tag + read time */}
              <div className="flex items-center gap-4">
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: C.textMuted,
                    border: `1px solid ${C.border}`,
                    padding: "2px 8px",
                  }}
                >
                  {card.tag}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "12px",
                    color: C.textMuted,
                  }}
                >
                  {card.readTime}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── E. Curated Reads Strip ───────────────────────────────────────────── */}
      <section
        className={`${sectionPadding} py-16`}
        style={{ borderTop: `1px solid ${C.border}` }}
      >
        {/* Section label */}
        <p style={sectionLabelStyle} className="mb-8">
          Curated Reads
        </p>

        {/* Horizontally scrollable row */}
        <div
          className="flex gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {CURATED_READS.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="flex-shrink-0 flex flex-col justify-between transition-all duration-300"
              style={{
                width: "240px",
                backgroundColor: C.cardBg,
                padding: "1.5rem",
                textDecoration: "none",
                borderTop: "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderTopColor = C.gold;
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.cardHover;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderTopColor = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.cardBg;
              }}
            >
              {/* Essay title */}
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "18px",
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: C.textPrimary,
                  lineHeight: 1.35,
                  marginBottom: "1rem",
                }}
              >
                {item.title}
              </p>

              {/* Source */}
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: C.textMuted,
                }}
              >
                {item.source}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* ── F. Footer ───────────────────────────────────────────────────────── */}
      <footer
        className={`${sectionPadding} py-10 flex items-center justify-center`}
        style={{ borderTop: `1px solid ${C.border}` }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "12px",
            fontWeight: 300,
            letterSpacing: "0.06em",
            color: C.textMuted,
          }}
        >
          © Converse · Built for thinkers.
        </p>
      </footer>
    </div>
  );
}
