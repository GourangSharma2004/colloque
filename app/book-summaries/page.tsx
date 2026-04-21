"use client";
// TEMPLATE: Clone this file for other pillar pages

import Navbar from "@/components/Navbar";

// ── Featured books data ───────────────────────────────────────────────────────
const FEATURED_BOOKS = [
  {
    title: "Ikigai",
    author: "Héctor García & Francesc Miralles",
    tags: "Philosophy · Japan",
    quote: "The Japanese secret to a long and happy life — and what it actually demands of you.",
    cover: "/ikigai-cover.jpg",
    href: "/book-summaries/ikigai",
    coverBg: "#E2DAD0",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel & Blake Masters",
    tags: "Entrepreneurship · Startups",
    quote: "Every great business is built on a secret the world hasn't found yet.",
    cover: "/zero to one.jpg",
    href: "/book-summaries/zero-to-one",
    coverBg: "#E0D8CE",
  },
  {
    title: "Dopamine Nation",
    author: "Dr. Anna Lembke",
    tags: "Neuroscience · Addiction",
    quote: "We are all, in some way, addicted. The question is whether we're willing to feel the pain.",
    cover: "/Dopamine Nation.jpg",
    href: "/book-summaries/dopamine-nation",
    coverBg: "#E2DAD0",
  },
  {
    title: "Can't Hurt Me",
    author: "David Goggins",
    tags: "Mindset · Resilience",
    quote: "Most people only use 40% of their potential. The question is what you're willing to do with the rest.",
    cover: "/Cant hurt Me.jpg",
    href: "/book-summaries/cant-hurt-me",
    coverBg: "#E0D8CE",
  },
  {
    title: "CRUSH IT!",
    author: "Gary Vaynerchuk",
    tags: "Entrepreneurship · Personal Brand",
    quote: "Your passion is the one unfair advantage no one else can replicate.",
    cover: "/crush it.jpg",
    href: "/book-summaries/crush-it",
    coverBg: "#E2DAD0",
  },
];

// ── Library placeholder data ──────────────────────────────────────────────────
const LIBRARY_BOOKS = [
  {
    genre: "Psychology",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    readTime: "30 min",
    hook: "Two systems. One makes you human. The other makes you wrong.",
  },
  {
    genre: "History",
    title: "The Lessons of History",
    author: "Will & Ariel Durant",
    readTime: "20 min",
    hook: "Everything civilisation has learned, compressed into an argument.",
  },
  {
    genre: "Philosophy",
    title: "Antifragile",
    author: "Nassim Taleb",
    readTime: "28 min",
    hook: "Some things don't just survive chaos. They need it.",
  },
  {
    genre: "Productivity",
    title: "Deep Work",
    author: "Cal Newport",
    readTime: "22 min",
    hook: "The ability to focus is becoming rare and valuable at the same time.",
  },
  {
    genre: "Memoir",
    title: "Shoe Dog",
    author: "Phil Knight",
    readTime: "32 min",
    hook: "The obsessive, risk-everything origin story of the shoe that changed sport forever.",
  },
  {
    genre: "Creativity",
    title: "Big Magic",
    author: "Elizabeth Gilbert",
    readTime: "18 min",
    hook: "Creative living beyond fear — ideas are alive, and they're looking for a worthy partner.",
  },
  {
    genre: "Relationships",
    title: "Mating in Captivity",
    author: "Esther Perel",
    readTime: "24 min",
    hook: "Desire and domesticity are opposites. Can you sustain both in the same relationship?",
  },
  {
    genre: "Philosophy",
    title: "The Courage to Be Disliked",
    author: "Ichiro Kishimi & Fumitake Koga",
    readTime: "26 min",
    hook: "Adler's radical idea: all your problems are interpersonal, and freedom comes from accepting that.",
  },
  {
    genre: "Stoicism",
    title: "Meditations",
    author: "Marcus Aurelius",
    readTime: "20 min",
    hook: "Private notes from the most powerful man in the world — written only for himself.",
  },
];

// ── Shared tokens ─────────────────────────────────────────────────────────────
const sp = "px-6 md:px-16 lg:px-24";

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#9A8E7E",
};

// ─────────────────────────────────────────────────────────────────────────────

export default function BookSummariesPage() {
  return (
    <div style={{ backgroundColor: "#F0EBE3", minHeight: "100vh" }}>

      {/* ── A. Navbar ───────────────────────────────────────────────────────── */}
      <Navbar active="book-summaries" />

      {/* ── B. Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{ height: "38vh", minHeight: "240px", paddingTop: "56px" }}
      >
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/video/Book-Summary.mp4" type="video/mp4" />
        </video>

        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10 }}>
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
            Book Summaries
          </h1>

          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "17px",
              fontWeight: 300,
              color: "rgba(245, 239, 230, 0.80)",
              marginTop: "1.25rem",
              lineHeight: 1.6,
              textShadow: "0 1px 20px rgba(0,0,0,0.5)",
            }}
          >
            The book took years to write. You&apos;ll feel it in thirty minutes.
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
        </div>
      </section>

      {/* ── C. Featured Reads — 3-column portrait grid ──────────────────────── */}
      <section
        className={`${sp} py-16`}
        style={{ borderTop: "1px solid #E0D9D0" }}
      >
        <p style={{ ...labelStyle, marginBottom: "2rem" }}>Featured Reads</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "1.5rem",
          }}
        >
          {FEATURED_BOOKS.map((book, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid #C9B99A",
                backgroundColor: "#EAE4DC",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Cover image */}
              <div
                style={{
                  backgroundColor: book.coverBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1.5rem 0.75rem",
                  height: "260px",
                }}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  style={{
                    maxHeight: "220px",
                    width: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              {/* Text area */}
              <div
                style={{
                  padding: "1.75rem 1.75rem 2rem",
                  borderTop: "2px solid #C9B99A",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(24px, 2.5vw, 34px)",
                    fontStyle: "italic",
                    fontWeight: 700,
                    lineHeight: 1.05,
                    color: "#1C1A17",
                    marginBottom: "0.4rem",
                  }}
                >
                  {book.title}
                </h2>

                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                    color: "#7A7060",
                    marginBottom: "1rem",
                  }}
                >
                  {book.author}
                </p>

                <div style={{ borderTop: "1px solid #C9B99A", marginBottom: "1rem" }} />

                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "17px",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#3D3730",
                    lineHeight: 1.5,
                    flex: 1,
                    marginBottom: "1rem",
                  }}
                >
                  &ldquo;{book.quote}&rdquo;
                </p>

                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "10px",
                    color: "#9A8E7E",
                    letterSpacing: "0.06em",
                    marginBottom: "1.25rem",
                  }}
                >
                  {book.tags}
                </p>

                <a
                  href={book.href}
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    color: "#1C1A17",
                    border: "1px solid #1C1A17",
                    padding: "8px 20px",
                    textDecoration: "none",
                    display: "inline-block",
                    transition: "all 0.3s",
                    backgroundColor: "transparent",
                    alignSelf: "center",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.backgroundColor = "#1C1A17";
                    el.style.color = "#F0EBE3";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.backgroundColor = "transparent";
                    el.style.color = "#1C1A17";
                  }}
                >
                  Read the Summary →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── D. Coming Next + Vote Form (side by side) ────────────────────────── */}
      <section
        className={`${sp} py-16`}
        style={{ borderTop: "1px solid #E0D9D0", backgroundColor: "#EAE4DC" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>

          {/* Left — Coming Next list */}
          <div>
            <p style={{ ...labelStyle, marginBottom: "1.5rem" }}>Coming Next</p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { genre: "Memoir",        title: "Shoe Dog",                    author: "Phil Knight",                          hook: "The obsessive, risk-everything origin story of the shoe that changed sport forever." },
                { genre: "Creativity",    title: "Big Magic",                   author: "Elizabeth Gilbert",                    hook: "Ideas are alive. They're looking for a worthy partner — the question is whether that's you." },
                { genre: "Relationships", title: "Mating in Captivity",         author: "Esther Perel",                         hook: "Desire and domesticity are opposites. Can you sustain both inside the same relationship?" },
                { genre: "Stoicism",      title: "Meditations",                 author: "Marcus Aurelius",                      hook: "Private notes from the most powerful man in the world — written only for himself." },
              ].map((book, idx, arr) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1.25rem",
                    padding: "1.1rem 0",
                    borderBottom: idx < arr.length - 1 ? "1px solid #D4C9B8" : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#9A8E7E",
                      minWidth: "90px",
                      flexShrink: 0,
                      paddingTop: "4px",
                    }}
                  >
                    {book.genre}
                  </span>
                  {/* Title + Author */}
                  <div style={{ minWidth: "200px", flexShrink: 0 }}>
                    <p
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "22px",
                        fontStyle: "italic",
                        fontWeight: 600,
                        color: "#1C1A17",
                        lineHeight: 1.1,
                      }}
                    >
                      {book.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "12px",
                        fontWeight: 300,
                        color: "#7A7060",
                        marginTop: "0.2rem",
                      }}
                    >
                      {book.author}
                    </p>
                  </div>

                  {/* Hook — same horizontal level */}
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "#5A5348",
                      lineHeight: 1.55,
                      flex: 1,
                    }}
                  >
                    {book.hook}
                  </p>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "10px",
                      fontStyle: "italic",
                      color: "#B0A394",
                      flexShrink: 0,
                      paddingTop: "4px",
                    }}
                  >
                    Soon
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Vote form */}
          <div style={{ textAlign: "center" }}>
            <p style={{ ...labelStyle, marginBottom: "0.75rem" }}>Vote Next</p>

            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(26px, 3vw, 38px)",
                fontStyle: "italic",
                fontWeight: 700,
                color: "#1C1A17",
                lineHeight: 1.1,
                marginBottom: "0.6rem",
              }}
            >
              Which book should we summarise next?
            </h2>

            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "#7A7060",
                marginBottom: "1.75rem",
                lineHeight: 1.6,
              }}
            >
              Drop a title. If enough readers ask for it, it moves to the top of the queue.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: "flex", flexDirection: "column", gap: "0.875rem", alignItems: "center" }}
            >
              {/* Row 1: Book Title + Author Name side by side */}
              <div style={{ display: "flex", gap: "0.75rem", width: "100%" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", flex: 1 }}>
                  <label
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#9A8E7E",
                    }}
                  >
                    Book Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. The Almanack of Naval Ravikant"
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "14px",
                      fontWeight: 300,
                      color: "#1C1A17",
                      backgroundColor: "#F0EBE3",
                      border: "1px solid #C9B99A",
                      padding: "11px 16px",
                      outline: "none",
                      width: "100%",
                    }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", flex: 1 }}>
                  <label
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#9A8E7E",
                    }}
                  >
                    Author Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Eric Jorgenson"
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "14px",
                      fontWeight: 300,
                      color: "#1C1A17",
                      backgroundColor: "#F0EBE3",
                      border: "1px solid #C9B99A",
                      padding: "11px 16px",
                      outline: "none",
                      width: "100%",
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Your Name — centered, same width as row above */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", alignItems: "center", width: "50%" }}>
                <label
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#9A8E7E",
                  }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gourang"
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "#1C1A17",
                    backgroundColor: "#F0EBE3",
                    border: "1px solid #C9B99A",
                    padding: "11px 16px",
                    outline: "none",
                    width: "100%",
                    textAlign: "center",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: "#F0EBE3",
                  backgroundColor: "#1C1A17",
                  border: "1px solid #1C1A17",
                  padding: "12px 24px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  marginTop: "0.25rem",
                  alignSelf: "center",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.backgroundColor = "#3D3730";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.backgroundColor = "#1C1A17";
                }}
              >
                Submit Recommendation →
              </button>

              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "11px",
                  color: "#9A8E7E",
                  letterSpacing: "0.03em",
                }}
              >
                No sign-up needed. We read every suggestion.
              </p>
            </form>
          </div>

        </div>
      </section>

      {/* ── F. Footer ───────────────────────────────────────────────────────── */}
      <footer
        className={`${sp} py-8 flex items-center justify-center relative`}
        style={{ backgroundColor: "#1C1A17" }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "18px",
            fontStyle: "italic",
            fontWeight: 600,
            color: "#F0EBE3",
            position: "absolute",
            left: "1.5rem",
          }}
        >
          &ldquo;Not what it says. What it does to you — and what you do differently after.&rdquo;
        </p>

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
          One summary every week.
        </p>
      </footer>
    </div>
  );
}
