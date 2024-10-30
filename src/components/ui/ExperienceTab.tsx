import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    title: "Research Assistant",
    company: "The University of Texas at Arlington",
    period: "2024",
    description: "Assisting in LLM research by improving model accuracy and automating processes for more reliable results.",
    insight: "This role allows me to delve deep into the fascinating world of ML, satisfying my curiosity and desire for continuous learning.",
    skills: ["Python", "Data Analysis", "LLMs"]
  },
  {
    title: "Software Developer, Student Assistant",
    company: "The University of Texas at Arlington",
    period: "2023",
    description: "Revamped an internal portal using React and Node.js, integrating SSO and resolving critical issues to boost security and usability.",
    insight: "Improving user experiences through technology aligns perfectly with my goal of creating meaningful, impactful solutions.",
    skills: ["React", "Node.js", "PHP", "SSO", "MySQL"] 
  },
  {
    title: "Software Engineer, Application Development",
    company: "IBM India",
    period: "2018 - 2022",
    description: "Built and maintained 25+ integration apps using IBM Integration Tools, Java and APIs, including secure Apple Pay integration. Drove CI/CD optimization, cloud migration project, and migrated legacy apps, boosting scalability and performance.",
    insight: "This experience taught me the value of bridging old and new technologies, a metaphor for connecting past wisdom with future innovations.",
    skills: ["Java", "API Integration", "Jenkins", "IBM MQ", "IBM ACE", "IBM DB2", "Agile Methodologies"]
  }
]

    interface ExperienceTabProps {
    theme: string;
  }
  
  const ExperienceTab: React.FC<ExperienceTabProps> = React.memo(({ theme }) => {
    return (
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
              <p className="text-sm italic mb-2">&ldquo;{exp.insight}&rdquo;</p>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="outline" className={`${theme === 'dark' ? 'border-teal-500 text-teal-100' : 'border-teal-600 text-teal-800'}`}>
                    {skill}
                  </Badge>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
})

ExperienceTab.displayName = 'ExperienceTab'

export default ExperienceTab