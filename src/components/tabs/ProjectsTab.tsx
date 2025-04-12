"use client"

import { useState, useEffect } from "react"
import { Github, Info } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"

type ProjectCategory = "All" | "Full Stack" | "AI/ML" | "Mini Projects"

interface Project {
  title: string
  description: string
  technologies: string[]
  githubLink: string
  learnMoreLink: string
  category: string // Sub Category description
  categories: ProjectCategory[] // Multiple categories a project can belong to
  year: number
  image?: string
}

const projectsData: Project[] = [
  {
    title: "CloakDocs - Image Masking Web App",
    description: "Streamlit-powered app enabling users to mask sensitive information in images with a no-login, intuitive interface.",
    technologies: ["Python", "Streamlit"],
    githubLink: "https://github.com/meghna-cse/cloakdocs-web-app",
    learnMoreLink: "https://github.com/meghna-cse/cloakdocs-web-app?tab=readme-ov-file#-features",
    category: "Image Processing & Privacy",
    categories: ["AI/ML", "Mini Projects"],
    year: 2024,
    image: "/gifs/CloakDocs.gif",
  },
  {
    title: "Beaver - LMS",
    description: "A full-stack LMS for managing web data, with frontend-backend integration and database optimization.",
    technologies: ["React", "Node.js", "Laravel", "MySQL/PostgreSQL"],
    githubLink: "https://github.com/meghna-cse/beaver",
    learnMoreLink: "https://github.com/meghna-cse/beaver/wiki",
    category: "Education & Data Management",
    categories: ["Full Stack"],
    year: 2023,
    image: "/gifs/Beaver.gif",
  },
  {
    title: "SOUL",
    description: "Interactive Unity3D project simulating physics concepts for an engaging, accessible learning experience.",
    technologies: ["Unity3D", "C#", "JavaScript", "HTML", "CSS"],
    githubLink: "https://github.com/meghna-cse/SOUL",
    learnMoreLink: "https://ieeexplore.ieee.org/document/8968786",
    category: "Educational Simulations",
    categories: ["Full Stack"],
    year: 2018,
    image: "/gifs/SOUL.gif",
  },
]

interface ProjectItemProps {
  project: Project
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  const { theme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="theme-transition"
      whileHover={{
        y: -10,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={`h-full flex flex-col theme-transition transform transition-all duration-300 ${
          isHovered ? "shadow-lg shadow-primary/20" : ""
        }`}
      >
        <CardHeader className="theme-transition">
          <CardTitle className="text-xl font-semibold theme-transition">{project.title}</CardTitle>
          <CardDescription className="theme-transition">{project.category}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col theme-transition">
          {project.image && (
            <div className="mb-4 overflow-hidden rounded-lg theme-transition">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={400}
                height={225}
                className={`w-full h-auto object-cover transition-transform duration-300 ${
                  isHovered ? "scale-110" : "scale-100"
                } theme-transition ${theme === "dark" ? "filter" : ""}`}
              />
            </div>
          )}
          <p className="mb-4 text-sm text-muted-foreground theme-transition">{project.description}</p>
          <div className="mt-auto theme-transition">
            <div className="mb-4 flex flex-wrap gap-2 theme-transition">
              {project.technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`text-xs theme-transition transform transition-all duration-300 ${
                    isHovered ? "scale-110" : "scale-100"
                  }`}
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 theme-transition">
              <Button asChild variant="outline" size="sm" className="flex-1 theme-transition">
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Source
                </a>
              </Button>
              <Button asChild variant="link" size="sm" className="flex-1 theme-transition">
                <a href={project.learnMoreLink} target="_blank" rel="noopener noreferrer">
                  <Info className="w-4 h-4 mr-2" />
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All")
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(true)

  // Updated filtering logic to check if a project belongs to the selected category
  // or if "All" is selected
  const filteredProjects = projectsData.filter(
    (project) => activeFilter === "All" || project.categories.includes(activeFilter),
  )

  useEffect(() => {
    // setIsVisible(true)
    // setTimeout(() => {
    //   setIsVisible(true)
    // }, 500)
  }, [])

  return (
    <div className={`theme-transition ${isVisible ? "opacity-100" : "opacity-0"}`}><br />
      <div className="mb-6 flex flex-wrap justify-center gap-2 theme-transition">
        {["All", "Full Stack", "AI/ML", "Mini Projects"].map((filter) => (
          <motion.div key={filter} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={activeFilter === filter ? "default" : "link"}
              size="sm"
              onClick={() => setActiveFilter(filter as ProjectCategory)}
              className="theme-transition"
            >
              {filter}
            </Button>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 theme-transition"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredProjects.map((project, index) => (
          <ProjectItem key={index} project={project} />
        ))}
      </motion.div>
    </div>
  )
}
