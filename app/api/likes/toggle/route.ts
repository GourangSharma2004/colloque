import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { slug } = body;

  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  // Check if like already exists
  const { data: existing } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", user.id)
    .eq("log_entry_slug", slug)
    .maybeSingle();

  if (existing) {
    // Unlike
    await supabase.from("likes").delete().eq("id", existing.id);
  } else {
    // Like
    await supabase.from("likes").insert({ user_id: user.id, log_entry_slug: slug });
  }

  // Return new count
  const { count } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("log_entry_slug", slug);

  return NextResponse.json({
    liked: !existing,
    count: count ?? 0,
  });
}
