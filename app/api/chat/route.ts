import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { mode, content } = await request.json();
    console.log('Chat API Request:', { mode, contentLength: content?.length });

    if (!mode || !content) {
      return NextResponse.json(
        { error: 'Missing mode or content' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY?.trim();
    console.log('GROQ_API_KEY configured:', !!apiKey);

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY not configured' },
        { status: 500 }
      );
    }

    const systemPrompt =
      mode === 'define'
        ? 'You are a helpful assistant that explains complex words in simple, plain English. Provide a clear definition with 1-2 example sentences. Keep it concise and easy to understand for someone reading articles or books.'
        : 'You are a helpful assistant that summarizes text in simple, plain English. Provide a 2-3 sentence summary that captures the main idea. Keep it concise and easy to understand.';

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API Error Response:', errorText);
      console.error('Groq API Status:', response.status);
      return NextResponse.json(
        { error: `Groq API error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
