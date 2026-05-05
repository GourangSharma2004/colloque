"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LEARNING_LEVELS } from "../data";

gsap.registerPlugin(ScrollTrigger);

const TYPE_COLOR: Record<string, string> = {
  Paper: "#C9A84C",
  Article: "#2C7DD2",
  Video: "#D24A2C",
};

export default function LearningPath() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(headRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: { trigger: headRef.current, start: "top 88%" },
      });
      gsap.from(".lp-card", {
        y: 28,
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".lp-card", start: "top 90%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="learning"
      ref={sectionRef}
      style={{
        backgroundColor: "#F5EFE6",
        borderBottom: "1px solid rgba(44,44,44,0.08)",
        padding: "80px 1.5rem 80px",
      }}
    >
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        {/* Header */}
        <div ref={headRef} style={{ marginBottom: "3.5rem" }}>
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
            Feature 05 — AI Learning Path
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
            Five levels. No shortcuts.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              color: "#9A8E7A",
              maxWidth: "500px",
              lineHeight: 1.6,
            }}
          >
            A structured progression from architecture fundamentals to applied AI and the agentic frontier. Each level includes concept, one resource, and one exercise.
          </p>
        </div>

        {/* Levels */}
        <div style={{ position: "relative" }}>
          {/* Vertical connector line */}
          <div
            style={{
              position: "absolute",
              left: "19px",
              top: "40px",
              bottom: "40px",
              width: "1px",
              backgroundColor: "rgba(201,168,76,0.2)",
              zIndex: 0,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {LEARNING_LEVELS.map((level) => (
              <div
                key={level.num}
                className="lp-card"
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr",
                  gap: "0 1.75rem",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Number circle */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#1C1914",
                    border: "2px solid #C9A84C",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#C9A84C",
                      lineHeight: 1,
                    }}
                  >
                    {level.num}
                  </span>
                </div>

                {/* Content */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.55)",
                    border: "1px solid rgba(44,44,44,0.08)",
                    borderRadius: "4px",
                    padding: "1.75rem",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "clamp(20px, 2.5vw, 24px)",
                      fontWeight: 700,
                      color: "#1C1914",
                      marginBottom: "0.85rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {level.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "13.5px",
                      fontWeight: 300,
                      color: "#5C5244",
                      lineHeight: 1.7,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {level.concept}
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                    className="lp-two-col"
                  >
                    {/* Resource */}
                    <div
                      style={{
                        padding: "1rem 1.1rem",
                        backgroundColor: "rgba(201,168,76,0.06)",
                        border: "1px solid rgba(201,168,76,0.18)",
                        borderRadius: "3px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "9px",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: TYPE_COLOR[level.resource.type] || "#C9A84C",
                          fontWeight: 500,
                          marginBottom: "0.4rem",
                        }}
                      >
                        {level.resource.type}
                      </div>
                      <a
                        href={level.resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "12.5px",
                          fontWeight: 400,
                          color: "#2C2C2C",
                          textDecoration: "underline",
                          textDecorationColor: "rgba(44,44,44,0.25)",
                          lineHeight: 1.4,
                        }}
                      >
                        {level.resource.title}
                      </a>
                    </div>

                    {/* Exercise */}
                    <div
                      style={{
                        padding: "1rem 1.1rem",
                        backgroundColor: "rgba(44,44,44,0.03)",
                        border: "1px solid rgba(44,44,44,0.08)",
                        borderRadius: "3px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "9px",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "rgba(44,44,44,0.40)",
                          fontWeight: 500,
                          marginBottom: "0.4rem",
                        }}
                      >
                        Exercise
                      </div>
                      <p
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "12.5px",
                          fontWeight: 300,
                          color: "#5C5244",
                          lineHeight: 1.55,
                        }}
                      >
                        {level.exercise}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .lp-two-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
