import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      id,
      body,
      created_at,
      users ( id, name, email )
    `
    )
    .eq("log_entry_slug", params.slug)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}
