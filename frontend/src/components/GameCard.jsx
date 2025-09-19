import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { NavLink } from 'react-router-dom'

const GameCard = ({ title, description, thumbnail, index, route }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
      }}
      className="group relative bg-black rounded-lg overflow-hidden border border-cyan-500"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        boxShadow: '0 0 5px #00fff7, 0 0 10px #00fff7, 0 0 15px #00fff7',
      }}
    >
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(45deg, #00fff7, #a100ff, #ff00d4)',
            animation: 'spin 3s linear infinite'
          }}
        />
        <div className="absolute inset-[2px] bg-black rounded-lg" />
      </div>

      <div className="relative z-10 p-6">
        {/* Game Thumbnail */}
        <div className="relative mb-4 rounded-lg overflow-hidden">
          <motion.img
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Game Info */}
        <div className="space-y-3">
          <motion.h3
            className="text-xl font-bold text-cyan-400"
            whileHover={{ textShadow: '0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 30px #00fff7' }}
          >
            {title}
          </motion.h3>

          <p className="text-gray-400 text-sm leading-relaxed">
            {description}
          </p>

          {/* Play Now Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <NavLink
              className="w-full mt-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold py-2 px-4 rounded-lg border-0 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
              to={route}
            >
              Play Now
            </NavLink>
          </motion.div>
        </div>
      </div>

      {/* Glow Effect on Hover */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,255,247,0.3), transparent 70%)',
        }}
      />
    </motion.div>
  );
};

export default GameCard;
