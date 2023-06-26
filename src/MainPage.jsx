import React, { useState, useEffect } from 'react';
import {RiRefreshLine} from "react-icons/ri"
import {TbPlayerPlayFilled,TbPlayerPauseFilled} from "react-icons/tb"
import {BiDownArrowAlt,BiUpArrowAlt} from "react-icons/bi"


const Clock = () => {
  const [workTime, setWorkTime] = useState(1500); // 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(300); // 5 minutes in seconds
  const [sessionLength, setSessionLength] = useState(1500); // 5 minutes in seconds
  const [isBreak, setIsBreak] = useState(false);
  const [isPaused, setIsPaused] = useState(true);


  const handleIncreaseBreak =()=>{
    if(isPaused){
    setBreakTime(breakTime+60)
    }
  }
  const handleDecreaseBreak =()=>{
    if(isPaused){
    setBreakTime(breakTime-60)
    }
  }
  const handleIncreaseSession =()=>{
    if(isPaused){
    let workTimeUpdate = sessionLength + 60
    setSessionLength(workTimeUpdate)
    setWorkTime(workTimeUpdate)
    }
  }
  const handleDecreaseSession =()=>{
    if(isPaused){
      let workTimeUpdate = sessionLength - 60
      setSessionLength(workTimeUpdate)
      setWorkTime(workTimeUpdate)
    }
  }
  
  useEffect(() => {
    let timer;
    const currentTime = isBreak ? breakTime : workTime;

    if (currentTime > 0 && !isPaused) {
      timer = setInterval(() => {
        if (isBreak) {
          setBreakTime((prevTime) => prevTime - 1);
        } else {
          setWorkTime((prevTime) => prevTime - 1);
        }
      }, 1000);
    } else if (currentTime === 0) {
      setIsBreak((prevIsBreak) => !prevIsBreak);
      if (isBreak) {
        setBreakTime(300); // Reset break time to 5 minutes
      } else {
        setWorkTime(1500); // Reset work time to 25 minutes
      }
    }

    return () => clearInterval(timer);
  }, [workTime, breakTime, isBreak, isPaused]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePauseResume = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  const handleRestart = () => {
    setWorkTime(1500);
    setBreakTime(300);
    setIsBreak(false);
    setIsPaused(true);
    setSessionLength(1500)
  };

  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'10px'}} >
      <div style={{fontSize: '50px',marginBottom: '20px'}}>25 + 5 Clock</div>
      <div style={{display:'flex',gap:'40px'}}>
        <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
        <label>Break Length</label>
      <div className="break-length">
        <BiDownArrowAlt onClick={handleDecreaseBreak}/>
        {breakTime/60}
        <BiUpArrowAlt onClick={handleIncreaseBreak}/>
      </div>
      </div>
      <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
        <label>Session Length</label>
      <div className="break-length">
        <BiDownArrowAlt onClick={handleDecreaseSession}/>
        {sessionLength/60}
        <BiUpArrowAlt onClick={handleIncreaseSession}/>
      </div>
      </div>
      </div>
    <div className="workWrapper">
      <h1 className="title">{isBreak ? 'Break' : 'Session'}</h1>
      <div className="timer" style={{fontFamily: 'digital',fontSize: '80px'}}>{formatTime(isBreak ? breakTime : workTime)}</div>
    </div>
      <div className="button-group">
        <button className="pause-button" onClick={handlePauseResume}>
          {isPaused ? <TbPlayerPlayFilled style={{fontSize:'36px',color:'white'}}/> : <TbPlayerPauseFilled style={{fontSize:'34px',color:'white'}}/>}
        </button>
        <button className="restart-button" onClick={handleRestart}>
          <RiRefreshLine style={{fontSize:'2em',fontWeight:'bolder',color:'white'}}/>
        </button>
      </div>
    </div>
  );
};

export default Clock;
