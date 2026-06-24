"use client";

import Navbar from "@/components/Navbar";
import SearchHighlight from "@/components/SearchHighlight";
import SectionNav from "./components/SectionNav";
import NoticeBoard from "./components/NoticeBoard";
import QuestionOfWeek from "./components/QuestionOfWeek";
import CommunityChat from "./components/CommunityChat";
import { useUser } from "@/lib/auth";
import { useSearchParams } from "next/navigation";
import WaitlistForm from "@/components/WaitlistForm";

export default function CommunityClient() {
  const { isMember, joinCommunity } = useUser();
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase().trim() ?? "";
  const targetId = searchParams.get("section") ?? "";

  return (
    <>
      <style jsx global>{`
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.45; }
        }
      `}</style>
      <div style={{ backgroundColor: "#F5EFE6", minHeight: "100vh" }}>
        <Navbar active="community" />
        <SearchHighlight query={query} targetId={targetId}>
          <div style={{ minHeight: '100%' }}>

      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6"
        style={{ minHeight: "52vh", paddingTop: "80px", paddingBottom: "7rem" }}
      >
        {/* Background GIF */}
        <img
          src="/community.png"
          alt="Community Background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            zIndex: 0,
          }}
        />
        
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            animation: "subtlePulse 8s ease-in-out infinite",
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(48px, 8vw, 100px)",
              fontStyle: "italic",
              fontWeight: 700,
              color: "#C9A84C",
              lineHeight: 1.05,
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            Community
          </h1>
          <p
            style={{
              marginTop: "1.5rem",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "16px",
              fontWeight: 300,
              color: "rgba(245, 239, 230, 0.9)",
              letterSpacing: "0.06em",
              maxWidth: "600px",
            }}
          >
            Connect, converse, and grow together.
          </p>

          {!isMember ? (
            <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "14px", fontWeight: 400, color: "rgba(245, 239, 230, 0.6)", marginBottom: "1rem" }}>Join the waitlist for membership access:</p>
              <WaitlistForm />
              <button
                onClick={joinCommunity}
                style={{
                  marginTop: "1.5rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "transparent",
                  color: "rgba(245, 239, 230, 0.4)",
                  border: "none",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Already have a code? Join manually
              </button>
            </div>
          ) : (
            <div
              style={{
                marginTop: "2.5rem",
                padding: "0.85rem 2.4rem",
                backgroundColor: "rgba(201,168,76,0.1)",
                color: "#C9A84C",
                border: "1px solid #C9A84C",
                borderRadius: "6px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              You&apos;re a Member
            </div>
          )}
        </div>
      </section>

      {/* The main content area starting with a negative margin overlap */}
      <div style={{ marginTop: "-5rem", position: "relative", zIndex: 20 }}>
        
        {/* Combined Header + Notice Board Grid */}
        <div style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          backgroundColor: "#FFFFFF", 
          borderRadius: "12px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
          overflow: "hidden",
          border: "1px solid rgba(44,44,44,0.06)",
          display: "flex",
          flexDirection: "column",
        }}>
          <SectionNav />
          <section id="notice-board">
            <NoticeBoard />
          </section>
        </div>

        <main style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.5rem", paddingTop: "2.5rem" }}>
          
          {/* Question of the Week Section Grid */}
          <section id="question" style={{ 
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
            border: "1px solid rgba(44,44,44,0.06)",
          }}>
            <QuestionOfWeek />
          </section>

          {/* Community Chat Section Grid */}
          <section id="chat" style={{ 
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
            border: "1px solid rgba(44,44,44,0.06)",
            marginBottom: "4rem"
          }}>
            <CommunityChat />
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer
        className="py-8 px-6 md:px-16 lg:px-24 relative flex items-center justify-center"
        style={{ borderTop: "1px solid rgba(44,44,44,0.08)", marginTop: "2rem" }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: "#4A4035",
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
            color: "#4A4035",
          }}
        >
          Join the conversation
        </p>
      </footer>
        </div>
      </SearchHighlight>
    </div>
    </>
  );
}
