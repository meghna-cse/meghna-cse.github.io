import React from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { SiBento } from "react-icons/si"
import { FaGoogleScholar } from "react-icons/fa6"

const Footer = () => {
    return (
      <footer className="relative mt-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute bottom-0 left-0 w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            fill="#f5f5f5"
            fillOpacity="1"
            d="M0,128L120,154.7C240,181,480,235,720,240C960,245,1200,203,1320,181.3L1440,160L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
          ></path>
        </svg>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8">
          <div className="flex flex-col items-center justify-center space-y-4">
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
        </div>
      </footer>
    )
  }
  
  export default Footer