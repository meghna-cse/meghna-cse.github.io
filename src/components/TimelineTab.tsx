import React from 'react'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


interface TimelineItem {
  type: "experience" | "education"
  title: string
  organization: string
  period: string
  description: string
  skills?: string[]
  relevance: "high" | "medium" | "low"
}

const timelineData: TimelineItem[] = [
  {
    type: "experience",
    title: "Research Assistant, Developer",
    organization: "The University of Texas at Arlington",
    period: "Sep 2024 - Present",
    description: "Assisting in LLM research by improving model accuracy and automating processes for more reliable results.",
    skills: ["Python", "Data Analysis", "LLMs"],
    relevance: "high"
  },
  {
    type: "experience",
    title: "Software Developer, Student Assistant",
    organization: "The University of Texas at Arlington",
    period: "May 2023 - Aug 2023",
    description: "Revamped an internal portal using React and Node.js, integrating SSO and resolving critical issues to boost security and usability.",
    skills: ["React", "Node.js", "PHP", "SSO", "MySQL"],
    relevance: "high"
  },
  {
    type: "education",
    title: "Master of Science in Computer Science",
    organization: "The University of Texas at Arlington",
    period: "Aug 2022 - May 2024",
    description: "Focused on advanced topics in Machine Learning, Cloud Computing, and Distributed Systems.",
    relevance: "medium"
  },
  {
    type: "experience",
    title: "Software Engineer, Application Development",
    organization: "IBM India",
    period: "Jul 2018 - Jul 2022",
    description: "Built and maintained 25+ integration apps using IBM Integration Tools, Java and APIs, including secure Apple Pay integration. Drove CI/CD optimization, cloud migration project, and migrated legacy apps, boosting scalability and performance.",
    skills: ["Java", "API Integration", "Jenkins", "IBM MQ", "IBM ACE", "IBM DB2", "Agile Methodologies"],
    relevance: "high"
  },
  {
    type: "education",
    title: "Bachelor of Technology in Computer Engineering",
    organization: "NMIMS University",
    period: "Aug 2014 - May 2018",
    description: "Focused on Computer Science fundamentals and Software Engineering.",
    relevance: "medium"
  }
]


interface TimelineItemProps {
  item: TimelineItem
  isVisible: boolean
}

const TimelineItem = ({ item, isVisible }: TimelineItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      className={`mb-8 flex ${isVisible ? '' : 'hidden'}`}
    >
      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-900 ${item.type === 'experience' ? 'bg-teal-700' : 'bg-teal-400'}`}>
        {item.type === 'experience' ? (
          <Briefcase className="h-6 w-6 text-primary-foreground" />
        ) : (
          <GraduationCap className="h-6 w-6 text-primary-foreground" />
        )}
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.organization}</p>
        <p className="text-sm text-muted-foreground">{item.period}</p>
        <p className="mt-2 text-foreground">{item.description}</p>
        {item.skills && (
          <div className="mt-2 flex flex-wrap gap-2">
            {item.skills.map((skill: string, index: number) => (
              <Badge key={index} variant="outline" className="border-teal-600 text-teal-800 dark:border-teal-500 dark:text-teal-100">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState<("high" | "medium" | "low")[]>(['high'])
  const timelineRef = useRef<HTMLDivElement>(null)

  const handleHover = () => {
    if (!visibleItems.includes('medium')) {
      setVisibleItems(['high', 'medium'])
    }
  }

  const handleShowAll = () => {
    setVisibleItems(['high', 'medium', 'low'])
  }

  return (
    <div
      ref={timelineRef}
      className="relative"
      onMouseEnter={handleHover}
    >
      <div className="absolute left-6 top-0 w-0.5 bg-border" style={{ height: `calc(100% - ${visibleItems.length < 3 ? '4rem' : '0'})` }} />
      {timelineData.map((item, index) => (
      <TimelineItem
        key={index}
        item={item}
        isVisible={visibleItems.includes(item.relevance)}
      />
      ))}
    </div>
  )
}