"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function SpotifyError() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error") || "unknown_error"

  const errorMessages: Record<string, string> = {
    state_mismatch: "State verification failed. This could be due to a CSRF attack.",
    missing_params: "Required parameters are missing from the request.",
    token_exchange: "Failed to exchange authorization code for access token.",
    server_error: "An unexpected server error occurred.",
    unknown_error: "An unknown error occurred during Spotify authentication.",
  }

  const errorMessage = errorMessages[error] || errorMessages.unknown_error

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center max-w-md p-8 rounded-lg bg-card shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-destructive">Spotify Connection Error</h1>
        <p className="mb-6">{errorMessage}</p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to Portfolio
          </Button>
          <Button onClick={() => router.push("/api/spotify/auth")}>Try Again</Button>
        </div>
      </div>
    </div>
  )
}
