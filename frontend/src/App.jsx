import { useState } from 'react'
import './App.css'
import HeroSection from './components/HeroSection'
import Register from './pages/Register'
import Login from './pages/Login'
import Games from './pages/Games'
import Lessons from './pages/Lessons'
import MathPage from './pages/MathsPage'
import SciencePage from './pages/SciencePage'
import EnglishPage from './pages/EnglishPage'
import Profile from './pages/Profile'
import CyberRacing from './pages/CyberRacing'
import TeacherDash from './pages/TeacherDash'
import Leaderboard from './pages/Leaderboard'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

function Home() {
  return (
   <div>
    <HeroSection/>
   </div>
  )
}

const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/signup',
    element:<Register/>
  },
   {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/games',
    element:<Games/>
  },
  {
    path:'/games/cyberracing',
    element:<CyberRacing/>
  },
  {
    path:'/lessons',
    element:<Lessons/>,
  },
  {
    path:'/lessons/math',
    element:<MathPage/>
  },
  {
    path:'/lessons/science',
    element:<SciencePage/>
  },
  {
    path:'/lessons/english',
    element:<EnglishPage/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/teacherdashboard',
    element:<TeacherDash/>
  },
  {
    path:'/leaderboard',
    element:<Leaderboard/>
  }
])

function App(){
return <div>
  <RouterProvider router={router}></RouterProvider>
  <Toaster/>
</div>
}

export default App
