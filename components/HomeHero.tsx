"use client";

import { useEffect, useState } from "react";
import VideoHero from "@/components/VideoHero";
import MobileHero from "@/components/MobileHero";
import { useIsMobile } from "@/lib/useIsMobile";

/**
 * Decides once, before mounting either hero, whether to render the
 * desktop scroll-jacked canvas hero (`VideoHero`) or the lightweight
 * static mobile hero (`MobileHero`). Gating on `mounted` avoids ever
 * starting the 192-frame image preload on a phone.
 */
export default function HomeHero() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ minHeight: "100vh", backgroundColor: "#2C2C2C" }} />;
  }

  return isMobile ? <MobileHero /> : <VideoHero />;
}
