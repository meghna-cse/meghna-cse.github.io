import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Projects from '@/components/ui/ProjectsTab'
import Timeline from '@/components/TimelineTab'

interface TabsSectionProps {
  theme: string;
}

const TabsSection: React.FC<TabsSectionProps> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState('projects')

  return (
    <Tabs defaultValue="projects" className="mb-12" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
      {[
          { value: "projects", icon: Code, label: "Projects" },
          { value: "timeline", icon: FileText, label: "Career Journey" },
        ].map((tab) => (
          <TabsTrigger 
            key={tab.value}
            value={tab.value} 
            className="flex items-center justify-center"
          >
            <tab.icon className="mr-2 h-4 w-4" />
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="projects">
            <Card>
              <CardContent>
                <Projects />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardDescription className="text-muted-foreground">My career journey</CardDescription>
              </CardHeader>
              <CardContent>
                <Timeline />
              </CardContent>
            </Card>
          </TabsContent>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  )
}

export default TabsSection