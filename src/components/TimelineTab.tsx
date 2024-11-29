import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


interface TimelineItem {
  type: "experience" | "education"
  title: string
  organization: string
  period: string
  description: string
  skills?: string[]
  logo: string
}

const timelineData: TimelineItem[] = [
  {
    type: "experience",
    title: "Research Assistant, Developer",
    organization: "The University of Texas at Arlington",
    period: "Sep 2024 - Present",
    description: "Assisting in LLM research by improving model accuracy and automating processes for more reliable results.",
    skills: ["Python", "Data Analysis", "LLMs"],
    logo: '/logos/uta.png'
  },
  {
    type: "experience",
    title: "Software Developer, Student Assistant",
    organization: "The University of Texas at Arlington",
    period: "May 2023 - Aug 2023",
    description: "Revamped an internal portal using React and Node.js, integrating SSO and resolving critical issues to boost security and usability.",
    skills: ["React", "Node.js", "PHP", "SSO", "MySQL"],
    logo: '/logos/fablab.PNG'
  },
  {
    type: "education",
    title: "Master of Science in Computer Science",
    organization: "The University of Texas at Arlington",
    period: "Aug 2022 - May 2024",
    description: "Focused on advanced topics in Machine Learning, Cloud Computing, and Distributed Systems.",
    logo: '/logos/uta.png'
  },
  {
    type: "experience",
    title: "Software Engineer, Application Development",
    organization: "IBM India",
    period: "Jul 2018 - Jul 2022",
    description: "Built and maintained 25+ integration apps using IBM Integration Tools, Java and APIs, including secure Apple Pay integration. Drove CI/CD optimization, cloud migration project, and migrated legacy apps, boosting scalability and performance.",
    skills: ["Java", "API Integration", "Jenkins", "IBM MQ", "IBM ACE", "IBM DB2", "Agile Methodologies"],
    logo: '/logos/ibm.png'
  },
  {
    type: "education",
    title: "Bachelor of Technology in Computer Engineering",
    organization: "NMIMS University",
    period: "Aug 2014 - May 2018",
    description: "Focused on Computer Science fundamentals and Software Engineering.",
    logo: '/logos/nmims.png'
  }
]


interface TimelineItemProps {
  item: TimelineItem
  isVisible: boolean
}

const TimelineItem: React.FC<{ item: TimelineItem; isVisible: boolean; highlight: boolean }> = ({ item, isVisible, highlight }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        height: isVisible ? 'auto' : 0,
        backgroundColor: highlight ? "rgba(13, 148, 136, 0.1)" : "transparent"
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`relative ${highlight ? 'shadow-lg' : ''}`}
    >
      <div className="flex items-start mb-6">
        <div className="absolute left-0 w-12 h-12">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden relative z-10 ring-8 bg-background dark:bg-white ring-white dark:ring-gray-900'}`}>
            <Image
              src={item.logo}
              alt={`${item.organization} logo`}
              width={48}
              height={48}
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="flex-grow pl-16">
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
      </div>
    </motion.div>
  )
}

export default function Timeline() {
  const [showEducation, setShowEducation] = useState(false)
  const [highlightEducation, setHighlightEducation] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [lineHeight, setLineHeight] = useState(0)

  const updateTimelineHeight = () => {
    if (timelineRef.current) {
      const visibleItems = timelineRef.current.querySelectorAll('.timeline-item:not([style*="height: 0px"])')
      if (visibleItems.length > 0) {
        const lastItem = visibleItems[visibleItems.length - 1] as HTMLElement
        const firstItem = visibleItems[0] as HTMLElement
        const height = lastItem.offsetTop + lastItem.offsetHeight - firstItem.offsetTop
        setLineHeight(height)
      }
    }
  }

  useEffect(() => {
    updateTimelineHeight()
    const observer = new MutationObserver(updateTimelineHeight)
    if (timelineRef.current) {
      observer.observe(timelineRef.current, { 
        childList: true, 
        subtree: true, 
        attributes: true 
      })
    }
    window.addEventListener('resize', updateTimelineHeight)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateTimelineHeight)
    }
  }, [showEducation])

  const toggleEducation = () => {
    if (!showEducation) {
      setShowEducation(true)
      setTimeout(() => setHighlightEducation(true), 500)
      setTimeout(() => setHighlightEducation(false), 2500)
    } else {
      setShowEducation(false)
      setHighlightEducation(false)
    }
  }

  return (
    <div className="relative" ref={timelineRef}>
      <div 
        className="absolute left-[23px] w-0.5 bg-border transition-all duration-500 ease-in-out"
        style={{ 
          height: `${lineHeight}px`,
          top: '24px'
        }}
      />
      <div className="space-y-0">
        {timelineData.map((item, index) => (
          <div 
            key={`${item.type}-${index}`} 
            className={`timeline-item ${item.type === 'experience' || showEducation ? 'block' : 'hidden'}`}
          >
            <TimelineItem 
              item={item} 
              isVisible={item.type === 'experience' || showEducation}
              highlight={item.type === 'education' && highlightEducation}
            />
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="ml-16"
      >
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={toggleEducation}
        >
          {showEducation ? 'Hide Education' : 'View Education'}
        </Button>
      </motion.div>
    </div>
  )
}