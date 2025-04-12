"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeProvider } from "next-themes"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import TabsSection from "@/components/TabsSection"
import Footer from "@/components/Footer"
import { CursorTrail } from "@/components/ui/cursor-trail"
import { FloatingElements } from "@/components/ui/floating-elements"

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen font-sans theme-transition relative overflow-hidden"
        >
          {/* <CursorTrail /> */}
          <FloatingElements />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 theme-transition relative z-10">
            <Header />
            <Hero />
            <TabsSection />
          </div>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  )
}
