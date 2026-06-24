"use client";

import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useRef } from "react";
import { Tool, StackItem } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function TheStack({ tools, stackItems }: { tools: Tool[]; stackItems: StackItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      cardRefs.current.forEach((card, i) => {
        if (card) {
          gsap.from(card, {
            y: 40,
            opacity: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
            delay: i * 0.1,
          });
        }
      });
    },
    { scope: sectionRef }
  );

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "#C9A84C",
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: "var(--font-cormorant), Georgia, serif",
    fontSize: "clamp(42px, 6vw, 64px)",
    fontStyle: "italic",
    fontWeight: 700,
    lineHeight: 1.05,
    color: "#F5EFE6",
    marginBottom: "0.75rem",
    textShadow: "0 4px 40px rgba(0,0,0,0.3)",
  };

  const subtitleStyle: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontSize: "15px",
    fontWeight: 300,
    lineHeight: 1.6,
    color: "rgba(245,239,230,0.7)",
    marginBottom: "3rem",
    maxWidth: "650px",
  };

  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "2rem",
    marginBottom: "1.5rem",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
  };

  const toolNameStyle: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontSize: "18px",
    fontWeight: 600,
    color: "#F5EFE6",
    marginBottom: "0.75rem",
  };

  const descStyle: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontSize: "14px",
    fontWeight: 300,
    lineHeight: 1.6,
    color: "rgba(245,239,230,0.7)",
    marginBottom: "1.25rem",
  };

  const useCaseStyle: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontSize: "13px",
    fontWeight: 400,
    lineHeight: 1.5,
    color: "rgba(245,239,230,0.5)",
    marginBottom: "0.75rem",
  };

  const whyStyle: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    lineHeight: 1.5,
    color: "#C9A84C",
  };

  const metaStyle: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(245,239,230,0.4)",
    marginTop: "1.5rem",
    paddingTop: "1.25rem",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  };

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="px-6 md:px-16 lg:px-24"
      style={{
        background: "transparent", // Fully transparent to let video show
        paddingTop: "140px",
        paddingBottom: "100px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 30% 20%, rgba(45, 125, 210, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(201, 168, 76, 0.08) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1600px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "5rem" }}>
          <p style={labelStyle}>Section Two</p>
          <h2 style={titleStyle}>The Stack</h2>
          <p style={subtitleStyle}>
            Personal, opinionated tool curation — not a directory. Tools used as a thinker + creator, not as a developer. Updated quarterly.
          </p>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", 
          gap: "2rem",
          marginBottom: "5rem" 
        }}>
          {stackItems.map((item: StackItem, index: number) => (
            <div
              key={item.name}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)";
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
                }}
              />
              
              {item.image && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>
              )}
              
              <div style={toolNameStyle}>{item.name}</div>
              <div style={descStyle}>{item.description}</div>
              <div style={{ ...useCaseStyle, marginTop: "auto", color: "#C9A84C", fontWeight: 600, whiteSpace: "pre-line" }}>{item.useCase}</div>
              {item.whyThis && <div style={whyStyle}>{item.whyThis}</div>}
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
                {item.downloadLink && (
                  <a
                    href={item.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "0.6rem 1.2rem",
                      background: "rgba(201, 168, 76, 0.15)",
                      border: "1px solid rgba(201, 168, 76, 0.3)",
                      borderRadius: "8px",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#C9A84C",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(201, 168, 76, 0.25)";
                      e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(201, 168, 76, 0.15)";
                      e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.3)";
                    }}
                  >
                    Download the App →
                  </a>
                )}
                {item.documentation && (
                  <a
                    href={item.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "0.6rem 1.2rem",
                      background: "rgba(201, 168, 76, 0.15)",
                      border: "1px solid rgba(201, 168, 76, 0.3)",
                      borderRadius: "8px",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#C9A84C",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(201, 168, 76, 0.25)";
                      e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(201, 168, 76, 0.15)";
                      e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.3)";
                    }}
                  >
                    View Documentation →
                  </a>
                )}
              </div>
              {item.pipeline && (
                <a
                  href={item.pipeline}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: item.documentation || item.downloadLink ? "0.5rem" : "1rem",
                    marginRight: item.cheatsheet ? "1rem" : "0",
                    padding: "0.6rem 1.2rem",
                    background: "rgba(201, 168, 76, 0.15)",
                    border: "1px solid rgba(201, 168, 76, 0.3)",
                    borderRadius: "8px",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#C9A84C",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(201, 168, 76, 0.25)";
                    e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(201, 168, 76, 0.15)";
                    e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.3)";
                  }}
                >
                  View Pipeline →
                </a>
              )}
              {item.cheatsheet && (
                <a
                  href={item.cheatsheet}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: item.documentation || item.downloadLink || item.pipeline ? "0.5rem" : "1rem",
                    padding: "0.6rem 1.2rem",
                    background: "rgba(201, 168, 76, 0.15)",
                    border: "1px solid rgba(201, 168, 76, 0.3)",
                    borderRadius: "8px",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#C9A84C",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(201, 168, 76, 0.25)";
                    e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(201, 168, 76, 0.15)";
                    e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.3)";
                  }}
                >
                  Cheatsheet →
                </a>
              )}
              <div style={metaStyle}>
                {item.category} · {item.pricing}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "3rem",
            background: "rgba(201, 168, 76, 0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: "24px",
            maxWidth: "800px"
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: 1.8,
              color: "rgba(245,239,230,0.8)",
            }}
          >
            <strong style={{ fontWeight: 600, color: "#C9A84C" }}>Why this works:</strong> Authenticity is the product. Curation makes the decision for the reader. This is not a comprehensive directory — it&apos;s what actually gets used in practice.
          </p>
        </div>
      </div>
    </section>
  );
}
