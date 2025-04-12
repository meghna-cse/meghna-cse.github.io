"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SpotifySuccess() {
  const router = useRouter()

  useEffect(() => {
    // Redirect back to the fun side tab after a short delay
    const timer = setTimeout(() => {
      router.push("/?tab=funside")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center max-w-md p-8 rounded-lg bg-card shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-primary">Spotify Connected!</h1>
        <p className="mb-4">Your Spotify account has been successfully connected.</p>
        <p className="text-sm text-muted-foreground">Redirecting you back to the portfolio...</p>
      </div>
    </div>
  )
}
