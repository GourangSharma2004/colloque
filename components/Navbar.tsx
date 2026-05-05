"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bookmark, Search, User, X } from "lucide-react";

type BookmarkItem = {
  key: string;
  label: string;
  href: string;
  savedAt: number;
};

const STORAGE_KEY = "converse_bookmarks";

function loadBookmarks(): BookmarkItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}

function saveBookmarks(bm: BookmarkItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bm));
}

type NavLink = {
  label: string;
  href: string;
  key: string;
  separator?: boolean;
};

const NAV_LINKS: NavLink[] = [
  { label: "Intellect",       href: "/intellect",      key: "intellect"      },
  { label: "Book Summaries",  href: "/book-summaries", key: "book-summaries" },
  { label: "AI Resources",    href: "/ai-resources",   key: "ai-resources"   },
  { label: "Community",       href: "/community",      key: "community"      },
  { label: "The Log",         href: "/the-log",        key: "the-log",        separator: true },
];

type NavbarProps = {
  active?: string;
};

export default function Navbar({ active }: NavbarProps) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkOpen, setBookmarkOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const bookmarkBtnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    setBookmarks(loadBookmarks());
  }, []);

  const currentPage = active ? NAV_LINKS.find((l) => l.key === active) : null;
  const isBookmarked = !!currentPage && bookmarks.some((b) => b.key === currentPage.key);

  const toggleBookmark = () => {
    if (!currentPage) { setBookmarkOpen((o) => !o); return; }
    let updated: BookmarkItem[];
    if (isBookmarked) {
      updated = bookmarks.filter((b) => b.key !== currentPage.key);
    } else {
      updated = [
        { key: currentPage.key, label: currentPage.label, href: currentPage.href, savedAt: Date.now() },
        ...bookmarks,
      ];
    }
    setBookmarks(updated);
    saveBookmarks(updated);
    if (!isBookmarked) setBookmarkOpen(true);
  };

  const removeBookmark = (key: string) => {
    const updated = bookmarks.filter((b) => b.key !== key);
    setBookmarks(updated);
    saveBookmarks(updated);
  };

  return (
    <>
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
      style={{
        height: "56px",
        backgroundColor: "rgba(26, 26, 26, 0.95)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        borderBottom: "1px solid rgba(245,239,230,0.06)",
      }}
    >
      {/* ── Left: Wordmark ── */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "22px",
          fontStyle: "italic",
          fontWeight: 400,
          color: "#C4973A",
          letterSpacing: "0.06em",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        Converse
      </Link>

      {/* ── Center: Nav links ── */}
      <ul
        className="hidden md:flex items-center gap-8"
        style={{ listStyle: "none", margin: 0, padding: 0 }}
      >
        {NAV_LINKS.map((link) => {
          const isActive = active === link.key;
          return (
            <li
              key={link.key}
              style={{
                position: "relative",
                ...(link.separator ? {
                  marginLeft: "1.5rem",
                  paddingLeft: "1.5rem",
                  borderLeft: "1px solid rgba(245,239,230,0.18)",
                } : {}),
              }}
            >
              <Link
                href={link.href}
                style={{
                  fontFamily: link.separator ? "var(--font-cormorant), Georgia, serif" : "var(--font-dm-sans), sans-serif",
                  fontSize: "13px",
                  fontStyle: link.separator ? "italic" : "normal",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isActive ? "#F5EFE6" : link.separator ? "rgba(245,239,230,0.85)" : "rgba(245,239,230,0.55)",
                  fontWeight: link.separator ? 600 : 400,
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                  paddingBottom: "4px",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "#F5EFE6";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = link.separator ? "rgba(245,239,230,0.85)" : "rgba(245,239,230,0.55)";
                }}
              >
                {link.label}
              </Link>
              {/* Active indicator dot */}
              {isActive && (
                <span
                  style={{
                    display: "block",
                    position: "absolute",
                    bottom: "-2px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    backgroundColor: "#C4973A",
                  }}
                />
              )}
            </li>
          );
        })}
      </ul>

      {/* ── Right: Icons ── */}
      <div className="flex items-center gap-5">
        <button
          ref={bookmarkBtnRef}
          aria-label="Bookmark"
          onClick={toggleBookmark}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            color: isBookmarked ? "#C4973A" : bookmarkOpen ? "#F5EFE6" : "rgba(245,239,230,0.55)",
            transition: "color 0.2s",
            position: "relative",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = isBookmarked ? "#D4A843" : "#F5EFE6"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = isBookmarked ? "#C4973A" : bookmarkOpen ? "#F5EFE6" : "rgba(245,239,230,0.55)"; }}
        >
          <Bookmark size={18} strokeWidth={1.5} fill={isBookmarked ? "#C4973A" : "none"} />
          {bookmarks.length > 0 && !isBookmarked && (
            <span style={{
              position: "absolute", top: "-4px", right: "-5px",
              width: "8px", height: "8px", borderRadius: "50%",
              backgroundColor: "#C4973A",
              border: "1.5px solid rgba(26,26,26,0.95)",
            }} />
          )}
        </button>
        <button
          aria-label="Search"
          onClick={() => setSearchOpen(true)}
          style={{ background: "none", border: "none", cursor: "pointer", color: searchOpen ? "#F5EFE6" : "rgba(245,239,230,0.55)", padding: 0, transition: "color 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#F5EFE6"; }}
          onMouseLeave={(e) => { if (!searchOpen) (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,239,230,0.55)"; }}
        >
          <Search size={18} strokeWidth={1.5} />
        </button>
        <button
          aria-label="Sign In"
          onClick={() => setLoginOpen(true)}
          style={{ background: "none", border: "none", cursor: "pointer", color: loginOpen ? "#F5EFE6" : "rgba(245,239,230,0.55)", padding: 0, transition: "color 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#F5EFE6"; }}
          onMouseLeave={(e) => { if (!loginOpen) (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,239,230,0.55)"; }}
        >
          <User size={18} strokeWidth={1.5} />
        </button>
      </div>
    </nav>

    {/* ── Bookmark Panel ── */}
    {bookmarkOpen && (
      <>
        <div onClick={() => setBookmarkOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 98 }} />
        <div
          style={{
            position: "fixed",
            top: "56px",
            right: "1.5rem",
            zIndex: 99,
            width: "300px",
            backgroundColor: "rgba(20,20,20,0.97)",
            border: "1px solid rgba(245,239,230,0.12)",
            borderRadius: "6px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.50)",
            overflow: "hidden",
          }}
        >
          {/* Panel header */}
          <div style={{
            padding: "0.85rem 1rem 0.75rem",
            borderBottom: "1px solid rgba(245,239,230,0.08)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "11px", fontWeight: 500,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(245,239,230,0.45)",
            }}>Bookmarks</span>
            {currentPage && (
              <button
                onClick={toggleBookmark}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "0.35rem",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "11px", fontWeight: 500,
                  color: isBookmarked ? "#C4973A" : "rgba(245,239,230,0.55)",
                  padding: 0, transition: "color 0.2s",
                }}
              >
                <Bookmark size={13} strokeWidth={1.5} fill={isBookmarked ? "#C4973A" : "none"} />
                {isBookmarked ? "Saved" : "Save this page"}
              </button>
            )}
          </div>

          {/* Bookmark list */}
          {bookmarks.length === 0 ? (
            <div style={{
              padding: "1.5rem 1rem",
              textAlign: "center",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "13px", fontWeight: 300,
              color: "rgba(245,239,230,0.30)",
            }}>
              No bookmarks yet
            </div>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: "0.4rem 0", maxHeight: "320px", overflowY: "auto" }}>
              {bookmarks.map((bm) => (
                <li
                  key={bm.key}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "0.55rem 1rem",
                    borderBottom: "1px solid rgba(245,239,230,0.05)",
                    gap: "0.5rem",
                  }}
                >
                  <Link
                    href={bm.href}
                    onClick={() => setBookmarkOpen(false)}
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "13px", fontWeight: 400,
                      color: active === bm.key ? "#C4973A" : "rgba(245,239,230,0.80)",
                      textDecoration: "none",
                      flex: 1,
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#F5EFE6"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = active === bm.key ? "#C4973A" : "rgba(245,239,230,0.80)"; }}
                  >
                    {bm.label}
                  </Link>
                  <button
                    onClick={() => removeBookmark(bm.key)}
                    title="Remove bookmark"
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: "rgba(245,239,230,0.25)", padding: 0,
                      display: "flex", alignItems: "center",
                      transition: "color 0.15s", flexShrink: 0,
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,239,230,0.75)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,239,230,0.25)"; }}
                  >
                    <X size={13} strokeWidth={1.5} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    )}

    {/* ── Search Dropdown ── */}
    {searchOpen && (
      <>
        <div onClick={() => setSearchOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 98 }} />
        <div
          style={{
            position: "fixed",
            top: "56px",
            right: "1.5rem",
            zIndex: 99,
            width: "280px",
            backgroundColor: "rgba(20,20,20,0.97)",
            border: "1px solid rgba(245,239,230,0.12)",
            borderRadius: "6px",
            padding: "0.75rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.50)",
          }}
        >
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Search size={14} strokeWidth={1.5} style={{ position: "absolute", left: "0.7rem", color: "rgba(245,239,230,0.35)", pointerEvents: "none" }} />
            <input
              autoFocus
              type="text"
              value={searchQuery}
              placeholder="Search topics, ideas…"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); }
                if (e.key === "Enter" && searchQuery.trim()) {
                  router.push(`/intellect?q=${encodeURIComponent(searchQuery.trim())}`);
                  setSearchOpen(false);
                }
              }}
              style={{
                width: "100%",
                padding: "0.55rem 0.75rem 0.55rem 2.25rem",
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(245,239,230,0.10)",
                borderRadius: "4px",
                color: "#F5EFE6",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "13px",
                fontWeight: 300,
                outline: "none",
                caretColor: "#C4973A",
              }}
            />
          </div>
        </div>
      </>
    )}

    {/* ── Login Modal ── */}
    {loginOpen && (
      <>
        {/* Backdrop */}
        <div
          onClick={() => setLoginOpen(false)}
          style={{
            position: "fixed", inset: 0,
            backgroundColor: "rgba(0,0,0,0.60)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
          }}
        />

        {/* Card */}
        <div
          style={{
            position: "fixed",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 101,
            width: "100%", maxWidth: "420px",
            backgroundColor: "#141414",
            border: "1px solid rgba(245,239,230,0.10)",
            borderRadius: "8px",
            padding: "2.5rem 2.25rem 2rem",
            boxShadow: "0 24px 60px rgba(0,0,0,0.60)",
          }}
        >
          {/* Close */}
          <button
            onClick={() => setLoginOpen(false)}
            style={{ position: "absolute", top: "1.1rem", right: "1.1rem", background: "none", border: "none", cursor: "pointer", color: "rgba(245,239,230,0.40)", padding: 0, transition: "color 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#F5EFE6"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,239,230,0.40)"; }}
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          {/* Heading */}
          <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "28px", fontStyle: "italic", fontWeight: 700, color: "#F5EFE6", marginBottom: "0.35rem", letterSpacing: "-0.01em" }}>
            Welcome back
          </h2>
          <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,239,230,0.45)", marginBottom: "1.75rem" }}>
            Sign in to your Converse account
          </p>

          {/* Google */}
          <button
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
              padding: "0.65rem 1rem",
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(245,239,230,0.12)",
              borderRadius: "5px",
              cursor: "pointer",
              color: "#F5EFE6",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "13px", fontWeight: 400,
              marginBottom: "1.5rem",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.11)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.06)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
              <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.4-.1-2.7-.5-4z" fill="#FFC107"/>
              <path d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3c-7.6 0-14.2 4.3-17.7 10.7z" fill="#FF3D00"/>
              <path d="M24 45c5.5 0 10.5-1.9 14.3-5.1l-6.6-5.6C29.7 35.9 27 37 24 37c-6 0-11.1-4-12.9-9.4l-7 5.4C7.6 40.5 15.2 45 24 45z" fill="#4CAF50"/>
              <path d="M44.5 20H24v8.5h11.8c-.9 2.6-2.6 4.7-4.9 6.2l6.6 5.6C41.5 36.8 45 31 45 24c0-1.4-.1-2.7-.5-4z" fill="#1976D2"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(245,239,230,0.10)" }} />
            <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", color: "rgba(245,239,230,0.30)", letterSpacing: "0.1em" }}>or</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(245,239,230,0.10)" }} />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,239,230,0.45)", marginBottom: "0.5rem" }}>
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              style={{
                width: "100%", padding: "0.65rem 0.9rem",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(245,239,230,0.12)",
                borderRadius: "5px",
                color: "#F5EFE6",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "14px", fontWeight: 300,
                outline: "none",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.75rem" }}>
            <label style={{ display: "block", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,239,230,0.45)", marginBottom: "0.5rem" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              style={{
                width: "100%", padding: "0.65rem 0.9rem",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(245,239,230,0.12)",
                borderRadius: "5px",
                color: "#F5EFE6",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "14px", fontWeight: 300,
                outline: "none",
              }}
            />
          </div>

          {/* Submit */}
          <button
            style={{
              width: "100%", padding: "0.75rem",
              backgroundColor: "#C4973A",
              border: "none", borderRadius: "5px",
              color: "#0e0e0e",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "13px", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#D4A843"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C4973A"; }}
          >
            Sign In
          </button>
        </div>
      </>
    )}
    </>
  );
}
