import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
        <div className='bg-gray-900'>
        <div className='text-white text-center'>
           <Link to={"https://gitasar.com"} className='underline'>© 2023 Gitasaar.com All rights reserved.</Link>
        </div>
        </div>
    </div>
  )
}

export default Footer