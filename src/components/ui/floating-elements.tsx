"use client"

// Background elements
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Code, Database, Server, Cpu, Cloud, Bot } from "lucide-react"

export const FloatingElements = () => {
  const { theme } = useTheme()

  const icons = [
    { Icon: Cpu, delay: 0, x: "40%", y: "18%" },
    { Icon: Server, delay: 1, x: "60%", y: "13%" },
    { Icon: Database, delay: 2, x: "80%", y: "15%" },
    { Icon: Code, delay: 3, x: "75%", y: "5%" },
    { Icon: Bot, delay: 4, x: "90%", y: "10%" },
    { Icon: Cloud, delay: 5, x: "50%", y: "10%" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.15,
            scale: 1,
            y: ["0%", "5%", "0%", "-5%", "0%"],
          }}
          transition={{
            opacity: { delay: delay * 0.5, duration: 1 },
            scale: { delay: delay * 0.5, duration: 1 },
            y: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 5 + index,
              ease: "easeInOut",
              delay: delay * 0.5,
            },
          }}
        >
          <Icon size={30 + index * 5} className={theme === "dark" ? "text-primary/30" : "text-primary/50"} />
        </motion.div>
      ))}
    </div>
  )
}

