import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GameCard from "../components/GameCard";
import ParticleBackground from "../components/ParticleBackground";
import MarioGame from '/MarioGame.jpeg'
import RacingGame from '/RacingGame.jpeg'
import {NavLink,useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import BadgeUnlock from "../components/BadgeUnlock";


const games = [
  {
    title: "Neon Jumpverse",
    description:
      "Leap into a dazzling neon dimension where glowing platforms float in the cyber skies. Collect energy orbs, dodge traps, and outsmart quirky enemies in this futuristic twist on the classic platformer adventure. Every jump brings you closer to uncovering the secrets of the Jumpverse.",
    thumbnail: MarioGame,
    path:'/games/cyberracing'
  },
  {
    title: "Cyber Racing",
    description:
      "Burn neon highways at breakneck speed in a city that never sleeps. Race against rival cyber-drivers, master insane drifts, and upgrade your ride with futuristic tech. The streets are alive with light and danger—only the fastest survive in Cyber Drift X.",
    thumbnail: RacingGame,
    path:'/games/cyberracing'
  },
];

const Games = () => {
  const navigate=useNavigate()
  const [badge,setBadge]=useState("");
  const [displayed,setDisplayed]=useState(false);

  useEffect(()=>{
    axios.get('/api/user')
    .then((res)=>{
      if(res.data.error){
        toast.error(res.data.error);
        navigate('/login');
      }
    })
    .catch((err)=>{
      toast.error(err);
    })

  },[])

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
    <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}>

    <div className="min-h-screen bg-black relative overflow-hidden">

      {(badge && !displayed)
      ? <BadgeUnlock badgeImage={`/${badge}.jpg`} badgeTitle={badge} isVisible={true} />
      : <div></div>}
      <ParticleBackground />
      
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-amber-900/20" />

      <div className="relative z-10 container mx-auto px-4 py-12">

       
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

        {/* Header Section */}
        <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-16"
    >
      {/* Simple Neon Title */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-6 mt-[5rem]"
        style={{
          color: "#00fff7",
          textShadow: "0 0 2px #00fff7, 0 0 4px #00fff7, 0 0 6px #00fff7",
        }}
        animate={{
          textShadow: [
            "0 0 8px #00fff7, 0 0 16px #00fff7, 0 0 24px #00fff7",
            "0 0 12px #00fff7, 0 0 20px #00fff7, 0 0 28px #00fff7",
            "0 0 8px #00fff7, 0 0 16px #00fff7, 0 0 24px #00fff7",
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        GAMES
      </motion.h1>

      {/* Simple Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
      >
        Enter a digital world of games with endless possibilities.
      </motion.p>
    </motion.div>

        {/* Games Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-[3rem] max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {games.map((game, index) => (
            <GameCard
              key={game.title}
              title={game.title}
              description={game.description}
              thumbnail={game.thumbnail}
              index={index}
              route={game.path}
            />
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div
            className="inline-block px-8 py-4 rounded-full border"
            style={{
              background: "var(--gradient-card)",
              borderImage: "var(--gradient-border) 1",
            }}
          >
            <p className="text-neon-cyan font-mono text-sm">
              // More games loading... Stay tuned for updates
            </p>
          </div>
        </motion.div>
      </div>

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {/* Vertical lines */}
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px bg-neon-cyan"
            style={{ left: `${i * 5}%` }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Horizontal lines */}
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-neon-purple"
            style={{ top: `${i * 7}%` }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    </div>
    </motion.div>
  );
};

export default Games;
