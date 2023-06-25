import React from 'react'
import Keypad from './components/Keypad'
import Controller from './components/Controller'
import FCCLOGO from "./assets/fcclogo.png";

function MainPage() {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <div className='logo'>
        <p style={{marginRight:'5px'}}>FCC</p>
        <img src={FCCLOGO} alt="" style={{height:'20px',width:'fit-content'}}/>
      </div>
    <div className='mainContainer'>
      
        <div><Keypad/></div>
        <div><Controller/></div>
    </div>
    </div>
  )
}

export default MainPage