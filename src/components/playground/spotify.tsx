"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface SpotifyTrack {
  name: string
  artist: string
  album: string
  albumArt: string
  duration: number
  progress: number
  url: string
}

interface SpotifyState {
  isPlaying: boolean
  track?: SpotifyTrack
  error?: string
  isAuthenticated: boolean
}

export const SpotifyNowPlaying = () => {
  const [spotifyState, setSpotifyState] = useState<SpotifyState>({
    isPlaying: false,
    isAuthenticated: false,
  })
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Check if the user is authenticated with Spotify
  const checkAuthentication = async () => {
    try {
      const response = await fetch("/api/spotify/currently-playing")

      if (response.status === 401) {
        setSpotifyState({
          isPlaying: false,
          isAuthenticated: false,
        })
        setIsLoading(false)
        return false
      }

      return true
    } catch (error) {
      console.error("Error checking authentication:", error)
      return false
    }
  }

  // Fetch the currently playing track
  const fetchCurrentlyPlaying = async () => {
    try {
      setIsLoading(true)

      const isAuthenticated = await checkAuthentication()

      if (!isAuthenticated) {
        return
      }

      const response = await fetch("/api/spotify/currently-playing")

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, try to refresh
          const refreshResponse = await fetch("/api/spotify/refresh")
          if (refreshResponse.ok) {
            // Try again after refreshing
            fetchCurrentlyPlaying()
            return
          } else {
            setSpotifyState({
              isPlaying: false,
              isAuthenticated: false,
              error: "Authentication expired",
            })
          }
        } else {
          setSpotifyState({
            isPlaying: false,
            isAuthenticated: true,
            error: "Failed to fetch currently playing",
          })
        }
      } else {
        const data = await response.json()
        setSpotifyState({
          isPlaying: data.isPlaying,
          track: data.track,
          isAuthenticated: true,
        })
      }
    } catch (error) {
      console.error("Error fetching currently playing:", error)
      setSpotifyState((prev) => ({
        ...prev,
        error: "Failed to fetch currently playing",
      }))
    } finally {
      setIsLoading(false)
    }
  }

  // Connect to Spotify
  const connectToSpotify = () => {
    window.location.href = "/api/spotify/auth"
  }

  // Fetch the currently playing track on mount and every 30 seconds
  useEffect(() => {
    fetchCurrentlyPlaying()

    const interval = setInterval(() => {
      fetchCurrentlyPlaying()
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Currently Listening To</h3>
        {!isLoading && (
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                spotifyState.isAuthenticated && spotifyState.isPlaying ? "bg-green-500 animate-pulse" : "bg-gray-400"
              }`}
            ></div>
            <span className="text-xs text-muted-foreground">
              {spotifyState.isAuthenticated
                ? spotifyState.isPlaying
                  ? "Playing now"
                  : "Not playing"
                : "Not connected"}
            </span>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : !spotifyState.isAuthenticated ? (
        <div className="p-6 rounded-lg bg-card text-center">
          <p className="mb-4">Connect your Spotify account to show what you're currently listening to.</p>
          <Button onClick={connectToSpotify} className="bg-[#1DB954] hover:bg-[#1DB954]/90 text-white">
            Connect Spotify
          </Button>
        </div>
      ) : spotifyState.error ? (
        <div className="p-6 rounded-lg bg-card text-center">
          <p className="text-muted-foreground mb-4">{spotifyState.error}</p>
          <Button onClick={fetchCurrentlyPlaying} variant="outline" size="sm">
            Retry
          </Button>
        </div>
      ) : spotifyState.isPlaying && spotifyState.track ? (
        <motion.div
          className={`p-4 rounded-lg ${theme === "dark" ? "bg-green-900/20" : "bg-green-100"} flex items-center gap-4`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href={spotifyState.track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative min-w-[80px] w-20 h-20 block"
          >
            <Image
              src={spotifyState.track.albumArt || "/placeholder.svg"}
              alt={`${spotifyState.track.album} cover`}
              width={80}
              height={80}
              className="rounded-md shadow-md"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-md opacity-0 hover:opacity-100 transition-opacity">
              <motion.div
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </motion.div>
            </div>
          </a>

          <div className="flex-1">
            <h4 className="font-medium text-sm line-clamp-1">{spotifyState.track.name}</h4>
            <p className="text-xs text-muted-foreground line-clamp-1">{spotifyState.track.artist}</p>
            <p className="text-xs text-muted-foreground line-clamp-1">{spotifyState.track.album}</p>

            <div className="mt-2">
              <div className="h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-500"
                  initial={{ width: `${(spotifyState.track.progress / spotifyState.track.duration) * 100}%` }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: spotifyState.track.duration - spotifyState.track.progress,
                    ease: "linear",
                  }}
                />
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>{formatTime(spotifyState.track.progress)}</span>
                <span>{formatTime(spotifyState.track.duration)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
            <span className="text-xs text-green-500 font-medium mt-1">Spotify</span>
          </div>
        </motion.div>
      ) : (
        <div className="p-6 rounded-lg bg-card text-center">
          <p className="text-muted-foreground">Nothing playing on Spotify right now.</p>
          <p className="text-xs mt-2 text-muted-foreground">
            Play something on Spotify and click refresh to see it here.
          </p>
          <Button onClick={fetchCurrentlyPlaying} variant="outline" size="sm" className="mt-4">
            Refresh
          </Button>
        </div>
      )}
    </div>
  )
}
