"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import Navbar from "@/components/Navbar";

// ── Design tokens ──────────────────────────────────────────────────────────────
const LABEL: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(44,44,44,0.40)",
};

// Matches the site-wide horizontal padding used in other pillar pages
const sp = "px-6 md:px-16 lg:px-24";

// ── Data ───────────────────────────────────────────────────────────────────────
const PAST_ENTRIES = [
  {
    slug: "week-00-april-2026",
    week: "Week 00 · April 2026",
    headline: "The quiet before everything started to make sense",
  },
  {
    slug: "week-minus-01-march-2026",
    week: "Week −01 · March 2026",
    headline: "On running out of excuses and into motion",
  },
  {
    slug: "week-minus-02-march-2026",
    week: "Week −02 · March 2026",
    headline: "Three books, two ideas, one decision I'd been avoiding",
  },
  {
    slug: "week-minus-03-february-2026",
    week: "Week −03 · Feb 2026",
    headline: "Building in public — the discomfort and why it matters",
  },
];

const SAMPLE_COMMENTS = [
  {
    name: "Arjun M.",
    date: "April 20, 2026",
    text: "The bit about trusting your own judgment hit differently. I've been in that same loop for months.",
  },
  {
    name: "Priya S.",
    date: "April 21, 2026",
    text: "This is exactly what I needed to read this week. Keep writing, Gourang.",
  },
];

const BLOG_POSTS = [
  {
    slug: "week-01-april-2026",
    week: "Week 01 · April 2026",
    headline: "The week I decided to stop waiting for perfect",
    excerpt: "Three things I'd been sitting on for weeks all started clicking into place at once. Not because I planned it.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
    body: [
      "I've been waiting. For the right moment, the right setup, the right words. I told myself I needed one more week to plan. Then another. Then another. Until this week, when something shifted and I just — started.",
      "The thing about waiting for perfect is that perfect is a moving target. Every time you get close, it recalibrates. The startup founder who waited to launch until the product was ready — it was never ready. The writer who waited until she had the right desk — she's still waiting.",
      "This week I shipped the first version of The Log. It's rough in places. The mobile layout needs work. Some of the copy reads like a rough draft. But it's out there. And for the first time in months, I feel like I'm actually building something instead of just planning to.",
      "The decision wasn't dramatic. It was just — enough. Enough deliberating. Enough optimising on paper. The moment I stopped waiting, the work got easier. Not the problems — those are still there. But the weight of not starting lifted. That weight, I've decided, is heavier than any problem the work itself will bring.",
    ],
  },
  {
    slug: "week-00-april-2026",
    week: "Week 00 · April 2026",
    headline: "The quiet before everything started to make sense",
    excerpt: "Some weeks nothing happens and everything changes. This was that week.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    body: [
      "There's a particular kind of silence that comes just before things clarify. It doesn't feel productive. You're not writing, not building, not meeting. You're just sitting with everything you've accumulated and letting it settle.",
      "That was Week 00 for me. I had all the pieces — the name, the rough architecture of Converse, the sense of what I wanted to say with The Log. But none of it was connected. It existed as fragments.",
      "Then, on a Tuesday afternoon, I opened a blank document and started drawing lines between things. What I cared about. What I kept coming back to. What annoyed me about the internet and what I thought it could be. The clarity didn't come from working harder — it came from stepping back long enough to see the shape.",
      "Week 00 wasn't the beginning. It was the moment I understood what the beginning had been building toward.",
    ],
  },
  {
    slug: "week-minus-01-march-2026",
    week: "Week −01 · March 2026",
    headline: "On running out of excuses and into motion",
    excerpt: "The excuses were good ones. That was the problem.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    body: [
      "The excuses were legitimate. I had exams. The timing wasn't right. I didn't have a co-founder. The market was saturated. I hadn't validated the idea properly. Each one was true enough to stand on its own.",
      "But when you line up twelve legitimate excuses in a row, something becomes clear: you're not looking for permission to stop — you're looking for permission to start, and framing the absence of that permission as a reason to wait.",
      "This month I ran out of excuses. Not because the conditions changed. Exams are still happening. I still don't have a co-founder. The timing is no more right than it was in November. I just got tired of being the thing standing between me and the work.",
      "Motion, I've learned, creates its own permission. You don't need the conditions to be right. You need to be moving. The conditions sort themselves out — or they don't, and you figure out how to work around them.",
    ],
  },
  {
    slug: "week-minus-02-march-2026",
    week: "Week −02 · March 2026",
    headline: "Three books, two ideas, one decision I'd been avoiding",
    excerpt: "Reading is easy. Deciding what to do with what you've read is the harder work.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    body: [
      "I finished three books this month: The Almanack of Naval Ravikant, Zero to One, and The War of Art. Each one pointed at something different but somehow they all converged on the same uncomfortable question: what are you actually building, and why are you not building it yet?",
      "Naval on leverage — specifically on building something that works while you sleep. Thiel on the danger of competition and the value of creating your own category. Pressfield on Resistance, the force that keeps you safe and small and exactly where you are.",
      "Two ideas came out of this reading. First: Converse isn't competing with Twitter or Substack — it's a different kind of thing entirely, for people who want depth over volume. Second: The Log is the accountability mechanism. If I'm writing about building in public, I have to actually build in public.",
      "The decision I'd been avoiding: telling people. Not just building quietly and hoping someone finds it, but actively putting it out there and accepting the discomfort of being seen doing something before it's finished.",
    ],
  },
  {
    slug: "week-minus-03-february-2026",
    week: "Week −03 · Feb 2026",
    headline: "Building in public — the discomfort and why it matters",
    excerpt: "The first post is always the hardest. This is the first post.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    body: [
      "Building in public is one of those phrases that sounds romantic until you actually try to do it. Then it's just uncomfortable. You're showing people unfinished work. You're admitting to uncertainty. You're making it possible for people to watch you fail.",
      "I've been thinking about why it matters anyway. Not the tactical reasons — building an audience, getting early feedback, creating accountability. Those are real, but they're not the real reason.",
      "The real reason is this: most of what we know about building things has been written after the fact. Successful founders write about their journey once they've succeeded, which means the narrative is shaped by the outcome. The struggles get sanitised. The uncertainty becomes foreknowledge.",
      "Building in public is an attempt to document the uncertainty in real time, before the outcome is known. That feels important. Not because my story will necessarily be interesting, but because an honest account of trying — with all the doubt and dead ends intact — might be more useful to someone else than a retrospective success story.",
    ],
  },
];

const STACK_LINES = [
  "📖 Reading — Almanack of Naval Ravikant",
  "🔨 Building — Converse, The Log page",
  "🎯 Thinking about — Why consistency beats motivation every single time",
];

const CURRENTLY_LINES = [
  "📖 Reading — Almanack of Naval Ravikant",
  "🔨 Building — Converse (you're on it)",
  "🎯 Thinking about — Why consistency beats motivation every single time",
];

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://youtube.com/@gourangsharma2004?si=ssjAIJtQ4N9qoxcd" },
  { label: "Instagram", href: "https://www.instagram.com/gourang_on_growth?igsh=MWNra2FhMndhbmp1eg==" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/gourang-sharma-0a4b56367" },
  { label: "Email", href: "mailto:gourangs2004@gmail.com" },
];

// ── Flash Card ────────────────────────────────────────────────────────────────
function FlashCard({ entry }: { entry: (typeof PAST_ENTRIES)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/the-log/${entry.slug}`}
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          backgroundColor: hovered ? "#EDE7DC" : "#EAE4DC",
          border: `1px solid ${hovered ? "rgba(201,168,76,0.60)" : "rgba(44,44,44,0.10)"}`,
          padding: "1.25rem 1.5rem",
          transition: "background-color 0.2s, border-color 0.2s",
          cursor: "pointer",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(44,44,44,0.45)",
            marginBottom: "0.5rem",
          }}
        >
          {entry.week}
        </p>
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "17px",
            fontStyle: "italic",
            fontWeight: 700,
            color: hovered ? "#C9A84C" : "#2C2C2C",
            lineHeight: 1.3,
            transition: "color 0.2s",
            marginBottom: "0.65rem",
          }}
        >
          {entry.headline}
        </p>
        <span
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: hovered ? "#C9A84C" : "rgba(44,44,44,0.35)",
            transition: "color 0.2s",
          }}
        >
          Read →
        </span>
      </div>
    </Link>
  );
}

// ── Social Icons ─────────────────────────────────────────────────────────────────
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  YouTube: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ display: "block", flexShrink: 0 }}>
      <path d="M23.5 6.2s-.2-1.6-.9-2.3c-.9-1-1.9-1-2.3-1C17.2 2.7 12 2.7 12 2.7s-5.2 0-8.3.2c-.5.1-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S.2 8 .2 9.8v1.7c0 1.8.3 3.6.3 3.6s.2 1.6.9 2.3c.9 1 2 .9 2.6 1 1.9.2 8 .2 8 .2s5.2 0 8.3-.2c.5-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.3-1.8.3-3.6v-1.7C23.8 8 23.5 6.2 23.5 6.2zM9.7 15.5V8.4l6.6 3.6-6.6 3.5z" />
    </svg>
  ),
  Instagram: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ display: "block", flexShrink: 0 }}>
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8.1-3.2 1.7-4.8 4.9-4.9 1.2-.1 1.6-.1 4.8-.1zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1 3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
    </svg>
  ),
  LinkedIn: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ display: "block", flexShrink: 0 }}>
      <path d="M20.4 20.4h-3.4v-5.6c0-1.3 0-3-1.8-3-1.8 0-2.1 1.4-2.1 2.9v5.7H9.7V9h3.3v1.6h.1c.5-.9 1.6-1.8 3.2-1.8 3.4 0 4 2.2 4 5.1v6.5zM5.3 7.4a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm1.7 13H3.6V9h3.4v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" />
    </svg>
  ),
  Email: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ display: "block", flexShrink: 0 }}>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2-8 5-8-5h16zm0 12H4V9l8 5 8-5v9z" />
    </svg>
  ),
};

// ── Past Entry Row ─────────────────────────────────────────────────────────────
function EntryRow({ entry }: { entry: (typeof PAST_ENTRIES)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/the-log/${entry.slug}`}
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "clamp(1rem, 3vw, 2.5rem)",
          padding: "1.75rem 0",
          borderBottom: "1px solid rgba(44,44,44,0.08)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "12px",
            fontWeight: 400,
            color: "rgba(44,44,44,0.50)",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
            flexShrink: 0,
            minWidth: "160px",
          }}
        >
          {entry.week}
        </span>
        <span
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "20px",
            fontStyle: "italic",
            fontWeight: 700,
            color: hovered ? "#C9A84C" : "#2C2C2C",
            transition: "color 0.2s",
            lineHeight: 1.2,
          }}
        >
          {entry.headline}
        </span>
      </div>
    </Link>
  );
}

// ── Social Link ────────────────────────────────────────────────────────────────
function SocialLink({ label, href, dark = false }: { label: string; href: string; dark?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const baseColor = dark ? "rgba(245,239,230,0.55)" : "rgba(44,44,44,0.60)";
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "13px",
        fontWeight: 400,
        color: hovered ? "#C9A84C" : baseColor,
        textDecoration: "none",
        borderBottom: hovered ? "1px solid #C9A84C" : "1px solid transparent",
        paddingBottom: "1px",
        transition: "color 0.2s, border-bottom-color 0.2s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {SOCIAL_ICONS[label]}
      {label}
    </a>
  );
}

// ── Reels Carousel ────────────────────────────────────────────────────────────
const REEL_URLS = [
  "https://www.instagram.com/reel/DU0Ys5_Emue/",
  "https://www.instagram.com/reel/DMZbj0FxHNz/",
  "https://www.instagram.com/reel/DL2cPk9BeEL/",
  "https://www.instagram.com/reel/DWlJlbzgk8u/",
  "https://www.instagram.com/reel/DNmwByAxdVB/",
  "https://www.instagram.com/reel/DMPNT1jRG9Z/",
  "https://www.instagram.com/reel/DMNIHCYym3C/",
  "https://www.instagram.com/reel/DXR5Q0PicCj/",
];

function ReelsCarousel() {
  const [hovered, setHovered] = useState(false);
  const cardW = 360;
  const gap = 32;
  const totalW = REEL_URLS.length * (cardW + gap);
  const doubled = [...REEL_URLS, ...REEL_URLS];

  const handleScriptLoad = () => {
    if ((window as any).instgrm?.Embeds) {
      (window as any).instgrm.Embeds.process();
    }
  };

  return (
    <>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={handleScriptLoad}
      />
      <style>{`
        @keyframes reelScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-${totalW}px); }
        }
        .reel-outer {
          margin-left: -1.5rem;
          margin-right: -1.5rem;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .reel-outer { margin-left: -4rem; margin-right: -4rem; }
        }
        @media (min-width: 1024px) {
          .reel-outer { margin-left: -6rem; margin-right: -6rem; }
        }
        .reel-track {
          animation: reelScroll ${REEL_URLS.length * 5}s linear infinite;
          will-change: transform;
        }
      `}</style>
      <div className="reel-outer">
        <div
          className="reel-track"
          style={{
            display: "flex",
            gap: `${gap}px`,
            width: "max-content",
            paddingLeft: `${gap}px`,
            animationPlayState: hovered ? "paused" : "running",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {doubled.map((url, i) => (
            <div key={i} style={{ flexShrink: 0, width: `${cardW}px` }}>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                  background: "#FFF",
                  border: 0,
                  borderRadius: "4px",
                  boxShadow: "0 4px 20px rgba(44,44,44,0.10)",
                  margin: 0,
                  padding: 0,
                  width: "100%",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function TheLogPage() {
  const [commentText, setCommentText] = useState("");
  const [cardLikes, setCardLikes] = useState([
    { liked: false, count: 47 },
    { liked: false, count: 23 },
    { liked: false, count: 18 },
    { liked: false, count: 31 },
  ]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const activePost = BLOG_POSTS.find(p => p.slug === selectedPost) ?? null;
  const toggleLike = (idx: number) => setCardLikes(prev =>
    prev.map((c, i) => i === idx ? { ...c, liked: !c.liked, count: c.liked ? c.count - 1 : c.count + 1 } : c)
  );

  return (
    <div style={{ backgroundColor: "#F5EFE6", minHeight: "100vh" }}>
      <Navbar active="the-log" />

      {/* ── 1. Hero — full image at natural ratio, no crop, no black bars ── */}
      <section style={{ position: "relative", lineHeight: 0 }}>
        <style>{`
          @keyframes heroFadeUp {
            from { opacity: 0; transform: translateY(18px); }
            to   { opacity: 1; transform: translateY(0);    }
          }
          @keyframes heroFadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
        `}</style>

        {/* Video background — full width, auto height */}
        <video
          src="/video/log.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.52)",
          }}
        />

        {/* Centered text */}
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
          }}
        >
          {/* Label */}
          <p
            style={{
              ...LABEL,
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.25em",
              color: "#C9A84C",
              marginBottom: "1.6rem",
              opacity: 0,
              animation: "heroFadeIn 0.7s ease forwards",
              animationDelay: "0.15s",
            }}
          >
            Every Sunday
          </p>

          {/* Main title */}
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
              opacity: 0,
              animation: "heroFadeUp 0.85s cubic-bezier(0.22,1,0.36,1) forwards",
              animationDelay: "0.35s",
            }}
          >
            The Log
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(18px, 2.4vw, 30px)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "rgba(245,239,230,0.88)",
              letterSpacing: "0.01em",
              lineHeight: 1.4,
              marginBottom: "1.6rem",
              opacity: 0,
              animation: "heroFadeUp 0.75s ease forwards",
              animationDelay: "0.6s",
            }}
          >
            No performance. Just the week as it actually was.
          </p>

          {/* Gold rule */}
          <div
            style={{
              width: "60px",
              borderTop: "1px solid #C9A84C",
              opacity: 0,
              animation: "heroFadeIn 0.6s ease forwards",
              animationDelay: "0.95s",
            }}
          />
        </div>
      </section>

      {/* ── 2. Editorial Grid ── */}
      <section style={{ backgroundColor: "#F5EFE6", padding: "80px 0" }}>
        <style>{`
          .ed-card { transition: transform 0.35s ease, box-shadow 0.35s ease; cursor: pointer; }
          .ed-card:hover { transform: scale(1.01); box-shadow: 0 16px 48px rgba(0,0,0,0.22); }
          .ed-extra { opacity: 0; transform: translateY(20px); transition: opacity 0.35s ease, transform 0.35s ease; pointer-events: none; }
          .ed-card:hover .ed-extra { opacity: 1; transform: translateY(0); pointer-events: auto; }
          .ed-hover-grad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 60%); opacity: 0; transition: opacity 0.35s ease; pointer-events: none; }
          .ed-card:hover .ed-hover-grad { opacity: 1; }
          .ed-title-cell { transition: transform 0.2s ease; }
          .ed-entries-row:hover .ed-title-cell { transform: translateX(4px); }
          .ed-arrow { color: rgba(201,168,76,0.60); transition: color 0.2s ease; font-family: var(--font-dm-sans), sans-serif; font-size: 14px; }
          .ed-entries-row:hover .ed-arrow { color: #C9A84C; }
        `}</style>

        <div style={{ width: "100%", padding: "0 48px", display: "flex", gap: "56px", alignItems: "flex-start", boxSizing: "border-box" }}>
          {/* Left: editorial grid */}
          <div style={{ flex: 1, minWidth: 0 }}>

          {/* Section label */}
          <p style={{ ...LABEL, color: "#C9A84C", letterSpacing: "0.25em", marginBottom: "2rem" }}>
            This Week
          </p>

          {/* 4-card editorial grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.5fr 1fr",
              gridTemplateRows: "310px 270px",
              gap: "16px",
            }}
          >
            {/* ── Card 1: Large featured — current week, spans 2 rows ── */}
            <div
              className="ed-card"
              onClick={() => setSelectedPost("week-01-april-2026")}
              style={{
                gridColumn: "1",
                gridRow: "1 / 3",
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#2C2C2C",
                backgroundImage: "url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 60%)" }} />
              <div className="ed-hover-grad" />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem 2rem 2.25rem" }}>
                <p style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  marginBottom: "0.65rem",
                }}>
                  Week 01 · April 2026
                </p>
                <h2 style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(22px, 2.4vw, 32px)",
                  fontStyle: "italic",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.15,
                  marginBottom: "0.85rem",
                  maxWidth: "400px",
                }}>
                  The week I decided to stop waiting for perfect
                </h2>
                <p className="ed-extra" style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.70)",
                  lineHeight: 1.65,
                  maxWidth: "360px",
                }}>
                  Three things I&apos;d been sitting on for weeks all started clicking into place at once. Not because I planned it.
                </p>
              </div>
              {/* Like + Comment buttons — bottom right */}
              <div className="ed-extra" style={{ position: "absolute", bottom: "2rem", right: "1.75rem", display: "flex", alignItems: "center", gap: "0.65rem", zIndex: 1 }}>
                <button
                  onClick={() => toggleLike(0)}
                  style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: "none", border: "none", cursor: "pointer", color: cardLikes[0].liked ? "#C9A84C" : "rgba(255,255,255,0.65)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", fontWeight: 400, transition: "color 0.2s", padding: 0 }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill={cardLikes[0].liked ? "#C9A84C" : "none"} stroke={cardLikes[0].liked ? "#C9A84C" : "rgba(255,255,255,0.65)"} strokeWidth="1.5">
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                  </svg>
                  {cardLikes[0].count}
                </button>
                <button
                  onClick={() => setCommentsOpen(true)}
                  style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", fontWeight: 400, padding: 0 }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {SAMPLE_COMMENTS.length}
                </button>
              </div>
            </div>

            {/* ── Card 2: Medium — Week 00, row 1 ── */}
            <div onClick={() => setSelectedPost("week-00-april-2026")} style={{ gridColumn: "2", gridRow: "1 / 3", cursor: "pointer" }}>
              <div
                className="ed-card"
                style={{
                  height: "100%",
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor: "#2C2C2C",
                  backgroundImage: "url(https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 60%)" }} />
                <div className="ed-hover-grad" />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
                  <p style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#C9A84C",
                    marginBottom: "0.5rem",
                  }}>
                    Week 00 · April 2026
                  </p>
                  <h3 style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(16px, 1.7vw, 21px)",
                    fontStyle: "italic",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1.2,
                  }}>
                    The quiet before everything started to make sense
                  </h3>
                </div>
                {/* Like + Comment — bottom right */}
                <div className="ed-extra" style={{ position: "absolute", bottom: "1rem", right: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", zIndex: 1 }}>
                  <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleLike(1); }} style={{ display: "flex", alignItems: "center", gap: "0.3rem", background: "none", border: "none", cursor: "pointer", color: cardLikes[1].liked ? "#C9A84C" : "rgba(255,255,255,0.65)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 400, transition: "color 0.2s", padding: 0 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill={cardLikes[1].liked ? "#C9A84C" : "none"} stroke={cardLikes[1].liked ? "#C9A84C" : "rgba(255,255,255,0.65)"} strokeWidth="1.5"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>
                    {cardLikes[1].count}
                  </button>
                  <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCommentsOpen(true); }} style={{ display: "flex", alignItems: "center", gap: "0.3rem", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 400, padding: 0 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    {SAMPLE_COMMENTS.length}
                  </button>
                </div>
              </div>
            </div>

            {/* ── Card 3: Small — Week −01, row 1 ── */}
            <div onClick={() => setSelectedPost("week-minus-01-march-2026")} style={{ gridColumn: "3", gridRow: "1", cursor: "pointer" }}>
              <div
                className="ed-card"
                style={{
                  height: "100%",
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor: "#2C2C2C",
                  backgroundImage: "url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 60%)" }} />
                <div className="ed-hover-grad" />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem 1.1rem" }}>
                  <p style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#C9A84C",
                    marginBottom: "0.4rem",
                  }}>
                    Week −01 · March 2026
                  </p>
                  <h3 style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(13px, 1.3vw, 16px)",
                    fontStyle: "italic",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1.2,
                  }}>
                    On running out of excuses and into motion
                  </h3>
                </div>
                {/* Like + Comment — bottom right */}
                <div className="ed-extra" style={{ position: "absolute", bottom: "1rem", right: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", zIndex: 1 }}>
                  <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleLike(2); }} style={{ display: "flex", alignItems: "center", gap: "0.3rem", background: "none", border: "none", cursor: "pointer", color: cardLikes[2].liked ? "#C9A84C" : "rgba(255,255,255,0.65)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 400, transition: "color 0.2s", padding: 0 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill={cardLikes[2].liked ? "#C9A84C" : "none"} stroke={cardLikes[2].liked ? "#C9A84C" : "rgba(255,255,255,0.65)"} strokeWidth="1.5"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>
                    {cardLikes[2].count}
                  </button>
                  <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCommentsOpen(true); }} style={{ display: "flex", alignItems: "center", gap: "0.3rem", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 400, padding: 0 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    {SAMPLE_COMMENTS.length}
                  </button>
                </div>
              </div>
            </div>

            {/* ── Card 4: Small — Week −02, row 2 ── */}
            <div onClick={() => setSelectedPost("week-minus-02-march-2026")} style={{ gridColumn: "3", gridRow: "2", cursor: "pointer" }}>
              <div
                className="ed-card"
                style={{
                  height: "100%",
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor: "#2C2C2C",
                  backgroundImage: "url(https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 60%)" }} />
                <div className="ed-hover-grad" />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem 1.1rem" }}>
                  <p style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#C9A84C",
                    marginBottom: "0.4rem",
                  }}>
                    Week −02 · March 2026
                  </p>
                  <h3 style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(13px, 1.3vw, 16px)",
                    fontStyle: "italic",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1.2,
                  }}>
                    Three books, two ideas, one decision I&apos;d been avoiding
                  </h3>
                </div>
                {/* Like + Comment — bottom right */}
                <div className="ed-extra" style={{ position: "absolute", bottom: "1rem", right: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", zIndex: 1 }}>
                  <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleLike(3); }} style={{ display: "flex", alignItems: "center", gap: "0.3rem", background: "none", border: "none", cursor: "pointer", color: cardLikes[3].liked ? "#C9A84C" : "rgba(255,255,255,0.65)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 400, transition: "color 0.2s", padding: 0 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill={cardLikes[3].liked ? "#C9A84C" : "none"} stroke={cardLikes[3].liked ? "#C9A84C" : "rgba(255,255,255,0.65)"} strokeWidth="1.5"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>
                    {cardLikes[3].count}
                  </button>
                  <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCommentsOpen(true); }} style={{ display: "flex", alignItems: "center", gap: "0.3rem", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 400, padding: 0 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    {SAMPLE_COMMENTS.length}
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>{/* end left column */}

          {/* Right: All Entries */}
          <div style={{ flex: "0 0 280px", minWidth: 0 }}>
            <p style={{ ...LABEL, color: "#C9A84C", letterSpacing: "0.25em", marginBottom: "1rem" }}>All Entries</p>
            <div style={{ height: "1px", backgroundColor: "rgba(44,44,44,0.15)", marginBottom: 0 }} />
            {[
              { slug: "week-01-april-2026", week: "Week 01 · April 2026", headline: "The week I decided to stop waiting for perfect" },
              ...PAST_ENTRIES,
            ].map((entry) => (
              <div
                key={entry.slug}
                className="ed-entries-row"
                onClick={() => setSelectedPost(entry.slug)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", padding: "0.85rem 0", borderBottom: "1px solid rgba(44,44,44,0.08)", cursor: "pointer" }}
              >
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", fontWeight: 400, color: "rgba(44,44,44,0.42)", letterSpacing: "0.07em", marginBottom: "0.2rem" }}>
                    {entry.week}
                  </p>
                  <span
                    className="ed-title-cell"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(13px, 1.15vw, 16px)", fontStyle: "italic", fontWeight: 600, color: "#2C2C2C", display: "block" }}
                  >
                    {entry.headline}
                  </span>
                </div>
                <span className="ed-arrow" style={{ flexShrink: 0 }}>→</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. Gourang Section — portfolio-style ── */}
      <section style={{ backgroundColor: "#141414", overflow: "hidden", position: "relative" }}>

        {/* Desktop: two-layer hero — heading behind, grid in front */}
        <div
          className="hidden md:block"
          style={{ position: "relative", minHeight: "644px" }}
        >
          {/* Layer 0 — heading text (background) */}
          <div
            style={{
              position: "absolute",
              top: "1.5rem",
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 0,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(64px, 9.5vw, 132px)",
                fontStyle: "italic",
                fontWeight: 800,
                color: "#F5EFE6",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                display: "block",
              }}
            >
              I&apos;m Gourang,
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "clamp(36px, 6vw, 84px)",
                fontWeight: 700,
                color: "#F5EFE6",
                letterSpacing: "-0.01em",
                lineHeight: 1.0,
                marginTop: "0.1em",
              }}
            >
              Guy Behind{" "}
              <span
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#C4973A",
                  letterSpacing: "0.06em",
                }}
              >
                Converse
              </span>
            </p>
          </div>

          {/* Layer 1 — three-column grid (foreground, covers heading) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              gridTemplateColumns: "1fr clamp(300px, 32vw, 460px) 1fr",
              alignItems: "center",
              padding: "4rem clamp(2rem, 5vw, 6rem) 0 clamp(2rem, 4vw, 5rem)",
              gap: "clamp(2rem, 4vw, 5rem)",
              zIndex: 1,
            }}
          >
            {/* Left — Bio + social */}
            <div style={{ maxWidth: "300px", alignSelf: "flex-start", paddingTop: "8rem" }}>
              {/* About label */}
              <p style={{ ...LABEL, color: "#C9A84C", letterSpacing: "0.18em", marginBottom: "0.75rem" }}>
                ABOUT
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "17px",
                  fontWeight: 300,
                  color: "rgba(245,239,230,0.70)",
                  lineHeight: 1.9,
                  marginBottom: "2rem",
                }}
              >
                I build things I wish existed. Converse is one of them — a space for people who read seriously, think carefully, and want to talk about it.
              </p>

              {/* Divider */}
              <div style={{ height: "1px", backgroundColor: "rgba(245,239,230,0.08)", marginBottom: "1.25rem" }} />

              {/* Connect label */}
              <p style={{ ...LABEL, color: "rgba(245,239,230,0.30)", letterSpacing: "0.18em", marginBottom: "0.5rem" }}>
                CONNECT
              </p>

              {/* Social links — bordered rows */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.65rem 0",
                      borderBottom: "1px solid rgba(245,239,230,0.06)",
                      textDecoration: "none",
                      color: "rgba(245,239,230,0.60)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C9A84C"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,239,230,0.60)"; }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      {SOCIAL_ICONS[s.label]}
                      <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 400 }}>
                        {s.label}
                      </span>
                    </span>
                    <span style={{ fontSize: "11px", opacity: 0.35 }}>↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Centre — photo with gold circle + CTAs */}
            <div style={{ textAlign: "center" }}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-5%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "110%",
                    height: "90%",
                    borderRadius: "50%",
                    background: "radial-gradient(ellipse at center, rgba(201,168,76,0.75) 0%, rgba(201,168,76,0.30) 45%, transparent 72%)",
                    filter: "blur(40px)",
                    zIndex: 0,
                  }}
                />
                <Image
                  src="/gourang.png"
                  alt="Gourang"
                  width={660}
                  height={840}
                  style={{ position: "relative", zIndex: 1, display: "block", margin: "0 auto" }}
                />
                {/* CTA buttons — overlaid on photo */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "4rem",
                    left: "48%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "0.75rem",
                    zIndex: 2,
                    whiteSpace: "nowrap",
                  }}
                >
                  <a
                    href="https://gourangsharma.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      backgroundColor: "rgba(20,20,20,0.75)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      color: "#F5EFE6",
                      border: "1px solid rgba(245,239,230,0.18)",
                      padding: "0.65rem 1.6rem",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                      textDecoration: "none",
                      borderRadius: "9999px",
                    }}
                  >
                    More About Me
                  </a>
                  <a
                    href="/community"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      backgroundColor: "#C4973A",
                      color: "#0e0e0e",
                      border: "1px solid #C4973A",
                      padding: "0.65rem 1.6rem",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      textDecoration: "none",
                      borderRadius: "9999px",
                    }}
                  >
                    Subscribe
                  </a>
                </div>
              </div>
            </div>

            {/* Right — Stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginLeft: "auto" }}>
              <div>
                <p style={{ color: "#C9A84C", fontSize: "18px", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>
                  ★★★★★
                </p>
                {["Video Content Creator", "AIC Incubated · jngLABS", "CS Engineer · Builder"].map((line) => (
                  <p
                    key={line}
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "rgba(245,239,230,0.70)",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      lineHeight: 1.8,
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden" style={{ padding: "1.5rem 1.5rem 3rem" }}>
          <div style={{ position: "relative", textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "240px",
                height: "240px",
                borderRadius: "50%",
                backgroundColor: "#C9A84C",
                opacity: 0.20,
                zIndex: 0,
              }}
            />
            <Image
              src="/gourang.png"
              alt="Gourang"
              width={300}
              height={380}
              style={{ position: "relative", zIndex: 1, display: "inline-block" }}
            />
          </div>
          <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", marginBottom: "2.5rem" }}>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "#2C2C2C",
                color: "#F5EFE6",
                padding: "0.75rem 1.4rem",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Explore ↗
            </a>
            <a
              href="https://youtube.com/@gourangsharma2004?si=ssjAIJtQ4N9qoxcd"
              style={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "transparent",
                color: "#2C2C2C",
                border: "1px solid rgba(44,44,44,0.25)",
                padding: "0.75rem 1.4rem",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Subscribe
            </a>
          </div>
          <div style={{ borderTop: "1px solid rgba(245,239,230,0.08)", paddingTop: "2rem" }}>
            <p style={{ ...LABEL, color: "#C9A84C", marginBottom: "1rem" }}>About</p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "rgba(245,239,230,0.70)",
                lineHeight: 1.85,
                marginBottom: "1.75rem",
              }}
            >
              Final year CS student. Founder of jngLABS. I build things, read
              obsessively, and write about what I can&apos;t stop thinking about.
              Converse is where all of it lives.
            </p>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {SOCIAL_LINKS.map((s) => (
                <SocialLink key={s.label} label={s.label} href={s.href} dark />
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ── 5. Content Section ── */}
      <section className={`${sp} pb-8`} style={{ paddingTop: "2.5rem" }}>
        <p style={{ ...LABEL, marginBottom: "1.5rem", textAlign: "center" }}>Video Content</p>

        {/* Instagram Reels */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h3
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(30px, 4vw, 44px)",
              fontStyle: "italic",
              fontWeight: 700,
              color: "#2C2C2C",
              marginBottom: "1.25rem",
              textAlign: "center",
            }}
          >
            Reels
          </h3>
          <ReelsCarousel />
        </div>

        {/* YouTube */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(30px, 4vw, 44px)",
              fontStyle: "italic",
              fontWeight: 700,
              color: "#2C2C2C",
              marginBottom: "1.25rem",
              textAlign: "center",
            }}
          >
            YouTube
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "1.5rem" }}>
            {[
              "https://www.youtube.com/embed/eDmdgT3llCk",
              "https://www.youtube.com/embed/SQ15K37gjzQ",
              "https://www.youtube.com/embed/XfP9ZiJlloc",
            ].map((url, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  overflow: "hidden",
                  borderRadius: "4px",
                  boxShadow: "0 4px 20px rgba(44,44,44,0.10)",
                }}
              >
                <iframe
                  src={url}
                  title={`YouTube video ${i + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comments modal ── */}
      {commentsOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={() => setCommentsOpen(false)} style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.60)" }} />
          <div style={{ position: "relative", backgroundColor: "#0d0d0d", borderRadius: "12px", width: "min(480px, 90vw)", maxHeight: "80vh", display: "flex", flexDirection: "column", padding: "1.75rem", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexShrink: 0 }}>
              <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,239,230,0.40)" }}>Comments ({SAMPLE_COMMENTS.length})</p>
              <button onClick={() => setCommentsOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(245,239,230,0.50)", fontSize: "18px", lineHeight: 1, padding: 0 }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "1.25rem" }}>
              {SAMPLE_COMMENTS.map((c, i) => (
                <div key={i}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.3rem" }}>
                    <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 500, color: "#F5EFE6" }}>{c.name}</span>
                    <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 300, color: "rgba(245,239,230,0.35)" }}>{c.date}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,239,230,0.70)", lineHeight: 1.65 }}>{c.text}</p>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid rgba(245,239,230,0.08)", paddingTop: "1rem", flexShrink: 0 }}>
              <textarea
                placeholder="What this made you think…"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 300, color: "#F5EFE6", backgroundColor: "rgba(245,239,230,0.05)", border: "1px solid rgba(245,239,230,0.12)", padding: "0.6rem 0.85rem", outline: "none", resize: "none", lineHeight: 1.6, width: "100%", borderRadius: "4px", marginBottom: "0.75rem" }}
              />
              <button style={{ padding: "0.55rem 1.2rem", backgroundColor: "#C9A84C", color: "#0e0e0e", border: "none", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px" }}>Post →</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Blog Reader Overlay ── */}
      {activePost && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            backgroundColor: "#F5EFE6",
            overflowY: "auto",
            animation: "readerIn 0.38s cubic-bezier(0.22,1,0.36,1) forwards",
          }}
        >
          <style>{`
            @keyframes readerIn {
              from { opacity: 0; transform: translateY(32px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          {/* Close button */}
          <button
            onClick={() => setSelectedPost(null)}
            style={{
              position: "fixed",
              top: "1.25rem",
              right: "1.5rem",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: "#2C2C2C",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F5EFE6",
              fontSize: "20px",
              lineHeight: 1,
              zIndex: 201,
              boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            }}
          >
            ×
          </button>

          {/* Hero image */}
          <div
            style={{
              position: "relative",
              height: "44vh",
              minHeight: "260px",
              backgroundImage: `url(${activePost.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.10) 55%)" }} />
            <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "700px", padding: "0 2rem" }}>
              <p style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "#C9A84C",
                marginBottom: "0.65rem",
              }}>
                {activePost.week}
              </p>
              <h1 style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(26px, 4vw, 46px)",
                fontStyle: "italic",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.15,
                margin: 0,
              }}>
                {activePost.headline}
              </h1>
            </div>
          </div>

          {/* Body */}
          <div style={{ maxWidth: "680px", margin: "0 auto", padding: "3rem 2rem 7rem" }}>
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(18px, 2vw, 22px)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "rgba(44,44,44,0.65)",
              lineHeight: 1.55,
              marginBottom: "2.5rem",
              borderLeft: "3px solid #C9A84C",
              paddingLeft: "1.25rem",
            }}>
              {activePost.excerpt}
            </p>
            <div style={{ height: "1px", backgroundColor: "rgba(44,44,44,0.10)", marginBottom: "2.5rem" }} />
            {activePost.body.map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "clamp(15px, 1.6vw, 17px)",
                  fontWeight: 300,
                  color: "#2C2C2C",
                  lineHeight: 1.9,
                  marginBottom: "1.75rem",
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer
        className={`${sp} py-8 flex items-center justify-center relative`}
        style={{ backgroundColor: "#1C1A17" }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            color: "#F0EBE3",
          }}
        >
          © Converse · Built for thinkers.
        </p>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            fontStyle: "italic",
            color: "#F0EBE3",
            position: "absolute",
            right: "6rem",
          }}
        >
          Every Sunday.
        </p>
      </footer>

    </div>
  );
}
