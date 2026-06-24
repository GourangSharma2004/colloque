"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LEARNING_SEQUENCE, ROADMAP_NOTE, Level } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function LearningSequence({ learningLevels }: { learningLevels: Level[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".ls-row", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} style={{ padding: "60px 0 0 0" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <div
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C9A84C",
              fontWeight: 600,
              marginBottom: "0.75rem",
            }}
          >
            Timeline
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(28px, 3.5vw, 38px)",
              fontStyle: "italic",
              fontWeight: 700,
              color: "#F5EFE6",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Recommended Learning Sequence
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              lineHeight: 1.6,
              color: "rgba(245, 239, 230, 0.6)",
            }}
          >
            12 months of serious, consistent engagement. Every phase earns the next one.
          </p>
        </div>

        {/* Timeline Table */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "2rem",
          }}
        >
          {/* Header Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 1fr",
              padding: "1rem 1.5rem",
              background: "rgba(201, 168, 76, 0.1)",
              borderBottom: "1px solid rgba(201, 168, 76, 0.2)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#C9A84C",
                fontWeight: 600,
              }}
            >
              Month
            </div>
            <div
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#C9A84C",
                fontWeight: 600,
              }}
            >
              Primary Focus
            </div>
            <div
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#C9A84C",
                fontWeight: 600,
              }}
            >
              Secondary
            </div>
          </div>

          {/* Data Rows */}
          {LEARNING_SEQUENCE.map((item, index) => (
            <div
              key={index}
              className="ls-row"
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 1fr",
                padding: "1rem 1.5rem",
                borderBottom:
                  index < LEARNING_SEQUENCE.length - 1
                    ? "1px solid rgba(255, 255, 255, 0.05)"
                    : "none",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(201, 168, 76, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#C9A84C",
                }}
              >
                {item.months}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#F5EFE6",
                  lineHeight: 1.5,
                }}
              >
                {item.primary}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "rgba(245, 239, 230, 0.6)",
                  lineHeight: 1.5,
                  fontStyle: "italic",
                }}
              >
                {item.secondary}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div
          style={{
            padding: "2rem",
            background: "rgba(201, 168, 76, 0.05)",
            borderLeft: "3px solid #C9A84C",
            borderRadius: "8px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "16px",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "rgba(245, 239, 230, 0.8)",
              margin: 0,
            }}
          >
            {ROADMAP_NOTE}
          </p>
        </div>
      </div>
    </section>
  );
}
