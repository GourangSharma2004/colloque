"use client";

import { useEffect, useState, useRef } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useUser } from "@/lib/auth";
import { Send } from "lucide-react";

type Message = {
  id: string;
  channel: string;
  user_id: string | null;
  display_name: string;
  body: string;
  created_at: string;
};

const CHANNELS = [
  { id: "general", label: "General", description: "General discussions and updates" },
  { id: "books", label: "Books", description: "Talk about books and summaries" },
  { id: "intellect", label: "Intellect", description: "Deep ideas and intellectual debates" },
  { id: "random", label: "Random", description: "Off-topic and casual conversations" },
];

export default function CommunityChat() {
  const { user, getDisplayName, isMember, joinCommunity } = useUser();
  const [activeChannel, setActiveChannel] = useState("general");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      const localMsgs = localStorage.getItem(`colloque_chat_${activeChannel}`);
      if (localMsgs) {
        setMessages(JSON.parse(localMsgs));
      } else {
        setMessages(DUMMY_MESSAGES.filter(m => m.channel === activeChannel));
      }
      return;
    }
    fetchMessages();
    subscribeToMessages();

    return () => {
      if (supabase) {
        supabase.channel(`chat:${activeChannel}`).unsubscribe();
      }
    };
  }, [activeChannel]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("channel", activeChannel)
      .order("created_at", { ascending: true })
      .limit(50);

    if (error) {
      console.error("Error fetching messages:", error);
    } else {
      setMessages(data || []);
    }
  };

  const subscribeToMessages = () => {
    if (!supabase) return;
    const channel = supabase
      .channel(`chat:${activeChannel}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `channel=eq.${activeChannel}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      if (supabase) {
        supabase.removeChannel(channel);
      }
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !input.trim() || sending) return;

    if (!isSupabaseConfigured || !supabase) {
      const newMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        channel: activeChannel,
        user_id: user.id,
        display_name: getDisplayName(),
        body: input.trim(),
        created_at: new Date().toISOString(),
      };
      
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      localStorage.setItem(`colloque_chat_${activeChannel}`, JSON.stringify(updatedMessages));
      setInput("");
      return;
    }

    setSending(true);
    const { error } = await supabase.from("chat_messages").insert({
      channel: activeChannel,
      user_id: user.id,
      display_name: getDisplayName(),
      body: input.trim(),
    });

    if (error) {
      console.error("Error sending message:", error);
    } else {
      setInput("");
    }
    setSending(false);
  };

  const DUMMY_MESSAGES: Message[] = [
    { id: "1", channel: "general", user_id: "user1", display_name: "Alex Chen", body: "Hey everyone! Just joined the community. Excited to connect with fellow thinkers here!", created_at: new Date(Date.now() - 3600000 * 5).toISOString() },
    { id: "2", channel: "general", user_id: "user2", display_name: "Sarah Miller", body: "Welcome Alex! Great to have you here. Feel free to explore the different sections and jump into any conversation.", created_at: new Date(Date.now() - 3600000 * 4.5).toISOString() },
    { id: "3", channel: "general", user_id: "user3", display_name: "Jordan Lee", body: "The book club discussion tomorrow is going to be great. Has anyone finished reading this week's selection?", created_at: new Date(Date.now() - 3600000 * 2).toISOString() },
    { id: "4", channel: "general", user_id: "user4", display_name: "Taylor Kim", body: "I just finished it! The section on cognitive biases was particularly insightful. Looking forward to the discussion.", created_at: new Date(Date.now() - 3600000 * 1).toISOString() },
  ];

  const displayMessages = !isSupabaseConfigured || messages.length === 0 ? DUMMY_MESSAGES : messages;

  return <CommunityChatContent activeChannel={activeChannel} setActiveChannel={setActiveChannel} messages={displayMessages} input={input} setInput={setInput} sending={sending} user={user} isMember={isMember} joinCommunity={joinCommunity} getDisplayName={getDisplayName} handleSend={handleSend} messagesEndRef={messagesEndRef} />;
}

function CommunityChatContent({ activeChannel, setActiveChannel, messages, input, setInput, sending, user, isMember, joinCommunity, getDisplayName, handleSend, messagesEndRef }: { activeChannel: string; setActiveChannel: (v: string) => void; messages: Message[]; input: string; setInput: (v: string) => void; sending: boolean; user: any; isMember: boolean; joinCommunity: () => Promise<void>; getDisplayName: () => string; handleSend: (e: React.FormEvent) => Promise<void>; messagesEndRef: React.RefObject<HTMLDivElement> }) {
  const AVATAR_COLORS: Record<string, string> = { "Alex Chen": "#2C4A3E", "Sarah Miller": "#3D2C4A", "Jordan Lee": "#4A3D2C", "Taylor Kim": "#2C3D4A" };
  const getAvatarColor = (name: string) => AVATAR_COLORS[name] || "#2C4A3E";

  return (
    <div style={{ padding: "4rem 2rem" }}>
      <style jsx global>{`
        @media (max-width: 767px) {
          .cc-header-row { flex-direction: column !important; align-items: flex-start !important; gap: 0.75rem !important; }
          .cc-chat-container { flex-direction: column !important; height: auto !important; max-height: calc(100dvh - 200px) !important; }
          .cc-sidebar { width: 100% !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; display: flex !important; flex-direction: row !important; padding: 0.5rem 0 !important; overflow-x: auto !important; gap: 0.25rem !important; }
          .cc-sidebar > button { width: auto !important; flex-shrink: 0 !important; padding: 0.5rem 0.75rem !important; }
          .cc-sidebar > button p { display: none !important; }
          .cc-chat-panel { min-height: 350px !important; }
        }
      `}</style>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header row */}
        <div className="cc-header-row" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "20px", fontWeight: 700, color: "#2C2C2C", marginBottom: "0.3rem" }}>
              Community Chat
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 400, color: "#9A8E7A" }}>
              Real-time conversations with fellow thinkers.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", fontWeight: 500, color: "#9A8E7A" }}>
              Guidelines
            </button>
            <button
              onClick={() => user ? undefined : window.dispatchEvent(new CustomEvent("colloque-open-login"))}
              style={{ padding: "0.55rem 1.1rem", backgroundColor: "#C9A84C", border: "none", borderRadius: "5px", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", color: "#1C1914", cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#D4A843"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#C9A84C"; }}
            >
              New message
            </button>
          </div>
        </div>

        {/* Dark two-panel container */}
        <div className="cc-chat-container" style={{ backgroundColor: "#1A1F1C", borderRadius: "12px", overflow: "hidden", display: "flex", height: "480px" }}>

          {/* LEFT — Channel sidebar */}
          <div className="cc-sidebar" style={{ width: "220px", flexShrink: 0, backgroundColor: "#141918", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "1rem 0", overflowY: "auto" }}>
            {CHANNELS.map((channel) => {
              const isActive = activeChannel === channel.id;
              return (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  style={{
                    width: "100%", textAlign: "left", background: isActive ? "rgba(201,168,76,0.1)" : "none",
                    border: "none", cursor: "pointer", padding: "0.7rem 1.1rem",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "none"; }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "0.2rem" }}>
                    <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: isActive ? 600 : 400, color: isActive ? "#C9A84C" : "rgba(245,239,230,0.55)" }}>#</span>
                    <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: isActive ? 600 : 400, color: isActive ? "#F5EFE6" : "rgba(245,239,230,0.55)" }}>
                      {channel.label}
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 300, color: "rgba(245,239,230,0.3)", lineHeight: 1.4, margin: 0 }}>
                    {channel.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* RIGHT — Chat panel */}
          <div className="cc-chat-panel" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {/* Messages area */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {messages.length === 0 ? (
                <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", color: "rgba(245,239,230,0.3)", margin: "auto", textAlign: "center" }}>
                  No messages yet. Start the conversation!
                </p>
              ) : (
                messages.map((message) => (
                  <div key={message.id} style={{ display: "flex", gap: "0.75rem", padding: "0.5rem 0" }}>
                    {/* Avatar */}
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: getAvatarColor(message.display_name), flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", color: "rgba(245,239,230,0.9)", fontWeight: 600 }}>
                        {message.display_name.charAt(0)}
                      </span>
                    </div>
                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 600, color: "#F5EFE6" }}>
                          {message.display_name}
                        </span>
                        <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", color: "rgba(245,239,230,0.25)" }}>
                          {new Date(message.created_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                        </span>
                      </div>
                      <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,239,230,0.75)", lineHeight: 1.55, margin: 0, wordBreak: "break-word" }}>
                        {message.body}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input row */}
            <div style={{ padding: "0.9rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", backgroundColor: "#141918" }}>
              {user && isMember ? (
                <form onSubmit={handleSend} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message #${activeChannel}...`}
                    disabled={sending}
                    style={{
                      flex: 1, padding: "0.6rem 0.9rem",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "6px", color: "rgba(245,239,230,0.85)",
                      fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 300, outline: "none",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={sending || !input.trim()}
                    style={{ width: "34px", height: "34px", borderRadius: "6px", backgroundColor: sending || !input.trim() ? "rgba(255,255,255,0.08)" : "#C9A84C", border: "none", color: "#1C1914", cursor: sending || !input.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                  >
                    <Send size={14} strokeWidth={2} />
                  </button>
                </form>
              ) : user && !isMember ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <button
                    onClick={joinCommunity}
                    style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 300, color: "#C9A84C", padding: 0 }}
                  >
                    Join the community to message
                  </button>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <button style={{ background: "none", border: "none", cursor: "default", color: "rgba(245,239,230,0.1)", padding: 0, display: "flex" }}>
                      <Send size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent("colloque-open-login"))}
                    style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,239,230,0.35)", padding: 0 }}
                  >
                    Sign in to join the conversation
                  </button>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(245,239,230,0.3)", padding: 0, display: "flex" }}>
                      <Send size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
