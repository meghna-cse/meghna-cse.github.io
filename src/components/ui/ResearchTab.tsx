import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from 'lucide-react'

const researchWorks = [
  {
    title: "SOUL: Simulation of Objects in Unity for Learning",
    publisher: "IEEE Xplorer",
    period: "2019",
    description: "Investigated innovative methods for creating interactive learning environments using Unity3D. This study emphasized practical applications in education by simulating real-world physics, making concepts easier to grasp through engaging visualizations.",
    link: "https://ieeexplore.ieee.org/document/8968786",
    skills: ["Unity3D", "Game Development", "E-Learning", "Simulation", "Web Technologies", "Educational Technology"]
  },
  {
    title: "Paradigm Shift of Techniques used for Educational Purposes",
    publisher: "IEEE Xplorer",
    period: "2017",
    description: "Analyzed the shift from traditional educational methods to interactive and visual learning tools. Focused on the adoption of digital technologies to enhance user experience, highlighting the importance of intuitive design in creating impactful educational software.",
    link: "https://ieeexplore.ieee.org/document/8074992",
    skills: ["Educational Technology", "UI/UX Design", "Interactive Learning", "Digital Learning Tools", "Technology Trends Analysis"]
  }
]

interface ResearchTabProps {
    theme: string;
  }
  
  const ResearchTab: React.FC<ResearchTabProps> = React.memo(({ theme }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {researchWorks.map((research, index) => (
        <Card key={index} className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="text-xl font-bold">{research.title}</CardTitle>
            <CardDescription>{research.publisher} | {research.period}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="mb-4">{research.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {research.skills.map((skill, skillIndex) => (
                <Badge key={skillIndex} variant="outline" className={`${theme === 'dark' ? 'border-teal-500 text-teal-100' : 'border-teal-600 text-teal-800'}`}>
                  {skill}
                </Badge>
              ))}
            </div>
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
          </CardContent>
        </Card>
      ))}
    </div>
  )
})

ResearchTab.displayName = 'ResearchTab'

export default ResearchTab