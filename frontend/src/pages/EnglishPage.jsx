import { useState, useEffect, useRef } from "react"
import ParticleBackground from "../components/ParticleBackground"
import LoadingScreen from "../components/LoadingScreen"
import {toast} from 'react-hot-toast'
import {NavLink} from 'react-router-dom'
import axios from 'axios'


const styles = `
  .glow {
    text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
  }
  
  .quiz-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
    color: white;
    padding: 1rem;
    position: relative;
    overflow: hidden;
  }
  
  .background-effects {
    position: absolute;
    inset: 0;
    opacity: 0.1;
  }
  
  .bg-blur-1 {
    position: absolute;
    top: 25%;
    left: 25%;
    width: 16rem;
    height: 16rem;
    background: #3b82f6;
    border-radius: 50%;
    filter: blur(3rem);
  }
  
  .bg-blur-2 {
    position: absolute;
    bottom: 25%;
    right: 25%;
    width: 16rem;
    height: 16rem;
    background: #8b5cf6;
    border-radius: 50%;
    filter: blur(3rem);
  }
  
  .card {
    background: rgba(17, 24, 39, 0.9);
    border: 2px solid #374151;
    border-radius: 0.5rem;
    backdrop-filter: blur(4px);
  }
  
  .card-hover:hover {
    border-color: rgba(59, 130, 246, 0.5);
  }
  
  .button {
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    font-size: 1rem;
  }
  
  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .button-primary {
    background: #8b5cf6;
    color: white;
  }
  
  .button-primary:hover:not(:disabled) {
    background: #7c3aed;
  }
  
  .button-option {
    background: #1f2937;
    color: white;
    border: 2px solid #4b5563;
    width: 100%;
    text-align: left;
  }
  
  .button-option:hover:not(:disabled) {
    background: #374151;
    border-color: #3b82f6;
  }
  
  .button-correct {
    background: #059669;
    border-color: #10b981;
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
  }
  
  .button-incorrect {
    background: #dc2626;
    border-color: #ef4444;
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
  }
  
  .grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.25rem;
  }
  
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .text-center {
    text-align: center;
  }
  
  .mb-4 { margin-bottom: 1rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .mb-8 { margin-bottom: 2rem; }
  .mt-2 { margin-top: 0.5rem; }
  .mt-4 { margin-top: 1rem; }
  .mr-2 { margin-right: 0.5rem; }
  .mr-3 { margin-right: 0.75rem; }
  .mr-4 { margin-right: 1rem; }
  
  .p-2 { padding: 0.5rem; }
  .p-4 { padding: 1rem; }
  .p-6 { padding: 1.5rem; }
  .p-8 { padding: 2rem; }
  .px-8 { padding-left: 2rem; padding-right: 2rem; }
  .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
  
  .text-sm { font-size: 0.875rem; }
  .text-lg { font-size: 1.125rem; }
  .text-xl { font-size: 1.25rem; }
  .text-2xl { font-size: 1.5rem; }
  .text-3xl { font-size: 1.875rem; }
  .text-4xl { font-size: 2.25rem; }
  .text-6xl { font-size: 3.75rem; }
  
  .font-bold { font-weight: 700; }
  .font-semibold { font-weight: 600; }
  
  .text-white { color: #ffffff; }
  .text-red-500 { color: #ef4444; }
  .text-gray-600 { color: #4b5563; }
  .text-gray-300 { color: #d1d5db; }
  .text-gray-400 { color: #9ca3af; }
  .text-blue-400 { color: #60a5fa; }
  .text-purple-400 { color: #c084fc; }
  .text-green-400 { color: #4ade80; }
  .text-yellow-400 { color: #facc15; }
  .text-orange-400 { color: #fb923c; }
  
  .bg-gray-700 { background-color: #374151; }
  .bg-gray-800 { background-color: #1f2937; }
  .bg-purple-500 { background-color: #8b5cf6; }
  .bg-green-400 { background-color: #4ade80; }
  
  .border-gray-600 { border-color: #4b5563; }
  .border-gray-700 { border-color: #374151; }
  .border-green-400 { border-color: #4ade80; }
  .border-purple-400 { border-color: #c084fc; }
  
  .rounded { border-radius: 0.25rem; }
  .rounded-lg { border-radius: 0.5rem; }
  .rounded-full { border-radius: 9999px; }
  
  .aspect-square {
    aspect-ratio: 1 / 1;
  }
  
  .max-w-md { max-width: 28rem; }
  .max-w-4xl { max-width: 56rem; }
  .mx-auto { margin-left: auto; margin-right: auto; }
  
  .space-x-2 > * + * { margin-left: 0.5rem; }
  .space-x-4 > * + * { margin-left: 1rem; }
  .space-y-2 > * + * { margin-top: 0.5rem; }
  .space-y-6 > * + * { margin-top: 1.5rem; }
  
  .w-3 { width: 0.75rem; }
  .w-4 { width: 1rem; }
  .w-5 { width: 1.25rem; }
  .w-8 { width: 2rem; }
  .w-16 { width: 4rem; }
  .w-32 { width: 8rem; }
  .w-full { width: 100%; }
  
  .h-2 { height: 0.5rem; }
  .h-3 { height: 0.75rem; }
  .h-4 { height: 1rem; }
  .h-5 { height: 1.25rem; }
  .h-6 { height: 1.5rem; }
  .h-8 { height: 2rem; }
  .h-16 { height: 4rem; }
  .h-full { height: 100%; }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .overflow-hidden { overflow: hidden; }
  .relative { position: relative; }
  .absolute { position: absolute; }
  .fixed { position: fixed; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
  .z-10 { z-index: 10; }
  .z-50 { z-index: 50; }
  
  .pointer-events-none { pointer-events: none; }
  .inline { display: inline; }
  
  .shadow-2xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  
  .transform { transform: translateX(var(--tw-translate-x, 0)) translateY(var(--tw-translate-y, 0)) rotate(var(--tw-rotate, 0)) skewX(var(--tw-skew-x, 0)) skewY(var(--tw-skew-y, 0)) scaleX(var(--tw-scale-x, 1)) scaleY(var(--tw-scale-y, 1)); }
  .-translate-x-1/2 { --tw-translate-x: -50%; }
  .-translate-y-1/2 { --tw-translate-y: -50%; }
  
  .top-1/3 { top: 33.333333%; }
  .top-1/4 { top: 25%; }
  .left-1/2 { left: 50%; }
  .left-1/4 { left: 25%; }
  .bottom-1/4 { bottom: 25%; }
  .right-1/4 { right: 25%; }
  
  @media (min-width: 768px) {
    .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
    .md\\:text-3xl { font-size: 1.875rem; }
  }
`

const HeartIcon = ({ className = "" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

const RotateCcwIcon = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 4v6h6m16 10v-6h-6M7 14l-4-4 4-4m10 8l4-4-4-4"
    />
  </svg>
)

const ZapIcon = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const TrophyIcon = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
)

const puzzleImageData = '/public/character3.jpg'

export default function EnglishPage() {


  const questions=useRef([]);
  const DataQuestions=useRef([]);
  useEffect(()=>{
    axios.get('/api/questions/learningquestions/english')
    .then((res)=>{
      if(res.data.error){
        toast.error(res.data.error);
      }
      else if(res.data.Questions){
        DataQuestions.current=res.data.Questions;
        for(let i=0;i<16;i++){
          let x=Math.floor(Math.random()*16);
          questions.current.push(DataQuestions.current[x]);
        }
        console.log(questions.current)
        console.log(DataQuestions.current)
      }
    })
    .catch((err)=>{
      toast.error(err);
    })
  },[])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [loading,setLoading]=useState(true)
  const [lives, setLives] = useState(3)
  const [timeLeft, setTimeLeft] = useState(15)
  const [gameState, setGameState] = useState("playing")
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const [puzzlePieces, setPuzzlePieces] = useState([])
  const [showPuzzleComplete, setShowPuzzleComplete] = useState(false)
  const [puzzleCompleteBonus, setPuzzleCompleteBonus] = useState(false)
  const [combo, setCombo] = useState(0)
  const [showCombo, setShowCombo] = useState(false)

  const timerRef = useRef(null)
  const audioContextRef = useRef(null)

  const currentQuestion = questions.current[currentQuestionIndex]


  useEffect(() => {
    const pieces = []
    for (let i = 0; i < 16; i++) {
      pieces.push({ id: i, revealed: false })
    }
    setPuzzlePieces(pieces)
  }, [])

  useEffect(()=>{
    if(gameState=='gameOver' || gameState=='completed'){
      const Score={
        score:score/5
      }
      axios.patch('/api/user/learningscore',Score)
      .then((res)=>{
        console.log(res.data.success);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  },[gameState])

  let music=new Audio('/public/Quiz.mp3');
  music.loop=true;
  useEffect(()=>{
    music.play();
    return ()=>{
      music.pause();
    }
  },[])

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
  }, [])

  const playSound = (frequency, duration, type = "sine") => {
    if (!audioContextRef.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)

    oscillator.frequency.value = frequency
    oscillator.type = type

    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration)

    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + duration)
  }

  // Timer logic
  useEffect(() => {
    if (gameState !== "playing") return

    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
        if (timeLeft <= 5 && timeLeft > 0) {
          playSound(800, 0.1) // Tick sound
        }
      }, 1000)
    } else {
      handleTimeUp()
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [timeLeft, gameState])

  const revealNextPuzzlePiece = () => {
    setPuzzlePieces((prev) => {
      const unrevealedIndex = prev.findIndex((piece) => !piece.revealed)
      if (unrevealedIndex === -1) return prev

      const newPieces = [...prev]
      newPieces[unrevealedIndex].revealed = true

      // Check if puzzle is complete
      const allRevealed = newPieces.every((piece) => piece.revealed)
      if (allRevealed && !puzzleCompleteBonus) {
        setTimeout(() => {
          setShowPuzzleComplete(true)
          setPuzzleCompleteBonus(true)
          setScore((prevScore) => prevScore + 100)
          playSound(523, 0.5) // Victory sound
          setTimeout(() => setShowPuzzleComplete(false), 3000)
        }, 500)
      }

      return newPieces
    })

    playSound(659, 0.3) // Puzzle flip sound
  }

  const handleTimeUp = () => {
    setLives((prev) => prev - 1)
    setCombo(0)
    playSound(220, 0.5, "square") // Error sound
    setIsCorrect(false)
    setShowResult(true)

    setTimeout(() => {
      if (lives - 1 <= 0) {
        setGameState("gameOver")
        playSound(110, 1, "sawtooth") // Game over sound
      } else {
        nextQuestion()
      }
    }, 1500)
  }

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null || showResult) return

    setSelectedAnswer(answerIndex)
    const correct = currentQuestion.options[answerIndex] === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      const newCombo = combo + 1
      setCombo(newCombo)
      const basePoints = 10
      const comboBonus = Math.floor(newCombo / 3) * 5
      const totalPoints = basePoints + comboBonus

      setScore((prev) => prev + totalPoints)
      setShowConfetti(true)
      playSound(523, 0.3) // Success sound

      if (newCombo >= 3 && newCombo % 3 === 0) {
        setShowCombo(true)
        playSound(659, 0.4) // Combo sound
        setTimeout(() => setShowCombo(false), 2000)
      }

      setTimeout(() => revealNextPuzzlePiece(), 800)
      setTimeout(() => setShowConfetti(false), 2000)
    } else {
      setLives((prev) => prev - 1)
      setCombo(0)
      playSound(220, 0.5, "square") // Error sound
    }

    setTimeout(() => {
      if (!correct && lives - 1 <= 0) {
        setGameState("gameOver")
        playSound(110, 1, "sawtooth") // Game over sound
      } else if (currentQuestionIndex + 1 >= questions.current.length) {
        setGameState("completed")
      } else {
        nextQuestion()
      }
    }, 1500)
  }

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1)
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(null)
    setTimeLeft(15)
  }

  const resetGame = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setLives(3)
    setTimeLeft(15)
    setGameState("playing")
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(null)
    setShowConfetti(false)
    setCombo(0)
    setShowCombo(false)
    const pieces = []
    for (let i = 0; i < 16; i++) {
      pieces.push({ id: i, revealed: false })
    }
    setPuzzlePieces(pieces)
    setShowPuzzleComplete(false)
    setPuzzleCompleteBonus(false)
  }

  const getButtonClass = (index) => {
    const baseClass = "button button-option"
    if (!showResult) return baseClass
    if (index === currentQuestion.correctAnswer) return `${baseClass} button-correct`
    if (index === selectedAnswer && !isCorrect) return `${baseClass} button-incorrect`
    return baseClass
  }

  if (gameState === "gameOver" || gameState === "completed") {
    return (
      <>
        <style>{styles}</style>
        <div className="quiz-container flex-center">
           <ParticleBackground/>
          <div className="text-center">
            <div className="card p-8 max-w-md mx-auto">
              <div className="flex-center mb-4">
                {gameState === "completed" ? (
                  <TrophyIcon className="h-16 w-16 text-yellow-400 mr-4" />
                ) : (
                  <ZapIcon className="h-16 w-16 text-red-500 mr-4" />
                )}
                <h1 className={`text-4xl font-bold ${gameState === "completed" ? "text-green-400" : "text-red-500"}`}>
                  {gameState === "completed" ? "Victory!" : "Game Over!"}
                </h1>
              </div>

              <div className="text-6xl font-bold text-blue-400 glow mb-4">{score}</div>

              <p className="text-gray-300 text-lg mb-6">Final Score</p>

              <div className="space-y-2 text-sm text-gray-400 mb-6">
                <p>
                  Questions Answered: {currentQuestionIndex} / {questions.current.length}
                </p>
                <p>Puzzle Pieces Revealed: {puzzlePieces.filter((p) => p.revealed).length} / 16</p>
                {combo > 0 && <p className="text-purple-400">Best Combo: {combo} 🔥</p>}
              </div>

              {puzzleCompleteBonus && (
                <div className="text-yellow-400 font-semibold flex-center mb-6">
                  <TrophyIcon className="h-5 w-5 mr-2" />
                  Puzzle Master Bonus: +100 points!
                </div>
              )}

              <button onClick={resetGame} className="button button-primary px-8 py-3 text-lg">
                <RotateCcwIcon className="mr-2 h-5 w-5 inline" />
                Play Again
              </button>
              <NavLink
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded transition-colors"
              to="/lessons">
                Quit
              </NavLink>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
     {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <div>
        <style>{styles}</style>
      <div className="quiz-container relative">
        <ParticleBackground/>
        <div className="background-effects">
          <div className="bg-blur-1"></div>
          <div className="bg-blur-2"></div>
        </div>

        {/* Confetti Effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-3 h-3`}
                style={{
                  left: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 800),
                  top: -10,
                  backgroundColor: ["#60a5fa", "#c084fc", "#4ade80", "#facc15"][i % 4],
                  animation: `fall 2s ease-out ${Math.random() * 0.5}s forwards`,
                }}
              />
            ))}
          </div>
        )}

        {showCombo && (
          <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 glow">{combo}x COMBO! 🔥</div>
              <p className="text-yellow-400 text-lg">+{Math.floor(combo / 3) * 5} Bonus!</p>
            </div>
          </div>
        )}

        {showPuzzleComplete && (
          <div className="fixed inset-0 flex-center z-50 pointer-events-none">
            <div className="text-center">
              <div className="text-6xl mb-4">🧩✨🏆</div>
              <h2 className="text-4xl font-bold text-yellow-400">PUZZLE MASTERED!</h2>
              <p className="text-2xl text-green-400 mt-2">+100 Bonus Points!</p>
            </div>
          </div>
        )}

        <div className="flex-between mb-8 max-w-4xl mx-auto relative z-10">
          {/* Lives */}
          <div className="flex space-x-1.5 md:space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <HeartIcon className={`h-4 w-4 md:h-8 md:w-8 ${i < lives ? "text-red-500" : "text-gray-600"}`} />
              </div>
            ))}
          </div>

          {/* Score and Combo */}
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 glow">Score: {score}</div>
            {combo > 0 && <div className="text-sm text-orange-400 font-semibold">{combo}x Combo 🔥</div>}
          </div>

          {/* Timer */}
          <div
            style={{
              color: "#000000",
              backgroundColor: "#ffffff",
              textShadow: "none",
              borderRadius: "8px",
              border: timeLeft <= 5 ? "2px solid #ff0000" : "2px solid #000000",
            }}
            className="text-xl md:text-2xl p-1 md:p-2 font-bold"
          >
            {timeLeft}s
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Question Card */}
          <div>
            <div
              className={`card mb-8 shadow-2xl ${
                showResult ? (isCorrect ? "border-green-400" : "border-red-500") : "card-hover"
              }`}
              style={{
                boxShadow: showResult
                  ? isCorrect
                    ? "0 0 20px rgba(16, 185, 129, 0.5)"
                    : "0 0 20px rgba(239, 68, 68, 0.5)"
                  : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="p-8">
                <div className="text-center mb-6">
                  <span className="text-purple-400 text-lg font-semibold">
                    Question {currentQuestionIndex + 1} of {questions.current.length}
                  </span>
                </div>

                <h2 className="text-xl md:text-3xl font-bold text-center mb-8 text-white">
                  {currentQuestion.questionText}
                </h2>
              </div>
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-8">
            {currentQuestion.options.map((option, index) => (
              <div key={index}>
                <button
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`${getButtonClass(index)} w-full p-6 text-lg font-semibold`}
                >
                  <span className="text-blue-400 font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              </div>
            ))}
          </div>

          <div className="card mb-8">
            <div className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-purple-400 mb-2 flex-center">
                  <TrophyIcon className="h-6 w-6 mr-2" />
                  Mystery Puzzle
                </h3>
                <p className="text-gray-400 text-sm">Answer correctly to reveal the hidden image!</p>
              </div>

              <div className="grid-4 max-w-md mx-auto bg-gray-800 p-2 rounded-lg">
                {puzzlePieces.map((piece, index) => {
                  const row = Math.floor(index / 4)
                  const col = index % 4
                  return (
                    <div key={piece.id} className="aspect-square relative" style={{ perspective: "1000px" }}>
                      <div
                        className="w-full h-full relative"
                        style={{
                          transformStyle: "preserve-3d",
                          transform: piece.revealed ? "rotateY(180deg)" : "rotateY(0deg)",
                          transition: "transform 0.8s ease-in-out",
                        }}
                      >
                        {/* Back side (hidden puzzle) */}
                        <div
                          className="absolute inset-0 bg-gray-700 border border-gray-600 rounded flex-center"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <div
                            className="w-4 h-4 bg-purple-500 rounded border border-purple-400 animate-pulse"
                            style={{ opacity: 0.3 }}
                          ></div>
                        </div>

                        {/* Front side (revealed puzzle piece) */}
                        <div
                          className="absolute inset-0 rounded overflow-hidden border border-green-400"
                          style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                            borderColor: "rgba(74, 222, 128, 0.5)",
                          }}
                        >
                          <div
                            className="w-full h-full"
                            style={{
                              backgroundImage: `url(${puzzleImageData})`,
                              backgroundSize: "400% 400%",
                              backgroundPosition: `${col * 33.33}% ${row * 33.33}%`,
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="text-center mt-4">
                <div className="flex-center space-x-4 text-sm">
                  <span className="text-gray-400">
                    {puzzlePieces.filter((p) => p.revealed).length} / {puzzlePieces.length} pieces revealed
                  </span>
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(to right, #8b5cf6, #3b82f6)",
                        width: `${(puzzlePieces.filter((p) => p.revealed).length / puzzlePieces.length) * 100}%`,
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                </div>
                {puzzleCompleteBonus && (
                  <div className="text-yellow-400 font-bold mt-2 flex-center">
                    <TrophyIcon className="h-5 w-5 mr-2" />
                    PUZZLE MASTERED! ✨
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-700">
            <div
              className="h-full"
              style={{
                background: "linear-gradient(to right, #3b82f6, #8b5cf6, #4ade80)",
                width: `${((currentQuestionIndex + 1) / questions.current.length) * 100}%`,
                transition: "width 0.5s ease",
              }}
            />
          </div>
        </div>

        <style jsx>{`
          @keyframes fall {
            to {
              transform: translateY(${typeof window !== "undefined" ? window.innerHeight + 10 : 610}px) rotate(360deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
      </div>
      )}
    </>
  )
}

