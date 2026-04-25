"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

// ── Ideas data ────────────────────────────────────────────────────────────────
const IDEAS = [
  {
    slug: "case-against-sugar",
    title: "The Case Against Sugar",
    hook: "How a century of misread science may have made two of the world's most devastating chronic diseases all but inevitable.",
    opening: "",
    domain: "Metabolic Biology",
    origin: "via Gary Taubes",
    image: "/Sugar.avif",
  },
  {
    slug: "why-english-is-weird",
    title: "Why English Is Genuinely Weird",
    hook: "English is not merely unusual in its spelling — it is structurally, historically, and grammatically unlike any other language on Earth.",
    opening: "",
    domain: "Linguistic History",
    origin: "Original",
    image: "/English Language.jpg",
  },
  {
    slug: "problem-of-mindfulness",
    title: "The Problem of Mindfulness",
    hook: "Mindfulness presents itself as ideology-free — but beneath its calm surface lie metaphysical commitments that quietly reshape how we understand ourselves.",
    opening: "",
    domain: "Philosophy & Ethics",
    origin: "Original",
    image: "/Mindfullness.jpg",
  },
  {
    slug: "end-of-work-crisis-of-meaning",
    title: "The End of Work and the Crisis of Meaning",
    hook: "Work was never just economic. It was the story we told about who we are — and automation is making that story obsolete.",
    opening: "",
    domain: "Labour & Political Economy",
    origin: "Original",
    image: "/Work.png",
  },
  {
    slug: "golden-quarter",
    title: "The Golden Quarter",
    hook: "Between 1945 and 1971, humanity produced more transformative innovation than in the half-century that followed. The question is not just why it happened — it's why it stopped.",
    opening: "",
    domain: "History of Science",
    origin: "Original",
    image: "/innovation.webp",
  },
];

// ── Design tokens ─────────────────────────────────────────────────────────────
const sp = "px-6 md:px-16 lg:px-24";

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#9A8E7A",
};

// ── Idea Card ─────────────────────────────────────────────────────────────────
function IdeaCard({ idea, isMatch = true, hasQuery = false }: { idea: (typeof IDEAS)[0]; isMatch?: boolean; hasQuery?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/intellect/${idea.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        backgroundColor: hovered ? "#FFFFFF" : "#F5EFE6",
        borderRadius: "5px",
        boxShadow: hovered
          ? "0 4px 24px rgba(44,44,44,0.10)"
          : "0 2px 12px rgba(44,44,44,0.06)",
        overflow: "hidden",
        borderBottom: isMatch && hovered ? "2px solid #2C2C2C" : isMatch ? "2px solid transparent" : "2px solid transparent",
        opacity: hasQuery && !isMatch ? 0.25 : 1,
        transform: hasQuery && isMatch ? "scale(1.01)" : "scale(1)",
        transition: "background-color 0.2s, box-shadow 0.2s, border-bottom-color 0.2s, opacity 0.3s, transform 0.3s",
        outline: hasQuery && isMatch ? "2px solid #C9A84C" : "2px solid transparent",
      }}
    >
      {idea.image && (
        <div style={{ width: "100%", height: "340px", overflow: "hidden", flexShrink: 0 }}>
          <img
            src={idea.image}
            alt={idea.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.4s ease, filter 0.4s ease",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              filter: hovered ? "brightness(1.08)" : "brightness(1)",
            }}
          />
        </div>
      )}
      <div style={{ padding: "1.75rem 2rem 1.75rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "24px",
            fontStyle: "italic",
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#2C2C2C",
            marginBottom: "0.6rem",
          }}
        >
          {idea.title}
        </h2>

        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "13px",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#4A4035",
            lineHeight: 1.55,
            marginBottom: "0.9rem",
          }}
        >
          {idea.hook}
        </p>

        {idea.opening && (
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(44,44,44,0.70)",
              marginBottom: "1.5rem",
              flex: 1,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {idea.opening}
          </p>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "0.75rem",
            borderTop: "1px solid #E0D9D0",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#9A8E7A",
            }}
          >
            {idea.domain}
          </span>
          <span
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "11px",
              fontWeight: 300,
              color: "#9A8E7A",
            }}
          >
            {idea.origin}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function IntellectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q")?.toLowerCase().trim() ?? "";
  const clearSearch = () => { if (query) router.replace("/intellect"); };

  const matchesQuery = (idea: (typeof IDEAS)[0]) => {
    if (!query) return true;
    return (
      idea.title.toLowerCase().includes(query) ||
      idea.hook.toLowerCase().includes(query) ||
      idea.opening.toLowerCase().includes(query) ||
      idea.domain.toLowerCase().includes(query) ||
      idea.origin.toLowerCase().includes(query)
    );
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }} onClick={clearSearch}>

      {/* ── Full-page video background ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 70%",
          zIndex: 0,
        }}
      >
        <source src="/video/Intellect.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          zIndex: 1,
        }}
      />

      {/* ── Page content ── */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Navbar active="intellect" />

        {/* ── Hero ── */}
        <section
          className="flex flex-col items-center justify-center text-center px-6"
          style={{ height: "32vh", minHeight: "220px", paddingTop: "56px" }}
        >
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(52px, 8vw, 96px)",
              fontStyle: "italic",
              fontWeight: 700,
              lineHeight: 1,
              color: "#F5EFE6",
              letterSpacing: "-0.02em",
              textShadow: "0 2px 40px rgba(0,0,0,0.45)",
            }}
          >
            Intellect
          </h1>

          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "17px",
              fontWeight: 300,
              color: "rgba(245,239,230,0.80)",
              marginTop: "1.25rem",
              lineHeight: 1.6,
              textShadow: "0 1px 20px rgba(0,0,0,0.5)",
            }}
          >
            Every piece starts with an idea worth thinking about.
          </p>

          <div
            style={{
              width: "96px",
              borderTop: "1px solid rgba(245,239,230,0.40)",
              marginTop: "1.5rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </section>

        {/* ── Ideas Feed ── */}
        <section
          className={`${sp} pt-6 pb-16`}
          style={{ borderTop: "none" }}
        >
          <p style={{ ...labelStyle, color: "rgba(245,239,230,0.50)", marginBottom: "2rem" }}>Ideas</p>

          {query && !IDEAS.some(matchesQuery) && (
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(245,239,230,0.50)", marginBottom: "2rem" }}>
              No results for &ldquo;{searchParams.get("q")}&rdquo;
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onClick={(e) => e.stopPropagation()}>
            {IDEAS.map((idea) => (
              <IdeaCard key={idea.slug} idea={idea} isMatch={matchesQuery(idea)} hasQuery={!!query} />
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="py-8 px-6 md:px-16 lg:px-24 relative flex items-center justify-center">
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "rgba(245,239,230,0.85)",
            }}
          >
            © Converse · Built for thinkers.
          </p>
          <p
            style={{
              position: "absolute",
              left: "clamp(1.5rem, 6vw, 6rem)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "rgba(245,239,230,0.85)",
            }}
          >
            One Topic Every Week
          </p>
        </footer>
      </div>
    </div>
  );
}
