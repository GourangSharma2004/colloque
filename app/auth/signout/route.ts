import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

async function handleSignOut(request: NextRequest) {
  const { origin } = new URL(request.url);

  // Redirect response that we attach the cleared cookies to
  const response = NextResponse.redirect(`${origin}/`, { status: 303 });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  try {
    await supabase.auth.signOut();
  } catch {
    // Ignore — cookies are cleared on the response regardless
  }

  return response;
}

export async function GET(request: NextRequest) {
  return handleSignOut(request);
}

export async function POST(request: NextRequest) {
  return handleSignOut(request);
}
