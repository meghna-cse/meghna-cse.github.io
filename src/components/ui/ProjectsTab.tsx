import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from 'lucide-react'

const featuredProjects = [
  {
    title: "CloakDocs -    Image Masking Web App",
    description: "This app allows users to upload images (JPG, PNG), mask information by drawing over specific areas, and download the masked image. Built using Streamlit, the app features a simple and intuitive interface, making it easy for users to protect personal information without requiring a login.",
    media: {
      type: "gif",
      src: "/gifs/CloakDocs.gif"
    },
    link: "https://github.com/meghna-cse/cloakdocs-web-app",
    technologies: ["Python", "Streamlit"],
    category: "Backend Engineering"
  },
  {
    title: "Beaver - LMS",
    description: "A Learning Management System web application designed to manage and present web data effectively. My contributions focused on the frontend and backend integration. This project enhanced my full-stack development skills and database management.",
    media: {
      type: "gif",
      src: "/gifs/Beaver.gif"
    },
    link: "https://github.com/meghna-cse/beaver",
    technologies: ["React", "Node.js", "Laravel", "MySQL/PostgreSQL"],
    category: "Full Stack Development"
  },
  {
    title: "SOUL: Simulation Objects in Unity for Learning",
    description: "A project designed to make learning theoretical concepts interactive by simulating rigid body physics in real-time. Using Unity3D, C#, JavaScript, HTML, and CSS, created an engaging platform that makes learning theoretical physics interactive and accessible.",
    media: {
      type: "gif",
      src: "/gifs/SOUL.gif"
    },
    link: "https://github.com/meghna-cse/SOUL",
    technologies: ["Unity3D", "C#", "JavaScript", "HTML", "CSS"],
    category: "Web & Data Applications"
  }
]


const otherProjects = [
  {
    title: "Weather App",
    description: "A simple weather application that provides real-time weather updates and a 5-day forecast for any city in the world. It also allows users to get weather updates based on their current location.",
    link: "https://github.com/meghna-cse/weather-app",
    technologies: ["React", "Flask", "OpenWeatherMap API"],
    category: "Web & Data Applications"
  },
  {
    title: "InputVal",
    description: "Focused on developing secure coding practices and robust input validation. Utilizing Java, Spring Boot, and Docker, I designed and implemented features that enhance application security, demonstrating my skills in secure software development.",
    link: "https://github.com/meghna-cse/inputVal",
    technologies: ["Java", "Spring Boot", "Docker"],
    category: "Backend Engineering"
  }
]

interface ProjectsTabProps {
  theme: string;
  projectCategory: string;
  setProjectCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ProjectsTab: React.FC<ProjectsTabProps> = React.memo(({ theme }) => {
  return (
    <>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <Card key={index} className="flex flex-col h-full max-h-[600px]">
              <CardHeader>
                <CardTitle className="text-xl font-bold truncate">{project.title}</CardTitle>
                <CardDescription className="line-clamp-3">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto">
                <div className="relative mb-4 h-48">
                  {project.media.type === 'image' ? (
                    <Image 
                      src={project.media.src} 
                      alt={project.title} 
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  ) : project.media.type === 'gif' ? (
                    <Image 
                      src={project.media.src} 
                      alt={project.title} 
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className={`${theme === 'dark' ? 'bg-teal-800 text-teal-100' : 'bg-teal-100 text-teal-800'}`}>
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Button asChild>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    Explore Project <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">More Projects</h3>
          <ul className="space-y-4">
            {otherProjects.map((project, index) => (
              <li key={index} className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 py-2">
                <h4 className={`${theme === 'dark' ? 'text-lg font-semibold text-teal-500' : 'text-lg font-semibold text-teal-600'}`}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-medium text-teal-600 ${theme === 'dark' ? 'text-teal-300 hover:underline' : 'hover:underline'}`}
                >
                {project.title}</a></h4>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className={`${theme === 'dark' ? 'border-teal-500 text-teal-100' : 'border-teal-600 text-teal-800'}`}>
                      {tech}
                    </Badge>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
})

ProjectsTab.displayName = 'ProjectsTab'

export default ProjectsTab