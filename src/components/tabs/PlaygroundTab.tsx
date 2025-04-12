"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Music, Book, Gamepad2, Code, Dumbbell, Paintbrush, Plane } from "lucide-react"
import Image from "next/image"
import { SpotifyNowPlaying } from "@/components/playground/spotify"

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
    "💻 I've written over 1 million lines of code, and deleted about 800,000 of them.",
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


// Spotify Now Playing
// const SpotifyNowPlaying = () => {
//   const [currentTime, setCurrentTime] = useState<Date>(new Date())
//   const [isActiveHours, setIsActiveHours] = useState<boolean>(false)
//   const [currentTrack, setCurrentTrack] = useState<{
//     title: string
//     artist: string
//     album: string
//     albumArt: string
//     duration: number
//     progress: number
//   } | null>(null)
//   const { theme } = useTheme()

//   // Define active hours (e.g., 8 PM to 2 AM)
//   const startHour = 20 // 8 PM
//   const endHour = 2 // 2 AM

//   // Mock Spotify tracks
//   const spotifyTracks = [
//     {
//       title: "Blinding Lights",
//       artist: "The Weeknd",
//       album: "After Hours",
//       albumArt: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
//       duration: 203, // seconds
//       progress: 75, // seconds
//     },
//     {
//       title: "As It Was",
//       artist: "Harry Styles",
//       album: "Harry's House",
//       albumArt: "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f0",
//       duration: 167,
//       progress: 30,
//     },
//     {
//       title: "Heat Waves",
//       artist: "Glass Animals",
//       album: "Dreamland",
//       albumArt: "https://i.scdn.co/image/ab67616d0000b2739e495fb707973f3390850eea",
//       duration: 238,
//       progress: 120,
//     },
//     {
//       title: "Levitating",
//       artist: "Dua Lipa ft. DaBaby",
//       album: "Future Nostalgia",
//       albumArt: "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946",
//       duration: 203,
//       progress: 90,
//     },
//     {
//       title: "Stay",
//       artist: "The Kid LAROI, Justin Bieber",
//       album: "F*CK LOVE 3: OVER YOU",
//       albumArt: "https://i.scdn.co/image/ab67616d0000b273f2f2d0d181fc6b5e6d5f8c99",
//       duration: 141,
//       progress: 50,
//     },
//   ]

//   useEffect(() => {
//     // Update time every minute
//     const interval = setInterval(() => {
//       const now = new Date()
//       setCurrentTime(now)

//       // Check if current time is within active hours
//       const currentHour = now.getHours()

//       // Handle case where end hour is less than start hour (overnight)
//       const isActive =
//         endHour < startHour
//           ? currentHour >= startHour || currentHour < endHour
//           : currentHour >= startHour && currentHour < endHour

//       setIsActiveHours(isActive)

//       // If active, set a random track
//       if (isActive && (!currentTrack || Math.random() < 0.3)) {
//         const randomTrack = spotifyTracks[Math.floor(Math.random() * spotifyTracks.length)]
//         setCurrentTrack({
//           ...randomTrack,
//           progress: Math.floor(Math.random() * randomTrack.duration),
//         })
//       }
//     }, 60000) // Update every minute

//     // Initial check
//     const now = new Date()
//     const currentHour = now.getHours()
//     const isActive =
//       endHour < startHour
//         ? currentHour >= startHour || currentHour < endHour
//         : currentHour >= startHour && currentHour < endHour

//     setIsActiveHours(isActive)

//     if (isActive) {
//       const randomTrack = spotifyTracks[Math.floor(Math.random() * spotifyTracks.length)]
//       setCurrentTrack({
//         ...randomTrack,
//         progress: Math.floor(Math.random() * randomTrack.duration),
//       })
//     }

//     return () => clearInterval(interval)
//   }, [])

//   // Format time as mm:ss
//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`
//   }

//   return (
//     <div className="w-full">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold">Currently Listening To</h3>
//         <div className="flex items-center gap-2">
//           <div className={`w-2 h-2 rounded-full ${isActiveHours ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}></div>
//           <span className="text-xs text-muted-foreground">{isActiveHours ? "Active now" : "Inactive"}</span>
//         </div>
//       </div>

//       {isActiveHours && currentTrack ? (
//         <motion.div
//           className={`p-4 rounded-lg ${theme === "dark" ? "bg-green-900/20" : "bg-green-100"} flex items-center gap-4`}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="relative min-w-[80px] w-20 h-20">
//             <Image
//               src={currentTrack.albumArt || "/placeholder.svg"}
//               alt={`${currentTrack.album} cover`}
//               width={80}
//               height={80}
//               className="rounded-md shadow-md"
//             />
//             <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-md opacity-0 hover:opacity-100 transition-opacity">
//               <motion.div
//                 className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="text-black"
//                 >
//                   <polygon points="5 3 19 12 5 21 5 3"></polygon>
//                 </svg>
//               </motion.div>
//             </div>
//           </div>

//           <div className="flex-1">
//             <h4 className="font-medium text-sm line-clamp-1">{currentTrack.title}</h4>
//             <p className="text-xs text-muted-foreground line-clamp-1">{currentTrack.artist}</p>
//             <p className="text-xs text-muted-foreground line-clamp-1">{currentTrack.album}</p>

//             <div className="mt-2">
//               <div className="h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
//                 <motion.div
//                   className="h-full bg-green-500"
//                   initial={{ width: `${(currentTrack.progress / currentTrack.duration) * 100}%` }}
//                   animate={{ width: "100%" }}
//                   transition={{
//                     duration: currentTrack.duration - currentTrack.progress,
//                     ease: "linear",
//                   }}
//                 />
//               </div>
//               <div className="flex justify-between mt-1 text-xs text-muted-foreground">
//                 <span>{formatTime(currentTrack.progress)}</span>
//                 <span>{formatTime(currentTrack.duration)}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col items-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="text-green-500"
//             >
//               <path d="M9 18V5l12-2v13"></path>
//               <circle cx="6" cy="18" r="3"></circle>
//               <circle cx="18" cy="16" r="3"></circle>
//             </svg>
//             <span className="text-xs text-green-500 font-medium mt-1">Straight from my Spotify</span>
//           </div>
//         </motion.div>
//       ) : (
//         <motion.div
//           className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} text-center`}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <p className="text-sm text-muted-foreground">
//             {isActiveHours
//               ? "Nothing playing right now. Check back later!"
//               : `Spotify integration is only active from ${startHour}:00 to ${endHour}:00.`}
//           </p>
//           <p className="text-xs mt-2 text-muted-foreground">Current time: {currentTime.toLocaleTimeString()}</p>
//         </motion.div>
//       )}
//     </div>
//   )
// }

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

      <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5" />
                <span>Now Playing</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SpotifyNowPlaying />
            </CardContent>
          </Card>
        </motion.div>

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

