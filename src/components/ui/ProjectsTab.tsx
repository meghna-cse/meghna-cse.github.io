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
  type: "All Project" | "Web & Data Applications" | "Full Stack" | "Research Contribution" | "Backend Engineering"
  year: number
  image?: string
  publisher?: string
  abstract?: string
}

const projectsData: Project[] = [
  {
    title: "CloakDocs",
    description: "This app allows users to upload images (JPG, PNG), mask information by drawing over specific areas, and download the masked image. Built using Streamlit, the app features a simple and intuitive interface, making it easy for users to protect personal information without requiring a login.",
    technologies: ["Python", "Streamlit"],
    link: "https://github.com/meghna-cse/cloakdocs-web-app",
    type: "Web & Data Applications",
    year: 2024,
    image: "/gifs/CloakDocs.gif"
  },
  {
    title: "Beaver - LMS",
    description: "A Learning Management System web application designed to manage and present web data effectively. My contributions focused on the frontend and backend integration. This project enhanced my full-stack development skills and database management.",
    technologies: ["React", "Node.js", "Laravel", "MySQL/PostgreSQL"],
    link: "https://github.com/meghna-cse/beaver",
    type: "Full Stack",
    year: 2023,
    image: "/gifs/Beaver.gif"
  },
  {
    title: "SOUL",
    description: "A project designed to make learning theoretical concepts interactive by simulating rigid body physics in real-time. Using Unity3D, C#, JavaScript, HTML, and CSS, created an engaging platform that makes learning theoretical physics interactive and accessible.",
    technologies: ["Unity3D", "C#", "JavaScript", "HTML", "CSS"],
    link: "https://github.com/meghna-cse/SOUL",
    type: "Full Stack",
    year: 2018,
    image: "/gifs/SOUL.gif"
  },
  {
    title: "Weather App",
    description: "A simple weather application that provides real-time weather updates and a 5-day forecast for any city in the world. It also allows users to get weather updates based on their current location.",
    technologies: ["React", "Flask", "OpenWeatherMap API"],
    link: "https://github.com/meghna-cse/weather-app",
    type: "Full Stack",
    year: 2022,
    image: "/gifs/WeatherApp.gif"
  },
  {
    title: "InputVal",
    description: "Focused on developing secure coding practices and robust input validation. Utilizing Java, Spring Boot, and Docker, I designed and implemented features that enhance application security, demonstrating my skills in secure software development.",
    technologies: ["Java", "Spring Boot", "Docker"],
    link: "https://github.com/meghna-cse/inputVal",
    type: "Backend Engineering",
    year: 2023
    //image: "https://opengraph.githubassets.com/1/meghna-cse/inputVal"
  },
  {
    title: "SOUL: Simulation of Objects in Unity for Learning",
    description: "Investigated innovative methods for creating interactive learning environments using Unity3D. This study emphasized practical applications in education by simulating real-world physics, making concepts easier to grasp through engaging visualizations.",
    link: "https://ieeexplore.ieee.org/document/8968786",
    type: "Research Contribution",
    year: 2019,
    publisher: "IEEE Xplorer",
    abstract: "Interactive Unity3D simulations for physics education.",
    technologies: ["Unity3D", "Game Development", "E-Learning", "Simulation", "Web Technologies", "Educational Technology"]
  },
  {
    title: "An overview: Paradigm Shift of Techniques used for Educational Purposes",
    description: "Analyzed the shift from traditional educational methods to interactive and visual learning tools. Focused on the adoption of digital technologies to enhance user experience, highlighting the importance of intuitive design in creating impactful educational software.",
    link: "https://ieeexplore.ieee.org/document/8074992",
    type: "Research Contribution",
    year: 2017,
    publisher: "IEEE Xplorer",
    abstract: "Study on the adoption of digital technologies in education.",
    technologies: ["Educational Technology", "UI/UX Design", "Interactive Learning", "Digital Learning Tools", "Technology Trends Analysis"]
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
          {project.type === "Research Contribution" ? (
            <BookOpen className="mr-2 h-5 w-5" />
          ) : (
            <Code className="mr-2 h-5 w-5" />
          )}
          {project.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {project.type}
          {project.publisher && ` | ${project.publisher}`}
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
          <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.type === "Research Contribution" ? "Read Paper" : "View Project"}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<"all" | "Web & Data Applications" | "Full Stack" | "Research Contribution">("all")
  const [activeTechFilter, setActiveTechFilter] = useState<string>("all")

  const allTechnologies = Array.from(new Set(projectsData.flatMap(project => project.technologies)))

  const filteredProjects = projectsData.filter(project => {
    const typeMatch = activeFilter === "all" ? project.type !== "Research Contribution" : project.type === activeFilter
    const techMatch = activeTechFilter === "all" || project.technologies.includes(activeTechFilter)
    return typeMatch && techMatch
  })

  return (
    <div>
      <br></br>
      <div className="mb-6 flex flex-wrap justify-center gap-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            onClick={() => setActiveFilter("all")}
            className={activeFilter === "all" ? "bg-primary text-primary-foreground" : ""}
          >
            All
          </Button>
          <Button
            variant={activeFilter === "Web & Data Applications" ? "default" : "outline"}
            onClick={() => setActiveFilter("Web & Data Applications")}
            className={activeFilter === "Web & Data Applications" ? "bg-primary text-primary-foreground" : ""}
          >
            Web & Data Applications
          </Button>
          <Button
            variant={activeFilter === "Full Stack" ? "default" : "outline"}
            onClick={() => setActiveFilter("Full Stack")}
            className={activeFilter === "Full Stack" ? "bg-primary text-primary-foreground" : ""}
          >
            Full Stack
          </Button>
          <Button
            variant={activeFilter === "Research Contribution" ? "default" : "outline"}
            onClick={() => setActiveFilter("Research Contribution")}
            className={activeFilter === "Research Contribution" ? "bg-primary text-primary-foreground" : ""}
          >
            Research Contribution
          </Button>
        </div>
      </div>

      <div className={`grid ${activeFilter === "Research Contribution" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"} gap-6`}>
        {filteredProjects.map((project, index) => (
          <ProjectItem key={index} project={project} />
        ))}
      </div>
    </div>
  )
}
