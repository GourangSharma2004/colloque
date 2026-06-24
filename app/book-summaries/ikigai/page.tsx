"use client";

import DocumentationBookmarkButton from "@/components/DocumentationBookmarkButton";

export default function IkigaiSummaryPage() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
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
      <DocumentationBookmarkButton
        bookmarkId="doc-ikigai"
        docTitle="Ikigai Summary"
        docHref="/book-summaries/ikigai"
      />
    </div>
  );
}
