import React, { useState } from 'react'
import { FaExpandArrowsAlt } from 'react-icons/fa'
import { BsArrowsAngleExpand } from 'react-icons/bs'
import { useContext } from 'react'
import { DataContext } from './context/DataContext'


function Aprompt() {
const {data , isOpenOne,updateOpenTwo,isOpenTwo,updateData} = useContext(DataContext)

  const [isExpanded,setIsexpanded] = useState(false)

    const onChangeHandler =(e)=>{
      updateData(e.target.value)
    }

    const OnclickOpenHandler = ()=>{
      setIsexpanded(!isExpanded)
      updateOpenTwo(!isOpenTwo)
    }
  
    const OnclickCloseHandler=()=>{
      setIsexpanded(!isExpanded)
      updateOpenTwo(!isOpenTwo)
    }

    if(isOpenOne){
  return (
    <div className='Editor Areas' style={{marginTop:'20px'}}>
        <div className='Header_Area'>
        <div className='Header_children'>
        <img src="https://design-style-guide.freecodecamp.org/downloads/fcc_secondary_small.png" alt="" />
        <p  style={{ paddingLeft:'10px'}}>Editor</p>
        </div>
        {isExpanded?<BsArrowsAngleExpand style={{cursor:'pointer'}} onClick={OnclickCloseHandler}/>:<FaExpandArrowsAlt onClick={OnclickOpenHandler} style={{cursor:'pointer'}}/>}
        </div>
        <textarea value={data} onChange={onChangeHandler} style={{position:'sticky',resize:'vertical',height:isExpanded?'100vh':'180px',outline:'none',padding:'5px' , boxShadow: '#246565 1px -2px 15px'}} className='textarea'>{data}</textarea>
    </div>
  )
    }
}

export default Aprompt