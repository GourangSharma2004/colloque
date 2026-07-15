"use client";

import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 767px)";

/**
 * SSR-safe hook that reports whether the viewport is at or below the
 * mobile breakpoint (767px, matching Tailwind's `md`).
 * Defaults to `false` until mounted to avoid hydration mismatches;
 * consumers should treat the first render as "desktop" and let this
 * settle on mount (usually within a frame, before paint-sensitive UI matters).
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return isMobile;
}
