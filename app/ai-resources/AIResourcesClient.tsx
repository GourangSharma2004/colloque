"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SearchHighlight from "@/components/SearchHighlight";
import SectionNav from "./components/SectionNav";
import WeeklyDispatch from "./components/WeeklyDispatch";
import TheStack from "./components/TheStack";
import LiteracyAndPath from "./components/LiteracyAndPath";
import { ModelInfo, Tool, Question, Prompt, Level, StackItem } from "./data";

export interface AiDispatch {
  _id: string;
  title: string;
  slug: string;
  weekNumber?: number;
  coverImage: string;
  publishedAt?: string;
  summary: string;
  tools: { name: string; url: string; description: string }[];
  categories: string[];
  isPremium: boolean;
}

export interface AIResourcesClientProps {
  aiDispatches: AiDispatch[];
  models: ModelInfo[];
  tools: Tool[];
  taskRules: {
    keywords: string[];
    model: string;
    modelReason: string;
    tool: string;
    toolReason: string;
  }[];
  quizQuestions: Question[];
  prompts: Prompt[];
  learningLevels: Level[];
  stackItems: StackItem[];
  query: string;
  targetId: string;
}

export default function AIResourcesClient({
  aiDispatches,
  models,
  tools,
  taskRules,
  quizQuestions,
  prompts,
  learningLevels,
  stackItems,
  query,
  targetId,
}: AIResourcesClientProps) {
  return (
    <div style={{ position: "relative" }}>
      {/* Global Background Video */}
      <div 
        style={{ 
          position: "fixed", 
          inset: 0, 
          zIndex: 0, 
          pointerEvents: "none",
          overflow: "hidden",
          backgroundColor: "#1C1914"
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            opacity: 1,
          }}
        >
          <source src="/video/AIR BG.mp4" type="video/mp4" />
        </video>
        <div 
          style={{ 
            position: "absolute", 
            inset: 0, 
            background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.6) 100%)",
            zIndex: 1 
          }} 
        />
      </div>

      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar active="ai-resources" />
        <div style={{ position: "relative" }}>
          <SectionNav />
        </div>
        <SearchHighlight query={query} targetId={targetId}>
          <div style={{ minHeight: '100%' }}>
        
        <main style={{ paddingTop: "105px" }}>
          <WeeklyDispatch aiDispatches={aiDispatches} />
          <TheStack tools={tools} stackItems={stackItems} />
          <LiteracyAndPath 
            quizQuestions={quizQuestions} 
            learningLevels={learningLevels} 
          />
        </main>

        <footer className="py-8 px-6 md:px-16 lg:px-24 relative flex items-center justify-center mt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "rgba(245, 239, 230, 0.85)",
            }}
          >
            © Colloque · Built for thinkers.
          </p>
          <p
            style={{
              position: "absolute",
              left: "clamp(1.5rem, 6vw, 6rem)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "rgba(245, 239, 230, 0.85)",
            }}
          >
            Weekly AI Updates every Sunday evening
          </p>
        </footer>
          </div>
        </SearchHighlight>
      </div>
    </div>
  );
}
