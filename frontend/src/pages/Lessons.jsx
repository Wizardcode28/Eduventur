import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import LessonCard from "../components/LessonCard"
import { NavLink, useNavigate } from 'react-router-dom'
import ParticleBackground from "../components/ParticleBackground"
import { toast } from 'react-hot-toast'
import axios from 'axios'
import BadgeUnlock from "../components/BadgeUnlock"

export default function LessonsPage() {
   const [badge,setBadge]=useState("");
    const [displayed,setDisplayed]=useState(false);
  const lessons = [
    {
      title: "Math",
      description:
        "Master numbers, equations, and problem-solving with interactive lessons that make mathematics exciting and accessible.",
      color: "cyan",
      delay: 0.2,
      route: '/lessons/math'
    },
    {
      title: "Science",
      description:
        "Explore the wonders of physics, chemistry, and biology through immersive experiments and discoveries.",
      color: "purple",
      delay: 0.4,
      route: '/lessons/science'
    },
    {
      title: "English",
      description:
        "Enhance your language skills with creative writing, literature analysis, and communication mastery.",
      color: "amber",
      delay: 0.6,
      route: '/lessons/english'
    },
  ]

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/user')
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
          navigate('/login');
        }
      })
      .catch((err) => {
        toast.error(err);
      })

  }, [])


  useEffect(()=>{
    axios.post('/api/badges')
    .then((res)=>{
      if(res.data.badge){
        setBadge(res.data.badge);
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">

      {(badge && !displayed)
            ? <BadgeUnlock badgeImage={`/${badge}.jpg`} badgeTitle={badge} isVisible={true} />
            : <div></div>}

      <ParticleBackground />

      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-amber-900/20" />

        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(rgba(6,182,212,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.3)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
        </div>


        {/* Glowing orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <NavLink
          className='rounded-lg border-2 border-cyan-200 bg-black text-cyan-400 font-semibold hover:border-cyan-400 p-2 duration-300 absolute top-4 right-4'
          to='/'
        >
          Back to Home
        </NavLink>

        <NavLink
          to='/teacherdashboard'
          className='rounded-lg border-2 border-purple-200 bg-black text-purple-400 font-semibold hover:border-purple-400 p-2 duration-300 absolute top-4 left-4'
        >
          Add New
        </NavLink>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-6 mt-[5rem]"
        >
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent"
          >
            LESSONS
          </h1>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Enter the digital realm of knowledge where learning transcends reality
          </p>
        </motion.div>

        {/* Lesson cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {lessons.map((lesson, index) => (
            <LessonCard
              key={lesson.title}
              title={lesson.title}
              description={lesson.description}
              color={lesson.color}
              delay={lesson.delay}
              route={lesson.route}
            />
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span>Choose your path to digital enlightenment</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          </div>
        </motion.div>
      </div>

    </div>
  )
}
