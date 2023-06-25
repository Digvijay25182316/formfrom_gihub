import React, { useContext, useState } from "react";
import {BsToggleOff, BsToggleOn} from 'react-icons/bs'
import {DataContext} from "../context/DataContext"

function Controller() {
  const [isopen , setIsOpen]=useState(false)

  const [blanks , setBlanks]=useState(false)
  const [volume, setVolume] = useState(0.5);
  const {data ,power,updateOpenOne,blank,updateOpenTwo}=useContext(DataContext)

  const setDeviceVolume = (newVolume) => {
    if ('mediaDevices' in navigator && 'getSinkId' in HTMLMediaElement.prototype) {
      navigator.mediaDevices
        .getAudioOutputs()
        .then((outputs) => {
          outputs.forEach((output) => {
            output.volume = newVolume / 100;
          });
        })
        .catch((error) => {
          console.error('Failed to set device volume:', error);
        });
    } else {
      console.warn('Device volume control is not supported.');
    }
  };

  const toggleOnclick =()=>{
    setIsOpen(!isopen)
    updateOpenOne(!power)
  }
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    setDeviceVolume(event.target.value)
  };

  const toggleOnclickBlank =()=>{
    setBlanks(!blanks)
    updateOpenTwo(!blank)
  }
  return (
    <div
    className="volume-slider"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin:'20px'
      }}
    >
      <div style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
        <label style={{fontSize:'20px',fontWeight:'bold'}}>power</label>
        {power?<BsToggleOn style={{fontSize:'40px', color:'blue',cursor:'pointer'}} onClick={toggleOnclick}/>:<BsToggleOff style={{fontSize:'40px',color:'blue',cursor:'pointer'}} onClick={toggleOnclick}/>}
      </div>
      <div style={{background:'#979797',padding:'15px',marginTop:'20px',fontSize:'20px',width: '150px',textAlign: 'center',fontWeight: '800'}}>{data}</div>
      <div className="volume-controller" style={{ position: "relative",padding:'20px',color:'blue' }}>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        style={{ width:'200px',cursor:'pointer'}}
        disabled={!power}
      />
      </div>
      <div style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
        <label style={{fontSize:'20px',fontWeight:'bold'}}>Blank</label>
        {blanks?<BsToggleOn style={{fontSize:'40px', color:'blue',cursor:'pointer'}} onClick={toggleOnclickBlank}/>:<BsToggleOff style={{fontSize:'40px',color:'blue',cursor:'pointer'}} onClick={toggleOnclickBlank}/>}
      </div>
    </div>
  );
}

export default Controller;
