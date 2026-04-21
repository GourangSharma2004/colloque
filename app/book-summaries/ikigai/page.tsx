"use client";

export default function IkigaiSummaryPage() {
  return (
    <iframe
      src="/ikigai-summary.html"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
      title="Ikigai — Full Summary"
    />
  );
}
