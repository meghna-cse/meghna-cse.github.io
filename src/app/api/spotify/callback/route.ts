import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  // Get the authorization code from the URL query parameters
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const storedState = cookies().get("spotify_auth_state")?.value

  // Verify state to prevent CSRF attacks
  if (!state || !storedState || state !== storedState) {
    return NextResponse.redirect(new URL("/spotify-error?error=state_mismatch", request.url))
  }

  // Get the code verifier from cookies
  const codeVerifier = cookies().get("spotify_code_verifier")?.value

  if (!code || !codeVerifier) {
    return NextResponse.redirect(new URL("/spotify-error?error=missing_params", request.url))
  }

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.SPOTIFY_CLIENT_ID || "",
        grant_type: "authorization_code",
        code,
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/callback`,
        code_verifier: codeVerifier,
      }),
    })

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text()
      console.error("Token exchange error:", error)
      return NextResponse.redirect(new URL(`/spotify-error?error=token_exchange`, request.url))
    }

    const tokenData = await tokenResponse.json()

    // Store tokens in cookies (httpOnly for security)
    cookies().set("spotify_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: tokenData.expires_in,
      path: "/",
    })

    cookies().set("spotify_refresh_token", tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    })

    // Clear the state and code verifier cookies
    cookies().delete("spotify_auth_state")
    cookies().delete("spotify_code_verifier")

    // Redirect back to the app
    return NextResponse.redirect(new URL("/spotify-success", request.url))
  } catch (error) {
    console.error("Error in Spotify callback:", error)
    return NextResponse.redirect(new URL("/spotify-error?error=server_error", request.url))
  }
}
