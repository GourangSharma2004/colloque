"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { QUIZ_QUESTIONS } from "../data";

gsap.registerPlugin(ScrollTrigger);

type Phase = "intro" | "quiz" | "result";

const TIERS = [
  { min: 0, max: 3, label: "Beginner", color: "#9A8E7A" },
  { min: 4, max: 6, label: "Intermediate", color: "#C9A84C" },
  { min: 7, max: 8, label: "Advanced", color: "#2C7DD2" },
  { min: 9, max: 10, label: "Top 10%", color: "#1C1914" },
];

function getTier(score: number) {
  return TIERS.find((t) => score >= t.min && score <= t.max) || TIERS[0];
}

function getGap(wrongIndices: number[]): string {
  if (wrongIndices.length === 0) return "No significant gaps identified.";
  const topics = wrongIndices.map((i) => QUIZ_QUESTIONS[i].topic);
  const freq: Record<string, number> = {};
  topics.forEach((t) => (freq[t] = (freq[t] || 0) + 1));
  const weakest = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
  return `Your weakest area is ${weakest}. Focus your next hour here.`;
}

function getNextStep(score: number): string {
  if (score <= 3) return "Start with Level 1 of the Learning Path — LLMs & How They Work.";
  if (score <= 6) return "Work through Level 3 (The Memory Problem) and try building a RAG prototype.";
  if (score <= 8) return "Study the Applied AI level — focus on evaluation design and production failure modes.";
  return "You're in the top tier. Read the ReAct paper and design your first multi-agent system on paper.";
}

export default function LiteracyQuiz() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUIZ_QUESTIONS.length).fill(null)
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      gsap.from(headRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: { trigger: headRef.current, start: "top 88%" },
      });
    },
    { scope: sectionRef }
  );

  const score = answers.filter((a, i) => a === QUIZ_QUESTIONS[i].correct).length;
  const wrongIndices = answers
    .map((a, i) => (a !== QUIZ_QUESTIONS[i].correct ? i : -1))
    .filter((i) => i >= 0);
  const tier = getTier(score);

  const handleSelect = (idx: number) => {
    if (confirmed) return;
    setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    setConfirmed(true);
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current < QUIZ_QUESTIONS.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      setPhase("result");
    }
  };

  const handleRestart = () => {
    setPhase("intro");
    setCurrent(0);
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(null));
    setSelected(null);
    setConfirmed(false);
    setCopied(false);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/ai-resources#quiz-score-${score}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const q = QUIZ_QUESTIONS[current];
  const progress = ((current + (confirmed ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;

  return (
    <section
      id="quiz"
      ref={sectionRef}
      style={{
        backgroundColor: "#1C1914",
        borderBottom: "1px solid rgba(44,44,44,0.08)",
        padding: "80px 1.5rem 80px",
      }}
    >
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        {/* Header */}
        <div ref={headRef} style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C9A84C",
              fontWeight: 500,
              marginBottom: "0.85rem",
            }}
          >
            Feature 03 — AI Literacy Score
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(34px, 5vw, 52px)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#F5EFE6",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}
          >
            How well do you understand AI?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              color: "rgba(245,239,230,0.50)",
              lineHeight: 1.6,
            }}
          >
            10 questions. No trivia. Tests real understanding — prompt quality, model awareness, output evaluation.
          </p>
        </div>

        {/* Intro state */}
        {phase === "intro" && (
          <div
            style={{
              backgroundColor: "rgba(245,239,230,0.04)",
              border: "1px solid rgba(245,239,230,0.1)",
              borderRadius: "4px",
              padding: "2.5rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "rgba(245,239,230,0.60)",
                marginBottom: "2rem",
                lineHeight: 1.65,
              }}
            >
              Questions appear one at a time. Select your answer, confirm, then advance.
              Your score and tier are revealed at the end.
            </p>
            <button
              onClick={() => setPhase("quiz")}
              style={{
                padding: "0.8rem 2.5rem",
                backgroundColor: "#C9A84C",
                border: "none",
                borderRadius: "3px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#1C1914",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#B8973D")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#C9A84C")
              }
            >
              Begin Quiz
            </button>
          </div>
        )}

        {/* Quiz state */}
        {phase === "quiz" && (
          <div>
            {/* Progress */}
            <div style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "11px",
                    color: "rgba(245,239,230,0.35)",
                    letterSpacing: "0.08em",
                  }}
                >
                  Question {current + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "11px",
                    color: "#C9A84C",
                    letterSpacing: "0.08em",
                  }}
                >
                  {q.topic}
                </span>
              </div>
              <div
                style={{
                  height: "2px",
                  backgroundColor: "rgba(245,239,230,0.08)",
                  borderRadius: "1px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    backgroundColor: "#C9A84C",
                    borderRadius: "1px",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>

            {/* Question */}
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(20px, 2.8vw, 25px)",
                fontWeight: 600,
                color: "#F5EFE6",
                lineHeight: 1.3,
                marginBottom: "1.75rem",
              }}
            >
              {q.q}
            </p>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.5rem" }}>
              {q.options.map((opt, idx) => {
                const isSelected = selected === idx;
                const isCorrect = idx === q.correct;
                let bg = "rgba(245,239,230,0.04)";
                let border = "rgba(245,239,230,0.1)";
                let color = "rgba(245,239,230,0.75)";

                if (confirmed) {
                  if (isCorrect) {
                    bg = "rgba(201,168,76,0.12)";
                    border = "#C9A84C";
                    color = "#C9A84C";
                  } else if (isSelected && !isCorrect) {
                    bg = "rgba(210,76,44,0.10)";
                    border = "rgba(210,76,44,0.5)";
                    color = "rgba(245,239,230,0.45)";
                  }
                } else if (isSelected) {
                  bg = "rgba(201,168,76,0.08)";
                  border = "rgba(201,168,76,0.5)";
                  color = "#F5EFE6";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    style={{
                      background: bg,
                      border: `1px solid ${border}`,
                      borderRadius: "3px",
                      padding: "0.9rem 1.1rem",
                      textAlign: "left",
                      cursor: confirmed ? "default" : "pointer",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "13.5px",
                      fontWeight: 300,
                      color,
                      lineHeight: 1.45,
                      transition: "all 0.18s",
                    }}
                    onMouseEnter={(e) => {
                      if (!confirmed && !isSelected)
                        (e.currentTarget as HTMLButtonElement).style.borderColor =
                          "rgba(245,239,230,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      if (!confirmed && !isSelected)
                        (e.currentTarget as HTMLButtonElement).style.borderColor =
                          "rgba(245,239,230,0.1)";
                    }}
                  >
                    <span style={{ opacity: 0.4, marginRight: "0.6rem", fontSize: "11px" }}>
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation (after confirm) */}
            {confirmed && (
              <div
                style={{
                  padding: "1rem 1.25rem",
                  backgroundColor: "rgba(201,168,76,0.06)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: "3px",
                  marginBottom: "1.5rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "13px",
                    fontWeight: 300,
                    color: "rgba(245,239,230,0.70)",
                    lineHeight: 1.6,
                  }}
                >
                  {q.explanation}
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {!confirmed ? (
                <button
                  onClick={handleConfirm}
                  disabled={selected === null}
                  style={{
                    padding: "0.75rem 1.75rem",
                    backgroundColor: selected !== null ? "#C9A84C" : "rgba(245,239,230,0.08)",
                    border: "none",
                    borderRadius: "3px",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: selected !== null ? "#1C1914" : "rgba(245,239,230,0.25)",
                    cursor: selected !== null ? "pointer" : "not-allowed",
                    transition: "all 0.18s",
                  }}
                >
                  Confirm
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  style={{
                    padding: "0.75rem 1.75rem",
                    backgroundColor: "#C9A84C",
                    border: "none",
                    borderRadius: "3px",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#1C1914",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "#B8973D")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "#C9A84C")
                  }
                >
                  {current < QUIZ_QUESTIONS.length - 1 ? "Next →" : "See Results"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Result state */}
        {phase === "result" && (
          <div>
            <div
              style={{
                backgroundColor: "rgba(245,239,230,0.04)",
                border: "1px solid rgba(245,239,230,0.1)",
                borderRadius: "4px",
                padding: "2.5rem",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(56px, 10vw, 80px)",
                  fontWeight: 700,
                  color: "#F5EFE6",
                  lineHeight: 1,
                  marginBottom: "0.25rem",
                }}
              >
                {score}
                <span
                  style={{
                    fontSize: "clamp(24px, 4vw, 36px)",
                    opacity: 0.3,
                    fontWeight: 400,
                  }}
                >
                  &nbsp;/ 10
                </span>
              </div>
              <div
                style={{
                  display: "inline-block",
                  padding: "4px 14px",
                  backgroundColor: tier.color,
                  borderRadius: "2px",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: tier.label === "Top 10%" ? "#F5EFE6" : "#1C1914",
                  marginBottom: "2rem",
                  marginTop: "0.75rem",
                }}
              >
                {tier.label}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left" }}>
                <div
                  style={{
                    padding: "1rem 1.25rem",
                    backgroundColor: "rgba(245,239,230,0.04)",
                    border: "1px solid rgba(245,239,230,0.08)",
                    borderRadius: "3px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "9px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#C9A84C",
                      fontWeight: 500,
                      marginBottom: "0.4rem",
                    }}
                  >
                    Gap identified
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "13.5px",
                      fontWeight: 300,
                      color: "rgba(245,239,230,0.75)",
                      lineHeight: 1.55,
                    }}
                  >
                    {getGap(wrongIndices)}
                  </p>
                </div>

                <div
                  style={{
                    padding: "1rem 1.25rem",
                    backgroundColor: "rgba(201,168,76,0.06)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    borderRadius: "3px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "9px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#C9A84C",
                      fontWeight: 500,
                      marginBottom: "0.4rem",
                    }}
                  >
                    Next step
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "13.5px",
                      fontWeight: 300,
                      color: "rgba(245,239,230,0.75)",
                      lineHeight: 1.55,
                    }}
                  >
                    {getNextStep(score)}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button
                onClick={handleShare}
                style={{
                  padding: "0.75rem 1.75rem",
                  backgroundColor: "#C9A84C",
                  border: "none",
                  borderRadius: "3px",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#1C1914",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#B8973D")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#C9A84C")
                }
              >
                {copied ? "Link copied" : "Share result"}
              </button>
              <button
                onClick={handleRestart}
                style={{
                  padding: "0.75rem 1.75rem",
                  background: "none",
                  border: "1px solid rgba(245,239,230,0.15)",
                  borderRadius: "3px",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(245,239,230,0.50)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(245,239,230,0.35)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "rgba(245,239,230,0.80)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(245,239,230,0.15)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "rgba(245,239,230,0.50)";
                }}
              >
                Retake
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
