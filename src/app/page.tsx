"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, ChevronRight, Moon, Sun, Code, Briefcase, Filter } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Portfolio() {
  const [theme, setTheme] = useState('dark')
  const [activeTab, setActiveTab] = useState('projects')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const projects = [
    {
      title: "CloakDocs - Image Masking Web App",
      description: "This app allows users to upload images (JPG, PNG), mask information by drawing over specific areas, and download the masked image. Built using Streamlit, the app features a simple and intuitive interface, making it easy for users to protect personal information without requiring a login.",
      media: {
        type: "gif",
        src: "/gifs/CloakDocs.gif"
      },
      link: "https://github.com/meghna-cse/cloakdocs-web-app",
      technologies: ["Python", "Streamlit"]
    },
    {
      title: "Weather App",
      description: "A simple yet dynamic weather application that provides real-time weather updates and a 5-day forecast for any city in the world. It also allows users to get weather updates based on their current location.",
      media: {
        type: "gif",
        src: "/gifs/WeatherApp.gif"
      },
      link: "https://github.com/meghna-cse/weather-app",
      technologies: ["React", "Flask", "OpenWeatherMap API"]
    },
    {
      title: "Beaver - LMS",
      description: "A Learning Management System web application designed to manage and present web data effectively. My contributions focused on the frontend and backend integration. This project enhanced my full-stack development skills and database management.",
      media: {
        type: "gif",
        src: "/gifs/Beaver.gif"
      },
      link: "https://github.com/meghna-cse/beaver",
      technologies: ["React", "Node.js", "Laravel", "MySQL", "PostgreSQL"]
    },
    {
      title: "Input Validation and Secure Programming",
      description: "In this project, I focused on developing secure coding practices and robust input validation. Utilizing Java, Spring Boot, and Docker, I designed and implemented features that significantly enhance application security, demonstrating my skills in secure software development.",
      media: {
        type: "image",
        src: "https://opengraph.githubassets.com/1/meghna-cse/inputVal"
      },
      link: "https://github.com/meghna-cse/inputVal",
      technologies: ["Java", "Spring Boot", "Docker"]
    },
    {
      title: "SOUL: Simulation Objects in Unity for Learning",
      description: "A project designed to make learning theoretical concepts interactive by simulating rigid body physics in real-time. Using Unity3D, C#, JavaScript, HTML, and CSS, created an engaging platform that makes learning theoretical physics interactive and accessible.",
      media: {
        type: "gif",
        src: "/gifs/SOUL.gif"
      },
      link: "https://github.com/meghna-cse/SOUL",
      technologies: ["Unity3D", "C#", "JavaScript", "HTML", "CSS"]
    }
  ]

  const experiences = [
    {
      title: "Research Assistant",
      company: "The University of Texas at Arlington",
      period: "2024",
      description: "Assisting in LLM research, focusing on model evaluation and vulnerability assessment. Leveraging Python and data analysis skills to support research goals and ensure experimental validity.",
      insight: "This role allows me to delve deep into the fascinating world of ML, satisfying my curiosity and desire for continuous learning."
    },
    {
      title: "Software Developer, Student Assistant",
      company: "The University of Texas at Arlington",
      period: "2023",
      description: "Drove the upgrade of an internal IT portal to React and Node.js, enhancing security and usability. Implemented SSO authentication and role management functionalities. Collaborated on troubleshooting and maintaining robust application performance.",
      insight: "Improving user experiences through technology aligns perfectly with my goal of creating meaningful, impactful solutions."
    },
    {
      title: "Software Engineer, Application Development",
      company: "IBM India",
      period: "2022",
      description: "During my four years at IBM, as part of Customer Integration Build Team I excelled in developing and maintaining over 25 third-party integration applications using Java and APIs. I consistently delivered results, migrating legacy applications, integrating payment features and my problem-solving skills were honed through resolving numerous production defects. My four years at IBM were marked by continuous learning and collaboration. I thrived in a team environment, mentoring colleagues on new technologies and coding standards.",
      insight: "This experience taught me the value of bridging old and new technologies, a metaphor for connecting past wisdom with future innovations."
    }
  ]

  const otherWorks = [
    {
      title: "SOUL: Simulation of Objects in Unity for Learning",
      publisher: "IEEE Xplorer",
      period: "2019",
      description: "Explores building interactive e-learning environments using Unity and web technologies, emphasizing practical application development and user engagement.",
      link: "https://ieeexplore.ieee.org/document/8968786",
    },
    {
      title: "An Overview: Paradigm Shift of Techniques used for Educational Purposes",
      publisher: "IEEE Xplorer",
      period: "2017",
      description: "Examines the shift towards interactive and visual learning tools in education, useful for understanding user interface and experience design in software solutions.",
      link: "https://ieeexplore.ieee.org/document/8074992"
    }
  ]

  const allTechnologies = Array.from(new Set(projects.flatMap(project => project.technologies)))

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.technologies.includes(filter))

  return (
    <div className={`min-h-screen font-sans ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <style jsx global>{`
        * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Inter', sans-serif;
        }

        .profile-image-container {
          position: relative;
          width: 256px;
          height: 256px;
        }

        .profile-image-light,
        .profile-image-dark {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .profile-image-light {
          display: block;
        }

        .profile-image-dark {
          display: none;
        }

        .dark .profile-image-light {
          display: none;
        }

        .dark .profile-image-dark {
          display: block;
        }

        .circle-effect {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border-radius: 50%;
          pointer-events: none;
          border: 4px solid transparent;
          background-clip: padding-box;
          animation: rotate 10s linear infinite;
        }

        .circle-effect-light {
          background-image: linear-gradient(to right, #cbb7b6, #d8c3c2, #e5cfce);
        }

        .circle-effect-dark {
          background-image: linear-gradient(to right, #9a2338, #b12840, #c82d48);
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-48 h-48 sm:w-64 sm:h-64 flex-shrink-0 relative profile-image-container"
            >
              <div className={`circle-effect ${theme === 'dark' ? 'circle-effect-dark' : 'circle-effect-light'}`}></div>
              <Image
                src="/images/light-mode-profile.jpeg"
                alt="Meghna J. - Light Mode"
                width={256}
                height={256}
                className="profile-image-light"
              />  
              <Image
                src="/images/dark-mode-profile.jpeg"
                alt="Meghna J. - Dark Mode"
                width={256}
                height={256}
                className="profile-image-dark"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center sm:text-left"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 dark:text-[rgb(94,234,212)] text-[rgb(13,148,136)]">Meghna J.</h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6">
                Software Engineer, experienced in developing applications using <strong className="dark:text-[rgb(94,234,212)] text-[rgb(13,148,136)]">Java</strong>, <strong className="dark:text-[rgb(94,234,212)] text-[rgb(13,148,136)]">Python</strong>, and <strong className="dark:text-[rgb(94,234,212)] text-[rgb(13,148,136)]">React</strong>. I enjoy solving problems through clean, functional code and seamless API integration.
              </p>
              <Button asChild className="bg-primary text-white hover:bg-primary/90 dark:bg-primary-dark dark:text-gray-900 dark:hover:bg-primary-dark/90">
                <a href="https://drive.google.com/file/d/1sCOdt4ZypY2jiRArhfJR-hjJvOy_1AXX/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  View Resume <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-[2.4rem] flex justify-center">
              {theme === 'dark' ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              )}
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </header>

        <Tabs defaultValue="projects" className="mb-12" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects" className="flex items-center justify-center">
              <Code className="mr-2 h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center justify-center">
              <Briefcase className="mr-2 h-4 w-4" />
              Experience
            </TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="projects">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProjects.map((project, index) => (
                    <Card key={index} className="flex flex-col h-full max-h-[600px]">
                      <CardHeader>
                        <CardTitle className="text-xl font-bold truncate">{project.title}</CardTitle>
                        <CardDescription className="line-clamp-3">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow overflow-y-auto">
                        <div className="relative mb-4 h-48">
                          {project.media.type === 'image' ? (
                            <img 
                              src={project.media.src} 
                              alt={project.title} 
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : project.media.type === 'gif' ? (
                            <img 
                              src={project.media.src} 
                              alt={project.title} 
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : project.media.type === 'youtube' ? (
                            <iframe
                              width="100%"
                              height="100%"
                              src={project.media.src}
                              title={project.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-md"
                            ></iframe>
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
              </TabsContent>
              <TabsContent value="experience">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Relevant Experience</CardTitle>
                    <CardDescription>My journey as a Software Engineer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-8">
                      {experiences.map((exp, index) => (
                        <li key={index} className={`border-l-2 ${theme === 'dark' ? 'border-teal-500' : 'border-teal-600'} pl-4 py-2`}>
                          <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{exp.company} | {exp.period}</p>
                          <p className="mb-2">{exp.description}</p>
                          <p className="text-sm italic">&ldquo;{exp.insight}&rdquo;</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Research Publications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-8">
                      {otherWorks.map((research, index) => (
                        <li key={index} className="flex items-start space-x-2 py-2">
                          <span className="text-primary dark:text-primary-dark">•</span>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-1">{research.title}</h3>
                            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{research.publisher} | {research.period}</p>
                            <p className="mb-2">{research.description}</p>
                            <Button asChild>
                              <a
                                href={research.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center"
                              >
                                Read the paper <ChevronRight className="h-4 w-4 ml-1" />
                              </a>
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
      <footer className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} transition-colors duration-300`}>
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-4">
    <div className="flex space-x-6">
      <a href="https://github.com/meghna-cse" target="_blank" rel="noopener noreferrer" className={`${theme === 'dark' ? 'text-gray-300 hover:text-teal-300' : 'text-gray-600 hover:text-teal-600'} transition-colors duration-300`}>
        <Github className="h-6 w-6" />
        <span className="sr-only">GitHub</span>
      </a>
      <a href="https://www.linkedin.com/in/meghna-j/" target="_blank" rel="noopener noreferrer" className={`${theme === 'dark' ? 'text-gray-300 hover:text-teal-300' : 'text-gray-600 hover:text-teal-600'} transition-colors duration-300`}>
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        <span className="sr-only">LinkedIn</span>
      </a>
      <a href="mailto:mxj3631@mavs.uta.edu" className={`${theme === 'dark' ? 'text-gray-300 hover:text-teal-300' : 'text-gray-600 hover:text-teal-600'} transition-colors duration-300`}>
        <Mail className="h-6 w-6" />
        <span className="sr-only">Email</span>
      </a>
    </div>
  </div>
</footer>
    </div>
  )
}