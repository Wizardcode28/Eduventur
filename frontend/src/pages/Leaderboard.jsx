import {useState,useEffect} from 'react'
import ParticleBackground from '../components/ParticleBackground';
import {NavLink} from 'react-router-dom'
import axios from 'axios'


export default function LeaderBoard() {
    const [students,setStudents]=useState([]);
    
    useEffect(()=>{
        axios.get('/api/students')
        .then((res)=>{
            if(res.data.students){
                setStudents(res.data.students);
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
        <ParticleBackground/>
      <div className="max-w-7xl mx-auto">

            <NavLink
            className='rounded-lg border-2 border-cyan-200 bg-black text-cyan-400 font-semibold hover:border-cyan-400 p-2 duration-300 absolute top-4 right-4'
            to='/'
            >
                Back to Home
            </NavLink>

        {/* Glowing Leaderboard Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
            LEADERBOARD
          </h1>
          <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 rounded-full shadow-lg shadow-cyan-500/50"></div>
        </div>

        {/* Leaderboard Table Container */}
        <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gray-900/50 backdrop-blur-sm shadow-2xl shadow-cyan-500/20">
          {/* Neon border glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-purple-500/20 blur-sm"></div>

          <div className="relative overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-cyan-500/30 bg-gray-800/80">
                  <th className="px-4 py-6 text-left text-sm md:text-base font-semibold text-cyan-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-6 text-center text-sm md:text-base font-semibold text-pink-400 uppercase tracking-wider">
                    Game Score
                  </th>
                  <th className="px-4 py-6 text-center text-sm md:text-base font-semibold text-purple-400 uppercase tracking-wider">
                    Learning Score
                  </th>
                  <th className="px-4 py-6 text-center text-sm md:text-base font-semibold text-cyan-400 uppercase tracking-wider">
                    Total Badges
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={index}
                    className={`
                      border-b border-gray-700/50 transition-all duration-300 ease-in-out
                      hover:bg-gradient-to-r hover:from-cyan-900/20 hover:via-pink-900/20 hover:to-purple-900/20
                      hover:shadow-lg hover:shadow-cyan-500/10 hover:scale-[1.02] hover:border-cyan-500/50
                      ${index % 2 === 0 ? "bg-gray-800/30" : "bg-gray-900/30"}
                    `}
                  >

                    {/* Name Column */}
                    <td className="px-4 py-6">
                      <div className="font-medium text-sm md:text-base text-white">{student.name}</div>
                    </td>

                    {/* Game Score Column */}
                    <td className="px-4 py-6 text-center">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30">
                        <span className="text-sm md:text-base font-semibold text-pink-300">
                          {student.gameScore.toLocaleString()}
                        </span>
                      </div>
                    </td>

                    {/* Learning Score Column */}
                    <td className="px-4 py-6 text-center">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30">
                        <span className="text-sm md:text-base font-semibold text-purple-300">
                          {student.learningScore.toLocaleString()}
                        </span>
                      </div>
                    </td>

                    {/* Total Badges Column */}
                    <td className="px-4 py-6 text-center">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                        <span className="text-sm md:text-base font-semibold text-cyan-300">{student.badges.length}</span>
                        <div className="ml-2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full shadow-sm shadow-cyan-500/50"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
