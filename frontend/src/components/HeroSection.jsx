import { motion } from 'framer-motion';
import { Play, BookOpen } from 'lucide-react';
import Navbar from './Navbar';
import heroBackground from '../assets/HeroBackground.jpeg'
import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import {NavLink} from 'react-router-dom'
import axios from 'axios'

const HeroSection = () => {
  const [loading, setLoading] = useState(true);
   const [badge,setBadge]=useState("");
    const [displayed,setDisplayed]=useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

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
    <>
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
          <Navbar />

          {(badge && !displayed)
                ? <BadgeUnlock badgeImage={`/public/${badge}.jpg`} badgeTitle={badge} isVisible={true} />
                : <div></div>}


          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroBackground}
              alt="Futuristic gaming background"
              className="w-full h-full object-cover opacity-60"
            />
            {/* Neon gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 mix-blend-overlay" />
            {/* Subtle dark overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Floating Particles Effect */}
          <div className="absolute inset-0 z-10">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60 shadow-[0_0_10px_#22d3ee]"
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 100 - 50, 0],
                  opacity: [0.6, 0.2, 0.6],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            {/* Icon */}
            <motion.div
              variants={itemVariants}
              className="mb-8 flex justify-center"
            >
              <div>
              <img src="/public/EdventurLOGO.png" 
              alt="logo" 
              className='h-10 md:h-20'/>
            </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              <span className="text-white drop-shadow-[0_0_10px_#9333ea]">
                Edventur
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Gamified Learning for Every Student
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <NavLink
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                to='/games'
                className="bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_#06b6d4] hover:shadow-[0_0_20px_#9333ea] transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-xl"
              >
                <Play className="w-5 h-5 mr-2 inline" />
                Play a Game
              </NavLink>

              <NavLink
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-xl shadow-[0_0_15px_#22c55e] hover:shadow-[0_0_20px_#22c55e]"
                to='/lessons'
              >
                <BookOpen className="w-5 h-5 mr-2 inline" />
                Start a Lesson
              </NavLink>
            </motion.div>
          </motion.div>
        </section>
      )}
    </>
  );
};

export default HeroSection;
