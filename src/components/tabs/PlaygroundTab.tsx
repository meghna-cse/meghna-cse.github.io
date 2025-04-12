"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Music, Book, Gamepad2, Code, Dumbbell, Paintbrush, Plane } from "lucide-react"
import Image from "next/image"
import GitHubProjectsWidget from "@/components/playground/githubProjects"

// Mini-game: Memory Card Game
const MemoryGame = () => {
  const [cards, setCards] = useState<Array<{ id: number; emoji: string; flipped: boolean; matched: boolean }>>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [gameCompleted, setGameCompleted] = useState<boolean>(false)
  const { theme } = useTheme()

  const emojis = ["💻", "🎧", "🧩", "🎮", "✨", "📦", "🕹️", "☕"]

  const initializeGame = () => {
    // Create pairs of cards with emojis
    const initialCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }))

    setCards(initialCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setGameStarted(true)
    setGameCompleted(false)
  }

  const handleCardClick = (id: number) => {
    // Don't allow flipping if two cards are already flipped or the card is already matched
    if (flippedCards.length === 2 || cards[id].matched || cards[id].flipped) return

    // Flip the card
    const newCards = [...cards]
    newCards[id].flipped = true
    setCards(newCards)

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)

      const [firstCardId, secondCardId] = newFlippedCards

      if (cards[firstCardId].emoji === cards[secondCardId].emoji) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards]
          matchedCards[firstCardId].matched = true
          matchedCards[secondCardId].matched = true
          setCards(matchedCards)
          setFlippedCards([])
          setMatchedPairs(matchedPairs + 1)

          // Check if game is completed
          if (matchedPairs + 1 === emojis.length) {
            setGameCompleted(true)
          }
        }, 500)
      } else {
        // No match, flip cards back
        setTimeout(() => {
          const resetCards = [...cards]
          resetCards[firstCardId].flipped = false
          resetCards[secondCardId].flipped = false
          setCards(resetCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">A tiny challenge for your brain</h3>
        <div className="flex gap-2">
          {gameStarted && (
            <div className="text-sm">
              <span className="font-medium">Moves:</span> {moves}
            </div>
          )}
          <Button size="sm" onClick={initializeGame} variant={gameStarted ? "outline" : "default"}>
            {gameStarted ? "Restart" : "Start Game"}
          </Button>
        </div>
      </div>

      {gameStarted ? (
        <>
          {gameCompleted ? (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-2">🎉 Congratulations! 🎉</h3>
              <p className="mb-4">You completed the game in {moves} moves!</p>
              <Button onClick={initializeGame}>Play Again</Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  className={`aspect-square rounded-lg cursor-pointer flex items-center justify-center text-2xl ${
                    card.flipped || card.matched
                      ? theme === "dark"
                        ? "bg-primary/20 text-white"
                        : "bg-primary/20 text-primary"
                      : theme === "dark"
                        ? "bg-secondary"
                        : "bg-secondary"
                  } ${card.matched ? "opacity-50" : ""}`}
                  onClick={() => handleCardClick(card.id)}
                  whileHover={{ scale: card.flipped || card.matched ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    rotateY: card.flipped || card.matched ? 180 : 0,
                    backgroundColor: card.matched
                      ? theme === "dark"
                        ? "rgba(79, 70, 229, 0.2)"
                        : "rgba(59, 130, 246, 0.2)"
                      : card.flipped
                        ? theme === "dark"
                          ? "rgba(79, 70, 229, 0.5)"
                          : "rgba(59, 130, 246, 0.5)"
                        : theme === "dark"
                          ? "#1f2937"
                          : "#f1f5f9",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div style={{ transform: card.flipped || card.matched ? "rotateY(180deg)" : "rotateY(0deg)" }}>
                    {card.flipped || card.matched ? card.emoji : ""}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>Click "Start Game" to play a memory matching game!</p>
          <p className="text-sm mt-2">Find all matching pairs with the fewest moves.</p>
        </div>
      )}
    </div>
  )
}

// Fun Fact Generator
const FunFactGenerator = () => {
  const [currentFact, setCurrentFact] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { theme } = useTheme()

  const funFacts = [
    "🔄 I’ve rebuilt the same project three different ways just to find the cleanest architecture.",
    "🌙 My most productive coding hours are between 10 PM and 2 AM.",
    "😎 I name my side projects like they’re Marvel movies — dramatic, mysterious, and always with a sequel in mind.",
    "🐛 Once spent 4 hours debugging a semicolon. Still won’t let it win.",
    "✨ I treat Git commits like spell scrolls — small, powerful, and occasionally summoning chaos.",
    "🔥 My folders are organized. My tabs? 43 open and thriving.",
    "🤔 Always surprised when something works on the first try. But I don’t trust it till I add logs anyway."
  ]

  const generateFact = () => {
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => {
      let newFact
      do {
        newFact = funFacts[Math.floor(Math.random() * funFacts.length)]
      } while (newFact === currentFact && funFacts.length > 1)

      setCurrentFact(newFact)
      setIsLoading(false)
    }, 600)
  }

  useEffect(() => {
    generateFact()
  }, [])

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold">Just a little something about me</h4>
        <Button size="sm" onClick={generateFact} disabled={isLoading}>
          {isLoading ? "Generating..." : "New Fact"}
        </Button>
      </div>

      <motion.div
        className={`p-4 rounded-lg ${theme === "dark" ? "bg-primary/10" : "bg-primary/5"} text-center`}
        key={currentFact}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-md italic">"{currentFact}"</p>
      </motion.div>
    </div>
  )
}


// Pixel Art Creator
const PixelArtCreator = () => {
  const [grid, setGrid] = useState<string[][]>([])
  const [currentColor, setCurrentColor] = useState<string>("#3b82f6")
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const { theme } = useTheme()

  const gridSize = 12
  const colors = [
    "#3b82f6", // blue
    "#ef4444", // red
    "#10b981", // green
    "#f59e0b", // yellow
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#000000", // black
    "#ffffff", // white
  ]

  useEffect(() => {
    // Initialize empty grid
    const initialGrid = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(theme === "dark" ? "#1f2937" : "#f1f5f9"))
    setGrid(initialGrid)
  }, [theme])

  const handleCellMouseDown = (rowIndex: number, colIndex: number) => {
    setIsDrawing(true)
    const newGrid = [...grid]
    newGrid[rowIndex][colIndex] = currentColor
    setGrid(newGrid)
  }

  const handleCellMouseEnter = (rowIndex: number, colIndex: number) => {
    if (isDrawing) {
      const newGrid = [...grid]
      newGrid[rowIndex][colIndex] = currentColor
      setGrid(newGrid)
    }
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const clearGrid = () => {
    const newGrid = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(theme === "dark" ? "#1f2937" : "#f1f5f9"))
    setGrid(newGrid)
  }

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Click, color, create</h3>
        <Button size="sm" variant="outline" onClick={clearGrid}>
          Clear
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        {colors.map((color) => (
          <motion.div
            key={color}
            className={`w-8 h-8 rounded-full cursor-pointer ${
              color === currentColor ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setCurrentColor(color)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      <div
        className="grid gap-1 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          maxWidth: "400px",
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cellColor, colIndex) => (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              className="aspect-square rounded-sm cursor-pointer"
              style={{ backgroundColor: cellColor }}
              onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.1 }}
            />
          )),
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4">
        Click and drag to draw. Select a color from the palette above.
      </p>
    </div>
  )
}


// Main Fun Side Component
export default function Playground() {
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 250)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative theme-transition ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <br />
      <div className="text-center mb-6">
        <motion.h2
          className="text-2xl font-bold mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          The Other Side of the Stack
        </motion.h2>
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          ☕💡🎧
        </motion.p>
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardContent>
              <br />
              <FunFactGenerator />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5" />
                <span>Brain Break</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MemoryGame />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paintbrush className="w-5 h-5" />
                <span>Mini Artboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PixelArtCreator />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

