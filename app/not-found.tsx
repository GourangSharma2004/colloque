import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <div
      style={{
        backgroundColor: "#F5EFE6",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#C9A84C",
          marginBottom: "1.5rem",
        }}
      >
        404
      </p>

      <h1
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(48px, 8vw, 96px)",
          fontStyle: "italic",
          fontWeight: 700,
          color: "#2C2C2C",
          lineHeight: 1.1,
          marginBottom: "1.5rem",
        }}
      >
        Lost in thought.
      </h1>

      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "16px",
          fontWeight: 300,
          color: "#6B5E4E",
          maxWidth: "480px",
          lineHeight: 1.7,
          marginBottom: "3rem",
        }}
      >
        This page doesn&apos;t exist — or at least, not yet. Perhaps it&apos;s an idea
        still taking shape.
      </p>

      <Link
        href="/"
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#2C2C2C",
          textDecoration: "none",
          borderBottom: "1px solid #C9A84C",
          paddingBottom: "2px",
        }}
      >
        Return to Colloque
      </Link>
    </div>
  );
}
