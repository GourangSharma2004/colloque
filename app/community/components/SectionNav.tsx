"use client";

import { useEffect, useState } from "react";
import { ClipboardList, HelpCircle, MessageSquare } from "lucide-react";

const SECTIONS = [
  { id: "notice-board", label: "Notice Board", Icon: ClipboardList },
  { id: "question", label: "Question of the Week", Icon: HelpCircle },
  { id: "chat", label: "Community Chat", Icon: MessageSquare },
];

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState("notice-board");

  useEffect(() => {
    const observerOptions = {
      rootMargin: "-56px 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 56; // Navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      style={{
        backgroundColor: "#FAF8F5", // Match a light header tone
        borderBottom: "1px solid rgba(44,44,44,0.06)",
        padding: "1rem 0",
        width: "100%",
      }}
    >
      <div
        className="flex items-center justify-center gap-6 md:gap-10"
        style={{ width: "100%" }}
      >
        {SECTIONS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "12px",
              fontWeight: activeSection === id ? 600 : 400,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: activeSection === id ? "#2C2C2C" : "#9A8E7A",
              padding: "0.5rem 0.25rem",
              position: "relative",
              transition: "color 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
            }}
            onMouseEnter={(e) => {
              if (activeSection !== id) {
                (e.currentTarget as HTMLButtonElement).style.color = "#2C2C2C";
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== id) {
                (e.currentTarget as HTMLButtonElement).style.color = "#9A8E7A";
              }
            }}
          >
            <Icon size={14} strokeWidth={1.8} />
            {label}
            {activeSection === id && (
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  backgroundColor: "#C9A84C",
                  borderRadius: "1px",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
