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
  const { slug, text } = body;

  if (!slug || !text?.trim()) {
    return NextResponse.json({ error: "slug and text are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      user_id: user.id,
      log_entry_slug: slug,
      body: text.trim(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
