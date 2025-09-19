import React from 'react'
import {useState} from 'react'
import {motion} from 'framer-motion'
import {NavLink,useNavigate} from 'react-router-dom'

const LessonCard = ({ title, description, color, delay,route }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative group cursor-pointer
        bg-black/40 backdrop-blur-sm
        border-2 border-${color}-500/30
        rounded-2xl p-8
        shadow-2xl shadow-${color}-500/20
        hover:shadow-${color}-500/40
        transition-all duration-300
        transform-gpu perspective-1000
      `}
      style={{
        boxShadow: isHovered
          ? `0 0 40px ${color === "cyan" ? "#06b6d4" : color === "purple" ? "#a855f7" : "#f59e0b"}40, inset 0 0 20px ${color === "cyan" ? "#06b6d4" : color === "purple" ? "#a855f7" : "#f59e0b"}20`
          : `0 0 20px ${color === "cyan" ? "#06b6d4" : color === "purple" ? "#a855f7" : "#f59e0b"}20`,
      }}
    >
      {/* Animated border glow */}
      <div
        className={`
        absolute inset-0 rounded-2xl
        bg-gradient-to-r from-${color}-500/20 via-transparent to-${color}-500/20
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        animate-pulse
      `}
      />

      {/* Corner accents */}
      <div className={`absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-${color}-400`} />
      <div className={`absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-${color}-400`} />
      <div className={`absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-${color}-400`} />
      <div className={`absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-${color}-400`} />

      <div className="relative z-10">
        <motion.h3
          className={`text-3xl font-bold mb-4 text-${color}-300 text-center`}
          animate={{
            textShadow: isHovered
              ? `0 0 20px ${color === "cyan" ? "#06b6d4" : color === "purple" ? "#a855f7" : "#f59e0b"}`
              : `0 0 10px ${color === "cyan" ? "#06b6d4" : color === "purple" ? "#a855f7" : "#f59e0b"}`,
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>

        <p className="text-gray-300 text-center mb-8 leading-relaxed">{description}</p>

        <NavLink
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          to={route}
          className={`
            w-full py-4 px-6 rounded-xl
            bg-gradient-to-r from-${color}-600 to-${color}-500
            text-white font-semibold text-lg
            border border-${color}-400
            shadow-lg shadow-${color}-500/30
            hover:shadow-${color}-500/50
            transition-all duration-300
            relative overflow-hidden
            group/button
          `}
        >
          Start Learning
        </NavLink>
      </div>
    </motion.div>
  )
}

const FloatingParticle = ({ delay, duration, color }) => (
  <motion.div
    className={`absolute w-2 h-2 bg-${color}-400 rounded-full opacity-60`}
    animate={{
      y: [-20, -100],
      x: [0, Math.random() * 100 - 50],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeOut",
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: "100%",
    }}
  />
)

export default LessonCard
