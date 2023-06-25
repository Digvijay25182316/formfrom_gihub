import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../context/DataContext'

function Button({name,title,audioPath}) {
  const soundPath = new Audio(audioPath)
  const {updateData, power}=useContext(DataContext)
  const onclickHandler =()=>{
    updateData(title)
    soundPath.play()
  }
  return (
    <button onClick={onclickHandler} className='key' style={{display: 'flex',alignItems: 'center',justifyContent: 'center',borderRadius: '4px',boxShadow: 'black 3px 3px 5px', fontWeight:'bolder',border:'none'}} disabled={!power}>{name}</button>
  )
}

export default Button