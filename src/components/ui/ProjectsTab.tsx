import React from 'react'
import { useState } from 'react'
import { Code, Star, BookOpen } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Project {
  title: string
  description: string
  technologies: string[]
  link: string
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
    link: "https://github.com/meghna-cse/cloakdocs-web-app",
    category: "Image Processing & Privacy",
    type: "AI/ML",
    year: 2024,
    image: "/gifs/CloakDocs.gif"
  },
  {
    title: "Beaver - LMS",
    description: "A full-stack LMS for managing web data, with frontend-backend integration and database optimization.",
    technologies: ["React", "Node.js", "Laravel", "MySQL/PostgreSQL"],
    link: "https://github.com/meghna-cse/beaver",
    category: "Education & Data Management",
    type: "Full Stack",
    year: 2023,
    image: "/gifs/Beaver.gif"
  },
  {
    title: "SOUL",
    description: "Interactive Unity3D project simulating physics concepts for an engaging, accessible learning experience.",
    technologies: ["Unity3D", "C#", "JavaScript", "HTML", "CSS"],
    link: "https://github.com/meghna-cse/SOUL",
    category: "Educational Simulations",
    type: "Full Stack",
    year: 2018,
    image: "/gifs/SOUL.gif"
  },
  {
    title: "Weather App",
    description: "React-Flask app delivering real-time weather updates and forecasts with location-based functionality.",
    technologies: ["React", "Flask", "OpenWeatherMap API"],
    link: "https://github.com/meghna-cse/weather-app",
    category: "Web Applications",
    type: "Mini Projects",
    year: 2022,
    image: "/gifs/WeatherApp.gif"
  },
  {
    title: "InputVal",
    description: "Java-Spring Boot project enhancing application security via robust input validation and secure coding.",
    technologies: ["Java", "Spring Boot", "Docker"],
    link: "https://github.com/meghna-cse/inputVal",
    category: " Secure Programming & Validation",
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
              <Badge key={index} variant="secondary" className="bg-teal-800 text-teal-100 hover:bg-teal-100 hover:text-teal-800">
                {tech}
              </Badge>
            ))}
          </div>
          <Button asChild variant="outline" className="w-full">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </Button>
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
            variant={activeFilter === filter ? "default" : "outline"}
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