"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { BookOpen, Calendar, Radio, Megaphone, FileText, Star, ArrowRight } from "lucide-react";

type Notice = {
  id: string;
  title: string;
  category: string;
  body: string;
  pinned: boolean;
  created_at: string;
  link_label?: string;
  link_href?: string;
};

function getCategoryMeta(category: string): { icon: React.ReactNode; label: string } {
  switch (category) {
    case "Book Summary":
      return { icon: <BookOpen size={11} strokeWidth={1.8} />, label: "Book Summary" };
    case "Event":
      return { icon: <Calendar size={11} strokeWidth={1.8} />, label: "Event" };
    case "Live Session":
      return { icon: <Radio size={11} strokeWidth={1.8} />, label: "Live Session" };
    case "Update":
      return { icon: <Megaphone size={11} strokeWidth={1.8} />, label: "Update" };
    default:
      return { icon: <FileText size={11} strokeWidth={1.8} />, label: category };
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const CARD_COLORS = ["#1E2B24", "#2B251E", "#1C1F26"];

const FALLBACK_NOTICES: Notice[] = [
  {
    id: "1",
    title: "New Book Summary: Thinking, Fast and Slow",
    category: "Book Summary",
    body: "We've just released a comprehensive summary of Daniel Kahneman's masterpiece.",
    pinned: true,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    link_label: "Read now",
    link_href: "/book-summaries",
  },
  {
    id: "2",
    title: "Community Meetup: AI in 2026",
    category: "Event",
    body: "Join us for an exciting discussion about the future of AI and its impact on our world.",
    pinned: false,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    link_label: "Learn more",
    link_href: "#",
  },
  {
    id: "3",
    title: "Live Discussion: The Future of Education",
    category: "Live Session",
    body: "A live conversation with thinkers and educators on what education should become.",
    pinned: false,
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    link_label: "Join live",
    link_href: "#",
  },
];

export default function NoticeBoard() {
  const [notices, setNotices] = useState<Notice[]>(FALLBACK_NOTICES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) {
      console.error("Error fetching notices:", error);
    } else {
      setNotices(data || []);
    }
    setLoading(false);
  };

  const displayNotices = loading
    ? []
    : notices.length > 0
    ? notices
    : FALLBACK_NOTICES;

  return (
    <div style={{ padding: "3rem 2rem 4rem 2rem" }}>
      <style jsx global>{`
        @media (max-width: 767px) {
          .nb-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <div>
            <h2
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "#2C2C2C",
                marginBottom: "0.3rem",
              }}
            >
              Notice Board
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 400, color: "#9A8E7A" }}>
              Stay updated with the latest from Colloque.
            </p>
          </div>
          <a
            href="#"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "#C9A84C",
              textDecoration: "none",
              letterSpacing: "0.04em",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              whiteSpace: "nowrap",
              paddingTop: "0.25rem",
            }}
          >
            View all updates <ArrowRight size={12} strokeWidth={2} />
          </a>
        </div>

        {/* Cards grid */}
        <div
          className="nb-cards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
          }}
        >
          {displayNotices.slice(0, 3).map((notice, idx) => {
            const { icon, label } = getCategoryMeta(notice.category);
            const linkLabel = notice.link_label || "Read more";
            const linkHref = notice.link_href || "#";

            return (
              <div
                key={notice.id}
                style={{
                  backgroundColor: CARD_COLORS[idx % CARD_COLORS.length],
                  borderRadius: "10px",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  position: "relative",
                  minHeight: "200px",
                }}
              >
                {/* Top row: category tag + pin */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(245,239,230,0.45)",
                    }}
                  >
                    {icon}
                    {label}
                  </span>
                  {notice.pinned && (
                    <Star size={13} strokeWidth={1.5} fill="#C9A84C" color="#C9A84C" />
                  )}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "19px",
                    fontStyle: "italic",
                    fontWeight: 700,
                    color: "#F5EFE6",
                    lineHeight: 1.3,
                    margin: 0,
                  }}
                >
                  {notice.title}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "13px",
                    fontWeight: 300,
                    color: "rgba(245,239,230,0.65)",
                    lineHeight: 1.6,
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {notice.body}
                </p>

                {/* Footer: link + date */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "0.5rem" }}>
                  <a
                    href={linkHref}
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#C9A84C",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.75"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
                  >
                    {linkLabel} <ArrowRight size={11} strokeWidth={2} />
                  </a>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "11px",
                      fontWeight: 400,
                      color: "rgba(245,239,230,0.3)",
                    }}
                  >
                    {formatDate(notice.created_at)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
