import { useRef, useState } from "react";
import { Link, NavLink,useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import {toast} from 'react-hot-toast'
import axios from 'axios'

const Signup = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()

    const navigate=useNavigate();

    async function onSubmit(data) {
        if(data.password!=data.confirmpassword){
            return toast.error('Password does not match');
        }
    axios.post('/api/signup',data)
    .then((res)=>{
        toast.success('Succesfully signed up');
        navigate('/login')
    })
    .catch((err)=>{
        toast.error('Error')
    })

    reset();
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}>

            <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
                {/* Neon glowing gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-black to-purple-900 opacity-70 animate-pulse"></div>
                <NavLink
                    className='rounded-lg border-2 border-cyan-200 bg-black text-cyan-400 font-semibold hover:border-cyan-400 p-2 duration-300 absolute top-4 right-4'
                    to='/'
                >
                    Back to Home
                </NavLink>
                <div className="w-full max-w-md relative z-10 animate-fade-in">
                    <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-cyan-500/40 p-8">

                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-full border-2 border-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.7)]">
                                <span className="text-2xl font-bold text-cyan-400">E</span>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-cyan-400 text-center">Create Account</h1>
                        <p className="text-gray-400 text-center mb-8">Join Edventur today</p>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <input
                                    placeholder='Name'
                                    className={errors.name ? "border-red-500 border-4" : "w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"}
                                    {...register("name",
                                        {
                                            required: true,
                                        })} />
                            </div>

                            <div>
                                <input
                                    placeholder={`Email`}
                                    type="email"
                                    className={errors.email ? "border-red-500 border-4" : "w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"}
                                    {...register("email",
                                        {
                                            required: true,
                                        })} />
                            </div>
                            

                            <div>
                                <input
                                    placeholder='Password'
                                    className={errors.password ? "border-red-500 border-4" : "w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"}
                                    {...register("password",
                                        {
                                            required: true,
                                        })} />
                            </div>

                            <div>
                                <input
                                    placeholder='Confirm Password'
                                    className={errors.confirmpassword ? "border-red-500 border-4" : "w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"}
                                    {...register("confirmpassword",
                                        {
                                            required: true,
                                        })} />
                            </div>

                            <div>
                                <input
                                    placeholder='Class'
                                    className={errors.standard ? "border-red-500 border-4" : "w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"}
                                    {...register("standard",
                                        {
                                            required: true,
                                        })} />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold shadow-[0_0_15px_rgba(6,182,212,0.6)] hover:scale-105 transform transition-all duration-300"
                                type='submit'
                                disabled={isSubmitting}>
                                Signup
                            </motion.button>
                        </form>

                        {/* Signin link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-purple-400 hover:text-cyan-400 underline underline-offset-2 transition-colors duration-300"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Signup;
