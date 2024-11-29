"use client"

import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ChevronRight, Moon, Sun } from 'lucide-react'
import Image from 'next/image'
import { SiBento } from "react-icons/si"
import { FaGoogleScholar } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Dynamically import the TabsSection
const TabsSection = dynamic(() => import('@/components/TabsSection'), {
  loading: () => <TabsSectionSkeleton />,
  ssr: false
})

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

// Header component for immediate loading
const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => (
  <header className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-4">
    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0 relative"
      >
        <div className={`circle-effect ${theme === 'dark' ? 'circle-effect-light' : 'circle-effect-light'}`}></div>
        <Image
          src="/images/light-mode-profile.jpeg"
          alt="Meghna J. - Light Mode"
          width={192}
          height={192}
          className="profile-image-light"
          priority
        />  
        <Image
          src="/images/light-mode-profile.jpeg"
          alt="Meghna J. - Dark Mode"
          width={192}
          height={192}
          className="profile-image-dark"
          priority
        />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center sm:text-left"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 dark:text-[rgb(94,234,212)] text-[rgb(13,148,136)]">Meghna J.</h2>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6">
          Software Engineer, experienced in developing applications using <strong className="dark:text-[rgb(94,234,212)] text-[rgb(13,148,136)]">Java</strong>, <strong className="dark:text-[rgb(94,234,212)] text-[rgb(13,148,136)]">Python</strong>, and <strong className="dark:text-[rgb(94,234,212)] text-[rgb(13,148,136)]">React</strong>. <br />
          I enjoy solving problems through clean, functional code and seamless API integration.
        </p>
        <div className="flex flex-col items-center sm:items-start space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="https://drive.google.com/file/d/1sCOdt4ZypY2jiRArhfJR-hjJvOy_1AXX/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center">
                View Resume <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
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
                  className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-dark"
                  whileHover={{ scale: 1.2,
                    rotate: 5
                  }}
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
        <div className="flex gap-4 mt-6 justify-center sm:justify-start">
          <TooltipProvider>
            {[
              { src: "/logos/ibm.png", alt: "IBM" , width : 124},
              { src: "/logos/nationwide.png", alt: "Nationwide Building Society", width : 380 },
              { src: "/logos/fablab.png", alt: "FabLab UT Arlington", width : 49 },
              { src: "/logos/uta.png", alt: "UT Arlington", width : 121 }
            ].map((logo, index) => (
              <Tooltip key={index}>
                <TooltipTrigger>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={50}
                    height={50}
                    className="hover:opacity-80 transition-opacity"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{logo.alt}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </motion.div>
    </div>
    <div className="flex items-center space-x-2">
      <div className="w-[2.4rem] flex justify-center">
        {theme === 'dark' ? (
          <Moon className="h-[1.2rem] w-[1.2rem] text-muted-foreground" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] text-muted-foreground" />
        )}
      </div>
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-primary"
      />
    </div>
  </header>
)

// Skeleton loader for tabs section
const TabsSectionSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-[400px] bg-gray-200 dark:bg-gray-700 rounded-lg" />
      ))}
    </div>
  </div>
)

export default function Portfolio() {
  const [theme, setTheme] = useState<string>('dark')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    setIsLoading(false)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  if (isLoading) {
    return <TabsSectionSkeleton />
  }

  return (
    <div className={`min-h-screen font-sans ${theme === 'dark' ? 'dark' : ''}`}>
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
        <Header theme={theme} toggleTheme={toggleTheme} />

        <Suspense fallback={<TabsSectionSkeleton />}>
          <TabsSection theme={theme} />
        </Suspense>
      </div>

      <footer className="py-8 bg-muted transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-6">
            <a href="https://github.com/meghna-cse" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/meghna-j/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="mailto:mxj3631@mavs.uta.edu" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </a>
            <a href="https://scholar.google.com/citations?user=AwP-oyQAAAAJ&hl" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <FaGoogleScholar className="h-6 w-6" />
              <span className="sr-only">Google Scholar</span>
            </a>
            <a href="https://bento.me/meghna-j" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <SiBento className="h-6 w-6" />
              <span className="sr-only">Bento</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}