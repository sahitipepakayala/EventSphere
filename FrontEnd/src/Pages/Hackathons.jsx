import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import Webinarcard from './Webinarcard';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
function Hackathons() {
    const user=useSelector((store)=>store.user);
    const [webinar,setWebinar]=useState([]);
    const navigate=useNavigate();
    const fetchweb=async()=>{
        try{
           const res=await axios.get(`${apiUrl}/webinar/all`,{withCredentials:true});
            console.log( res.data.data);
            setWebinar(res.data.data)

        }
        catch(error)
        {
            console.log(error);
        }
    }
    useEffect(()=>{
            fetchweb();
    },[])
  return (
    <div className='m-5'>
        <div className='flex flex-row justify-around'>
        <h1 className='text-blue-600 font-bold text-3xl'>Webinars</h1>{user &&
            user.admin &&
        <button className='bg-blue-500 shadow-2 shadow-gray-600 rounded-md p-2 text-white font-medium' onClick={()=>navigate("/newWebinar")}>New Webinar</button>}
        </div>
        <div className=' mb-10 m-5 border-2 border-blue-100 shadow-2xlounded-2xl  px-5 py-10 '>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {webinar.map((fest) => (
    <Webinarcard key={fest._id } fest={fest} />
  ))}
</div>
</div>
    </div>
  )
}

export default Hackathons