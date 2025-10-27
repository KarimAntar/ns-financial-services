import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GOOGLE_OAUTH_REDIRECT_URI!;

// In-memory token storage for demo (replace with DB in production)
let REFRESH_TOKEN = '';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  // Exchange code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    })
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.refresh_token) {
    return NextResponse.json({ error: 'No refresh token received', tokenData }, { status: 400 });
  }

  REFRESH_TOKEN = tokenData.refresh_token;

  // For demo: show refresh token (do not do this in production)
  return NextResponse.json({ message: 'OAuth2 successful', refresh_token: REFRESH_TOKEN });
}
