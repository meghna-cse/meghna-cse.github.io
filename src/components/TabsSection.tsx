import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Briefcase, FileText } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProjectsTab from '@/components/ui/ProjectsTab'
import ExperienceTab from '@/components/ui/ExperienceTab'
import ResearchTab from '@/components/ui/ResearchTab'

interface TabsSectionProps {
  theme: string;
}

const TabsSection: React.FC<TabsSectionProps> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState('projects')
  const [projectCategory, setProjectCategory] = useState('All')

  return (
    <Tabs defaultValue="projects" className="mb-12" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="projects" className="flex items-center justify-center">
          <Code className="mr-2 h-4 w-4" />
          Projects
        </TabsTrigger>
        <TabsTrigger value="experience" className="flex items-center justify-center">
          <Briefcase className="mr-2 h-4 w-4" />
          Experience
        </TabsTrigger>
        <TabsTrigger value="research" className="flex items-center justify-center">
          <FileText className="mr-2 h-4 w-4" />
          Research
        </TabsTrigger>
      </TabsList>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TabsContent value="projects">
          <ProjectsTab 
            theme={theme} 
            projectCategory={projectCategory} 
            setProjectCategory={setProjectCategory} 
          />
        </TabsContent>
        
        <TabsContent value="experience">
          <ExperienceTab theme={theme} />
        </TabsContent>
        <TabsContent value="research">
          <ResearchTab theme={theme} />
        </TabsContent>
      </motion.div>
    </Tabs>
  )
}

export default TabsSection