import { useState } from "react";
import { Link, NavLink ,useNavigate} from "react-router-dom";
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from "react-hot-toast";

const Signin = () => {

    const navigate=useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors }
    } = useForm()

    function onSubmit(data) {
        axios.post('/api/signin',data)
        .then((res)=>{
            if(res.data.message){
                toast.success(res.data.message);
                localStorage.setItem('token',JSON.stringify(res.data.token));
                navigate('/')
            }
            else if(res.data.error){
                toast.error(res.data.error)
            }
        })
        .catch((e)=>{
            toast.error(e);
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
                {/* Neon floating background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-cyan-900 opacity-70 animate-pulse"></div>

                <NavLink
                    className='rounded-lg border-2 border-cyan-200 bg-black text-cyan-400 font-semibold hover:border-cyan-400 p-2 duration-300 absolute top-4 right-4'
                    to='/'
                >
                    Back to Home
                </NavLink>
                <div className="w-full max-w-md relative z-10 animate-fade-in">


                    <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-500/40 p-8">


                        {/* Logo / Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-full border-2 border-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.7)]">
                                <span className="text-2xl font-bold text-purple-400">E</span>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-purple-400 text-center">Welcome Back</h1>
                        <p className="text-gray-400 text-center mb-8">Sign in to your account</p>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <input
                                    placeholder='Email'
                                    className={errors.email ? "border-red-500 border-4" : "w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-500 outline-none transition-all"}
                                    {...register("email",
                                        {
                                            required: true,
                                        })} />
                            </div>

                            <div>
                                <input
                                    placeholder='Password'
                                    className={errors.password ? "border-red-500 border-4" : "w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-500 outline-none transition-all"}
                                    {...register("password",
                                        {
                                            required: true,
                                        })} />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-[0_0_15px_rgba(168,85,247,0.6)] hover:scale-105 transform transition-all duration-300"
                                type='submit'
                                disabled={isSubmitting}>
                                Sign in
                            </motion.button>
                        </form>

                        {/* Signup link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-400">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-cyan-400 hover:text-purple-400 underline underline-offset-2 transition-colors duration-300"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Signin;
