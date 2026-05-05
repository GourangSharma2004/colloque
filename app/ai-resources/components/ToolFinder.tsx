"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MODELS, TOOLS, TASK_RULES, Tool } from "../data";

gsap.registerPlugin(ScrollTrigger);

type ToolCategory = Tool["category"] | "All";
const TOOL_CATEGORIES: ToolCategory[] = ["All", "Writing", "Coding", "Image", "Video", "Research", "Productivity"];

const PRICING_COLORS: Record<Tool["pricing"], string> = {
  Free: "#3DAA5C",
  Freemium: "#2C7DD2",
  Paid: "#9A8E7A",
};

function findMatch(task: string) {
  const t = task.toLowerCase();
  const rule = TASK_RULES.find((r) => r.keywords.some((k) => t.includes(k)));
  return rule || {
    model: "GPT-4o",
    modelReason: "Best general-purpose model for most tasks — strong reasoning, instruction-following, and multimodal support.",
    tool: "Notion AI",
    toolReason: "Versatile AI workspace for capturing, drafting, and iterating on any knowledge work.",
  };
}

export default function ToolFinder() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const dirRef = useRef<HTMLDivElement>(null);

  const [task, setTask] = useState("");
  const [result, setResult] = useState<ReturnType<typeof findMatch> | null>(null);
  const [toolFilter, setToolFilter] = useState<ToolCategory>("All");

  useGSAP(
    () => {
      gsap.from(headRef.current, {
        y: 30, opacity: 0, duration: 0.75, ease: "power2.out",
        scrollTrigger: { trigger: headRef.current, start: "top 88%" },
      });
      gsap.from(tableRef.current, {
        y: 24, opacity: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: tableRef.current, start: "top 88%" },
      });
      gsap.from(dirRef.current, {
        y: 24, opacity: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: dirRef.current, start: "top 88%" },
      });
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    setResult(findMatch(task));
  };

  const filteredTools =
    toolFilter === "All" ? TOOLS : TOOLS.filter((t) => t.category === toolFilter);

  return (
    <section
      id="finder"
      ref={sectionRef}
      style={{
        backgroundColor: "#F5EFE6",
        borderBottom: "1px solid rgba(44,44,44,0.08)",
        padding: "80px 1.5rem 80px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ── FINDER ── */}
        <div ref={headRef} style={{ maxWidth: "720px", marginBottom: "5rem" }}>
          <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 500, marginBottom: "0.85rem" }}>
            Feature 01 — Smart Tool + Model Finder
          </div>
          <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 700, fontStyle: "italic", color: "#1C1914", lineHeight: 1.1, marginBottom: "0.75rem" }}>
            What are you trying to do?
          </h2>
          <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "14px", fontWeight: 300, color: "#9A8E7A", lineHeight: 1.6, marginBottom: "2rem" }}>
            Describe your task in plain language. Get the right model and tool in one answer.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="e.g. debug a complex React hook, write a marketing email, find recent AI research..."
              style={{
                flex: "1 1 320px",
                padding: "0.85rem 1.1rem",
                backgroundColor: "#fff",
                border: "1px solid rgba(44,44,44,0.18)",
                borderRadius: "3px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "#2C2C2C",
                outline: "none",
              }}
              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#C9A84C"; }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(44,44,44,0.18)"; }}
            />
            <button
              type="submit"
              style={{
                padding: "0.85rem 2rem",
                backgroundColor: "#1C1914",
                border: "none",
                borderRadius: "3px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#F5EFE6",
                cursor: "pointer",
                transition: "background-color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C9A84C")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1C1914")}
            >
              Find →
            </button>
          </form>

          {/* Result */}
          {result && (
            <div style={{ marginTop: "1.75rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "rgba(44,44,44,0.1)", border: "1px solid rgba(44,44,44,0.1)", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ backgroundColor: "#F5EFE6", padding: "1.5rem 1.75rem" }}>
                <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 500, marginBottom: "0.5rem" }}>
                  Best Model
                </div>
                <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "22px", fontWeight: 700, color: "#1C1914", marginBottom: "0.4rem" }}>
                  {result.model}
                </div>
                <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 300, color: "#5C5244", lineHeight: 1.55 }}>
                  {result.modelReason}
                </p>
              </div>
              <div style={{ backgroundColor: "#F5EFE6", padding: "1.5rem 1.75rem", borderLeft: "1px solid rgba(44,44,44,0.08)" }}>
                <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 500, marginBottom: "0.5rem" }}>
                  Best Tool
                </div>
                <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "22px", fontWeight: 700, color: "#1C1914", marginBottom: "0.4rem" }}>
                  {result.tool}
                </div>
                <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 300, color: "#5C5244", lineHeight: 1.55 }}>
                  {result.toolReason}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── MODEL COMPARISON GUIDE ── */}
        <div ref={tableRef} style={{ marginBottom: "5rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, fontStyle: "italic", color: "#1C1914", marginBottom: "0.4rem" }}>
              Model Comparison Guide
            </h3>
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 300, color: "#9A8E7A" }}>
              What each major model is best at, where it fails, and who it&apos;s for.
            </p>
          </div>

          <div style={{ overflowX: "auto", border: "1px solid rgba(44,44,44,0.1)", borderRadius: "4px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "620px" }}>
              <thead>
                <tr style={{ backgroundColor: "#1C1914" }}>
                  {["Model", "Best At", "Weakness", "Ideal For"].map((h) => (
                    <th key={h} style={{ padding: "0.85rem 1.1rem", textAlign: "left", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,239,230,0.50)", borderBottom: "1px solid rgba(245,239,230,0.08)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MODELS.map((m, i) => (
                  <tr key={m.name} style={{ backgroundColor: i % 2 === 0 ? "#F5EFE6" : "rgba(245,239,230,0.5)" }}>
                    <td style={{ padding: "1rem 1.1rem", borderBottom: "1px solid rgba(44,44,44,0.06)" }}>
                      <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "16px", fontWeight: 700, color: "#1C1914" }}>{m.name}</span>
                    </td>
                    <td style={{ padding: "1rem 1.1rem", borderBottom: "1px solid rgba(44,44,44,0.06)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12.5px", fontWeight: 300, color: "#5C5244", lineHeight: 1.5 }}>
                      {m.bestAt}
                    </td>
                    <td style={{ padding: "1rem 1.1rem", borderBottom: "1px solid rgba(44,44,44,0.06)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12.5px", fontWeight: 300, color: "#9A8E7A", lineHeight: 1.5 }}>
                      {m.weakness}
                    </td>
                    <td style={{ padding: "1rem 1.1rem", borderBottom: "1px solid rgba(44,44,44,0.06)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12.5px", fontWeight: 300, color: "#5C5244", lineHeight: 1.5 }}>
                      {m.idealFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── TOOL DIRECTORY ── */}
        <div ref={dirRef}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, fontStyle: "italic", color: "#1C1914", marginBottom: "0.4rem" }}>
              Tool Directory
            </h3>
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 300, color: "#9A8E7A" }}>
              Filterable by category. Every tool with a direct link.
            </p>
          </div>

          {/* Category filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.75rem" }}>
            {TOOL_CATEGORIES.map((cat) => {
              const isActive = toolFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setToolFilter(cat)}
                  style={{
                    background: isActive ? "#1C1914" : "none",
                    border: `1px solid ${isActive ? "#1C1914" : "rgba(44,44,44,0.18)"}`,
                    borderRadius: "2px",
                    padding: "5px 12px",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: isActive ? "#F5EFE6" : "rgba(44,44,44,0.50)",
                    cursor: "pointer",
                    transition: "all 0.18s",
                  }}
                  onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(44,44,44,0.4)"; (e.currentTarget as HTMLButtonElement).style.color = "#2C2C2C"; } }}
                  onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(44,44,44,0.18)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(44,44,44,0.50)"; } }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Tool grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1px", backgroundColor: "rgba(44,44,44,0.08)", border: "1px solid rgba(44,44,44,0.08)", borderRadius: "4px", overflow: "hidden" }}>
            {filteredTools.map((tool) => (
              <div
                key={tool.name}
                style={{ backgroundColor: "#F5EFE6", padding: "1.35rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                  <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "18px", fontWeight: 700, color: "#1C1914", lineHeight: 1.2 }}>
                    {tool.name}
                  </span>
                  <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: PRICING_COLORS[tool.pricing], whiteSpace: "nowrap", marginTop: "3px" }}>
                    {tool.pricing}
                  </span>
                </div>
                <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12.5px", fontWeight: 300, color: "#5C5244", lineHeight: 1.5, flex: 1 }}>
                  {tool.description}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.5rem", borderTop: "1px solid rgba(44,44,44,0.07)" }}>
                  <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(44,44,44,0.30)" }}>
                    {tool.category}
                  </span>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", color: "#C9A84C", textDecoration: "none", letterSpacing: "0.06em" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.textDecoration = "none")}
                  >
                    Visit →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
