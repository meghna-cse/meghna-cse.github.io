"use client"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center mb-16"
    >
      <motion.h1
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-2xl font-bold text-primary theme-transition"
      >
        <motion.span
          initial={{ display: "inline-block" }}
          whileHover={{
            scale: [1, 1.2, 0.9, 1.1, 1],
            rotate: [0, 10, -10, 5, 0],
            transition: { duration: 0.5 },
          }}
        >
          M
        </motion.span>
        eghna J.
      </motion.h1>
      <div className="flex items-center space-x-2">
        <Switch
          checked={theme === "dark"}
          onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="bg-muted-foreground/20 data-[state=checked]:bg-primary theme-transition"
        >
          <motion.div
            className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm theme-transition"
            animate={{
              translateX: theme === "dark" ? "100%" : "0%",
              rotate: theme === "dark" ? 180 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {theme === "dark" ? (
              <Moon className="h-4 w-4 text-primary theme-transition" />
            ) : (
              <Sun className="h-4 w-4 text-primary theme-transition" />
            )}
          </motion.div>
        </Switch>
      </div>
    </motion.header>
  )
}

