"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface Point {
  x: number
  y: number
  opacity: number
}

export const CursorTrail = () => {
  const [trail, setTrail] = useState<Point[]>([])
  const { theme } = useTheme()
  const trailLength = 15

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e

      setTrail((prevTrail) => {
        // Add new point
        const newTrail = [{ x: clientX, y: clientY, opacity: 1 }, ...prevTrail.slice(0, trailLength - 1)]

        // Update opacity for each point
        return newTrail.map((point, index) => ({
          ...point,
          opacity: 1 - index / trailLength,
        }))
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {trail.map((point, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: point.x,
            top: point.y,
            opacity: point.opacity,
            backgroundColor: theme === "dark" ? "rgba(79, 70, 229, 0.6)" : "rgba(59, 130, 246, 0.6)",
            width: Math.max(4, 12 * (1 - index / trailLength)),
            height: Math.max(4, 12 * (1 - index / trailLength)),
            transform: "translate(-50%, -50%)",
          }}
          transition={{ duration: 0.1 }}
        />
      ))}
    </div>
  )
}

