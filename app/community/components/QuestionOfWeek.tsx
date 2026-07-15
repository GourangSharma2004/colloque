"use client";

import { useEffect, useRef, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useUser } from "@/lib/auth";
import { Bookmark, Heart, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";

type Question = {
  id: string;
  question: string;
  context: string | null;
  active: boolean;
  created_at: string;
};

type Reply = {
  id: string;
  question_id: string;
  user_id: string;
  display_name: string;
  body: string;
  created_at: string;
  like_count?: number;
  liked_by_user?: boolean;
  comments?: Comment[];
};

type Comment = {
  id: string;
  reply_id: string;
  user_id: string;
  display_name: string;
  body: string;
  created_at: string;
};

export default function QuestionOfWeek() {
  const { user, getDisplayName, isMember } = useUser();
  const [question, setQuestion] = useState<Question | null>({
    id: "1",
    question: "What's one book that fundamentally changed how you think, and why?",
    context: "Share a book that shifted your perspective on life, work, or thinking. We're looking for personal stories about how a particular book influenced your worldview or approach to problems.",
    active: true,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  });
  const [replies, setReplies] = useState<Reply[]>([
    {
      id: "1",
      question_id: "1",
      user_id: "user1",
      display_name: "Alex Chen",
      body: "Thinking, Fast and Slow by Daniel Kahneman completely changed how I approach decision-making. I used to trust my gut instincts implicitly, but now I'm much more aware of when System 1 thinking might lead me astray. It's helped me be more deliberate in both business and personal decisions.",
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      like_count: 12,
      liked_by_user: false,
      comments: [
        {
          id: "c1",
          reply_id: "1",
          user_id: "user2",
          display_name: "Sarah Miller",
          body: "Same here! The concept of loss aversion was eye-opening for me.",
          created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
        },
      ],
    },
    {
      id: "2",
      question_id: "1",
      user_id: "user3",
      display_name: "Jordan Lee",
      body: "The Design of Everyday Things by Don Norman. It transformed how I look at products and interfaces. Now I can't help but analyze door handles, light switches, and digital interfaces everywhere I go. It made me realize that good design is invisible—when something works well, you don't notice it.",
      created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
      like_count: 8,
      liked_by_user: false,
      comments: [],
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [replyBody, setReplyBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [submittingComment, setSubmittingComment] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      const localReplies = localStorage.getItem(`colloque_qow_replies_${question?.id || '1'}`);
      if (localReplies) {
        setReplies(JSON.parse(localReplies));
      }
      setLoading(false);
      return;
    }
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    if (!supabase) return;
    const { data: qData, error: qError } = await supabase
      .from("question_of_week")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (qError) {
      console.error("Error fetching question:", qError);
      setLoading(false);
      return;
    }

    setQuestion(qData);

    if (qData) {
      await fetchReplies(qData.id);
    } else {
      setLoading(false);
    }
  };

  const fetchReplies = async (questionId: string) => {
    if (!supabase) return;
    const { data: rData, error: rError } = await supabase
      .from("qow_replies")
      .select(`
        *,
        qow_likes(user_id),
        qow_comments(id, user_id, display_name, body, created_at)
      `)
      .eq("question_id", questionId)
      .order("created_at", { ascending: false });

    if (rError) {
      console.error("Error fetching replies:", rError);
    } else {
      const processed = (rData || []).map((reply: any) => ({
        ...reply,
        like_count: reply.qow_likes?.length || 0,
        liked_by_user: user ? reply.qow_likes?.some((l: any) => l.user_id === user.id) : false,
        comments: reply.qow_comments || [],
      }));
      setReplies(processed);
    }
    setLoading(false);
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setReplyBody(text);
    const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
    setWordCount(words.length);
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !question || wordCount > 200) return;

    if (!isSupabaseConfigured || !supabase) {
      const newReply: Reply = {
        id: Math.random().toString(36).substr(2, 9),
        question_id: question.id,
        user_id: user.id,
        display_name: getDisplayName(),
        body: replyBody,
        created_at: new Date().toISOString(),
        like_count: 0,
        liked_by_user: false,
        comments: [],
      };
      
      const updatedReplies = [newReply, ...replies];
      setReplies(updatedReplies);
      localStorage.setItem(`colloque_qow_replies_${question.id}`, JSON.stringify(updatedReplies));
      setReplyBody("");
      setWordCount(0);
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("qow_replies").insert({
      question_id: question.id,
      user_id: user.id,
      display_name: getDisplayName(),
      body: replyBody,
    });

    if (error) {
      console.error("Error submitting reply:", error);
    } else {
      setReplyBody("");
      setWordCount(0);
      await fetchReplies(question.id);
    }
    setSubmitting(false);
  };

  const handleToggleLike = async (replyId: string, liked: boolean) => {
    if (!user) return;

    if (!isSupabaseConfigured || !supabase) {
      const updatedReplies = replies.map(r => {
        if (r.id === replyId) {
          return {
            ...r,
            liked_by_user: !liked,
            like_count: (r.like_count || 0) + (liked ? -1 : 1)
          };
        }
        return r;
      });
      setReplies(updatedReplies);
      localStorage.setItem(`colloque_qow_replies_${question!.id}`, JSON.stringify(updatedReplies));
      return;
    }

    if (liked) {
      await supabase.from("qow_likes").delete().match({ reply_id: replyId, user_id: user.id });
    } else {
      await supabase.from("qow_likes").insert({ reply_id: replyId, user_id: user.id });
    }

    await fetchReplies(question!.id);
  };

  const toggleComments = (replyId: string) => {
    setExpandedComments((prev) => {
      const next = new Set(prev);
      if (next.has(replyId)) {
        next.delete(replyId);
      } else {
        next.add(replyId);
      }
      return next;
    });
  };

  const handleCommentChange = (replyId: string, value: string) => {
    setCommentInputs((prev) => ({ ...prev, [replyId]: value }));
  };

  const handleSubmitComment = async (replyId: string) => {
    if (!user || !commentInputs[replyId]?.trim()) return;

    if (!isSupabaseConfigured || !supabase) {
      const newComment: Comment = {
        id: Math.random().toString(36).substr(2, 9),
        reply_id: replyId,
        user_id: user.id,
        display_name: getDisplayName(),
        body: commentInputs[replyId],
        created_at: new Date().toISOString(),
      };
      
      const updatedReplies = replies.map(r => {
        if (r.id === replyId) {
          return {
            ...r,
            comments: [...(r.comments || []), newComment]
          };
        }
        return r;
      });
      setReplies(updatedReplies);
      localStorage.setItem(`colloque_qow_replies_${question!.id}`, JSON.stringify(updatedReplies));
      setCommentInputs((prev) => ({ ...prev, [replyId]: "" }));
      return;
    }

    setSubmittingComment((prev) => ({ ...prev, [replyId]: true }));
    const { error } = await supabase.from("qow_comments").insert({
      reply_id: replyId,
      user_id: user.id,
      display_name: getDisplayName(),
      body: commentInputs[replyId],
    });

    if (error) {
      console.error("Error submitting comment:", error);
    } else {
      setCommentInputs((prev) => ({ ...prev, [replyId]: "" }));
      await fetchReplies(question!.id);
    }
    setSubmittingComment((prev) => ({ ...prev, [replyId]: false }));
  };

  if (!isSupabaseConfigured) {
    return <QuestionOfWeekContent question={question!} replies={replies} user={user} isMember={isMember} getDisplayName={getDisplayName} replyBody={replyBody} setReplyBody={setReplyBody} submitting={submitting} wordCount={wordCount} handleReplyChange={handleReplyChange} handleSubmitReply={handleSubmitReply} handleToggleLike={handleToggleLike} expandedComments={expandedComments} toggleComments={toggleComments} commentInputs={commentInputs} handleCommentChange={handleCommentChange} handleSubmitComment={handleSubmitComment} submittingComment={submittingComment} />;
  }

  return <QuestionOfWeekContent question={question!} replies={replies} user={user} isMember={isMember} getDisplayName={getDisplayName} replyBody={replyBody} setReplyBody={setReplyBody} submitting={submitting} wordCount={wordCount} handleReplyChange={handleReplyChange} handleSubmitReply={handleSubmitReply} handleToggleLike={handleToggleLike} expandedComments={expandedComments} toggleComments={toggleComments} commentInputs={commentInputs} handleCommentChange={handleCommentChange} handleSubmitComment={handleSubmitComment} submittingComment={submittingComment} />;
}

function QuestionOfWeekContent({ question, replies, user, isMember, getDisplayName, replyBody, setReplyBody, submitting, wordCount, handleReplyChange, handleSubmitReply, handleToggleLike, expandedComments, toggleComments, commentInputs, handleCommentChange, handleSubmitComment, submittingComment }: { question: Question; replies: Reply[]; user: any; isMember: boolean; getDisplayName: () => string; replyBody: string; setReplyBody: (v: string) => void; submitting: boolean; wordCount: number; handleReplyChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; handleSubmitReply: (e: React.FormEvent) => Promise<void>; handleToggleLike: (id: string, liked: boolean) => Promise<void>; expandedComments: Set<string>; toggleComments: (id: string) => void; commentInputs: Record<string, string>; handleCommentChange: (id: string, v: string) => void; handleSubmitComment: (id: string) => Promise<void>; submittingComment: Record<string, boolean> }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const replyFormRef = useRef<HTMLDivElement>(null);

  const handleShareThoughts = () => {
    setShowReplyForm(true);
    setTimeout(() => {
      replyFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  const AVATAR_COLORS = ["#2C4A3E", "#3D2C4A", "#4A3D2C", "#2C3D4A"];
  const topReplies = replies.slice(0, 3);
  const memberCount = Math.max(replies.length, 248);

  return (
    <div style={{ padding: "4rem 2rem" }}>
      <style jsx global>{`
        @media (max-width: 767px) {
          .qow-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Two-column layout */}
        <div className="qow-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "4rem", alignItems: "start" }}>

          {/* LEFT — Question */}
          <div>
            <h2 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "20px", fontWeight: 700, color: "#2C2C2C", marginBottom: "0.35rem" }}>
              Question of the Week
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 400, color: "#9A8E7A", marginBottom: "2rem" }}>
              Thought-provoking questions to spark meaningful discussions.
            </p>

            {/* Decorative quote mark */}
            <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "96px", fontWeight: 700, color: "rgba(44,44,44,0.07)", lineHeight: 1, marginBottom: "-1.25rem", userSelect: "none" }}>
              "
            </div>

            {/* Question text */}
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(22px, 2.5vw, 28px)",
              fontStyle: "italic",
              fontWeight: 700,
              color: "#2C2C2C",
              lineHeight: 1.35,
              marginBottom: "2rem",
            }}>
              {question.question}
            </p>

            {/* Share Your Thoughts button */}
            <button
              onClick={handleShareThoughts}
              style={{
                padding: "0.8rem 1.8rem",
                backgroundColor: "#C9A84C",
                color: "#1C1914",
                border: "none",
                borderRadius: "6px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s ease",
                marginBottom: "2rem",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#D4A843"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#C9A84C"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Share Your Thoughts
            </button>

            {/* Member avatars + count */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
              <div style={{ display: "flex" }}>
                {AVATAR_COLORS.map((bg, i) => (
                  <div
                    key={i}
                    style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      backgroundColor: bg,
                      border: "2px solid #F5EFE6",
                      marginLeft: i === 0 ? 0 : "-8px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", color: "rgba(245,239,230,0.8)", fontWeight: 600 }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", fontWeight: 500, color: "#9A8E7A" }}>
                +{memberCount - 4}
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", fontWeight: 400, color: "#9A8E7A" }}>
              {memberCount} members have shared their thoughts
            </p>
          </div>

          {/* RIGHT — Top responses */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 600, color: "#2C2C2C" }}>
                Top responses
              </span>
              <button
                onClick={() => setShowReplyForm((v) => !v)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "12px", fontWeight: 500, color: "#C9A84C",
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  padding: 0,
                }}
              >
                View all responses <ChevronDown size={13} strokeWidth={2} />
              </button>
            </div>

            {/* Response cards */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {topReplies.length === 0 ? (
                <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", color: "#9A8E7A", padding: "1.5rem 0" }}>
                  No responses yet. Be the first to share!
                </p>
              ) : (
                topReplies.map((reply, idx) => (
                  <div key={reply.id}>
                    <div style={{ padding: "1.1rem 0" }}>
                      {/* Avatar + name + date */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.6rem" }}>
                        <div style={{
                          width: "34px", height: "34px", borderRadius: "50%",
                          backgroundColor: AVATAR_COLORS[idx % AVATAR_COLORS.length],
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                          <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", color: "rgba(245,239,230,0.9)", fontWeight: 600 }}>
                            {reply.display_name.charAt(0)}
                          </span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 600, color: "#2C2C2C" }}>
                            {reply.display_name}
                          </span>
                          <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", color: "#9A8E7A", marginLeft: "0.5rem" }}>
                            {new Date(reply.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        </div>
                        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#C8BFB0", padding: 0, lineHeight: 1, fontSize: "16px" }}>···</button>
                      </div>

                      {/* Response text */}
                      <p style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "13px", fontWeight: 300,
                        color: "#4A4035", lineHeight: 1.65,
                        marginBottom: "0.75rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      } as any}>
                        {reply.body}
                      </p>

                      {/* Action row */}
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <button
                          onClick={() => handleToggleLike(reply.id, reply.liked_by_user || false)}
                          disabled={!user}
                          style={{
                            background: "none", border: "none", cursor: user ? "pointer" : "default",
                            display: "flex", alignItems: "center", gap: "0.3rem",
                            color: reply.liked_by_user ? "#C9A84C" : "#9A8E7A", padding: 0, transition: "color 0.15s",
                          }}
                        >
                          <Heart size={14} fill={reply.liked_by_user ? "#C9A84C" : "none"} strokeWidth={1.5} />
                          <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px" }}>{reply.like_count || 0}</span>
                        </button>
                        <button
                          onClick={() => toggleComments(reply.id)}
                          style={{
                            background: "none", border: "none", cursor: "pointer",
                            display: "flex", alignItems: "center", gap: "0.3rem",
                            color: "#9A8E7A", padding: 0, transition: "color 0.15s",
                          }}
                        >
                          <MessageCircle size={14} strokeWidth={1.5} />
                          <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px" }}>{reply.comments?.length || 0}</span>
                        </button>
                        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9A8E7A", padding: 0 }}>
                          <Bookmark size={14} strokeWidth={1.5} />
                        </button>
                      </div>

                      {/* Expanded comments */}
                      {expandedComments.has(reply.id) && (
                        <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(44,44,44,0.07)" }}>
                          {reply.comments?.map((comment) => (
                            <div key={comment.id} style={{ paddingLeft: "0.75rem", marginBottom: "0.5rem" }}>
                              <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", fontWeight: 600, color: "#2C2C2C" }}>{comment.display_name}</span>
                              <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", color: "#9A8E7A", marginLeft: "0.4rem" }}>
                                {new Date(comment.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                              </span>
                              <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", color: "#4A4035", lineHeight: 1.5, marginTop: "0.2rem" }}>{comment.body}</p>
                            </div>
                          ))}
                          {user && isMember ? (
                            <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.5rem" }}>
                              <input
                                type="text"
                                placeholder="Add a comment..."
                                value={commentInputs[reply.id] || ""}
                                onChange={(e) => handleCommentChange(reply.id, e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter") handleSubmitComment(reply.id); }}
                                style={{ flex: 1, padding: "0.4rem 0.6rem", backgroundColor: "rgba(245,239,230,0.6)", border: "1px solid rgba(44,44,44,0.12)", borderRadius: "4px", color: "#2C2C2C", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", outline: "none" }}
                              />
                              <button
                                onClick={() => handleSubmitComment(reply.id)}
                                disabled={submittingComment[reply.id] || !commentInputs[reply.id]?.trim()}
                                style={{ padding: "0.4rem 0.7rem", backgroundColor: "#C9A84C", border: "none", borderRadius: "4px", color: "#1C1914", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}
                              >
                                {submittingComment[reply.id] ? "…" : "Send"}
                              </button>
                            </div>
                          ) : user && !isMember ? (
                            <button onClick={() => window.dispatchEvent(new CustomEvent("colloque-membership-update", { detail: true }))} style={{ background: "none", border: "none", cursor: "pointer", color: "#C9A84C", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", fontWeight: 500, padding: 0, marginTop: "0.4rem" }}>
                              Join the community to comment
                            </button>
                          ) : (
                            <button onClick={() => window.dispatchEvent(new CustomEvent("colloque-open-login"))} style={{ background: "none", border: "none", cursor: "pointer", color: "#C9A84C", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", fontWeight: 500, padding: 0, marginTop: "0.4rem" }}>
                              Sign in to comment
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    {idx < topReplies.length - 1 && (
                      <div style={{ height: "1px", backgroundColor: "rgba(44,44,44,0.08)" }} />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Reply form — shown when user clicks Share Your Thoughts */}
        {showReplyForm && (
          <div
            ref={replyFormRef}
            style={{
              marginTop: "3rem",
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              padding: "2rem",
              boxShadow: "0 2px 20px rgba(44,44,44,0.08)",
              border: "1px solid rgba(44,44,44,0.08)",
            }}
          >
            <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "14px", fontWeight: 600, color: "#2C2C2C", marginBottom: "1rem", letterSpacing: "0.04em" }}>
              Share Your Response
            </h3>
            {user && isMember ? (
              <form onSubmit={handleSubmitReply}>
                <textarea
                  value={replyBody}
                  onChange={handleReplyChange}
                  placeholder="Share your thoughts... (max 200 words)"
                  rows={4}
                  style={{
                    width: "100%", padding: "0.75rem",
                    backgroundColor: "rgba(245,239,230,0.35)",
                    border: wordCount > 200 ? "1px solid #ff6b6b" : "1px solid rgba(44,44,44,0.12)",
                    borderRadius: "6px", color: "#2C2C2C",
                    fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "14px", fontWeight: 300,
                    outline: "none", resize: "vertical", marginBottom: "0.75rem",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", color: wordCount > 200 ? "#ff6b6b" : "#9A8E7A" }}>
                    {wordCount}/200 words
                  </span>
                  <button
                    type="submit"
                    disabled={submitting || wordCount === 0 || wordCount > 200}
                    style={{
                      padding: "0.6rem 1.4rem", backgroundColor: wordCount > 200 ? "#9A8E7A" : "#C9A84C",
                      border: "none", borderRadius: "5px", color: "#1C1914",
                      fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 700,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      cursor: wordCount > 200 || wordCount === 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    {submitting ? "Submitting…" : "Submit"}
                  </button>
                </div>
              </form>
            ) : user && !isMember ? (
              <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "14px", color: "#9A8E7A", textAlign: "center", padding: "0.5rem 0" }}>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("colloque-membership-update", { detail: true }))}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#C9A84C", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "14px", fontWeight: 500, padding: 0 }}
                >
                  Join the community
                </button>{" "}
                to share your response
              </p>
            ) : (
              <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "14px", color: "#9A8E7A", textAlign: "center", padding: "0.5rem 0" }}>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("colloque-open-login"))}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#C9A84C", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "14px", fontWeight: 500, padding: 0 }}
                >
                  Sign in
                </button>{" "}
                to share your response
              </p>
            )}
          </div>
        )}

        {/* All replies list when expanded */}
        {showReplyForm && replies.length > 3 && (
          <div style={{ marginTop: "2rem" }}>
            <h3 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "14px", fontWeight: 600, color: "#2C2C2C", marginBottom: "1rem" }}>
              All Responses ({replies.length})
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {replies.map((reply) => (
                <div key={reply.id} style={{ backgroundColor: "#FFFFFF", borderRadius: "6px", padding: "1.25rem", border: "1px solid rgba(44,44,44,0.08)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                    <div style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#2C4A3E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", color: "rgba(245,239,230,0.9)", fontWeight: 600 }}>{reply.display_name.charAt(0)}</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 600, color: "#2C2C2C" }}>{reply.display_name}</span>
                    <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", color: "#9A8E7A" }}>{new Date(reply.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 300, color: "#4A4035", lineHeight: 1.6 }}>{reply.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
