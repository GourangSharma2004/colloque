"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "dispatch", label: "Weekly Dispatch" },
  { id: "stack", label: "The Stack" },
  { id: "literacy-path", label: "Literacy & Path" },
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
        position: "fixed", // Changed from sticky to fixed for stability
        top: "56px",
        left: 0,
        right: 0,
        zIndex: 40,
        backgroundColor: "transparent", // Slightly darker for contrast against video
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1600px",
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
                    color: isActive ? "#C9A84C" : "rgba(245,239,230,0.5)",
                    fontWeight: isActive ? 600 : 400,
                    padding: "14px 20px",
                    borderBottom: isActive
                      ? "2px solid #C9A84C"
                      : "2px solid transparent",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "rgba(245,239,230,0.8)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "rgba(245,239,230,0.5)";
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
