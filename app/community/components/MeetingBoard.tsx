"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Calendar, Clock, ExternalLink } from "lucide-react";

type Meeting = {
  id: string;
  title: string;
  description: string | null;
  platform: string;
  link: string;
  scheduled_at: string;
  created_at: string;
};

export default function MeetingBoard() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("meetings")
      .select("*")
      .order("scheduled_at", { ascending: true });

    if (error) {
      console.error("Error fetching meetings:", error);
    } else {
      setMeetings(data || []);
    }
    setLoading(false);
  };

  const getTimeUntil = (scheduledAt: string) => {
    const now = new Date();
    const scheduled = new Date(scheduledAt);
    const diff = scheduled.getTime() - now.getTime();

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const isPast = (scheduledAt: string) => {
    return new Date(scheduledAt) < new Date();
  };

  if (loading) {
    return (
      <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "14px", color: "#9A8E7A" }}>
          Loading meetings...
        </p>
      </div>
    );
  }

  if (!isSupabaseConfigured) {
    const dummyMeetings: Meeting[] = [
      {
        id: "1",
        title: "Weekly Book Club Discussion",
        description: "Join us to discuss this week's selected book. We'll be diving deep into the key themes, sharing insights, and exploring how the concepts apply to our daily lives.",
        platform: "Zoom",
        link: "https://zoom.us/j/123456789",
        scheduled_at: new Date(Date.now() + 86400000 * 2).toISOString(),
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      },
      {
        id: "2",
        title: "AI Tools Workshop",
        description: "A hands-on workshop exploring the latest AI tools for productivity and creativity. Learn how to integrate AI into your workflow effectively.",
        platform: "Google Meet",
        link: "https://meet.google.com/abc-defg-hij",
        scheduled_at: new Date(Date.now() + 86400000 * 7).toISOString(),
        created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
      {
        id: "3",
        title: "Community Networking Session",
        description: "Casual networking event to connect with fellow community members. Share your projects, find collaborators, or just have a great conversation.",
        platform: "Discord",
        link: "https://discord.gg/community",
        scheduled_at: new Date(Date.now() - 86400000 * 3).toISOString(),
        created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
      },
    ];
    const upcoming = dummyMeetings.filter((m) => !isPast(m.scheduled_at));
    const past = dummyMeetings.filter((m) => isPast(m.scheduled_at));
    return <MeetingBoardContent upcoming={upcoming} past={past} getTimeUntil={getTimeUntil} />;
  }

  const upcoming = meetings.filter((m) => !isPast(m.scheduled_at));
  const past = meetings.filter((m) => isPast(m.scheduled_at));

  if (upcoming.length === 0 && past.length === 0) {
    const dummyMeetings: Meeting[] = [
      {
        id: "1",
        title: "Weekly Book Club Discussion",
        description: "Join us to discuss this week's selected book. We'll be diving deep into the key themes, sharing insights, and exploring how the concepts apply to our daily lives.",
        platform: "Zoom",
        link: "https://zoom.us/j/123456789",
        scheduled_at: new Date(Date.now() + 86400000 * 2).toISOString(),
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      },
    ];
    const dummyUpcoming = dummyMeetings.filter((m) => !isPast(m.scheduled_at));
    const dummyPast = dummyMeetings.filter((m) => isPast(m.scheduled_at));
    return <MeetingBoardContent upcoming={dummyUpcoming} past={dummyPast} getTimeUntil={getTimeUntil} />;
  }

  return <MeetingBoardContent upcoming={upcoming} past={past} getTimeUntil={getTimeUntil} />;
}

function MeetingBoardContent({ upcoming, past, getTimeUntil }: { upcoming: Meeting[]; past: Meeting[]; getTimeUntil: (scheduledAt: string) => string | null }) {

  return (
    <div style={{ padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "32px",
            fontStyle: "italic",
            fontWeight: 700,
            color: "#2C2C2C",
            marginBottom: "1.5rem",
          }}
        >
          Meetings
        </h2>

        {upcoming.length === 0 && past.length === 0 ? (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "6px",
              padding: "3rem 1.5rem",
              boxShadow: "0 2px 12px rgba(44,44,44,0.06)",
              border: "1px solid rgba(44,44,44,0.08)",
              textAlign: "center",
            }}
          >
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "14px", color: "#9A8E7A" }}>
              No meetings scheduled yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcoming.length > 0 && (
              <>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#9A8E7A",
                    marginBottom: "1rem",
                  }}
                >
                  Upcoming
                </p>
                {upcoming.map((meeting) => {
                  const timeUntil = getTimeUntil(meeting.scheduled_at);
                  return (
                    <div
                      key={meeting.id}
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "6px",
                        padding: "1.5rem",
                        boxShadow: "0 2px 12px rgba(44,44,44,0.06)",
                        border: "1px solid rgba(44,44,44,0.08)",
                        position: "relative",
                      }}
                    >
                      {timeUntil && (
                        <div
                          style={{
                            position: "absolute",
                            top: "1rem",
                            right: "1rem",
                            backgroundColor: "#C9A84C",
                            color: "#0e0e0e",
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            padding: "0.35rem 0.6rem",
                            borderRadius: "3px",
                          }}
                        >
                          in {timeUntil}
                        </div>
                      )}

                      <h3
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontSize: "20px",
                          fontStyle: "italic",
                          fontWeight: 600,
                          color: "#2C2C2C",
                          marginBottom: "0.5rem",
                          paddingRight: "6rem",
                        }}
                      >
                        {meeting.title}
                      </h3>

                      {meeting.description && (
                        <p
                          style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "14px",
                            fontWeight: 300,
                            color: "#4A4035",
                            lineHeight: 1.5,
                            marginBottom: "1rem",
                          }}
                        >
                          {meeting.description}
                        </p>
                      )}

                      <div
                        style={{
                          display: "flex",
                          gap: "1.5rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          <Calendar size={14} strokeWidth={1.5} style={{ color: "#9A8E7A" }} />
                          <span
                            style={{
                              fontFamily: "var(--font-dm-sans), sans-serif",
                              fontSize: "12px",
                              color: "#4A4035",
                            }}
                          >
                            {new Date(meeting.scheduled_at).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          <Clock size={14} strokeWidth={1.5} style={{ color: "#9A8E7A" }} />
                          <span
                            style={{
                              fontFamily: "var(--font-dm-sans), sans-serif",
                              fontSize: "12px",
                              color: "#4A4035",
                            }}
                          >
                            {new Date(meeting.scheduled_at).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          <span
                            style={{
                              fontFamily: "var(--font-dm-sans), sans-serif",
                              fontSize: "12px",
                              color: "#9A8E7A",
                            }}
                          >
                            {meeting.platform}
                          </span>
                        </div>
                      </div>

                      <a
                        href={meeting.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.5rem 1rem",
                          backgroundColor: "#C9A84C",
                          color: "#0e0e0e",
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                          textDecoration: "none",
                          borderRadius: "4px",
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#D4A843";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C9A84C";
                        }}
                      >
                        Join Meeting
                        <ExternalLink size={14} strokeWidth={1.5} />
                      </a>
                    </div>
                  );
                })}
              </>
            )}

            {past.length > 0 && (
              <>
                {upcoming.length > 0 && (
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#9A8E7A",
                      marginTop: "2rem",
                      marginBottom: "1rem",
                    }}
                  >
                    Past Meetings
                  </p>
                )}
                {past.map((meeting) => (
                  <div
                    key={meeting.id}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.5)",
                      borderRadius: "6px",
                      padding: "1.5rem",
                      border: "1px solid rgba(44,44,44,0.05)",
                      opacity: 0.7,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "18px",
                        fontStyle: "italic",
                        fontWeight: 500,
                        color: "#4A4035",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {meeting.title}
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        gap: "1.5rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                        <Calendar size={14} strokeWidth={1.5} style={{ color: "#9A8E7A" }} />
                        <span
                          style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "12px",
                            color: "#4A4035",
                          }}
                        >
                          {new Date(meeting.scheduled_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
