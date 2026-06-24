"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "submitting") return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to join waitlist");
      }

      setStatus("success");
      setEmail("");
      setMessage("You've been added to the waitlist!");
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div style={{ maxWidth: "400px" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            borderRadius: "4px",
            border: "1px solid rgba(44,44,44,0.15)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "14px",
            outline: "none",
            backgroundColor: "#FFFFFF",
          }}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#C9A84C",
            color: "#0e0e0e",
            border: "none",
            borderRadius: "4px",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            cursor: status === "submitting" ? "not-allowed" : "pointer",
            transition: "opacity 0.2s",
          }}
        >
          {status === "submitting" ? "..." : "Join"}
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: "0.75rem",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "12px",
            color: status === "success" ? "#3DAA5C" : "#E05C3A",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
