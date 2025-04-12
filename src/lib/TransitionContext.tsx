"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type TransitionContextType = {
  isTransitioning: boolean
  startTransition: () => void
  endTransition: () => void
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined)

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = () => setIsTransitioning(true)
  const endTransition = () => setIsTransitioning(false)

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition, endTransition }}>
      {children}
    </TransitionContext.Provider>
  )
}

export const useTransition = () => {
  const context = useContext(TransitionContext)
  if (context === undefined) {
    throw new Error("useTransition must be used within a TransitionProvider")
  }
  return context
}

