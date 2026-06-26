"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Bookmark, Search, User, X, LogOut } from "lucide-react";
import { useUser } from "@/lib/auth";
import { search, type SearchResult } from "@/lib/search-index";

type BookmarkItem = {
  id: string;
  label: string;
  href: string;
  lastRead: number;
};

const STORAGE_KEY = "colloque_bookmarks";

function loadBookmarks(): BookmarkItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}

function saveBookmarks(bm: BookmarkItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bm));
}

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
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
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [sectionMatchCounts, setSectionMatchCounts] = useState<Record<string, number>>({});
  const [bookmarkOpen, setBookmarkOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const bookmarkBtnRef = useRef<HTMLButtonElement>(null);
  const { user, signInWithMagicLink, signOut, getDisplayName } = useUser();
  const [email, setEmail] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const handleOpenLogin = () => setLoginOpen(true);
    window.addEventListener("colloque-open-login", handleOpenLogin);
    return () => window.removeEventListener("colloque-open-login", handleOpenLogin);
  }, []);

  useEffect(() => {
    setBookmarks(loadBookmarks());
  }, []);

  const removeBookmark = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    saveBookmarks(updated);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setAuthError(null);
    setAuthLoading(true);
    const { error } = await signInWithMagicLink(email);
    setAuthLoading(false);
    if (error) {
      setAuthError(error.message || "Failed to send magic link");
    } else {
      setMagicLinkSent(true);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
      style={{
        height: "56px",
        backgroundColor: "transparent",
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
          fontWeight: 600,
          color: "#000000",
          letterSpacing: "0.06em",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        Colloque
      </Link>

      {/* ── Center: Nav links ── */}
      <ul
        className="hidden md:flex items-center gap-8"
        style={{ listStyle: "none", margin: 0, padding: 0 }}
      >
        {NAV_LINKS.map((link) => {
          const isActive = active === link.key;
          const matchCount = sectionMatchCounts[link.key] || 0;
          const hasMatch = matchCount > 0;
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
                  color: hasMatch ? "#C4973A" : isActive ? "#F5EFE6" : link.separator ? "rgba(245,239,230,0.85)" : "rgba(245,239,230,0.55)",
                  fontWeight: link.separator ? 600 : 400,
                  textDecoration: "none",
                  transition: "opacity 0.2s, color 0.2s",
                  paddingBottom: "4px",
                  ...(hasMatch ? {
                    animation: "pulse 2s ease-in-out infinite",
                  } : {}),
                }}
                onMouseEnter={(e) => {
                  if (!isActive && !hasMatch) (e.currentTarget as HTMLAnchorElement).style.color = "#F5EFE6";
                }}
                onMouseLeave={(e) => {
                  if (!isActive && !hasMatch) (e.currentTarget as HTMLAnchorElement).style.color = link.separator ? "rgba(245,239,230,0.85)" : "rgba(245,239,230,0.55)";
                }}
              >
                {link.label}
              </Link>
              {/* Match count badge */}
              {hasMatch && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-12px",
                    backgroundColor: "#C4973A",
                    color: "#0e0e0e",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    minWidth: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 4px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  {matchCount > 9 ? "9+" : matchCount}
                </span>
              )}
              {/* Active indicator dot */}
              {isActive && !hasMatch && (
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
          onClick={() => setBookmarkOpen((o) => !o)}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            color: bookmarkOpen ? "#F5EFE6" : "rgba(245,239,230,0.55)",
            transition: "color 0.2s",
            position: "relative",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#F5EFE6"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = bookmarkOpen ? "#F5EFE6" : "rgba(245,239,230,0.55)"; }}
        >
          <Bookmark size={18} strokeWidth={1.5} fill={bookmarks.length > 0 ? "#C4973A" : "none"} />
          {bookmarks.length > 0 && (
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
        {user ? (
          <div style={{ position: "relative" }}>
            <button
              aria-label="Account"
              onClick={() => setLoginOpen(true)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: loginOpen ? "#F5EFE6" : "rgba(245,239,230,0.55)",
                padding: 0, transition: "color 0.2s",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#F5EFE6"; }}
              onMouseLeave={(e) => { if (!loginOpen) (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,239,230,0.55)"; }}
            >
              <div
                style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  backgroundColor: "#C4973A",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "11px", fontWeight: 600, color: "#0e0e0e",
                }}
              >
                {getDisplayName().charAt(0).toUpperCase()}
              </div>
            </button>
          </div>
        ) : (
          <button
            aria-label="Sign In"
            onClick={() => setLoginOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", color: loginOpen ? "#F5EFE6" : "rgba(245,239,230,0.55)", padding: 0, transition: "color 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#F5EFE6"; }}
            onMouseLeave={(e) => { if (!loginOpen) (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,239,230,0.55)"; }}
          >
            <User size={18} strokeWidth={1.5} />
          </button>
        )}
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
              No bookmarked documentation
            </div>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: "0.4rem 0", maxHeight: "320px", overflowY: "auto" }}>
              {bookmarks
                .sort((a, b) => b.lastRead - a.lastRead)
                .slice(0, 1)
                .map((bm) => (
                <li
                  key={bm.id}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "0.55rem 1rem",
                    borderBottom: "1px solid rgba(245,239,230,0.05)",
                    gap: "0.5rem",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link
                      href={bm.href}
                      onClick={() => setBookmarkOpen(false)}
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "13px", fontWeight: 400,
                        color: active === bm.id ? "#C4973A" : "rgba(245,239,230,0.80)",
                        textDecoration: "none",
                        display: "block",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#F5EFE6"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = active === bm.id ? "#C4973A" : "rgba(245,239,230,0.80)"; }}
                    >
                      {bm.label}
                    </Link>
                    <span style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "10px", fontWeight: 400,
                      color: "rgba(245,239,230,0.35)",
                      marginTop: "0.2rem",
                      display: "block",
                    }}>
                      Last read: {getTimeAgo(bm.lastRead)}
                    </span>
                  </div>
                  <button
                    onClick={() => removeBookmark(bm.id)}
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
              onChange={(e) => {
                const query = e.target.value;
                setSearchQuery(query);
                const results = search(query);
                setSearchResults(results);
                
                // Calculate match counts per section
                const counts: Record<string, number> = {};
                results.forEach(result => {
                  counts[result.section] = (counts[result.section] || 0) + 1;
                });
                setSectionMatchCounts(counts);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); setSearchResults([]); setSectionMatchCounts({}); }
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

          {/* Search Results */}
          {searchQuery && (
            <div style={{ marginTop: "0.5rem", maxHeight: "320px", overflowY: "auto" }}>
              {searchResults.length === 0 ? (
                <div style={{ padding: "0.75rem 0.5rem", textAlign: "center", color: "rgba(245,239,230,0.40)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px" }}>
                  No results found
                </div>
              ) : (
                <ul style={{ listStyle: "none", margin: 0, padding: "0.4rem 0" }}>
                  {searchResults.slice(0, 8).map((result) => (
                    <li key={result.id}>
                      <Link
                        href={`${result.href}${result.sectionId ? `#${result.sectionId}` : ''}`}
                        onClick={() => { setSearchOpen(false); setSearchQuery(""); setSearchResults([]); setSectionMatchCounts({}); }}
                        style={{
                          display: "block",
                          padding: "0.6rem 0.75rem",
                          textDecoration: "none",
                          borderRadius: "4px",
                          transition: "background-color 0.15s",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(245,239,230,0.08)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; }}
                      >
                        <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 500, color: "#F5EFE6", marginBottom: "0.25rem" }}>
                          {result.title}
                        </div>
                        <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 300, color: "rgba(245,239,230,0.60)", lineHeight: 1.4 }}>
                          {result.description}
                        </div>
                        {result.textMatch && result.textMatch.length > 0 && (
                          <div style={{ marginTop: "0.25rem", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", fontWeight: 300, color: "rgba(196, 151, 58, 0.8)", fontStyle: "italic" }}>
                            &ldquo;{result.textMatch[0].substring(0, 80)}&rdquo;...
                          </div>
                        )}
                        <div style={{ marginTop: "0.35rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#C4973A" }}>
                            {result.category}
                          </span>
                          <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", fontWeight: 400, color: "rgba(245,239,230,0.35)" }}>
                            · {result.section}
                          </span>
                          {result.matchType && (
                            <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", fontWeight: 400, color: "rgba(196, 151, 58, 0.6)" }}>
                              · {result.matchType}
                            </span>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
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

          {user ? (
            <>
              {/* Logged in view */}
              <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "28px", fontStyle: "italic", fontWeight: 700, color: "#F5EFE6", marginBottom: "0.35rem", letterSpacing: "-0.01em" }}>
                Hello, {getDisplayName()}
              </h2>
              <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,239,230,0.45)", marginBottom: "2rem" }}>
                {user.email}
              </p>

              <button
                onClick={handleSignOut}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  padding: "0.75rem",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(245,239,230,0.12)",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color: "#F5EFE6",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "13px", fontWeight: 400,
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.11)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.06)"; }}
              >
                <LogOut size={16} strokeWidth={1.5} />
                Sign Out
              </button>
            </>
          ) : (
            <>
              {magicLinkSent ? (
                /* ── Confirmation ── */
                <>
                  <div style={{ textAlign: "center", padding: "1rem 0" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "26px", fontStyle: "italic", fontWeight: 700, color: "#F5EFE6", marginBottom: "0.75rem" }}>Check your inbox</h2>
                    <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,239,230,0.55)", lineHeight: 1.6, marginBottom: "2rem" }}>
                      We sent a magic link to <span style={{ color: "#C9A84C" }}>{email}</span>. Click it to sign in — no password needed.
                    </p>
                    <button
                      onClick={() => { setMagicLinkSent(false); setEmail(""); setLoginOpen(false); }}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(245,239,230,0.40)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", letterSpacing: "0.1em" }}
                    >
                      Dismiss
                    </button>
                  </div>
                </>
              ) : (
                /* ── Magic link form ── */
                <>
                  <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "28px", fontStyle: "italic", fontWeight: 700, color: "#F5EFE6", marginBottom: "0.35rem", letterSpacing: "-0.01em" }}>
                    Welcome back
                  </h2>
                  <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,239,230,0.45)", marginBottom: "1.75rem" }}>
                    Enter your email to receive a magic sign-in link
                  </p>

                  <form onSubmit={handleMagicLink}>
                    <div style={{ marginBottom: "1.25rem" }}>
                      <label style={{ display: "block", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,239,230,0.45)", marginBottom: "0.5rem" }}>
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                          width: "100%", padding: "0.65rem 0.9rem",
                          backgroundColor: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(245,239,230,0.12)",
                          borderRadius: "5px",
                          color: "#F5EFE6",
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "14px", fontWeight: 300,
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    {authError && (
                      <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", color: "#ff6b6b", marginBottom: "1rem" }}>
                        {authError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={authLoading}
                      style={{
                        width: "100%", padding: "0.75rem",
                        backgroundColor: authLoading ? "rgba(196,151,58,0.5)" : "#C4973A",
                        border: "none", borderRadius: "5px",
                        color: "#0e0e0e",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "13px", fontWeight: 600,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        cursor: authLoading ? "not-allowed" : "pointer",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => { if (!authLoading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#D4A843"; }}
                      onMouseLeave={(e) => { if (!authLoading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C4973A"; }}
                    >
                      {authLoading ? "Sending…" : "Send Magic Link"}
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </>
    )}
    </>
  );
}
