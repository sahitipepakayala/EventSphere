import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Eventcard from './Eventcard';
const apiUrl = import.meta.env.VITE_API_URL;

function Category() {
    const {category}=useParams();
    const [events1,setEvents]=useState([]);
    const fetchEvents=async()=>{
        try{
            const res=await axios.get(`${apiUrl}/event/category/${category}`,{withCredentials:true});
         setEvents(res.data.data)
            console.log(res.data.data)

        }
        catch(error)
        {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchEvents();
    },[])
  return (
    <div>
      
        {(events1 && events1.length > 0) ? (
  <div className="p-6">
      <h1 className='text-3xl font-bold mb-4'>{category.toUpperCase()}</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 gap-4">
      {events1.map(event => (
        <Eventcard key={event._id} event={event} />
      ))}
    </div>
  </div>
): <div className="p-6 flex flex-col justify-center items-center">
      <h1 className='text-3xl font-bold mb-4'>{category.toUpperCase()}</h1>
      <img src="https://t2.ftcdn.net/jpg/00/61/84/13/500_F_61841309_enMWIWPterOkQsHE4BdIqGk7a3D07pbc.jpg"/>
      <h1>No events in this category</h1>
      </div>}

    </div>
  )
}

export default Category