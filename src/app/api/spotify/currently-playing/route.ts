import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    // Get the access token from cookies
    const accessToken = cookies().get("spotify_access_token")?.value

    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated with Spotify" }, { status: 401 })
    }

    // Fetch the currently playing track from Spotify API
    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    // If no track is playing (204 No Content)
    if (response.status === 204) {
      return NextResponse.json({ isPlaying: false })
    }

    // If the token is expired or invalid (401 Unauthorized)
    if (response.status === 401) {
      // We should implement token refresh here, but for simplicity, we'll just return an error
      return NextResponse.json({ error: "Spotify token expired" }, { status: 401 })
    }

    // If there's another error
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch currently playing" }, { status: response.status })
    }

    // Parse the response
    const data = await response.json()

    // Return the relevant track information
    return NextResponse.json({
      isPlaying: data.is_playing,
      track: {
        name: data.item?.name,
        artist: data.item?.artists.map((artist: any) => artist.name).join(", "),
        album: data.item?.album.name,
        albumArt: data.item?.album.images[0]?.url,
        duration: Math.floor(data.item?.duration_ms / 1000),
        progress: Math.floor(data.progress_ms / 1000),
        url: data.item?.external_urls.spotify,
      },
    })
  } catch (error) {
    console.error("Error fetching currently playing:", error)
    return NextResponse.json({ error: "Failed to fetch currently playing" }, { status: 500 })
  }
}
