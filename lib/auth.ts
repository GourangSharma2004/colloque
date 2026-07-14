"use client";

import { useEffect, useState, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "./supabase/client";

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMock, setIsMock] = useState(false);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const mockUser = localStorage.getItem("colloque_mock_user");
    const membershipStatus = localStorage.getItem("colloque_community_member");
    setIsMember(membershipStatus === "true");

    if (mockUser) {
      setUser(JSON.parse(mockUser));
      setIsMock(true);
      setLoading(false);
      return;
    }

    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const supabase = createClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === "SIGNED_IN" && session?.user) {
        // Upsert user row on first sign-in
        await supabase.from("users").upsert(
          {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name ?? null,
          },
          { onConflict: "id" }
        );
        const status = localStorage.getItem(`colloque_member_${session.user.id}`);
        setIsMember(status === "true");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sync mock auth state across all useUser() instances via custom event
  useEffect(() => {
    const handleMockAuth = (e: CustomEvent) => {
      if (e.detail) {
        setUser(e.detail);
        setIsMock(true);
        setLoading(false);
      } else {
        setUser(null);
        setIsMock(false);
        setLoading(false);
      }
    };
    const handleMembershipUpdate = (e: CustomEvent) => {
      setIsMember(e.detail);
    };
    window.addEventListener("colloque-mock-auth", handleMockAuth as EventListener);
    window.addEventListener("colloque-membership-update", handleMembershipUpdate as EventListener);
    return () => {
      window.removeEventListener("colloque-mock-auth", handleMockAuth as EventListener);
      window.removeEventListener("colloque-membership-update", handleMembershipUpdate as EventListener);
    };
  }, []);

  const signInWithMagicLink = useCallback(async (email: string) => {
    if (!isSupabaseConfigured) {
      // Dev fallback: simulate sign-in
      const mock = {
        id: "mock-123",
        email,
        user_metadata: { full_name: email.split("@")[0] },
      } as unknown as User;
      localStorage.setItem("colloque_mock_user", JSON.stringify(mock));
      setUser(mock);
      setIsMock(true);
      window.dispatchEvent(new CustomEvent("colloque-mock-auth", { detail: mock }));
      return { error: null };
    }
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    // Custom error message for rate limit
    if (error && (error.message?.toLowerCase().includes("rate limit") || error.message?.toLowerCase().includes("exceeded"))) {
      return { error: { ...error, message: "Email rate limit exceeded. Try again after an hour." } };
    }
    
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    if (isMock) {
      localStorage.removeItem("colloque_mock_user");
      setUser(null);
      setIsMock(false);
      window.dispatchEvent(new CustomEvent("colloque-mock-auth", { detail: null }));
      return;
    }
    if (!isSupabaseConfigured) return;
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  }, [isMock]);

  const joinCommunity = useCallback(async () => {
    if (!user) {
      window.dispatchEvent(new CustomEvent("colloque-open-login"));
      return;
    }
    const memberKey = isMock ? "colloque_community_member" : `colloque_member_${user.id}`;
    localStorage.setItem(memberKey, "true");
    setIsMember(true);
    window.dispatchEvent(new CustomEvent("colloque-membership-update", { detail: true }));
  }, [user, isMock]);

  const getDisplayName = () =>
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Anonymous";

  return {
    user,
    session,
    loading,
    signInWithMagicLink,
    signOut,
    getDisplayName,
    isMember,
    joinCommunity,
    isConfigured: isSupabaseConfigured,
    isMock,
  };
}
