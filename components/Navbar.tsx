"use client";

import Link from "next/link";
import { Bookmark, Search, User } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  key: string;
};

const NAV_LINKS: NavLink[] = [
  { label: "Book Summaries",  href: "/book-summaries", key: "book-summaries" },
  { label: "AI Resources",    href: "/ai-resources",   key: "ai-resources"   },
  { label: "Intellect",       href: "/intellect",      key: "intellect"      },
  { label: "Community",       href: "/community",      key: "community"      },
  { label: "The Log",         href: "/the-log",        key: "the-log"        },
];

type NavbarProps = {
  active?: string;
};

export default function Navbar({ active }: NavbarProps) {
  return (
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
            <li key={link.key} style={{ position: "relative" }}>
              <Link
                href={link.href}
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isActive ? "#F5EFE6" : "rgba(245,239,230,0.55)",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                  paddingBottom: "4px",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,239,230,0.85)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,239,230,0.55)";
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
          aria-label="Bookmark"
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(245,239,230,0.55)", padding: 0, transition: "color 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#F5EFE6"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,239,230,0.55)"; }}
        >
          <Bookmark size={18} strokeWidth={1.5} />
        </button>
        <button
          aria-label="Search"
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(245,239,230,0.55)", padding: 0, transition: "color 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#F5EFE6"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,239,230,0.55)"; }}
        >
          <Search size={18} strokeWidth={1.5} />
        </button>
        <button
          aria-label="Sign In"
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(245,239,230,0.55)", padding: 0, transition: "color 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#F5EFE6"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,239,230,0.55)"; }}
        >
          <User size={18} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
}
