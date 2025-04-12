"use client"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Mail } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const logos = [
  {
    light: "/logos/basewell_light.png",
    dark: "/logos/basewell_dark.png",
    alt: "Basewell",
    width: 124,
  },
  {
    light: "/logos/ibm.png",
    dark: "/logos/ibm.png",
    alt: "IBM",
    width: 124,
  },
  {
    light: "/logos/fablab_light.PNG",
    dark: "/logos/fablab_dark.PNG",
    alt: "FabLab UT Arlington",
    width: 49,
  },
  {
    light: "/logos/uta.png",
    dark: "/logos/uta.png",
    alt: "UT Arlington",
    width: 121,
  },
]

export default function Hero() {
  const { theme } = useTheme()

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row items-start justify-between mb-16 space-y-8 md:space-y-0 theme-transition"
    >
      <div className="md:w-2/4 mb-8 md:mb-0">
        
        {/* Text Content */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mb-4 text-primary theme-transition"
        >
          Software Engineer
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl mb-6 text-muted-foreground theme-transition"
        >
          Building Scalable Data & AI-Driven Solutions
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex space-x-4 theme-transition"
        >
          <div className="flex flex-col items-center sm:items-start space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex space-x-4">
                {[
                  { href: "https://github.com/meghna-cse", icon: Github, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/meghna-j/", icon: Linkedin, label: "LinkedIn" },
                  { href: "mailto:mxj3631@mavs.uta.edu", icon: Mail, label: "Email" },
                ].map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-dark theme-transition"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="sr-only">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Company Logos */}
        <div className="flex gap-4 mt-6 justify-center sm:justify-start theme-transition">
          <TooltipProvider>
            {logos.map((logo, index) => (
              <Tooltip key={index}>
                <TooltipTrigger>
                  <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                    <Image
                      src={theme === "dark" ? logo.dark : logo.light}
                      alt={logo.alt}
                      width={logo.width}
                      height={50}
                      className="object-contain p-1 hover:opacity-80 transition-opacity theme-transition"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{logo.alt}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>

    </motion.section>
  )
}
