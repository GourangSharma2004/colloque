"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FRAME_COUNT = 192;
const FRAMES_PATH = "/frames/frame_";

type Scene = {
  start: number;
  end: number;
  label?: string;
  title?: string;
  tagline?: string;
  body?: string;
  isScene0?: boolean;
  isHero?: boolean;
  hasCTA?: boolean;
  href?: string;
};

const scenes: Scene[] = [
  { start: 0.00, end: 0.14, isScene0: true },
  { start: 0.14, end: 0.30, isHero: true },
  {
    start: 0.30, end: 0.46,
    label: "01 — PILLAR", title: "Intellect",
    tagline: "The ideas that change how you see everything else.",
    body: "Deep documentation on concepts, phenomena, and essays most people encounter but never truly understand.\nOne topic. Every week.",
    href: "/intellect",
  },
  {
    start: 0.46, end: 0.60,
    label: "02 — PILLAR", title: "Book Summaries",
    tagline: "The book took years to write. You'll feel it in thirty minutes.",
    body: "Not what it says. What it does to you — and what you do differently after.",
    href: "/book-summaries",
  },
  {
    start: 0.60, end: 0.72,
    label: "03 — PILLAR", title: "AI Resources",
    tagline: "AI is only as sharp as the mind behind it.",
    body: "Tools, guides, frameworks, and models for people who want to think with AI — not hand their thinking over to it.",
    href: "/ai-resources",
  },
  {
    start: 0.72, end: 0.84,
    label: "04 — PILLAR", title: "Community",
    tagline: "This is where the thinking gets loud.",
    body: "A space to discuss, disagree, and go deeper — with people who actually read before they speak.",
    hasCTA: true,
    href: "/community",
  },
  {
    start: 0.84, end: 1.00,
    title: "The Log",
    tagline: "No performance. Just thinking out loud.",
    body: "A weekly record of what's being read, questioned, and reconsidered. A mind working in public.",
    href: "/the-log",
  },
];

// 25% power2.out fade-in | hold | 25% power2.in fade-out (last scene never fades out)
function sceneOpacity(p: number, start: number, end: number): number {
  if (p < start || p > end) return 0;
  const local = (p - start) / (end - start);
  const fade = 0.25;
  if (start > 0 && local < fade) {
    const t = local / fade;
    return 1 - Math.pow(1 - t, 2); // power2.out
  }
  if (end < 1.0 && local > 1 - fade) {
    const t = (local - (1 - fade)) / fade;
    return 1 - t * t; // power2.in — skip for last scene
  }
  return 1;
}

export default function VideoHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  // Scene 0 refs
  const s0TitleRef = useRef<HTMLElement | null>(null);
  const s0TaglineRef = useRef<HTMLElement | null>(null);
  // Scene 1 refs — [line1, line2, supportingLine, scrollIndicator]
  const s1Lines = useRef<Array<HTMLElement | null>>([null, null, null, null]);
  // Scenes 2–6 refs (indexed by scene index)
  const labelRefs = useRef<Array<HTMLElement | null>>([]);
  const headingRefs = useRef<Array<HTMLElement | null>>([]);
  const taglineRefs = useRef<Array<HTMLElement | null>>([]);
  const bodyRefs = useRef<Array<HTMLElement | null>>([]);
  const barRefs = useRef<Array<HTMLElement | null>>([]);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  // Track which scene timelines have fired (one-shot per session)
  const animatedScenes = useRef<Set<number>>(new Set());

  useEffect(() => {
    // ── helpers ──────────────────────────────────────────────────────────────
    const drawFrame = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx2d = canvas.getContext("2d");
      if (!ctx2d) return;
      const img = images.current[index];
      if (!img?.complete || img.naturalWidth === 0) return;
      ctx2d.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const startLogoAnimation = () => {
      // ── Scene 0 — title: fade in + scale 0.92 → 1 ────────────────────────
      gsap.fromTo(
        s0TitleRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out", delay: 0.3 }
      );

      // ── Scene 0 — tagline: fade in + translateY 20 → 0 ───────────────────
      gsap.fromTo(
        s0TaglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.9 }
      );
    };

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    // ── preload frames (UNCHANGED) ────────────────────────────────────────────
    images.current = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `${FRAMES_PATH}${String(i).padStart(4, "0")}.jpg`;
      images.current.push(img);
    }

    // ── canvas sizing ─────────────────────────────────────────────────────────
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // ── draw frame 1 immediately and start logo animation ─────────────────────
    const firstImg = images.current[0];
    if (firstImg) {
      if (firstImg.complete && firstImg.naturalWidth > 0) {
        drawFrame(0);
        startLogoAnimation();
        // Reveal section
        if (sectionRef.current) {
          gsap.to(sectionRef.current, { opacity: 1, duration: 0.1 });
        }
      } else {
        firstImg.onload = () => {
          drawFrame(0);
          startLogoAnimation();
          // Reveal section
          if (sectionRef.current) {
            gsap.to(sectionRef.current, { opacity: 1, duration: 0.1 });
          }
        };
      }
    }

    window.addEventListener("resize", resizeCanvas);

    // ── ScrollTrigger ─────────────────────────────────────────────────────────
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) {
      window.removeEventListener("resize", resizeCanvas);
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=600%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;

          // Canvas frame
          const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(p * FRAME_COUNT)
          );
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);

          // Scene container opacities + pointer events (only active scene is clickable)
          scenes.forEach((scene, i) => {
            const el = sceneRefs.current[i];
            if (!el) return;
            const op = sceneOpacity(p, scene.start, scene.end);
            el.style.opacity = String(op);
            el.style.pointerEvents = op > 0.5 ? "auto" : "none";
          });

          // ── Fire Scene 1 timeline once ────────────────────────────────────
          const s1 = scenes[1];
          if (p >= s1.start && !animatedScenes.current.has(1)) {
            animatedScenes.current.add(1);
            const tl1 = gsap.timeline();
            tl1
              .fromTo(
                s1Lines.current[0],
                { x: -40, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
                0
              )
              .fromTo(
                s1Lines.current[1],
                { x: 40, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
                0.2
              )
              .fromTo(
                s1Lines.current[2],
                { y: 20, opacity: 0 },
                { y: 0, opacity: 0.7, duration: 0.8, ease: "power2.out" },
                0.5
              );
            // SCROLL TO EXPLORE — pulse opacity 0.4→0.9→0.4 on loop
            if (s1Lines.current[3]) {
              gsap.to(s1Lines.current[3], {
                opacity: 0.9,
                duration: 1,
                delay: 0.8,
                yoyo: true,
                repeat: -1,
                ease: "power1.inOut",
              });
            }
          }

          // ── Fire Scenes 2–6 timelines once each ──────────────────────────
          for (let i = 2; i < scenes.length; i++) {
            const scene = scenes[i];
            if (p >= scene.start && !animatedScenes.current.has(i)) {
              animatedScenes.current.add(i);
              const tl = gsap.timeline();
              const barEl = barRefs.current[i];
              const labelEl = labelRefs.current[i];
              const headEl = headingRefs.current[i];
              const taglineEl = taglineRefs.current[i];
              const bodyEl = bodyRefs.current[i];

              if (barEl)
                tl.fromTo(
                  barEl,
                  { scaleY: 0 },
                  { scaleY: 1, duration: 0.6, ease: "power2.out", transformOrigin: "top" },
                  0
                );
              if (labelEl)
                tl.fromTo(
                  labelEl,
                  { opacity: 0 },
                  { opacity: 1, duration: 0.5, ease: "power2.out" },
                  0
                );
              if (headEl)
                tl.fromTo(
                  headEl,
                  { clipPath: "inset(0 100% 0 0)" },
                  { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power4.out" },
                  0.1
                );
              if (taglineEl)
                tl.fromTo(
                  taglineEl,
                  { y: 15, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                  0.3
                );
              if (bodyEl)
                tl.fromTo(
                  bodyEl,
                  { y: 15, opacity: 0 },
                  { y: 0, opacity: 0.85, duration: 0.8, ease: "power2.out" },
                  0.5
                );
              if (scene.hasCTA && ctaRef.current)
                tl.fromTo(
                  ctaRef.current,
                  { y: 10, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                  0.7
                );
            }
          }

          // Progress bar fill
          if (progressFillRef.current) {
            progressFillRef.current.style.height = `${p * 100}%`;
          }
        },
      });

    }, section);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-screen h-screen overflow-hidden"
        style={{ backgroundColor: "#2C2C2C", opacity: 0 }}
      >
        {/* Canvas — frame sequence drawn here */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ display: "block", width: "100%", height: "100%" }}
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.50) 50%, rgba(0,0,0,0.60) 100%)" }}
        />

        {/* ── Scene 0: Brand identity ── */}
        <div
          ref={(el) => { sceneRefs.current[0] = el; }}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ opacity: 1 }}
        >
          <div style={{ textAlign: "center", padding: "0 2rem" }}>
            <div
              ref={(el) => { s0TitleRef.current = el; }}
              style={{
                opacity: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="/logo.png"
                alt="Colloque"
                style={{
                  width: "clamp(550px, 75vw, 1100px)",
                  height: "auto",
                  display: "block",
                  filter: "drop-shadow(0 2px 60px rgba(0,0,0,0.3))",
                }}
              />
            </div>
            <div
              ref={(el) => { s0TaglineRef.current = el; }}
              style={{
                marginTop: "0.4rem",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.35rem)",
                fontWeight: 300,
                letterSpacing: "0.02em",
                color: "#F5EFE6",
                textShadow: "0 1px 30px rgba(0,0,0,0.5)",
                opacity: 0,
              }}
            >
              Read well. Think sharp. Speak with weight.
            </div>
          </div>
          {/* Scroll indicator — bottom center */}
          <div style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.7rem",
              fontWeight: 400,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(245,239,230,0.6)",
            }}>
              Scroll to explore
            </p>
          </div>
        </div>

        {/* ── Scene 1: Manifesto ── */}
        <div
          ref={(el) => { sceneRefs.current[1] = el; }}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div style={{ maxWidth: "1400px", textAlign: "center", padding: "0 2rem" }}>
            <div
              ref={(el) => { s1Lines.current[0] = el; }}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(3rem, 4vw, 4.5rem)",
                fontStyle: "italic",
                fontWeight: 600,
                lineHeight: 1.15,
                color: "#F5EFE6",
                textShadow: "0 1px 30px rgba(0,0,0,0.5)",
                opacity: 0,
              }}
            >
              Most content is made to be consumed.
            </div>
            <div
              ref={(el) => { s1Lines.current[1] = el; }}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(3rem, 4vw, 4.5rem)",
                fontStyle: "italic",
                fontWeight: 600,
                lineHeight: 1.15,
                color: "#F5EFE6",
                textShadow: "0 1px 30px rgba(0,0,0,0.5)",
                marginTop: "0.2rem",
                opacity: 0,
              }}
            >
              Colloque is made to be carried.
            </div>
            <p
              ref={(el) => { s1Lines.current[2] = el as HTMLElement; }}
              style={{
                margin: "1.5rem auto 0",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "rgba(245,239,230,0.70)",
                maxWidth: "480px",
                textShadow: "0 1px 30px rgba(0,0,0,0.5)",
                opacity: 0,
              }}
            >
              A space where the world&apos;s best ideas are made worth holding — and worth bringing to the table.
            </p>
            <p
              ref={(el) => { s1Lines.current[3] = el as HTMLElement; }}
              style={{
                marginTop: "2.5rem",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.75rem",
                fontWeight: 400,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#F5EFE6",
                textShadow: "0 1px 30px rgba(0,0,0,0.5)",
                opacity: 0.4,
              }}
            >
              Scroll to Explore
            </p>
          </div>
        </div>

        {/* ── Scenes 2–6: Pillars ── */}
        {scenes.slice(2).map((scene, idx) => {
          const i = idx + 2;
          return (
            <div
              key={i}
              ref={(el) => { sceneRefs.current[i] = el; }}
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
              style={{ opacity: 0 }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: "800px", padding: "0 2rem" }}>
                {/* Bar ref kept for animation compatibility — not rendered */}
                <div ref={(el) => { barRefs.current[i] = el; }} style={{ display: "none" }} />
                {/* Text block */}
                <div style={{ textAlign: "center" }}>
                  {scene.label && (
                    <p
                      ref={(el) => { labelRefs.current[i] = el; }}
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#F5EFE6",
                        marginBottom: "0.6rem",
                        opacity: 0,
                      }}
                    >
                      {scene.label}
                    </p>
                  )}
                  {!scene.label && <div ref={(el) => { labelRefs.current[i] = el; }} style={{ display: "none" }} />}
                  <h2
                    ref={(el) => { headingRefs.current[i] = el; }}
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "clamp(3rem, 6vw, 5.5rem)",
                      fontWeight: 700,
                      fontStyle: "italic",
                      lineHeight: 1.2,
                      color: "#F5EFE6",
                      textShadow: "0 2px 6px rgba(0,0,0,0.8)",
                      clipPath: "inset(0 100% 0 0)",
                    }}
                  >
                    {scene.title}
                  </h2>
                  <p
                    ref={(el) => { taglineRefs.current[i] = el; }}
                    style={{
                      marginTop: "1rem",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "clamp(1rem, 2vw, 1.35rem)",
                      fontWeight: 300,
                      letterSpacing: "0.02em",
                      color: "#F5EFE6",
                      opacity: 0,
                    }}
                  >
                    {scene.tagline}
                  </p>
                  <p
                    ref={(el) => { bodyRefs.current[i] = el; }}
                    style={{
                      marginTop: "1rem",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                      fontWeight: 300,
                      lineHeight: 1.75,
                      whiteSpace: "pre-line",
                      color: "rgba(245,239,230,0.70)",
                      maxWidth: i === 3 ? "640px" : i === 4 ? "520px" : "500px",
                      opacity: 0,
                    }}
                  >
                    {scene.body}
                  </p>
                  {!scene.hasCTA && scene.href && (
                    <div style={{ marginTop: "2rem" }}>
                      <Link
                        href={scene.href}
                        style={{
                          display: "inline-block",
                          border: "1px solid rgba(245,239,230,0.40)",
                          color: "#F5EFE6",
                          padding: "0.625rem 1.75rem",
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "0.9rem",
                          fontWeight: 400,
                          letterSpacing: "0.06em",
                          backgroundColor: "transparent",
                          transition: "background-color 0.2s",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(245,239,230,0.10)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; }}
                      >
                        Explore →
                      </Link>
                    </div>
                  )}
                  {scene.hasCTA && (
                    <div style={{ marginTop: "2rem" }}>
                      <a
                        ref={ctaRef}
                        href={scene.href ?? "#"}
                        style={{
                          display: "inline-block",
                          border: "1px solid rgba(245,239,230,0.40)",
                          color: "#F5EFE6",
                          padding: "0.625rem 1.75rem",
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "0.9rem",
                          fontWeight: 400,
                          letterSpacing: "0.06em",
                          backgroundColor: "transparent",
                          transition: "background-color 0.2s",
                          textDecoration: "none",
                          opacity: 0,
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(245,239,230,0.10)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; }}
                      >
                        Enter the conversation →
                      </a>
                    </div>
                  )}
                </div>
              </div>
              {scene.hasCTA && (
                <p
                  style={{
                    position: "absolute",
                    bottom: "2rem",
                    left: "2rem",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    color: "rgba(245,239,230,0.45)",
                  }}
                >
                  Made by Gourang Sharma
                </p>
              )}
            </div>
          );
        })}

        {/* Progress ref kept for internal tracking — not rendered */}
        <div ref={progressFillRef} style={{ display: "none" }} />
      </section>

    </>
  );
}
