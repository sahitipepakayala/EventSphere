import React from 'react'
import {Link} from "react-router-dom"

function Festcard({fest}) {
  return (
    <div className=' flex flex-col items-center p-5 border-2 border-blue-200 shadow rounded-2xl bg-white'>
        <h1 className='text-xl font-bold'>{fest.name.toUpperCase()}</h1>
        <h1 className='text-lg text-gray-500'>{fest.college.toUpperCase()}</h1>
         <h1 className='text-lg text-gray-500'>{fest.location.toUpperCase()}</h1>
        <h1 className='text-lg text-gray-500'>{new Date(fest.date).toLocaleDateString()}</h1>
        <Link to={`/singleFest/${fest._id}`}className='text-md font-bold text-blue-700 border-2 border-blue-600 p-1 rounded-lg mt-3'>More Details</Link>
    </div>
  )
}

export default Festcard