"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";

export default function GoldenQuarterPage() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const bookmarkId = "doc-golden-quarter";
  const docTitle = "The Golden Quarter";

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("colloque_bookmarks") || "[]");
    setIsBookmarked(bookmarks.some((b: any) => b.id === bookmarkId));
  }, [bookmarkId]);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("colloque_bookmarks") || "[]");
    const existing = bookmarks.find((b: any) => b.id === bookmarkId);
    if (existing) {
      const updated = bookmarks.map((b: any) => 
        b.id === bookmarkId ? { ...b, lastRead: Date.now() } : b
      );
      localStorage.setItem("colloque_bookmarks", JSON.stringify(updated));
    }
  }, [bookmarkId]);

  const handleBookmarkToggle = () => {
    const bookmarks = JSON.parse(localStorage.getItem("colloque_bookmarks") || "[]");
    let updated;
    if (isBookmarked) {
      updated = bookmarks.filter((b: any) => b.id !== bookmarkId);
    } else {
      updated = [
        { id: bookmarkId, label: docTitle, href: "/intellect/golden-quarter", lastRead: Date.now() },
        ...bookmarks,
      ];
    }
    localStorage.setItem("colloque_bookmarks", JSON.stringify(updated));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <iframe
        src="/innovation.html"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="The Golden Quarter"
      />
      <button
        onClick={handleBookmarkToggle}
        style={{
          position: "fixed",
          top: "80px",
          right: "2rem",
          zIndex: 1000,
          background: "rgba(20, 20, 20, 0.9)",
          border: "1px solid rgba(201, 168, 76, 0.3)",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
          backdropFilter: "blur(10px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(201, 168, 76, 0.2)";
          e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(20, 20, 20, 0.9)";
          e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.3)";
        }}
        title={isBookmarked ? "Remove bookmark" : "Bookmark this page"}
      >
        <Bookmark 
          size={20} 
          strokeWidth={1.5} 
          fill={isBookmarked ? "#C9A84C" : "none"}
          color={isBookmarked ? "#C9A84C" : "rgba(245, 239, 230, 0.7)"}
        />
      </button>
    </div>
  );
}
