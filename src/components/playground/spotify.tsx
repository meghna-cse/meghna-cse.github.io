"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useTheme } from "next-themes"

interface Track {
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  duration: number; // in seconds
  progress: number; // in seconds
}

interface SpotifyNowPlayingProps {
  spotifyAccessToken: string;
}

const SpotifyNowPlaying = ({ spotifyAccessToken }: SpotifyNowPlayingProps) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { theme } = useTheme();

  // Fetch currently playing track from Spotify
  const fetchCurrentTrack = async () => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: `Bearer ${spotifyAccessToken}`,
        },
      });

      // If no track is playing, Spotify returns 204 (no content)
      if (response.status === 204) {
        setCurrentTrack(null);
        setIsPlaying(false);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        if (data && data.item) {
          const track: Track = {
            title: data.item.name,
            artist: data.item.artists.map((artist: any) => artist.name).join(", "),
            album: data.item.album.name,
            albumArt: data.item.album.images[0]?.url || "",
            duration: Math.floor(data.item.duration_ms / 1000),
            progress: Math.floor(data.progress_ms / 1000),
          };
          setCurrentTrack(track);
          setIsPlaying(data.is_playing);
        }
      } else {
        console.error("Error fetching Spotify track:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching Spotify track:", error);
    }
  };

  // Poll Spotify for the current track every 15 seconds
  useEffect(() => {
    fetchCurrentTrack(); // initial fetch
    const pollingInterval = setInterval(fetchCurrentTrack, 15000);
    return () => clearInterval(pollingInterval);
  }, [spotifyAccessToken]);

  // Smoothly update track progress locally every second for a seamless UI
  useEffect(() => {
    if (currentTrack && isPlaying) {
      const progressInterval = setInterval(() => {
        setCurrentTrack((prevTrack) => {
          if (!prevTrack) return prevTrack;
          const newProgress = prevTrack.progress + 1;
          // When the track’s progress reaches or exceeds its duration, we let the polling update clear it
          if (newProgress >= prevTrack.duration) {
            clearInterval(progressInterval);
            return prevTrack;
          }
          return { ...prevTrack, progress: newProgress };
        });
      }, 1000);
      return () => clearInterval(progressInterval);
    }
  }, [currentTrack, isPlaying]);

  // Format seconds into mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Currently Listening To</h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isPlaying ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}></div>
          <span className="text-xs text-muted-foreground">{isPlaying ? "Active now" : "Inactive"}</span>
        </div>
      </div>

      {currentTrack ? (
        <motion.div
          className={`p-4 rounded-lg ${theme === "dark" ? "bg-green-900/20" : "bg-green-100"} flex items-center gap-4`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative min-w-[80px] w-20 h-20">
            <Image
              src={currentTrack.albumArt}
              alt={`${currentTrack.album} cover`}
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
          </div>

          <div className="flex-1">
            <h4 className="font-medium text-sm line-clamp-1">{currentTrack.title}</h4>
            <p className="text-xs text-muted-foreground line-clamp-1">{currentTrack.artist}</p>
            <p className="text-xs text-muted-foreground line-clamp-1">{currentTrack.album}</p>

            <div className="mt-2">
              <div className="h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-500"
                  // Calculate width as a percentage of track progress
                  style={{
                    width: `${(currentTrack.progress / currentTrack.duration) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>{formatTime(currentTrack.progress)}</span>
                <span>{formatTime(currentTrack.duration)}</span>
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
        <motion.div
          className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} text-center`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">
            {isPlaying ? "Loading current track..." : "Nothing playing right now."}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SpotifyNowPlaying;
