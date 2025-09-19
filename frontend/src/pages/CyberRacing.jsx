import { useState, useEffect, useRef, use } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoadingScreen from "../components/LoadingScreen"
import axios from 'axios'
import {useNavigate,NavLink} from 'react-router-dom'
import {toast} from 'react-hot-toast'


export default function CyberRacing() {


const DataQuestions=useRef([]);
const questions=useRef([]);

  const navigate=useNavigate();
  useEffect(()=>{
    axios.get('/api/questions/gamequestions')
  .then((res)=>{
    if(res.data.error){
      toast.error(res.data.error);
      navigate('/login')
    }
    else if(res.data.Questions){
      DataQuestions.current=res.data.Questions;
      for(let i=0;i<DataQuestions.current.length;i++){
        let x=Math.floor(Math.random()*DataQuestions.current.length);
        questions.current.push(DataQuestions.current[x]);
      }
    }
  })
  .catch((err)=>{
    toast.error(err)
  })

  },[]) 

  

  const [gameState, setGameState] = useState({
    playerLane: 1, // 0, 1, 2 (left, center, right)
    fuel: 100,
    score: 0,
    lives: 3,
    cars: [],
    gameOver: false,
    showQuiz: false,
    currentQuestion: 0,
    quizType: "fuel",
    collisionCarId: null,
    isShaking: false,
  })

    useEffect(()=>{
    if(gameState.gameOver){
      const Score=
      {score:gameState.score/5};
      axios.patch('/api/user/gamescore',Score)
      .then((res)=>{
        console.log(res.data.success)
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  },[gameState.gameOver])

const [loading,setLoading]=useState(true)
  const gameLoopRef = useRef()
  const carSpawnRef = useRef()
  const fuelDecreaseRef = useRef()
  const engineSoundRef = useRef()
  const collisionSoundRef = useRef()
  const correctSoundRef = useRef()
  const wrongSoundRef = useRef()
  const fuelLowSoundRef = useRef()

  useEffect(() => {
    const createBeepSound = (frequency, duration) => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = frequency
        oscillator.type = "square"

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
      } catch (error) {
        console.log("Audio not supported")
      }
    }

    engineSoundRef.current = { play: () => createBeepSound(150, 0.1) }
    collisionSoundRef.current = { play: () => createBeepSound(80, 0.5) }
    correctSoundRef.current = { play: () => createBeepSound(800, 0.3) }
    wrongSoundRef.current = { play: () => createBeepSound(200, 0.8) }
    fuelLowSoundRef.current = { play: () => createBeepSound(400, 0.2) }
  }, [])

  useEffect(() => {
    if (!gameState.gameOver && !gameState.showQuiz) {
      carSpawnRef.current = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          cars: [
            ...prev.cars,
            {
              id: Date.now(),
              lane: Math.floor(Math.random() * 3),
              y: -60,
              color: `hsl(${Math.random() * 360}, 70%, 50%)`,
            },
          ],
        }))
      }, 2000)

      return () => {
        if (carSpawnRef.current) clearInterval(carSpawnRef.current)
      }
    }
  }, [gameState.gameOver, gameState.showQuiz])

  useEffect(() => {
    if (!gameState.gameOver && !gameState.showQuiz) {
      gameLoopRef.current = setInterval(() => {
        setGameState((prev) => {
          const newCars = prev.cars.map((car) => ({ ...car, y: car.y + 8 })).filter((car) => car.y < 600)

          const shouldIncrementScore = Math.random() < 0.1
          const newScore = shouldIncrementScore ? prev.score + 1 : prev.score

          const playerCarY = 500
          const collisionThreshold = 150

          const nearCollision = newCars.find(
            (car) =>
              car.lane === prev.playerLane &&
              car.y > playerCarY - collisionThreshold &&
              car.y < playerCarY - 50 &&
              !prev.showQuiz,
          )

          if (nearCollision && !prev.showQuiz) {
            if (engineSoundRef.current) {
              engineSoundRef.current.play()
            }

            return {
              ...prev,
              cars: newCars,
              score: newScore,
              showQuiz: true,
              quizType: Math.random() > 0.5 ? "fuel" : "collision",
              collisionCarId: nearCollision.id,
              currentQuestion: Math.floor(Math.random() * questions.current.length),
            }
          }

          return {
            ...prev,
            cars: newCars,
            score: newScore,
          }
        })
      }, 100)

      return () => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current)
      }
    }
  }, [gameState.gameOver, gameState.showQuiz])

  let music=new Audio('/Racing.mp3')
  music.loop=true;
  useEffect(()=>{
    music.play();
    return ()=>{
      music.pause();
    }
  },[])

  useEffect(() => {
    if (!gameState.gameOver && !gameState.showQuiz) {
      fuelDecreaseRef.current = setInterval(() => {
        setGameState((prev) => {
          const newFuel = prev.fuel - 1.5
          if (newFuel <= 0) {
            return { ...prev, fuel: 0, gameOver: true }
          }
          return { ...prev, fuel: newFuel }
        })
      }, 1000)

      return () => {
        if (fuelDecreaseRef.current) clearInterval(fuelDecreaseRef.current)
      }
    }
  }, [gameState.gameOver, gameState.showQuiz])

  const handleAnswer = (selectedAnswer) => {
    const que=questions.current[gameState.currentQuestion]
  const isCorrect = que.options[selectedAnswer] === que.correctAnswer;

    if (isCorrect) {
      if (correctSoundRef.current) {
        correctSoundRef.current.play()
      }

      if (gameState.quizType === "fuel") {
        setGameState((prev) => ({
          ...prev,
          fuel: Math.min(100, prev.fuel + 20),
          showQuiz: false,
          collisionCarId: null,
        }))
      } else {
        setGameState((prev) => ({
          ...prev,
          cars: prev.cars.filter((car) => car.id !== prev.collisionCarId),
          showQuiz: false,
          collisionCarId: null,
        }))
      }
    } else {
      if (wrongSoundRef.current) {
        wrongSoundRef.current.play()
      }

      if (gameState.quizType === "collision") {
        if (collisionSoundRef.current) {
          collisionSoundRef.current.play()
        }

        setGameState((prev) => ({
          ...prev,
          lives: prev.lives - 1,
          cars: prev.cars.filter((car) => car.id !== prev.collisionCarId),
          showQuiz: false,
          collisionCarId: null,
          isShaking: true,
          gameOver: prev.lives <= 1,
        }))

        setTimeout(() => {
          setGameState((prev) => ({ ...prev, isShaking: false }))
        }, 500)
      } else {
        setGameState((prev) => ({
          ...prev,
          showQuiz: false,
          collisionCarId: null,
        }))
      }
    }
  }

  useEffect(() => {
    if (gameState.fuel <= 20 && gameState.fuel > 0) {
      if (fuelLowSoundRef.current) {
        fuelLowSoundRef.current.play()
      }
    }
  }, [gameState.fuel])

  const handleKeyPress = (e) => {
    if (gameState.gameOver || gameState.showQuiz) return

    if (engineSoundRef.current && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
      engineSoundRef.current.play()
    }

    if (e.key === "ArrowLeft") {
      setGameState((prev) => ({
        ...prev,
        playerLane: Math.max(0, prev.playerLane - 1),
      }))
    } else if (e.key === "ArrowRight") {
      setGameState((prev) => ({
        ...prev,
        playerLane: Math.min(2, prev.playerLane + 1),
      }))
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [gameState.gameOver, gameState.showQuiz])

  const restartGame = () => {
    setGameState({
      playerLane: 1,
      fuel: 100,
      score: 0,
      lives: 3,
      cars: [],
      gameOver: false,
      showQuiz: false,
      currentQuestion: 0,
      quizType: "fuel",
      collisionCarId: null,
      isShaking: false,
    })
  }

  return (
    <>
    {
      loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ): (
        <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Neon Road */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black">
        {/* Road lanes */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-full">
          {/* Lane dividers */}
          <div className="absolute left-1/3 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-400 opacity-60 animate-pulse" />
          <div className="absolute left-2/3 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-400 opacity-60 animate-pulse" />

          {/* Moving road lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 transform -translate-x-1/2 w-2 h-8 bg-cyan-400 rounded"
                initial={{ y: -32 }}
                animate={{ y: 640 }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Player Car */}
      <motion.div
        className={`absolute bottom-20 w-12 h-16 bg-gradient-to-b from-red-400 to-red-600 rounded-lg shadow-lg shadow-red-500/50 ${
          gameState.isShaking ? "animate-bounce" : ""
        }`}
        style={{
          left: `calc(50% + ${(gameState.playerLane - 1) * 128}px - 24px)`,
        }}
        animate={{
          boxShadow: gameState.isShaking ? "0 0 20px #ef4444, 0 0 40px #ef4444" : "0 0 10px #ef4444",
        }}
      >
        <div className="absolute inset-1 bg-gradient-to-b from-red-300 to-red-500 rounded" />
      </motion.div>

      {/* Other Cars */}
      <AnimatePresence>
        {gameState.cars.map((car) => (
          <motion.div
            key={car.id}
            className="absolute w-12 h-16 rounded-lg shadow-lg"
            style={{
              left: `calc(50% + ${(car.lane - 1) * 128}px - 24px)`,
              top: car.y,
              backgroundColor: car.color,
              boxShadow: `0 0 10px ${car.color}`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="absolute inset-1 bg-gradient-to-b from-white/30 to-transparent rounded" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start text-white font-mono">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-cyan-400">FUEL:</span>
            <div className="w-32 h-4 bg-gray-800 rounded border border-cyan-400">
              <div
                className={`h-full rounded transition-all duration-300 ${
                  gameState.fuel > 50
                    ? "bg-green-400"
                    : gameState.fuel > 20
                    ? "bg-yellow-400"
                    : "bg-red-400 animate-pulse"
                }`}
                style={{ width: `${gameState.fuel}%` }}
              />
            </div>
          </div>
          <div className="text-cyan-400">
            SCORE: <span className="text-white">{gameState.score}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          {[...Array(gameState.lives)].map((_, i) => (
            <div key={i} className="w-6 h-6 bg-red-500 rounded border border-red-300" />
          ))}
        </div>
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {gameState.showQuiz && (
          <motion.div
            className="absolute inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 border-2 border-cyan-400 rounded-lg p-6 max-w-md w-full mx-4 shadow-lg shadow-cyan-400/20"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <div className="text-center mb-4">
                <h3 className="text-cyan-400 text-lg font-bold mb-2">
                  {gameState.quizType === "fuel" ? "FUEL STATION" : "COLLISION ALERT!"}
                </h3>
                <p className="text-white text-sm">
                  {gameState.quizType === "fuel"
                    ? "Answer correctly to refuel!"
                    : "Answer correctly to avoid collision!"}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-white font-medium mb-3">{questions.current[gameState.currentQuestion].questionText}</p>

                <div className="space-y-2">
                  {questions.current[gameState.currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className="w-full p-3 text-left bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-cyan-400 rounded transition-colors text-white"
                    >
                      {String.fromCharCode(65 + index)}. {option}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over Screen */}
      <AnimatePresence>
        {gameState.gameOver && (
          <motion.div
            className="absolute inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center text-white flex flex-col"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <h2 className="text-4xl font-bold text-red-400 mb-4">GAME OVER</h2>
              <p className="text-xl mb-2">Final Score: {gameState.score}</p>
              <p className="text-gray-400 mb-6">{gameState.fuel <= 0 ? "Out of fuel!" : "No lives remaining!"}</p>
              <button
                onClick={restartGame}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded transition-colors"
              >
                RESTART
              </button>
              <NavLink
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded transition-colors"
              to="/games">
                Quit
              </NavLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white/60 text-sm">
        Use ← → arrow keys to move
      </div>
    </div>
      )
    }
    </>
    
  )
}
