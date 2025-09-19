import { motion } from 'framer-motion';
import { Gamepad2, Zap, Sparkles } from 'lucide-react';
import ParticleBackground from './ParticleBackground.jsx'

const LoadingScreen = ({ onComplete }) => {
  // Auto complete after 5 seconds
  setTimeout(() => {
    onComplete();
  }, 5000);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 0.8,
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

  const pulseVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  const orbitVariants = {
    orbit: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground/>
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,255,0.2) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Central Loading Animation */}
      <div className="relative flex flex-col items-center space-y-8">
        {/* Orbiting Elements */}
        <div className="relative">
          <motion.div
            variants={orbitVariants}
            animate="orbit"
            className="absolute inset-0 w-32 h-32"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80]" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#a855f7]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-pink-400 rounded-full shadow-[0_0_10px_#ec4899]" />
          </motion.div>

          {/* Central Icon */}
          <motion.div
            variants={itemVariants}
            className="relative z-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_25px_#06b6d4]"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity }}
            >   
              <img src="/EdventurLOGO.png" 
              alt="logo" 
              className='h-16 md:h-28'/> 
            </motion.div>
          </motion.div>
        </div>

        {/* Logo Text */}
        <motion.div variants={itemVariants} className="text-center space-y-2">
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            Edventur
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg"
          >
            Initializing Gaming Experience...
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          variants={itemVariants}
          className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-[0_0_15px_#06b6d4]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4.5 }}
          />
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          variants={itemVariants}
          className="text-cyan-400 text-sm font-mono"
        >
          {Array.from({ length: 3 }, (_, i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              .
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
