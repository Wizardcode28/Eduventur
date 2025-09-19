import React, { useState } from "react"
import { useForm } from "react-hook-form"
import ParticleBackground from "../components/ParticleBackground"
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useEffect } from "react"
import { useNavigate, NavLink } from 'react-router-dom'

export default function EdventurForm() {
  const [question, setQuestion] = useState('lesson');
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/user')
      .then((res) => {
        if (res.data.user.role != 'Teacher') {
          toast.error('You are unauthorized');
          navigate('/');
        }
      })
  }, [])

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data) => {
    axios.post('/api/questions', data)
      .then((res) => {
        if (res.data.message) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })

    reset();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-black p-8 flex items-center justify-center">

      <ParticleBackground />

      <div className="w-full max-w-2xl">

        <NavLink
          className='rounded-lg border-2 border-cyan-200 bg-black text-cyan-400 font-semibold hover:border-cyan-400 p-2 duration-300 absolute top-4 right-4'
          to='/'
        >
          Back to Home
        </NavLink>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 bg-clip-text text-transparent mb-2">
            Edventur
          </h1>
          <p className="text-gray-300 text-lg">Create Learning Questions</p>
        </div>

        {/* Form */}
        <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-sky-500/10 rounded-2xl"></div>

          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-6">
            {/* Question Text */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Question Text *</label>
              <input
                {...register("questionText", { required: true })}
                type="text"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 shadow-lg focus:shadow-pink-500/25"
                placeholder="Enter your question..."
              />
              {errors.questionText && <p className="text-pink-400 text-sm">{errors.questionText.message}</p>}
            </div>

            {/* Options */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Option-1</label>
              <input
                {...register("option1", { required: true })}
                type="text"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 shadow-lg focus:shadow-pink-500/25"
                placeholder="Enter 1st option"
              />
              {errors.option1 && <p className="text-pink-400 text-sm">{errors.option1.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Option-2</label>
              <input
                {...register("option2", { required: true })}
                type="text"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 shadow-lg focus:shadow-pink-500/25"
                placeholder="Enter 2nd option"
              />
              {errors.option2 && <p className="text-pink-400 text-sm">{errors.option2.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Option-3</label>
              <input
                {...register("option3", { required: true })}
                type="text"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 shadow-lg focus:shadow-pink-500/25"
                placeholder="Enter 3rd option"
              />
              {errors.option3 && <p className="text-pink-400 text-sm">{errors.option3.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Option-4</label>
              <input
                {...register("option4", { required: true })}
                type="text"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 shadow-lg focus:shadow-pink-500/25"
                placeholder="Enter 4th option"
              />
              {errors.option4 && <p className="text-pink-400 text-sm">{errors.option4.message}</p>}
            </div>

            {/* Correct Answer */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Correct Answer *</label>
              <input
                {...register("correctAnswer", { required: true })}
                type="text"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300 shadow-lg focus:shadow-sky-500/25"
                placeholder="Enter the correct answer..."
              />
              {errors.correctAnswer && <p className="text-pink-400 text-sm">{errors.correctAnswer.message}</p>}
            </div>

            {/* Subject */}

            <div className="space-y-2 flex">
              <div className="text-white">
                <label>For Game: </label>
                <input
                  {...register("type")}
                  type="radio"
                  onClick={() => {
                    setQuestion('game')
                  }}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 shadow-lg focus:shadow-pink-500/25"
                />
              </div>

              <div className="text-white">
                <label>For Lesson: </label>
                <input
                  {...register("type")}
                  type="radio"
                  onClick={() => {
                    setQuestion("lesson")
                  }}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 shadow-lg focus:shadow-pink-500/25"
                />
              </div>
            </div>

            {question === 'lesson'
              ?
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">Subject *</label>
                <input
                  {...register("subject")}
                  type="text"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 shadow-lg focus:shadow-pink-500/25"
                  placeholder="e.g. Maths Class 8"
                />
                {errors.subject && <p className="text-pink-400 text-sm">{errors.subject.message}</p>}
              </div>
              :
              <div>
              </div>}

            {/* Level */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Level</label>
              <input
                {...register("level", { required: true })}
                type="text"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 shadow-lg focus:shadow-pink-500/25"
                placeholder="Level of the question 1-5"
              />
              {errors.level && <p className="text-pink-400 text-sm">{errors.level.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 hover:from-pink-600 
              hover:via-purple-600 hover:to-sky-600 text-white font-bold rounded-lg transition-all duration-300 
              shadow-2xl hover:shadow-pink-500/50 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Question
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">Gamify learning with interactive questions</p>
        </div>
      </div>
    </motion.div>
  )
}
