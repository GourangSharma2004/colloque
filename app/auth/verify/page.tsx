"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthVerify() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const next = params.get("next") || "/community";

    (async () => {
      if (code && supabase) {
        try {
          await supabase.auth.exchangeCodeForSession(code);
        } catch (err) {
          console.error("Auth exchange error:", err);
        }
      }
      router.replace(next);
    })();
  }, [router]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#F5EFE6",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "15px",
          color: "#2C2C2C",
          letterSpacing: "0.06em",
        }}
      >
        Signing you in…
      </p>
    </div>
  );
}
