"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DISPATCH_WEEKS } from "../data";

gsap.registerPlugin(ScrollTrigger);

const POINT_META = [
  { key: "dropped" as const, label: "One thing that dropped", accent: "#C9A84C" },
  { key: "matters" as const, label: "One thing that actually matters", accent: "#2C2C2C" },
  { key: "overhyped" as const, label: "One thing that's overhyped", accent: "#9A8E7A" },
];

export default function WeeklyDispatch() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);
  const [openWeeks, setOpenWeeks] = useState<Set<number>>(new Set());
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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
        backgroundColor: "#F5EFE6",
        borderBottom: "1px solid rgba(44,44,44,0.08)",
        padding: "80px 1.5rem 72px",
      }}
    >
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C9A84C",
            fontWeight: 500,
            marginBottom: "1rem",
          }}
        >
          Feature 02 — Weekly AI Dispatch
        </div>

        {/* Hero heading */}
        <div ref={heroRef}>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(44px, 7vw, 76px)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#1C1914",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              marginBottom: "0.5rem",
            }}
          >
            What matters this week
          </h1>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              color: "#9A8E7A",
              letterSpacing: "0.02em",
              marginBottom: "3rem",
            }}
          >
            {current.week}
          </p>

          {/* Three-point dispatch */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {POINT_META.map(({ key, label, accent }, idx) => (
              <div
                key={key}
                style={{
                  display: "grid",
                  gridTemplateColumns: "3px 1fr",
                  gap: "0 1.75rem",
                  padding: "2rem 0",
                  borderBottom:
                    idx < 2 ? "1px solid rgba(44,44,44,0.08)" : "none",
                }}
              >
                <div
                  style={{
                    width: "3px",
                    backgroundColor: accent,
                    borderRadius: "2px",
                    alignSelf: "stretch",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: accent === "#2C2C2C" ? "#2C2C2C" : accent,
                      fontWeight: 500,
                      marginBottom: "0.6rem",
                      opacity: accent === "#9A8E7A" ? 1 : undefined,
                    }}
                  >
                    {label}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "clamp(20px, 2.8vw, 26px)",
                      fontWeight: 600,
                      color: "#1C1914",
                      lineHeight: 1.2,
                      marginBottom: "0.6rem",
                    }}
                  >
                    {current[key].headline}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "14px",
                      fontWeight: 300,
                      color: "#5C5244",
                      lineHeight: 1.65,
                      maxWidth: "620px",
                    }}
                  >
                    {current[key].detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Archive */}
        <div ref={archiveRef} style={{ marginTop: "4rem" }}>
          <div
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(44,44,44,0.35)",
              fontWeight: 500,
              marginBottom: "1.25rem",
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
                  borderTop: "1px solid rgba(44,44,44,0.08)",
                }}
              >
                <button
                  onClick={() => toggleWeek(i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "1.1rem 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#2C2C2C",
                    }}
                  >
                    {w.week}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "18px",
                      color: "#C9A84C",
                      lineHeight: 1,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                      display: "inline-block",
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div style={{ paddingBottom: "1.5rem" }}>
                    {POINT_META.map(({ key, label, accent }) => (
                      <div
                        key={key}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "3px 1fr",
                          gap: "0 1.5rem",
                          marginBottom: "1.25rem",
                        }}
                      >
                        <div
                          style={{
                            width: "3px",
                            backgroundColor: accent,
                            borderRadius: "2px",
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontFamily: "var(--font-dm-sans), sans-serif",
                              fontSize: "9px",
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: accent,
                              fontWeight: 500,
                              marginBottom: "0.3rem",
                            }}
                          >
                            {label}
                          </div>
                          <p
                            style={{
                              fontFamily: "var(--font-cormorant), Georgia, serif",
                              fontSize: "17px",
                              fontWeight: 600,
                              color: "#1C1914",
                              marginBottom: "0.3rem",
                              lineHeight: 1.25,
                            }}
                          >
                            {w[key].headline}
                          </p>
                          <p
                            style={{
                              fontFamily: "var(--font-dm-sans), sans-serif",
                              fontSize: "13px",
                              fontWeight: 300,
                              color: "#5C5244",
                              lineHeight: 1.6,
                            }}
                          >
                            {w[key].detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Email subscription */}
        <div
          style={{
            marginTop: "3.5rem",
            padding: "2rem",
            border: "1px solid rgba(201,168,76,0.25)",
            borderRadius: "4px",
            backgroundColor: "rgba(201,168,76,0.04)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "20px",
              fontWeight: 600,
              fontStyle: "italic",
              color: "#1C1914",
              marginBottom: "0.35rem",
            }}
          >
            Get the dispatch every Monday
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "13px",
              fontWeight: 300,
              color: "#9A8E7A",
              marginBottom: "1.25rem",
            }}
          >
            Three points. No fluff. Unsubscribe any time.
          </p>
          {subscribed ? (
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "13px",
                color: "#C9A84C",
                fontWeight: 400,
              }}
            >
              You&apos;re on the list.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSubscribed(true);
              }}
              style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: "1 1 220px",
                  padding: "0.65rem 0.9rem",
                  backgroundColor: "#F5EFE6",
                  border: "1px solid rgba(44,44,44,0.18)",
                  borderRadius: "3px",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "#2C2C2C",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "0.65rem 1.5rem",
                  backgroundColor: "#C9A84C",
                  border: "none",
                  borderRadius: "3px",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#1C1914",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#B8973D")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#C9A84C")
                }
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
