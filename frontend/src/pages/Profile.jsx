import React, { useState, useEffect, use } from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from '../components/ParticleBackground';
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-hot-toast';


const Profile = () => {
  const [user, setUser] = useState({});

   useEffect(()=>{
    axios.post('/api/badges')
    .then((res)=>{
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  useEffect(() => {
    axios.get('/api/user')
    .then((res)=>{
      if(res.data.error){
        toast.error(res.data.error);
      }
      else if(res.data.user){
        setUser(res.data.user);
      }
    })
  }, [])



  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">

      <ParticleBackground />

      <NavLink
        className='rounded-lg border-2 border-cyan-200 bg-black text-cyan-400 font-semibold hover:border-cyan-400 p-2 duration-300 absolute top-4 right-4'
        to='/'
      >
        Back to Home
      </NavLink>

      <div className="w-full max-w-4xl bg-gray-900 rounded-2xl shadow-xl p-6 md:p-10 border border-cyan-500">

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src="/public/character1.jpg"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-[0_0_20px_#22d3ee]"
          />
          <div>
            <h1 className="text-3xl font-bold text-cyan-400 drop-shadow-lg">
              {user.name}
            </h1>
            <p className="text-gray-300 text-lg">{user.email}</p>
            <p className="text-gray-400 mt-2">Game Score:
              <span className="ml-2 text-white font-semibold">{user.gameScore}</span>
            </p>
            <p className="text-gray-400 mt-2">Learning Score:
              <span className="ml-2 text-white font-semibold">{user.learningScore}</span>
            </p>
            <p className="text-gray-400 mt-2">Standard:
              <span className="ml-2 text-white font-semibold">{user.standard}</span>
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Badges Section */}
        <div>
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">Badges</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {(user.badges || []).map((badge,index)=>(
              <div key={index}>
              <p className='text-white text-[0.6rem] sm:text-[0.8rem]'>{badge}</p>
              <img className='h-12 w-12 sm:h-20 sm:w-20 border-2' src={`/public/${badge}.jpg`} alt="badge" />
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
