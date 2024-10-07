"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, Book, Code, Briefcase, ChevronRight, Moon, Sun, Play, Pause } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const [activeSection, setActiveSection] = useState('about')
  const [theme, setTheme] = useState('dark')
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('light', savedTheme === 'light')
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
      description: "This app allows users to upload images (JPG, PNG), mask information by drawing over specific areas, and download the masked image. Built using  Streamlit , the app features a simple and intuitive interface, making it easy for users to protect personal information without requiring a login.",
      media: {
        type: "youtube",
        src: "https://www.youtube.com/embed/63wsoC6SDwg"
      },
      link: "https://github.com/meghna-cse/cloakdocs-web-app",
      //reflection: "TBD",
      technologies: ["Python", "Streamlit"]
    },
    {
      title: "Weather App",
      description: "A simple yet dynamic weather application that provides real-time weather updates and a 5-day forecast for any city in the world. It also allows users to get weather updates based on their current location.",
      media: {
        type: "youtube",
        src: "https://www.youtube.com/embed/yFf-ORlJ3uM"
      },
      link: "https://github.com/meghna-cse/weather-app",
      //reflection: "TBD",
      technologies: ["React", "Flask", "OpenWeatherMap API"]
    },
    {
      title: "Beaver - LMS",
      description: "A Learning Management System web application designed to manage and present web data effectively. My contributions focused on the frontend and backend integration. This project enhanced my full-stack development skills and database management.",
      media: {
        type: "image",
        src: "https://github.com/meghna-cse/beaver/assets/24985713/1052277e-8f16-4a1f-93e6-1c0bfd65b03f"
      },
      link: "https://github.com/meghna-cse/beaver",
      //reflection: "This project challenged me to create an intuitive system for complex data management, aligning with my goal of simplifying intricate processes.",
      technologies: ["React", "Node.js", "Laravel", "MySQL"]
    },
    {
      title: "Input Validation and Secure Programming",
      description: "In this project, I focused on developing secure coding practices and robust input validation. Utilizing Java, Spring Boot, and Docker, I designed and implemented features that significantly enhance application security, demonstrating my skills in secure software development.",
      media: {
        type: "image",
        src: "https://opengraph.githubassets.com/1/meghna-cse/inputVal"
      },
      link: "https://github.com/meghna-cse/inputVal",
      //reflection: "Working on this project deepened my understanding of security principles, satisfying my innate drive for knowledge and system integrity.",
      technologies: ["Java", "Spring Boot", "Docker"]
    },
    {
      title: "SOUL: Simulation Objects in Unity for Learning",
      description: "A ​project designed to make learning theoretical concepts interactive by simulating rigid body physics in real-time. Using Unity3D, C#, JavaScript, HTML, and CSS, created an engaging platform that makes learning theoretical physics interactive and accessible.",
      media: {
        type: "image",
        src: "https://github.com/meghna-cse/SOUL/assets/24985713/604d1942-b6d9-4bcd-8145-4c827a85d78a"
      },
      link: "https://github.com/meghna-cse/SOUL",
      //reflection: "Working on this project deepened my understanding of security principles, satisfying my innate drive for knowledge and system integrity.",
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
      description: "During my four years at IBM,  as part of Customer Integration Build Team I excelled in developing and maintaining over 25 third-party integration applications using Java and APIs. I consistently delivered results, migrating legacy applications, integrating payment features and my problem-solving skills were honed through resolving numerous production defects.​  My four years at IBM were marked by continuous learning and collaboration. I thrived in a team environment, mentoring colleagues on new technologies and coding standards.",
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

  const toggleVideo = (index: number) => {
    if (playingVideo === index) {
      setPlayingVideo(null)
    } else {
      setPlayingVideo(index)
    }
  }

  return (
    <div className={`min-h-screen font-sans ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-all duration-500 ease-in-out`}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="flex justify-between items-center mb-16">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-4xl sm:text-5xl font-bold mb-2 ${theme === 'dark' ? 'text-teal-300' : 'text-teal-600'}`}
            >
              Meghna J.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`text-lg sm:text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Software Engineer
            </motion.p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className={`${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} hover:bg-opacity-80 transition-colors duration-300`}
          >
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </header>

        <div className="flex justify-center space-x-4 mb-8">
          <a href="https://github.com/meghna-cse" target="_blank" rel="noopener noreferrer" className={`${theme === 'dark' ? 'text-gray-300 hover:text-teal-300' : 'text-gray-600 hover:text-teal-600'} transition-colors duration-300`}>
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/meghna-j/" target="_blank" rel="noopener noreferrer" className={`${theme === 'dark' ? 'text-gray-300 hover:text-teal-300' : 'text-gray-600 hover:text-teal-600'} transition-colors duration-300`}>
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="mailto:mxj3631@mavs.uta.edu" className={`${theme === 'dark' ? 'text-gray-300 hover:text-teal-300' : 'text-gray-600 hover:text-teal-600'} transition-colors duration-300`}>
            <Mail className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </a>
        </div>

        <Tabs defaultValue="about" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About Me</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardDescription>She/Her | INFJ | 6w5 Enneagram </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed mb-6">
                Software Engineer with experience in full-stack development, cloud computing, and secure programming. My expertise spans across various technologies including Java, Python, React, APIs Development, and more.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  I'm driven by a deep curiosity to understand the intricate workings of systems and a passion for creating solutions that make a meaningful impact. My work is characterized by attention to detail, a focus on user experience, and a commitment to continuous learning and growth.
                </p>
                <Button asChild>
                  <a
                    href="https://drive.google.com/file/d/1sCOdt4ZypY2jiRArhfJR-hjJvOy_1AXX/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    View my resume <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative mb-4">
                      {project.media.type === 'image' ? (
                        <img 
                          src={project.media.src} 
                          alt={project.title} 
                          className="w-full h-48 object-cover rounded-md"
                        />
                      ) : project.media.type === 'youtube' ? (
                        <iframe
                          width="100%"
                          height="250"
                          src={project.media.src}
                          title={project.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-md"
                        ></iframe>
                      ) : (
                        <video 
                          src={project.media.src}
                          className="w-full h-full object-cover rounded-md"
                          loop
                          muted
                          playsInline
                          ref={el => {
                            if (el) {
                              el.play = () => el.play()
                              el.pause = () => el.pause()
                            }
                          }}
                        />
                      )}
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
            
            </TabsContent><TabsContent value="experience">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Research Publications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-8">
                  {otherWorks.map((research, index) => (
                    <li key={index} className={`border-l-2 ${theme === 'dark' ? 'border-teal-500' : 'border-teal-600'} pl-4 py-2`}>
                      <h3 className="text-xl font-semibold mb-1">{research.title}</h3>
                      <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{research.publisher} | {research.period}</p>
                      <p className="mb-2">{research.description}</p>
                      <Button asChild>
                        <a
                          href={research.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center"
                        >Read the paper</a>
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}