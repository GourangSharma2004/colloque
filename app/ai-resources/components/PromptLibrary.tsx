"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROMPTS, Prompt } from "../data";

gsap.registerPlugin(ScrollTrigger);

type Category = Prompt["category"] | "All";

const CATEGORIES: Category[] = [
  "All",
  "Image Editing",
  "Image Generation",
  "Video",
  "Web/UI",
  "Writing & Thinking",
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button
      onClick={copy}
      style={{
        background: "none",
        border: "1px solid rgba(44,44,44,0.14)",
        borderRadius: "3px",
        padding: "4px 10px",
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "10px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: copied ? "#C9A84C" : "rgba(44,44,44,0.45)",
        cursor: "pointer",
        transition: "all 0.2s",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        if (!copied)
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "rgba(201,168,76,0.5)";
      }}
      onMouseLeave={(e) => {
        if (!copied)
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "rgba(44,44,44,0.14)";
      }}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function PromptLibrary() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  // Zoom + pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragOrigin = useRef({ mx: 0, my: 0, px: 0, py: 0 });

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 4;

  const clampPan = (x: number, y: number, z: number) => {
    const el = viewportRef.current;
    if (!el) return { x, y };
    const maxX = (el.clientWidth * (z - 1)) / 2;
    const maxY = (el.clientHeight * (z - 1)) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const applyZoom = (next: number) => {
    const z = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, next));
    const clamped = clampPan(pan.x, pan.y, z);
    setZoom(z);
    setPan(z === 1 ? { x: 0, y: 0 } : clamped);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setDragging(true);
    dragOrigin.current = { mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - dragOrigin.current.mx;
    const dy = e.clientY - dragOrigin.current.my;
    const clamped = clampPan(
      dragOrigin.current.px + dx,
      dragOrigin.current.py + dy,
      zoom
    );
    setPan(clamped);
  };

  const stopDrag = () => setDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.25 : -0.25;
    applyZoom(zoom + delta);
  };

  useGSAP(
    () => {
      gsap.from(headRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: { trigger: headRef.current, start: "top 88%" },
      });
      gsap.from(".pl-card", {
        y: 24,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: { trigger: ".pl-card", start: "top 92%" },
      });
    },
    { scope: sectionRef }
  );

  const filtered =
    activeCategory === "All"
      ? PROMPTS
      : PROMPTS.filter((p) => p.category === activeCategory);

  return (
    <section
      id="prompts"
      ref={sectionRef}
      style={{
        backgroundColor: "#F0EAE0",
        borderBottom: "1px solid rgba(44,44,44,0.08)",
        padding: "80px 1.5rem 80px",
      }}
    >
      <style jsx global>{`
        @media (max-width: 767px) {
          .pl-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div ref={headRef} style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C9A84C",
              fontWeight: 500,
              marginBottom: "0.85rem",
            }}
          >
            Feature 04 — Prompt Library
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(34px, 5vw, 52px)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#1C1914",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}
          >
            Prompts that work
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              color: "#9A8E7A",
              lineHeight: 1.6,
            }}
          >
            Copy and use directly. No reading required — the cards are the content.
          </p>
        </div>

        {/* Cheat Sheet — inline image preview + corner download */}
        <div
          style={{
            marginBottom: "2.75rem",
            border: "1px solid rgba(44,44,44,0.10)",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          {/* Label bar */}
          <div
            style={{
              padding: "0.65rem 1.25rem",
              backgroundColor: "#1C1914",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(245,239,230,0.45)",
              }}
            >
              Prompting Mastery Cheat Sheet · 1 page
            </span>
          </div>

          {/* Zoomable image viewport */}
          <div
            ref={viewportRef}
            style={{
              position: "relative",
              overflow: "hidden",
              height: "clamp(380px, 48vw, 640px)",
              backgroundColor: "#F8F4EE",
              cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "default",
              userSelect: "none",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onWheel={handleWheel}
          >
            {/* Cheat sheet image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/cheatsheet-hires.webp"
              alt="Prompting Mastery Cheat Sheet"
              draggable={false}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: "center center",
                transition: dragging ? "none" : "transform 0.2s ease",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />

            {/* Zoom controls — bottom left */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "16px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                backgroundColor: "rgba(28,25,20,0.82)",
                border: "1px solid rgba(201,168,76,0.25)",
                borderRadius: "4px",
                padding: "4px 6px",
                backdropFilter: "blur(8px)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              {/* Zoom out */}
              <button
                onClick={() => applyZoom(zoom - 0.5)}
                disabled={zoom <= MIN_ZOOM}
                title="Zoom out"
                style={{
                  width: "28px", height: "28px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "none", border: "none", borderRadius: "3px",
                  cursor: zoom <= MIN_ZOOM ? "not-allowed" : "pointer",
                  color: zoom <= MIN_ZOOM ? "rgba(245,239,230,0.2)" : "rgba(245,239,230,0.75)",
                  fontSize: "18px", lineHeight: 1, transition: "color 0.15s",
                }}
                onMouseEnter={(e) => { if (zoom > MIN_ZOOM) (e.currentTarget as HTMLButtonElement).style.color = "#C9A84C"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = zoom <= MIN_ZOOM ? "rgba(245,239,230,0.2)" : "rgba(245,239,230,0.75)"; }}
              >
                −
              </button>

              {/* Zoom level display */}
              <span
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "#C9A84C",
                  minWidth: "36px",
                  textAlign: "center",
                  letterSpacing: "0.04em",
                }}
              >
                {Math.round(zoom * 100)}%
              </span>

              {/* Zoom in */}
              <button
                onClick={() => applyZoom(zoom + 0.5)}
                disabled={zoom >= MAX_ZOOM}
                title="Zoom in"
                style={{
                  width: "28px", height: "28px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "none", border: "none", borderRadius: "3px",
                  cursor: zoom >= MAX_ZOOM ? "not-allowed" : "pointer",
                  color: zoom >= MAX_ZOOM ? "rgba(245,239,230,0.2)" : "rgba(245,239,230,0.75)",
                  fontSize: "18px", lineHeight: 1, transition: "color 0.15s",
                }}
                onMouseEnter={(e) => { if (zoom < MAX_ZOOM) (e.currentTarget as HTMLButtonElement).style.color = "#C9A84C"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = zoom >= MAX_ZOOM ? "rgba(245,239,230,0.2)" : "rgba(245,239,230,0.75)"; }}
              >
                +
              </button>

              {/* Reset — only visible when zoomed */}
              {zoom !== 1 && (
                <>
                  <div style={{ width: "1px", height: "16px", backgroundColor: "rgba(245,239,230,0.15)", margin: "0 2px" }} />
                  <button
                    onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
                    title="Reset zoom"
                    style={{
                      height: "28px", padding: "0 8px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "none", border: "none", borderRadius: "3px",
                      cursor: "pointer",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "10px", fontWeight: 500,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      color: "rgba(245,239,230,0.55)",
                      transition: "color 0.15s",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#C9A84C"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,239,230,0.55)"; }}
                  >
                    Reset
                  </button>
                </>
              )}
            </div>

            {/* Download button — top right */}
            <a
              href="/CheatSheet.pdf"
              download="Prompting-Mastery-CheatSheet.pdf"
              title="Download PDF"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.55rem 1.1rem",
                backgroundColor: "rgba(28,25,20,0.82)",
                borderRadius: "3px",
                border: "1px solid rgba(201,168,76,0.35)",
                backdropFilter: "blur(8px)",
                transition: "border-color 0.2s, background-color 0.2s",
                boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "#C9A84C";
                el.style.borderColor = "#C9A84C";
                (el.querySelector(".dl-label") as HTMLElement).style.color = "#1C1914";
                (el.querySelector(".dl-icon") as SVGElement).style.stroke = "#1C1914";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "rgba(28,25,20,0.82)";
                el.style.borderColor = "rgba(201,168,76,0.35)";
                (el.querySelector(".dl-label") as HTMLElement).style.color = "#C9A84C";
                (el.querySelector(".dl-icon") as SVGElement).style.stroke = "#C9A84C";
              }}
            >
              <svg
                className="dl-icon"
                width="13" height="13" viewBox="0 0 24 24"
                fill="none" stroke="#C9A84C" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ transition: "stroke 0.2s", flexShrink: 0 }}
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span
                className="dl-label"
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "10px", fontWeight: 500,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#C9A84C", whiteSpace: "nowrap",
                  transition: "color 0.2s",
                }}
              >
                Download PDF
              </span>
            </a>
          </div>
        </div>

        {/* Category filter */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "2.25rem",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: isActive ? "#1C1914" : "none",
                  border: `1px solid ${isActive ? "#1C1914" : "rgba(44,44,44,0.18)"}`,
                  borderRadius: "2px",
                  padding: "6px 14px",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: isActive ? "#F5EFE6" : "rgba(44,44,44,0.55)",
                  cursor: "pointer",
                  transition: "all 0.18s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(44,44,44,0.4)";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "#2C2C2C";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(44,44,44,0.18)";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "rgba(44,44,44,0.55)";
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div
          className="pl-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1px",
            backgroundColor: "rgba(44,44,44,0.08)",
            border: "1px solid rgba(44,44,44,0.08)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {filtered.map((p) => (
            <div
              key={p.id}
              className="pl-card"
              style={{
                backgroundColor: "#F5EFE6",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {/* Category tag */}
              <div
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  fontWeight: 500,
                }}
              >
                {p.category}
              </div>

              {/* Prompt text */}
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "#2C2C2C",
                  lineHeight: 1.65,
                  flex: 1,
                }}
              >
                {p.prompt}
              </p>

              {/* Bottom row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                  paddingTop: "0.5rem",
                  borderTop: "1px solid rgba(44,44,44,0.07)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "11px",
                    fontStyle: "italic",
                    color: "#9A8E7A",
                    fontWeight: 300,
                    lineHeight: 1.4,
                    flex: 1,
                  }}
                >
                  {p.produces}
                </span>
                <CopyButton text={p.prompt} />
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "14px",
              color: "#9A8E7A",
              textAlign: "center",
              padding: "3rem",
            }}
          >
            No prompts in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
