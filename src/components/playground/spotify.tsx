// // Spotify Now Playing
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