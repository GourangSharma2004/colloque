import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  if (!supabaseUrl) {
    return NextResponse.json({ error: 'Supabase URL not configured' }, { status: 500 });
  }

  try {
    // Ping Supabase health endpoint to keep project active
    const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Colloque-Keep-Alive/1.0',
      },
    });

    if (response.ok) {
      return NextResponse.json({ 
        status: 'success', 
        message: 'Supabase project kept alive',
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({ 
        status: 'error', 
        message: `Supabase returned ${response.status}`,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      message: 'Failed to ping Supabase',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
