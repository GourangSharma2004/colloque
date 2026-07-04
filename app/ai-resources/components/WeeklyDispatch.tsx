"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DISPATCH_WEEKS } from "../data";
import { AiDispatch } from "../AIResourcesClient";

gsap.registerPlugin(ScrollTrigger);

const POINT_META = [
  { key: "dropped" as const, label: "What Dropped", accent: "#C9A84C" },
  { key: "matters" as const, label: "What Matters", accent: "#2D7DD2" },
  { key: "overhyped" as const, label: "What's Overhyped", accent: "#E05C3A" },
];

export default function WeeklyDispatch({ aiDispatches }: { aiDispatches: AiDispatch[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);
  const [openWeeks, setOpenWeeks] = useState<Set<number>>(new Set());
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showSplitView, setShowSplitView] = useState(false);
  const [activeHtmlFile, setActiveHtmlFile] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useGSAP(
    () => {
      gsap.from(heroRef.current, {
        y: 36,
        opacity: 0,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: { trigger: heroRef.current, start: "top 88%" },
      });
      gsap.from(archiveRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.15,
        scrollTrigger: { trigger: archiveRef.current, start: "top 88%" },
      });
    },
    { scope: sectionRef }
  );

  const toggleWeek = (i: number) => {
    setOpenWeeks((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const current = DISPATCH_WEEKS[0];
  const archived = DISPATCH_WEEKS.slice(1);

  return (
    <section
      id="dispatch"
      ref={sectionRef}
      style={{
        background: "transparent",
        padding: "40px 1.5rem 100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 20% 50%, rgba(201, 168, 76, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(45, 125, 210, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1600px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "4rem" }}>
          {/* Left Column: Hero & Intro */}
          <div style={{ gridColumn: "span 5" }}>
            {/* Eyebrow */}
            <div
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "11px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#C9A84C",
                fontWeight: 600,
                marginBottom: "2rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span
                style={{
                  width: "40px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, #C9A84C)",
                }}
              />
              Section One
            </div>

            {/* Hero heading */}
            <div ref={heroRef}>
              <h1
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(56px, 10vw, 110px)",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "#F5EFE6",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  marginBottom: "1.5rem",
                  textShadow: "0 4px 40px rgba(0,0,0,0.3)",
                }}
              >
                Weekly AI Dispatch
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "16px",
                  fontWeight: 300,
                  color: "rgba(245,239,230,0.7)",
                  letterSpacing: "0.02em",
                  marginBottom: "4rem",
                  maxWidth: "400px",
                }}
              >
                {current.week}
              </p>
            </div>

            {/* Email subscription in Left Column */}
            <div
              style={{
                padding: "2.5rem",
                background: "rgba(201,168,76,0.06)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: "20px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "24px",
                  fontWeight: 600,
                  fontStyle: "italic",
                  color: "#F5EFE6",
                  marginBottom: "0.5rem",
                }}
              >
                Join the Circle
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "rgba(245,239,230,0.6)",
                  marginBottom: "1.5rem",
                }}
              >
                Three points. No fluff. Every Monday.
              </p>
              {subscribed ? (
                <p style={{ color: "#C9A84C", fontSize: "14px", fontWeight: 500 }}>
                  You&apos;re on the list.
                </p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email.trim()) setSubscribed(true);
                  }}
                  style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      padding: "0.9rem 1.25rem",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "14px",
                      color: "#F5EFE6",
                      outline: "none",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: "0.9rem",
                      backgroundColor: "#C9A84C",
                      border: "none",
                      borderRadius: "10px",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#1C1914",
                      cursor: "pointer",
                    }}
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Dispatch Points */}
          <div style={{ gridColumn: "span 7" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
              {POINT_META.map(({ key, label, accent }, idx) => {
                const imageMap = {
                  dropped: "/dropped.png",
                  matters: "/matter.png",
                  overhyped: "/overhype.png",
                };
                const imageUrl = imageMap[key as keyof typeof imageMap];
                
                return (
                  <div
                    key={key}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "16px",
                      padding: "1.5rem",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.borderColor = accent;
                      e.currentTarget.style.transform = "translateY(-8px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: "3px",
                        background: accent,
                      }}
                    />
                    
                    <div
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "10px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: accent,
                        fontWeight: 600,
                        marginBottom: "1rem",
                      }}
                    >
                      {label}
                    </div>
                    
                    <img
                      src={imageUrl}
                      alt={label}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "contain",
                        marginBottom: "1rem",
                        borderRadius: "12px",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                    
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "clamp(16px, 2vw, 20px)",
                        fontWeight: 600,
                        color: "#F5EFE6",
                        lineHeight: 1.2,
                        marginBottom: "1rem",
                      }}
                    >
                      {current[key].headline}
                    </h3>
                    <button
                      onClick={() => {
                        setActiveHtmlFile(current.htmlFile || null);
                        setShowSplitView(true);
                      }}
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#C9A84C",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        transition: "all 0.3s ease",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#F5EFE6";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#C9A84C";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      Read full dispatch
                      <span style={{ fontSize: "12px" }}>→</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Archive Section below points */}
            <div ref={archiveRef} style={{ marginTop: "5rem" }}>
              <div
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(245,239,230,0.4)",
                  fontWeight: 500,
                  marginBottom: "2rem",
                }}
              >
                Previous dispatches
              </div>

              {archived.map((w, i) => {
                const isOpen = openWeeks.has(i);
                return (
                  <div
                    key={i}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <button
                      onClick={() => toggleWeek(i)}
                      style={{
                        width: "100%",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "1.5rem 0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "15px",
                          fontWeight: 400,
                          color: "rgba(245,239,230,0.6)",
                        }}
                      >
                        {w.week}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "20px",
                          color: "#C9A84C",
                          lineHeight: 1,
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                        }}
                      >
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div style={{ paddingBottom: "2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                        {POINT_META.map(({ key, label, accent }) => (
                          <div
                            key={key}
                            style={{
                              background: "rgba(255,255,255,0.02)",
                              borderRadius: "16px",
                              padding: "1.5rem",
                              border: "1px solid rgba(255,255,255,0.05)",
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "var(--font-dm-sans), sans-serif",
                                fontSize: "10px",
                                letterSpacing: "0.16em",
                                textTransform: "uppercase",
                                color: accent,
                                fontWeight: 500,
                                marginBottom: "0.75rem",
                              }}
                            >
                              {label}
                            </div>
                            <p
                              style={{
                                fontFamily: "var(--font-cormorant), Georgia, serif",
                                fontSize: "19px",
                                fontWeight: 600,
                                color: "#F5EFE6",
                                marginBottom: "0.5rem",
                              }}
                            >
                              {w[key].headline}
                            </p>
                            {w.htmlFile && (
                              <button
                                onClick={() => {
                                  setActiveHtmlFile(w.htmlFile || null);
                                  setShowSplitView(true);
                                }}
                                style={{
                                  fontFamily: "var(--font-dm-sans), sans-serif",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  color: "#C9A84C",
                                  textDecoration: "none",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "0.4rem",
                                  transition: "all 0.3s ease",
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  padding: 0,
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = "#F5EFE6";
                                  e.currentTarget.style.transform = "translateX(4px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = "#C9A84C";
                                  e.currentTarget.style.transform = "translateX(0)";
                                }}
                              >
                                Read full dispatch
                                <span style={{ fontSize: "12px" }}>→</span>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Split-Screen Overlay for Dispatch Documentation */}
      {showSplitView && (
        <>
          <div
            onClick={() => {
              setShowSplitView(false);
              setActiveHtmlFile(null);
              setZoomLevel(1);
            }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(8px)",
              zIndex: 9998,
            }}
          />
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            {/* Left side - Original page content (dimmed) */}
            <div
              style={{
                position: "relative",
                overflow: "auto",
                opacity: 0.3,
              }}
            />
            
            {/* Right side - Documentation */}
            <div
              style={{
                position: "relative",
                backgroundColor: "#07070E",
                borderLeft: "1px solid rgba(255,255,255,0.1)",
                overflow: "auto",
              }}
            >
              {/* Header toolbar */}
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 102,
                  background: "rgba(7, 7, 14, 0.95)",
                  backdropFilter: "blur(12px)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  padding: "1rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#F5EFE6",
                  }}
                >
                  Dispatch Documentation
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  {/* Zoom controls */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "8px",
                      padding: "0.4rem",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <button
                      onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
                      disabled={zoomLevel <= 0.5}
                      style={{
                        background: "rgba(201, 168, 76, 0.8)",
                        color: "#07070E",
                        border: "none",
                        borderRadius: "6px",
                        width: "28px",
                        height: "28px",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: zoomLevel > 0.5 ? "pointer" : "not-allowed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: zoomLevel > 0.5 ? 1 : 0.5,
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        color: "#F5EFE6",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "11px",
                        fontWeight: 500,
                        minWidth: "40px",
                        textAlign: "center",
                      }}
                    >
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}
                      disabled={zoomLevel >= 2}
                      style={{
                        background: "rgba(201, 168, 76, 0.8)",
                        color: "#07070E",
                        border: "none",
                        borderRadius: "6px",
                        width: "28px",
                        height: "28px",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: zoomLevel < 2 ? "pointer" : "not-allowed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: zoomLevel < 2 ? 1 : 0.5,
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => setZoomLevel(1)}
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        color: "#F5EFE6",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "6px",
                        padding: "0.4rem 0.6rem",
                        fontSize: "10px",
                        fontWeight: 500,
                        cursor: "pointer",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Reset
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setShowSplitView(false);
                      setActiveHtmlFile(null);
                      setZoomLevel(1);
                    }}
                    style={{
                      background: "rgba(201, 168, 76, 0.9)",
                      color: "#07070E",
                      border: "none",
                      borderRadius: "6px",
                      padding: "0.5rem 1rem",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#F5EFE6";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(201, 168, 76, 0.9)";
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Documentation iframe */}
              {activeHtmlFile ? (
                <div
                  style={{
                    width: "100%",
                    height: "calc(100% - 70px)",
                    overflow: "auto",
                  }}
                >
                  <iframe
                    src={activeHtmlFile}
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      display: "block",
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: "top left",
                      transition: "transform 0.2s ease",
                    }}
                    title="Dispatch Documentation"
                  />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "calc(100% - 70px)",
                    color: "#F5EFE6",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "16px",
                  }}
                >
                  No documentation available for this week
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
