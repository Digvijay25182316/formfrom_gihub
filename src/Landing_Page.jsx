import React from 'react'
import "./Landing.css"
import image5 from "./assets/IskonLogo.jpeg"
import image6 from "./assets/Shril Prabhupad.jpeg"
import { Link } from 'react-router-dom'
import {RxArrowRight} from "react-icons/rx"

function Landingpage() {
  return (
    //  
    <div style={{backgroundImage:`url(${"https://e0.pxfuel.com/wallpapers/635/187/desktop-wallpaper-krishna-bhagavad-gita.jpg"})`}} className='bg-no-repeat md:bg-cover min-h-screen bg-opacity-75 md:bg-inherit bg-cover' >
      <div className='bg-black bg-opacity-50 rounded-b-xl min-h-screen py-10'>
    <div className='container flex flex-col items-center gap-10'>
        <div className='flex items-center text-gray-100 md:gap-5 gap-2'>
         <img src={image5} alt='logo' className='md:h-12 h-8 rounded-full'/> 
         <div style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
        <p style={{fontSize:"2.5vw"}} className='w-max'>INTERNATIONAL SOCIETY FOR KRISHNA CONCIOUSNESS</p>
        <b className='boldHeader'>Founder Acharya : His Divine Grace A.C. Bhaktivedanta Swami Shrila Prabhupada</b>
        </div>
         <img src={image6} alt='Shril prabhupad' className='md:h-14 md:w-14 h-8 w-8 rounded-full'/> 
        </div>
      
        <div className='w-[90vw] text-center text-[8vw] text-gray-200' ><b>Register for Gita Saar</b></div>
        
    <Link to={"/form"}><button className='px-4 py-2 bg-black bg-opacity-80 rounded-lg text-lg font-semibold text-white flex gap-3 items-center my-40 md:my-0'>Register<RxArrowRight className='text-white'/></button></Link>
    </div>
    </div>
    </div>
  )
}

export default Landingpage