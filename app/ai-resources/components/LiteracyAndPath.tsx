"use client";

import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useRef } from "react";
import { Question, Level } from "../data";
import RoadmapTimeline from "./RoadmapTimeline";
import LearningSequence from "./LearningSequence";

gsap.registerPlugin(ScrollTrigger);

export default function LiteracyAndPath({ 
  quizQuestions, 
  learningLevels 
}: { 
  quizQuestions: Question[]; 
  learningLevels: Level[]; 
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizState, setQuizState] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [questionResults, setQuestionResults] = useState<{ questionIndex: number; correct: boolean; topic: string }[]>([]);

  // Fisher-Yates shuffle
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useGSAP(
    () => {
      gsap.from(".lp-level", {
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
        },
      });
    },
    { scope: sectionRef }
  );

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "#C9A84C",
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: "var(--font-cormorant), Georgia, serif",
    fontSize: "clamp(42px, 6vw, 64px)",
    fontStyle: "italic",
    fontWeight: 700,
    lineHeight: 1.05,
    color: "#F5EFE6",
    marginBottom: "0.75rem",
    textShadow: "0 4px 40px rgba(0,0,0,0.3)",
  };

  const subtitleStyle: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontSize: "15px",
    fontWeight: 300,
    lineHeight: 1.6,
    color: "rgba(245,239,230,0.7)",
    marginBottom: "2.5rem",
    maxWidth: "700px",
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setQuizState("intro");
  };

  const beginQuiz = () => {
    const shuffled = shuffleArray(quizQuestions);
    setShuffledQuestions(shuffled.slice(0, 10));
    setQuizState("quiz");
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setQuestionResults([]);
  };

  const handleAnswer = (answerIndex: number) => {
    const currentQ = shuffledQuestions[currentQuestion];
    const isCorrect = answerIndex === currentQ.correct;
    
    const newAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newAnswers);

    // Track question result for phase analysis
    setQuestionResults(prev => [...prev, {
      questionIndex: currentQuestion,
      correct: isCorrect,
      topic: currentQ.topic
    }]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizState("result");
      const finalScore = score + (isCorrect ? 1 : 0);
      const recommendedPhase = getRecommendedPhase();
      setSelectedLevel(recommendedPhase);
      // Save recommended phase for Parallel Track
      localStorage.setItem("quiz_recommended_phase", recommendedPhase.toString());
    }
  };

  const getScoreTier = (s: number) => {
    if (s >= 9) return { tier: "Frontier", color: "#C9A84C" };
    if (s >= 8) return { tier: "Expert", color: "#C9A84C" };
    if (s >= 7) return { tier: "Advanced", color: "#2D7DD2" };
    if (s >= 5) return { tier: "Intermediate", color: "#3DAA5C" };
    if (s >= 3) return { tier: "Beginner", color: "#E05C3A" };
    return { tier: "Novice", color: "#8B5E3C" };
  };

  // Calculate phase readiness from quiz results
  const getPhaseReadiness = () => {
    const phaseStats: Record<number, { correct: number; total: number }> = {};
    
    questionResults.forEach(result => {
      const phase = 0;
      if (!phaseStats[phase]) {
        phaseStats[phase] = { correct: 0, total: 0 };
      }
      phaseStats[phase].total++;
      if (result.correct) {
        phaseStats[phase].correct++;
      }
    });

    const readiness: Record<number, { status: 'ready' | 'needs-work' | 'not-ready' | 'untested'; accuracy: number }> = {};
    
    for (let i = 0; i <= 11; i++) {
      const stats = phaseStats[i];
      if (!stats || stats.total === 0) {
        readiness[i] = { status: 'untested', accuracy: 0 };
      } else {
        const accuracy = stats.correct / stats.total;
        if (accuracy >= 0.7) {
          readiness[i] = { status: 'ready', accuracy };
        } else if (accuracy >= 0.4) {
          readiness[i] = { status: 'needs-work', accuracy };
        } else {
          readiness[i] = { status: 'not-ready', accuracy };
        }
      }
    }
    
    return readiness;
  };

  // Get recommended starting phase
  const getRecommendedPhase = () => {
    const readiness = getPhaseReadiness();
    
    // Find the lowest phase with <70% accuracy
    for (let i = 0; i <= 11; i++) {
      if (readiness[i].status === 'not-ready' || readiness[i].status === 'needs-work') {
        return i;
      }
    }
    
    // If all tested phases are ready, find the highest tested phase and recommend next
    let highestTested = -1;
    for (let i = 0; i <= 11; i++) {
      if (readiness[i].status !== 'untested') {
        highestTested = i;
      }
    }
    
    if (highestTested >= 0 && highestTested < 11) {
      return highestTested + 1;
    }
    
    // Default to Phase 0
    return 0;
  };

  return (
    <section
      id="literacy-path"
      ref={sectionRef}
      className="px-6 md:px-16 lg:px-24"
      style={{
        background: "transparent", // Fully transparent to let video show
        paddingTop: "140px",
        paddingBottom: "40px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style jsx global>{`
        @media (max-width: 767px) {
          .phase-readiness-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 30%, rgba(201, 168, 76, 0.08) 0%, transparent 50%), radial-gradient(circle at 50% 70%, rgba(61, 170, 92, 0.06) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1600px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "5rem" }}>
          <p style={labelStyle}>Section Three</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem" }}>
            <div style={{ flex: "1 1 600px" }}>
              <h2 style={titleStyle}>AI Literacy & Learning Path</h2>
              <p style={{ ...subtitleStyle, marginBottom: 0 }}>
                Take the quiz to assess your level, or dive directly into the learning path. Always accessible — no gatekeeping.
              </p>
            </div>
            <button
              onClick={startQuiz}
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                padding: "1rem 2.5rem",
                backgroundColor: "#C9A84C",
                color: "#1C1914",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 20px rgba(201,168,76,0.15)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#B89742";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 15px 30px rgba(201,168,76,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C9A84C";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 20px rgba(201,168,76,0.15)";
              }}
            >
              Assess Your Literacy
            </button>
          </div>
        </div>

        {showQuiz && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(8px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
            onClick={(e) => {
              if (e.currentTarget === e.target) setShowQuiz(false);
            }}
          >
            <div
              style={{
                backgroundColor: "#1C1914",
                borderRadius: "16px",
                padding: "3rem",
                maxWidth: "650px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                border: "1px solid rgba(255,255,255,0.1)",
                position: "relative",
              }}
            >
              <button
                onClick={() => setShowQuiz(false)}
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  background: "none",
                  border: "none",
                  color: "rgba(245,239,230,0.5)",
                  fontSize: "24px",
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: 0,
                }}
              >
                ×
              </button>

              {quizState === "intro" && (
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "32px",
                      fontStyle: "italic",
                      fontWeight: 700,
                      color: "#F5EFE6",
                      marginBottom: "1rem",
                    }}
                  >
                    AI Literacy Quiz
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "15px",
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: "rgba(245,239,230,0.7)",
                      marginBottom: "2rem",
                    }}
                  >
                    10 questions to assess your AI literacy level. Your score will direct you to relevant resources in the learning path.
                  </p>
                  <button
                    onClick={beginQuiz}
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      padding: "0.85rem 2.5rem",
                      backgroundColor: "#C9A84C",
                      color: "#1C1914",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#B89742";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C9A84C";
                    }}
                  >
                    Begin Quiz
                  </button>
                </div>
              )}

              {quizState === "quiz" && (
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#C9A84C",
                      marginBottom: "1.5rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "18px",
                      fontWeight: 500,
                      color: "#F5EFE6",
                      marginBottom: "2rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {shuffledQuestions[currentQuestion]?.q}
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {shuffledQuestions[currentQuestion]?.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "14px",
                          fontWeight: 400,
                          padding: "1rem 1.5rem",
                          backgroundColor: "rgba(255,255,255,0.05)",
                          color: "#F5EFE6",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#C9A84C";
                          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quizState === "result" && (
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "32px",
                      fontStyle: "italic",
                      fontWeight: 700,
                      color: "#F5EFE6",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Your Score: {score}/10
                  </h3>
                  <div
                    style={{
                      backgroundColor: getScoreTier(score).color,
                      color: "#FFFFFF",
                      padding: "0.75rem 2rem",
                      borderRadius: "8px",
                      display: "inline-block",
                      marginBottom: "2rem",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {getScoreTier(score).tier}
                  </div>
                  
                  {/* Phase Readiness Grid */}
                  <div style={{ marginBottom: "2rem" }}>
                    <h4
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#F5EFE6",
                        marginBottom: "1rem",
                      }}
                    >
                      Phase Readiness
                    </h4>
                    <div
                      className="phase-readiness-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(6, 1fr)",
                        gap: "0.5rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {Array.from({ length: 12 }, (_, i) => {
                        const readiness = getPhaseReadiness()[i];
                        const statusColors = {
                          ready: "#3DAA5C",
                          "needs-work": "#C9A84C",
                          "not-ready": "#E05C3A",
                          untested: "rgba(245,239,230,0.2)",
                        };
                        return (
                          <div
                            key={i}
                            style={{
                              aspectRatio: "1",
                              backgroundColor: statusColors[readiness.status],
                              borderRadius: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontFamily: "var(--font-dm-sans), sans-serif",
                              fontSize: "14px",
                              fontWeight: 600,
                              color: readiness.status === "untested" ? "rgba(245,239,230,0.5)" : "#FFFFFF",
                              border: readiness.status === "untested" ? "1px solid rgba(245,239,230,0.2)" : "none",
                            }}
                            title={`Phase ${i}: ${readiness.status === "ready" ? "Ready" : readiness.status === "needs-work" ? "Needs Work" : readiness.status === "not-ready" ? "Not Ready" : "Untested"} (${Math.round(readiness.accuracy * 100)}%)`}
                          >
                            {i}
                          </div>
                        );
                      })}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "1.5rem",
                        fontSize: "12px",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        color: "rgba(245,239,230,0.6)",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ width: "12px", height: "12px", backgroundColor: "#3DAA5C", borderRadius: "3px" }}></span>
                        Ready (≥70%)
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ width: "12px", height: "12px", backgroundColor: "#C9A84C", borderRadius: "3px" }}></span>
                        Needs Work (40-69%)
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ width: "12px", height: "12px", backgroundColor: "#E05C3A", borderRadius: "3px" }}></span>
                        Not Ready (&lt;40%)
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ width: "12px", height: "12px", backgroundColor: "rgba(245,239,230,0.2)", borderRadius: "3px", border: "1px solid rgba(245,239,230,0.2)" }}></span>
                        Untested
                      </span>
                    </div>
                  </div>

                  {/* Recommended Starting Phase */}
                  <div
                    style={{
                      padding: "1.5rem",
                      backgroundColor: "rgba(201, 168, 76, 0.1)",
                      border: "1px solid rgba(201, 168, 76, 0.3)",
                      borderRadius: "12px",
                      marginBottom: "2rem",
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#C9A84C",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Recommended Starting Phase: {getRecommendedPhase()}
                    </h4>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: 1.6,
                        color: "rgba(245,239,230,0.8)",
                        marginBottom: "1rem",
                      }}
                    >
                      Based on your quiz performance, we recommend starting from Phase {getRecommendedPhase()} in the roadmap below.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button
                      onClick={() => setShowQuiz(false)}
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        padding: "0.85rem 2.5rem",
                        backgroundColor: "#C9A84C",
                        color: "#1C1914",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#B89742";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C9A84C";
                      }}
                    >
                      View Roadmap
                    </button>
                    <button
                      onClick={() => {
                        setQuizState("intro");
                        setCurrentQuestion(0);
                        setScore(0);
                        setUserAnswers([]);
                        setQuestionResults([]);
                        setShuffledQuestions([]);
                      }}
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        padding: "0.85rem 2.5rem",
                        backgroundColor: "transparent",
                        color: "#F5EFE6",
                        border: "1px solid rgba(245,239,230,0.3)",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(245,239,230,0.1)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,239,230,0.5)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,239,230,0.3)";
                      }}
                    >
                      Retake Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Roadmap Timeline */}
        <RoadmapTimeline selectedPhase={selectedLevel} />

        {/* Learning Sequence Timeline */}
        <LearningSequence learningLevels={learningLevels} />

      </div>
    </section>
  );
}
