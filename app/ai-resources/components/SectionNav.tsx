"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "dispatch", label: "Weekly Dispatch" },
  { id: "finder", label: "Tool Finder" },
  { id: "quiz", label: "Literacy Score" },
  { id: "prompts", label: "Prompt Library" },
  { id: "learning", label: "Learning Path" },
];

export default function SectionNav() {
  const [active, setActive] = useState("dispatch");

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-25% 0px -65% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 56 + 49;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: "56px",
        zIndex: 40,
        backgroundColor: "#F5EFE6",
        borderBottom: "1px solid rgba(44,44,44,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          justifyContent: "center",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        <ul
          style={{
            display: "flex",
            gap: "0",
            listStyle: "none",
            margin: 0,
            padding: 0,
            flexShrink: 0,
          }}
        >
          {SECTIONS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: isActive ? "#C9A84C" : "rgba(44,44,44,0.40)",
                    fontWeight: isActive ? 500 : 400,
                    padding: "14px 20px",
                    borderBottom: isActive
                      ? "2px solid #C9A84C"
                      : "2px solid transparent",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "rgba(44,44,44,0.75)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "rgba(44,44,44,0.40)";
                  }}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
