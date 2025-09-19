import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Play', to: '/games' },
    { name: 'Learn', to: '/lessons' },
    { name: 'Register', to: '/signup' },
    { name: 'Sign In', to: '/login' },
    { name: 'Logout', to: '/' }
  ];

  const handleLogout = () => {
    axios.get('/api/logout')
    .then((res)=>{
      toast.success(res.data.message);
    })
    localStorage.removeItem('token');
    navigate('/');
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-cyan-400/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-2"
          >
            <div>
              <img src="/EdventurLOGO.png" 
              alt="logo" 
              className='h-8 md:h-12'/>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Edventur
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.slice(0, 3).map((link, index) => (
              <NavLink
                key={link.name}
                to={link.to}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-white hover:text-cyan-400 transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          {localStorage.getItem('token') ? (
            <div className='flex items-center space-x-4'>
              <NavLink
                to={navLinks[5].to}
                onClick={handleLogout}
                className='px-4 py-2 hidden md:block rounded-lg bg-cyan-500 text-black font-semibold shadow-[0_0_12px_#06b6d4] hover:bg-cyan-400 hover:shadow-[0_0_20px_#9333ea] transition-all duration-300'
              >
                {navLinks[5].name}
              </NavLink>

              <NavLink
              to='/profile'
              className='px-4 py-2 hidden md:block rounded-lg bg-cyan-500 text-black font-semibold shadow-[0_0_12px_#06b6d4] hover:bg-cyan-400 hover:shadow-[0_0_20px_#9333ea] transition-all duration-300'>
                Profile
              </NavLink>

              <NavLink
              to='/leaderboard'
              className='rounded-lg border-2 hidden md:block border-purple-200 bg-black text-purple-400 font-semibold hover:border-purple-400 p-2 duration-300'
                >
                  LeaderBoard
              </NavLink>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.slice(3, 5).map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <NavLink
                    to={link.to}
                    className={
                      link.name === 'Register'
                        ? 'px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold shadow-[0_0_12px_#06b6d4] hover:bg-cyan-400 hover:shadow-[0_0_20px_#9333ea] transition-all duration-300'
                        : 'px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300'
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          )}


          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gray-900 border border-cyan-400/40 text-white hover:border-cyan-400 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>


      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-cyan-400/30"
          >
            {localStorage.getItem('token') ? (
              <div className="px-4 py-6 space-y-4">
                {navLinks.slice(0, 2).map((link, index) => (
                  <NavLink
                    key={link.name}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white hover:text-cyan-400 transition-colors duration-300 py-2"
                  >
                    {link.name}
                  </NavLink>
                ))}
                {navLinks.slice(5, 6).map((link, index) => (
                  <NavLink
                    key={link.name}
                    to={link.to}
                    onClick={handleLogout}
                    className="block text-white hover:text-cyan-400 transition-colors duration-300 py-2"
                  >
                    {link.name}
                  </NavLink>
                ))}
                <NavLink
                    to='/profile'
                    className="block text-white hover:text-cyan-400 transition-colors duration-300 py-2"
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to='/leaderboard'
                    className="block text-white hover:text-cyan-400 transition-colors duration-300 py-2"
                  >
                    leaderboard
                  </NavLink>
              </div>
            ) : (
              <div className="px-4 py-6 space-y-4">
                {navLinks.slice(0,5).map((link, index) => (
                  <NavLink
                    key={link.name}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white hover:text-cyan-400 transition-colors duration-300 py-2"
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
