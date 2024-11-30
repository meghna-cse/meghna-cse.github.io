import React from 'react'
import { useState } from 'react'
import { Github, Info } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Project {
  title: string
  description: string
  technologies: string[]
  githubLink: string
  learnMoreLink: string
  category: string                                      // Sub Category of type field
  type: "All" | "Full Stack" | "Java" | "AI/ML" | "Mini Projects" // Main (Super) Category
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
    type: "AI/ML",
    year: 2024,
    image: "/gifs/CloakDocs.gif"
  },
  {
    title: "Beaver - LMS",
    description: "A full-stack LMS for managing web data, with frontend-backend integration and database optimization.",
    technologies: ["React", "Node.js", "Laravel", "MySQL/PostgreSQL"],
    githubLink: "https://github.com/meghna-cse/beaver",
    learnMoreLink: "https://github.com/meghna-cse/beaver/wiki",
    category: "Education & Data Management",
    type: "Full Stack",
    year: 2023,
    image: "/gifs/Beaver.gif"
  },
  {
    title: "SOUL",
    description: "Interactive Unity3D project simulating physics concepts for an engaging, accessible learning experience.",
    technologies: ["Unity3D", "C#", "JavaScript", "HTML", "CSS"],
    githubLink: "https://github.com/meghna-cse/SOUL",
    learnMoreLink: "https://ieeexplore.ieee.org/document/8968786",
    category: "Educational Simulations",
    type: "Full Stack",
    year: 2018,
    image: "/gifs/SOUL.gif"
  },
  {
    title: "Weather App",
    description: "React-Flask app delivering real-time weather updates and forecasts with location-based functionality.",
    technologies: ["React", "Flask", "OpenWeatherMap API"],
    githubLink: "https://github.com/meghna-cse/weather-app",
    learnMoreLink: "https://github.com/meghna-cse/weather-app?tab=readme-ov-file#weather-app-%EF%B8%8F",
    category: "Web Applications",
    type: "Mini Projects",
    year: 2022,
    image: "/gifs/WeatherApp.gif"
  },
  {
    title: "InputVal",
    description: "Java-Spring Boot project enhancing application security via robust input validation and secure coding.",
    technologies: ["Java", "Spring Boot", "Docker"],
    githubLink: "https://github.com/meghna-cse/inputVal",
    learnMoreLink: "https://github.com/meghna-cse/inputVal/wiki/Regular-Expression",
    category: "Secure Programming & Validation",
    type: "Java",
    year: 2023
    //image: "https://opengraph.githubassets.com/1/meghna-cse/inputVal"
  }
]

interface ProjectItemProps {
  project: Project
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          {project.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {project.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        {project.image && (
          <div className="mb-4 overflow-hidden rounded-lg flex-grow">
            <Image src={project.image} alt={project.title} width={400} height={225} className="w-full h-full object-cover" />
          </div>
        )}
        <p className="mb-4 text-foreground">{project.description}</p>
        <div className="mt-auto">
          <div className="mb-4 flex flex-wrap gap-2">
            {project.technologies.map((tech: string, index: number) => (
              <Badge key={index} variant="default" className="bg-teal-800 text-teal-100 hover:bg-teal-100 hover:text-teal-800">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="flex-1">
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Source Code
              </a>
            </Button>
            <Button asChild variant="link" className="flex-1">
              <a href={project.learnMoreLink} target="_blank" rel="noopener noreferrer">
                <Info className="w-4 h-4 mr-2" />
                Learn More
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Full Stack" | "Java" | "AI/ML" | "Mini Projects">("All")

  const filteredProjects = projectsData.filter(project => 
    activeFilter === "All" || project.type === activeFilter
  )

  return (
    <div>
      <br />
      <div className="mb-6 flex flex-wrap justify-center gap-4">
        {["All", "Full Stack", "Java", "AI/ML", "Mini Projects"].map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "link"}
            onClick={() => setActiveFilter(filter as "All" | "Full Stack" | "Java" | "AI/ML" | "Mini Projects")}
            className={activeFilter === filter ? "bg-primary text-primary-foreground" : ""}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <ProjectItem key={index} project={project} />
        ))}
      </div>
    </div>
  )
}