import React from 'react'
import "./Landing.css"
import image1 from "./assets/image1.jpeg"
import image2 from "./assets/image2.jpeg"
import image3 from "./assets/image3.jpeg"
import image4 from "./assets/image4.jpeg"
import image5 from "./assets/IskonLogo.jpeg"
import image6 from "./assets/Shril Prabhupad.jpeg"

function Landingpage() {
  return (
    <div className='container'>
        <div style={{display:"flex",gap:"5px",alignItems:"center"}}>
         <img src={image5} alt='logo' style={{height:"40px",borderRadius:"20px"}}/> 
         <div style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
        <p style={{fontSize:"2.5vw"}}>INTERNATIONAL SOCIETY FOR KRISHNA CONCIOUSNESS</p>
        <b className='boldHeader'>Founder Acharya : His Divine Grace A.C. Bhaktivedanta Swami Shrila Prabhupada</b>
        </div>
         <img src={image6} alt='Shril prabhupad' style={{height:"50px",borderRadius:"34px"}}/> 
        </div>

        <div style={{width:"90vw",textAlign:"center", fontSize:"8vw" ,marginTop:"10vh"}} ><b>Register for Gita Saar</b><b> Picnic to</b><b> ISKCON RAJGAD</b></div>
        <button style={{textDecorationLine: "underline",fontWeight: "400",fontStyle: "normal",pointerEvents: "all",backgroundColor:"yellow",border:"none",fontSize:"20px",padding:"10px 20px",borderRadius:"20px",marginTop:"50px"}}><a href='/form' className="registerLink">Click Here to Register Now</a></button>

        <div style={{display:"flex",flexDirection:"column",alignItems:"center" ,gap:"20px"}}>
            <h1 className='photosprevious' style={{fontSize:"23px",marginTop:"30px"}}>Photos from previous trip</h1>
        <div style={{display: "flex",flexDirection:"column",gap:"40px"}}>
            <div style={{display:"flex",width:"90vw",gap:"10px"}} className='imageContainer'>
            <img src={image1} style={{height:"200px",width:"100%",objectFit:"contain"}} alt='image1'/>
            <img src={image2} style={{height:"200px",width:"100%",objectFit:"contain"}} alt='image2'/>
        </div>
            <div className='imageContainer2' style={{display:"flex"}}>
            <img src={image3} style={{height:"500px",width:"100%" , objectFit:"contain"}} alt='image3'/>
            <img src={image4} style={{height:"500px",width:"100%" , objectFit:"contain"}} alt='image3'/>
            </div>
        </div>
        </div>
        <div style={{marginTop:"50px ",display:"flex",flexDirection:"column",alignItems:"center"}} className='timing'>
          <b>16 July 2023 (Sunday)</b>
          <b>Timing 6 AM to 5 PM</b>
        </div>
        <div style={{alignItems:"left",padding:"50px"}}>
          <p style={{textAlign:"center",fontSize:"34px",margin:"40px"}}>Schedule</p>
      <p className='Schedule'>6:00 AM - Arrange at Katraj Bus Stop</p>
      <p className='Schedule'>6:10 AM to 8 AM - Travel Time to ISCKON Rajgad</p>
      <p className='Schedule'>8 AM - Darshan of Deities</p>
      <p className='Schedule'>8:30 AM - Breakfast Prasadam</p>
      <p className='Schedule'>9:00 AM to 11:00 AM - Session #1</p>
      <p className='Schedule'>11:00 to 12:00 PM - Activity Time</p>
      <p className='Schedule'>12:00 PM - Lunch Prasadam</p>
      <p className='Schedule'>12:30 PM to 2 PM - Session #2</p>
      <p className='Schedule'>2 PM to 5:00 PM - Activity Time</p>
      <p className='Schedule'>5:00 PM - Leave Back for Katraj</p>
        </div>
        <div style={{alignItems:"left",margin:"23px"}}>
          <p style={{textAlign:"center",fontSize:"34px",marginBottom:"50px"}}>Thigs to carry</p>
      <p className='Schedule'>Please Carry Extra Cloths,</p>
      <p className='Schedule'>Towel & Umbrella or Raincoat</p>
      <p className='Schedule'>.Carry your Water Bottle for a Trip</p>
      <p className='Schedule'>Bring your Sweater or Shawl</p>
      <p className='Schedule'>Dry snacks for travel,prasadam is arrangement</p>
      <p className='Schedule'>Please Carry your Personal Medications (if any).</p>
        </div>
    </div>
  )
}

export default Landingpage