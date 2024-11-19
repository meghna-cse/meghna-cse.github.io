import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const education = [
  {
    degree: "Master of Science in Computer Science",
    institution: "The University of Texas at Arlington",
    period: "2022 - 2024",
    projects: [
      {
        title: "Beaver - LMS",
        description: "A comprehensive Learning Management System with full-stack capabilities.",
        link: "https://github.com/meghna-cse/beaver"
      },
      {
        title: "Input Validation and Secure Programming",
        description: "Focused on developing secure coding practices and robust input validation. Utilizing Java, Spring Boot, and Docker, I designed and implemented features that enhance application security, demonstrating my skills in secure software development.",
        link: "https://github.com/meghna-cse/inputVal"
      }
    ]
  },
  {
    degree: "Bachelor of Technology in Computer Engineering",
    institution: "NMIMS University",
    period: "2014 - 2018",
    projects: [
      {
        title: "SOUL: Simulation Objects in Unity for Learning",
        description: "A project designed to make learning theoretical concepts interactive by simulating rigid body physics in real-time. Using Unity3D, C#, JavaScript, HTML, and CSS, created an engaging platform that makes learning theoretical physics interactive and accessible.",
        link: "https://github.com/meghna-cse/soul"
      }
    ]
  }
]


    interface EducationTabProps {
    theme: string;
  }
  
  const EducationTab: React.FC<EducationTabProps> = React.memo(({ theme }) => {
    return (
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{edu.degree}</CardTitle>
                      <CardDescription>{edu.institution} | {edu.period}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-2">Projects:</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        {edu.projects.map((project, projectIndex) => (
                          <li key={projectIndex}>
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`font-medium text-teal-600 ${theme === 'dark' ? 'text-teal-300 hover:underline' : 'hover:underline'}`}
                            >
                              {project.title}
                            </a>
                            :  {project.description}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
  )
})

EducationTab.displayName = 'EducationTab'

export default EducationTab