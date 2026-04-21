// AI Resources pillar page — stub. Clone app/intellect/page.tsx to build this out.
import Navbar from "@/components/Navbar";

export default function AIResourcesPage() {
  return (
    <div style={{ backgroundColor: "#F5EFE6", minHeight: "100vh" }}>
      <Navbar active="ai-resources" />
      <div
        className="flex flex-col items-center justify-center"
        style={{ minHeight: "100vh" }}
      >
        <h1
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(48px, 8vw, 80px)",
            fontStyle: "italic",
            fontWeight: 700,
            color: "#1C1914",
            lineHeight: 1.05,
          }}
        >
          AI Resources
        </h1>
        <p
          style={{
            marginTop: "1.5rem",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "15px",
            fontWeight: 300,
            color: "#9A8E7A",
            letterSpacing: "0.04em",
          }}
        >
          Coming soon.
        </p>
      </div>
    </div>
  );
}
