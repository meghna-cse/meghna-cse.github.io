"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Milestone , Gamepad2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Projects from "@/components/tabs/ProjectsTab"
import Timeline from "@/components/tabs/TimelineTab"
import Playground from "@/components/tabs/PlaygroundTab"
import { useTheme } from "next-themes"

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState("projects")
  const { theme } = useTheme()

  const handleTabChange = (value: string) => {
    if (value !== activeTab) {
      setActiveTab(value)
    }
  }

  return (
    <Tabs defaultValue="projects" className="mb-12" onValueChange={handleTabChange}>
      <TabsList className="grid w-full grid-cols-3 mb-8">
        {[
          { value: "projects", icon: Code, label: "Projects" },
          { value: "timeline", icon: Milestone, label: "Career Journey" },
          { value: "playground", icon: Gamepad2, label: "Playground " },
        ].map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="flex items-center justify-center space-x-2">
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
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
              <CardContent>
                <Timeline />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="playground">
            <Card>
              <CardContent>
                <Playground />
              </CardContent>
            </Card>
          </TabsContent>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  )
}

export default TabsSection
