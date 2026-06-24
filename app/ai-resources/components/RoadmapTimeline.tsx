"use client";

import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useRef } from "react";
import { ROADMAP_PHASES, RoadmapPhase } from "../data";

gsap.registerPlugin(ScrollTrigger);

type ResourceType = "courses" | "books" | "papers" | "youtube" | "blogs" | "documentation" | "newsletters" | "institutions";

export default function RoadmapTimeline({ selectedPhase }: { selectedPhase: number | null }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<Record<number, ResourceType>>({});
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});

  // Load completed topics from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ai_resources_topic_progress");
    if (saved) {
      try {
        setCompletedTopics(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load progress from localStorage", e);
      }
    }
  }, []);

  // Save completed topics to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("ai_resources_topic_progress", JSON.stringify(completedTopics));
  }, [completedTopics]);

  useGSAP(
    () => {
      gsap.from(".phase-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef }
  );

  const togglePhase = (phaseNum: number) => {
    setExpandedPhases((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(phaseNum)) {
        newSet.delete(phaseNum);
      } else {
        newSet.add(phaseNum);
      }
      return newSet;
    });
  };

  const setTab = (phaseNum: number, tab: ResourceType) => {
    setActiveTab((prev) => ({ ...prev, [phaseNum]: tab }));
  };

  const toggleTopic = (phaseNum: number, topicIndex: number) => {
    const key = `${phaseNum}-${topicIndex}`;
    setCompletedTopics((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Calculate per-phase progress percentage
  const getPhaseProgress = (phaseNum: number) => {
    const phase = ROADMAP_PHASES.find((p) => p.num === phaseNum);
    if (!phase) return 0;
    
    const totalTopics = phase.coreTopics.length;
    if (totalTopics === 0) return 0;
    
    const completedCount = phase.coreTopics.reduce((count, _, idx) => {
      const key = `${phaseNum}-${idx}`;
      return count + (completedTopics[key] ? 1 : 0);
    }, 0);
    
    return Math.round((completedCount / totalTopics) * 100);
  };

  // Calculate overall progress percentage
  const getOverallProgress = () => {
    const totalTopics = ROADMAP_PHASES.reduce((sum, phase) => sum + phase.coreTopics.length, 0);
    if (totalTopics === 0) return 0;
    
    const completedCount = ROADMAP_PHASES.reduce((count, phase) => {
      return count + phase.coreTopics.reduce((phaseCount, _, idx) => {
        const key = `${phase.num}-${idx}`;
        return phaseCount + (completedTopics[key] ? 1 : 0);
      }, 0);
    }, 0);
    
    return Math.round((completedCount / totalTopics) * 100);
  };

  const renderResourceItem = (item: any, type: ResourceType) => {
    if (item.url) {
      return (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            color: "#2D7DD2",
            textDecoration: "underline",
            textDecorationColor: "rgba(45, 125, 210, 0.3)",
            lineHeight: 1.5,
          }}
        >
          {item.title}
        </a>
      );
    }
    return (
      <span
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "13px",
          fontWeight: 400,
          color: "#F5EFE6",
          lineHeight: 1.5,
        }}
      >
        {item.title}
      </span>
    );
  };

  const resourceTabs: { key: ResourceType; label: string }[] = [
    { key: "courses", label: "Courses" },
    { key: "books", label: "Books" },
    { key: "papers", label: "Papers" },
    { key: "youtube", label: "YouTube" },
    { key: "blogs", label: "Blogs" },
    { key: "documentation", label: "Docs" },
    { key: "newsletters", label: "Newsletters" },
    { key: "institutions", label: "Institutions" },
  ];

  return (
    <section ref={sectionRef} style={{ padding: "60px 0" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical connector line */}
          <div
            style={{
              position: "absolute",
              left: "24px",
              top: "0",
              bottom: "0",
              width: "2px",
              background: "linear-gradient(to bottom, rgba(201, 168, 76, 0.4), rgba(201, 168, 76, 0.1))",
              zIndex: 0,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {ROADMAP_PHASES.map((phase) => {
              const isExpanded = expandedPhases.has(phase.num);
              const isSelected = selectedPhase === phase.num;
              const currentTab = activeTab[phase.num] || "courses";
              const phaseProgress = getPhaseProgress(phase.num);

              // Find first available resource type
              const firstAvailableTab = resourceTabs.find(
                (tab) => phase.resourceStack[tab.key as keyof typeof phase.resourceStack] && 
                         (phase.resourceStack[tab.key as keyof typeof phase.resourceStack] as any[])?.length > 0
              )?.key || "courses";

              return (
                <div
                  key={phase.num}
                  className="phase-card"
                  style={{
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {/* Phase number circle */}
                  <div
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "0",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: isSelected ? "#C9A84C" : "#1C1914",
                      border: isSelected ? "3px solid #C9A84C" : "2px solid rgba(201, 168, 76, 0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2,
                      boxShadow: isSelected ? "0 0 20px rgba(201, 168, 76, 0.4)" : "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "18px",
                        fontWeight: 700,
                        color: isSelected ? "#1C1914" : "#C9A84C",
                        lineHeight: 1,
                      }}
                    >
                      {phase.num}
                    </span>
                  </div>

                  {/* Phase card */}
                  <div
                    style={{
                      marginLeft: "70px",
                      background: isSelected
                        ? "rgba(201, 168, 76, 0.08)"
                        : "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(20px)",
                      border: isSelected
                        ? "2px solid rgba(201, 168, 76, 0.4)"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "16px",
                      padding: "2rem",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    onClick={() => togglePhase(phase.num)}
                  >
                    {/* Header */}
                    <div style={{ marginBottom: "1.5rem" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: "1rem",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontFamily: "var(--font-dm-sans), sans-serif",
                              fontSize: "11px",
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              color: "#C9A84C",
                              fontWeight: 600,
                              marginBottom: "0.5rem",
                            }}
                          >
                            Phase {phase.num}
                            {` • ${phaseProgress}%`}
                          </div>
                          <h3
                            style={{
                              fontFamily: "var(--font-cormorant), Georgia, serif",
                              fontSize: "clamp(24px, 3vw, 32px)",
                              fontStyle: "italic",
                              fontWeight: 700,
                              color: "#F5EFE6",
                              lineHeight: 1.2,
                              marginBottom: "0.75rem",
                            }}
                          >
                            {phase.title}
                          </h3>
                          <p
                            style={{
                              fontFamily: "var(--font-dm-sans), sans-serif",
                              fontSize: "14px",
                              fontWeight: 300,
                              lineHeight: 1.6,
                              color: "rgba(245, 239, 230, 0.7)",
                            }}
                          >
                            {phase.goal}
                          </p>
                        </div>
                        <div
                          style={{
                            fontSize: "24px",
                            color: "rgba(201, 168, 76, 0.6)",
                            transition: "transform 0.3s ease",
                            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        >
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "1.5rem" }}>
                        {/* Core Topics */}
                        <div style={{ marginBottom: "2rem" }}>
                          <div
                            style={{
                              fontFamily: "var(--font-dm-sans), sans-serif",
                              fontSize: "12px",
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              color: "rgba(201, 168, 76, 0.8)",
                              fontWeight: 600,
                              marginBottom: "1rem",
                            }}
                          >
                            Core Topics
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            {phase.coreTopics.map((topic, idx) => {
                              const topicKey = `${phase.num}-${idx}`;
                              const isCompleted = completedTopics[topicKey];
                              return (
                                <div key={idx}>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: "0.75rem",
                                    }}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={isCompleted || false}
                                      onChange={(e) => {
                                        toggleTopic(phase.num, idx);
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                      style={{
                                        marginTop: "4px",
                                        width: "18px",
                                        height: "18px",
                                        accentColor: "#C9A84C",
                                        cursor: "pointer",
                                      }}
                                    />
                                    <div
                                      style={{
                                        fontFamily: "var(--font-cormorant), Georgia, serif",
                                        fontSize: "18px",
                                        fontWeight: 600,
                                        color: isCompleted ? "rgba(201, 168, 76, 0.9)" : "#F5EFE6",
                                        marginBottom: "0.5rem",
                                        textDecoration: isCompleted ? "line-through" : "none",
                                        flex: 1,
                                      }}
                                    >
                                      {topic.title}
                                    </div>
                                  </div>
                                {topic.description && (
                                  <p
                                    style={{
                                      fontFamily: "var(--font-dm-sans), sans-serif",
                                      fontSize: "13px",
                                      fontWeight: 300,
                                      lineHeight: 1.6,
                                      color: "rgba(245, 239, 230, 0.6)",
                                      marginBottom: topic.subtopics ? "0.5rem" : 0,
                                    }}
                                  >
                                    {topic.description}
                                  </p>
                                )}
                                {topic.subtopics && (
                                  <ul
                                    style={{
                                      margin: 0,
                                      paddingLeft: "1.25rem",
                                      listStyle: "disc",
                                    }}
                                  >
                                    {topic.subtopics.map((subtopic, subIdx) => (
                                      <li
                                        key={subIdx}
                                        style={{
                                          fontFamily: "var(--font-dm-sans), sans-serif",
                                          fontSize: "12.5px",
                                          fontWeight: 300,
                                          lineHeight: 1.6,
                                          color: "rgba(245, 239, 230, 0.5)",
                                          marginBottom: "0.25rem",
                                        }}
                                      >
                                        {subtopic}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                                );
                              })}
                          </div>
                        </div>

                        {/* Resource Stack */}
                        <div>
                          <div
                            style={{
                              fontFamily: "var(--font-dm-sans), sans-serif",
                              fontSize: "12px",
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              color: "rgba(201, 168, 76, 0.8)",
                              fontWeight: 600,
                              marginBottom: "1rem",
                            }}
                          >
                            Resource Stack
                          </div>

                          {/* Tabs */}
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "0.5rem",
                              marginBottom: "1rem",
                              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                              paddingBottom: "0.75rem",
                            }}
                          >
                            {resourceTabs.map((tab) => {
                              const hasResources =
                                phase.resourceStack[tab.key as keyof typeof phase.resourceStack] && 
                                (phase.resourceStack[tab.key as keyof typeof phase.resourceStack] as any[])?.length > 0;
                              if (!hasResources) return null;
                              return (
                                <button
                                  key={tab.key}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setTab(phase.num, tab.key);
                                  }}
                                  style={{
                                    fontFamily: "var(--font-dm-sans), sans-serif",
                                    fontSize: "11px",
                                    fontWeight: 500,
                                    padding: "0.5rem 1rem",
                                    backgroundColor:
                                      currentTab === tab.key
                                        ? "rgba(201, 168, 76, 0.2)"
                                        : "transparent",
                                    color:
                                      currentTab === tab.key
                                        ? "#C9A84C"
                                        : "rgba(245, 239, 230, 0.5)",
                                    border: currentTab === tab.key ? "1px solid rgba(201, 168, 76, 0.4)" : "1px solid transparent",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                  }}
                                >
                                  {tab.label}
                                </button>
                              );
                            })}
                          </div>

                          {/* Tab content */}
                          <div>
                            {phase.resourceStack[currentTab as keyof typeof phase.resourceStack] && 
                             (phase.resourceStack[currentTab as keyof typeof phase.resourceStack] as any[])?.length > 0 ? (
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                {(phase.resourceStack[currentTab as keyof typeof phase.resourceStack] as any[]).map((item: any, idx: number) => (
                                  <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                                    {renderResourceItem(item, currentTab)}
                                    {item.description && (
                                      <p
                                        style={{
                                          fontFamily: "var(--font-dm-sans), sans-serif",
                                          fontSize: "12px",
                                          fontWeight: 300,
                                          lineHeight: 1.4,
                                          color: "rgba(245, 239, 230, 0.4)",
                                          margin: 0,
                                        }}
                                      >
                                        {item.description}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p
                                style={{
                                  fontFamily: "var(--font-dm-sans), sans-serif",
                                  fontSize: "13px",
                                  fontWeight: 300,
                                  color: "rgba(245, 239, 230, 0.4)",
                                  fontStyle: "italic",
                                }}
                              >
                                No resources in this category.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Overall Progress */}
        <div
          style={{
            marginTop: "3rem",
            padding: "1rem 1.5rem",
            background: "rgba(201, 168, 76, 0.08)",
            border: "1px solid rgba(201, 168, 76, 0.3)",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "400px",
            margin: "3rem auto 0",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#C9A84C",
                fontWeight: 600,
                marginBottom: "0.25rem",
              }}
            >
              Overall Progress
            </div>
            <div
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "24px",
                fontStyle: "italic",
                fontWeight: 700,
                color: "#F5EFE6",
              }}
            >
              {getOverallProgress()}%
            </div>
          </div>
          <div
            style={{
              width: "80px",
              height: "6px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${getOverallProgress()}%`,
                height: "100%",
                background: "#C9A84C",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
