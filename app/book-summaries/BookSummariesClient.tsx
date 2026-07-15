"use client";

import Navbar from "@/components/Navbar";
import SearchHighlight from "@/components/SearchHighlight";
import { motion } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface FeaturedBook {
  title: string;
  author: string;
  tags: string;
  quote: string;
  cover: string;
  href: string;
  coverBg: string;
}

export interface LibraryBook {
  genre: string;
  title: string;
  author: string;
  readTime: string;
  hook: string;
}

interface BookSummariesClientProps {
  featuredBooks: FeaturedBook[];
  libraryBooks: LibraryBook[];
  query: string;
  targetId: string;
}

// ── Design tokens ──────────────────────────────────────────────────────────────

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

export default function BookSummariesClient({
  featuredBooks,
  libraryBooks,
  query,
  targetId,
}: BookSummariesClientProps) {
  return (
    <div style={{ backgroundColor: "#F0EBE3", minHeight: "100vh" }}>
      <Navbar active="book-summaries" />
      <SearchHighlight query={query} targetId={targetId}>
        <div style={{ minHeight: "100%" }}>

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
                objectPosition: "center 40%",
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
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
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
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
                style={{
                  width: "96px",
                  borderTop: "1px solid rgba(245,239,230,0.40)",
                  marginTop: "1.5rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                  transformOrigin: "center",
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

            <style jsx global>{`
              @media (max-width: 767px) {
                .bs-featured-grid { grid-template-columns: 1fr 1fr !important; }
                .bs-coming-next-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
                .bs-coming-next-item { flex-direction: column !important; gap: 0.5rem !important; }
                .bs-coming-next-item > div { min-width: 100% !important; }
                .bs-coming-next-item span { padding-top: 0 !important; }
                .bs-vote-form-row { flex-direction: column !important; }
                .bs-vote-name { width: 100% !important; align-items: flex-start !important; }
                .bs-footer { position: static !important; flex-direction: column !important; gap: 0.75rem !important; }
                .bs-footer-quote, .bs-footer-cadence { display: none !important; }
              }
              @media (max-width: 480px) {
                .bs-featured-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
            <div
              className="bs-featured-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.5rem",
              }}
            >
              {featuredBooks.map((book, idx) => (
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
                    {book.cover ? (
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
                    ) : (
                      <div
                        style={{
                          width: "140px",
                          height: "210px",
                          backgroundColor: "#1C1A17",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "1.25rem 1rem",
                          boxShadow: "4px 4px 16px rgba(0,0,0,0.25)",
                          gap: "0.75rem",
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "1px",
                            backgroundColor: "#C9A84C",
                          }}
                        />
                        <p
                          style={{
                            fontFamily: "var(--font-cormorant), Georgia, serif",
                            fontSize: "15px",
                            fontStyle: "italic",
                            fontWeight: 700,
                            color: "#F5EFE6",
                            textAlign: "center",
                            lineHeight: 1.3,
                          }}
                        >
                          {book.title}
                        </p>
                        <div
                          style={{
                            width: "32px",
                            height: "1px",
                            backgroundColor: "#C9A84C",
                          }}
                        />
                        <p
                          style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "10px",
                            fontWeight: 300,
                            color: "#9A8E7E",
                            textAlign: "center",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {book.author}
                        </p>
                      </div>
                    )}
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
            <div className="bs-coming-next-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>

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
                      className="bs-coming-next-item"
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
                  <div className="bs-vote-form-row" style={{ display: "flex", gap: "0.75rem", width: "100%" }}>
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
                  <div className="bs-vote-name" style={{ display: "flex", flexDirection: "column", gap: "0.35rem", alignItems: "center", width: "50%" }}>
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
            className={`bs-footer ${sp} py-8 flex items-center justify-center relative`}
            style={{ backgroundColor: "#1C1A17" }}
          >
            <p
              className="bs-footer-quote"
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
              © Colloque · Built for thinkers.
            </p>
            <p
              className="bs-footer-cadence"
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
      </SearchHighlight>
    </div>
  );
}
