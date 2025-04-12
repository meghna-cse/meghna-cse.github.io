import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import crypto from "crypto"

// Generate a random string for the state parameter
function generateRandomString(length: number) {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const values = crypto.getRandomValues(new Uint8Array(length))
  return Array.from(values)
    .map((x) => possible[x % possible.length])
    .join("")
}

// Generate a code challenge from the code verifier
async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier)
  const digest = await crypto.subtle.digest("SHA-256", data)
  const digestArray = Array.from(new Uint8Array(digest))
  return btoa(String.fromCharCode.apply(null, digestArray))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

export async function GET(request: NextRequest) {
  try {
    // Generate a random code verifier
    const codeVerifier = generateRandomString(64)

    // Generate a random state
    const state = generateRandomString(16)

    // Generate code challenge from code verifier
    const codeChallenge = await generateCodeChallenge(codeVerifier)

    // Store the code verifier and state in cookies
    cookies().set("spotify_code_verifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 60, // 10 minutes
      path: "/",
    })

    cookies().set("spotify_auth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 60, // 10 minutes
      path: "/",
    })

    // Redirect to Spotify authorization page
    const scope = "user-read-currently-playing user-read-playback-state"
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    authUrl.searchParams.append("client_id", process.env.SPOTIFY_CLIENT_ID || "")
    authUrl.searchParams.append("response_type", "code")
    authUrl.searchParams.append("redirect_uri", `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/callback`)
    authUrl.searchParams.append("state", state)
    authUrl.searchParams.append("scope", scope)
    authUrl.searchParams.append("code_challenge_method", "S256")
    authUrl.searchParams.append("code_challenge", codeChallenge)

    return NextResponse.redirect(authUrl.toString())
  } catch (error) {
    console.error("Error in Spotify auth:", error)
    return NextResponse.json({ error: "Failed to initiate Spotify authentication" }, { status: 500 })
  }
}
