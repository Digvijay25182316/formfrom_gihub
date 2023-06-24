import React, { useContext, useState } from 'react'
import { FaExpandArrowsAlt } from 'react-icons/fa'
import { BsArrowsAngleExpand } from 'react-icons/bs'
import { DataContext } from './context/DataContext'
import { marked } from 'marked'

function Anotherprompt() {
  const {data , isOpenOne,updateOpenOne,isOpenTwo} = useContext(DataContext)
  const [isExpanded,setIsexpanded] = useState(false)

  const OnclickOpenHandler = ()=>{
    setIsexpanded(!isExpanded)
    updateOpenOne(!isOpenOne)
  }

  const OnclickCloseHandler=()=>{
    setIsexpanded(!isExpanded)
    updateOpenOne(!isOpenOne)
  }

  const getMarkdownPreview = () => {
    return { __html: marked(data) };
  };

  if(isOpenTwo){
  return (
    <div className='TextArea Areas'>
      <div className='Header_Area' style={{position:'sticky',boxShadow:'1px 1px 13px 2px #3a5f5f'}}>
        <div className='Header_children'>
        <img src="https://design-style-guide.freecodecamp.org/downloads/fcc_secondary_small.png" alt="" />
        <p  style={{ paddingLeft:'10px'}}>Previewer</p>
        </div>
        {isExpanded?<BsArrowsAngleExpand style={{cursor:'pointer'}} onClick={OnclickCloseHandler}/>:<FaExpandArrowsAlt onClick={OnclickOpenHandler} style={{cursor:'pointer'}}/>}
        </div>
        <div className='textarea textarea1' style={{padding:'20px',borderRadius:'0 0 5px 5px',minHeight:'120px' ,overflowWrap: 'break-word'}} dangerouslySetInnerHTML={getMarkdownPreview()}></div>
    </div>
    )
  }
}

export default Anotherprompt