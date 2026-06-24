"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
        Something went wrong
      </p>

      <h1
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(40px, 6vw, 80px)",
          fontStyle: "italic",
          fontWeight: 700,
          color: "#2C2C2C",
          lineHeight: 1.1,
          marginBottom: "1.5rem",
        }}
      >
        An unexpected error.
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
        We hit an unexpected snag. It&apos;s been logged and we&apos;ll look into it.
      </p>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <button
          onClick={reset}
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#F5EFE6",
            backgroundColor: "#2C2C2C",
            border: "none",
            padding: "0.75rem 1.75rem",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Try Again
        </button>

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
          Go Home
        </Link>
      </div>
    </div>
  );
}
