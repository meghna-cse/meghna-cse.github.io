"use client"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import type React from "react"
import { useEffect, useState } from "react"

interface TimelineItem {
  type: "experience"
  title: string
  organization: string
  period?: string
  description: string
  skills?: string[]
  logo: {
    light: string
    dark: string
  }
}

const timelineData: TimelineItem[] = [
  {
    type: "experience",
    title: "Software Engineer",
    organization: "Basewell",
    period: "Current",
    description: "Building infra and AI at Basewell.",
    skills: ["Python", "RAG", "LLM", "Integration"],
    logo: {
      light: "/logos/basewell_light.png",
      dark: "/logos/basewell_dark.png",
    },
  },
  {
    type: "experience",
    title: "Research Assistant, Developer",
    organization: "The University of Texas at Arlington",
    // period: "Sep 2024 - Present",
    description:
      "Assiting in Large Language Models (LLMs) research by improving model accuracy and automating evaluation pipelines to improve efficiency. Applied Python-based data analysis techniques to ensure experimental validity and reliability.",
    skills: ["LLM", "Python", "Data Analysis", "Automation", "AI Research"],
    logo: {
      light: "/logos/uta.png",
      dark: "/logos/uta.png",
    },
  },
  {
    type: "experience",
    title: "Software Developer, Student Assistant",
    organization: "FabLab, UT Arlington",
    // period: "May 2023 - Aug 2023",
    description:
      "Transitioned an outdated internal portal from PHP to modern React and Node.js architecture, improving security and usability by implementing SSO and role-based access controls.",
    skills: ["React", "Node.js", "SSO", "Role Management", "Debugging"],
    logo: {
      light: "/logos/fablab_light.PNG",
      dark: "/logos/fablab_dark.png",
    },
  },
  {
    type: "experience",
    title: "Software Engineer, Application Development",
    organization: "IBM India",
    // period: "Jul 2018 - Jul 2022",
    description:
      "Developed integration apps, implementing scalable REST and SOAP APIs, including a secure Apple Pay integration. Optimized CI/CD pipelines using Jenkins and migrated legacy systems to modern frameworks.",
    skills: ["REST APIs", "SOAP APIs", "Java", "Jenkins", "CI/CD", "Legacy Migration"],
    logo: {
      light: "/logos/ibm.png",
      dark: "/logos/ibm.png",
    },
  },
]

interface TimelineItemProps {
  item: TimelineItem
  isVisible: boolean
}

const TimelineItem: React.FC<{ item: TimelineItem; isVisible: boolean }> = ({ item, isVisible }) => {
  const { theme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        height: isVisible ? "auto" : 0,
      }}
      transition={{ duration: 0.5 }}
      className="relative pl-8 pb-8 border-l border-muted last:border-l-transparent"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute left-0 top-0 w-8 h-8 -translate-x-1/2 rounded-full bg-background flex items-center justify-center overflow-hidden"
        animate={{
          scale: isHovered ? 1.2 : 1,
          boxShadow: isHovered
            ? `0 0 10px 2px ${theme === "dark" ? "rgba(79, 70, 229, 0.5)" : "rgba(59, 130, 246, 0.5)"}`
            : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={theme === "dark" ? item.logo.dark : item.logo.light}
          alt={`${item.organization} logo`}
          width={32}
          height={32}
          className="object-cover"
        />
      </motion.div>
      <motion.div
        className="bg-card rounded-lg p-4 shadow-sm"
        whileHover={{
          y: -5,
          boxShadow: `0 10px 25px -5px ${theme === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}`,
        }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.organization}</p>
        <p className="text-sm text-muted-foreground">{item.period}</p>
        <p className="mt-2 text-sm">{item.description}</p>
        {item.skills && (
          <div className="mt-2 flex flex-wrap gap-2">
            {item.skills.map((skill, index) => (
              <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Badge variant="outline" className="text-xs">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Timeline() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 250) // 250ms delay
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative theme-transition ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <br />
      <AnimatePresence>
        {timelineData.map((item, index) => (
          <TimelineItem key={`${item.type}-${index}`} item={item} isVisible={isVisible} />
        ))}
      </AnimatePresence>
    </div>
  )
}

