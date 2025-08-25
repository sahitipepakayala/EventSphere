// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import {useNavigate,  useParams } from 'react-router-dom'
// import {useSelector} from 'react-redux'
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

// function SingleWebinar() {
//     const {id}=useParams();
    
//     const navigate=useNavigate();
//     const [event,setEvent]=useState([]);
//    const user=useSelector((state)=>state.user);
//     const fetchEvent=async()=>{
//         try{

//             const res=await axios.get(`${apiUrl}/webinar/${id}`,{withCredentials:true});
          
//             setEvent(res.data);
          
//         }
//         catch(error)
//         {
//             console.log(error)
//         }
//     }
//     useEffect(()=>{
//         fetchEvent();

//     },[id]);

//     const handleDelete=async(eventId)=>{
//         try{
//            await axios.delete(`${apiUrl}/webinar/${eventId}/delete`,{withCredentials:true});
//            navigate("/webinar");
//              Swal.fire({
//               title:"Deleted Succesfully",
//               timer: 1000,
//               position: 'top',
//               toast: true,
//               showConfirmButton: false,
//               timerProgressBar: true,
//               icon: 'success',
            
//               showClass: {
//                 popup: 'swal2-noanimation'  // disables show animation
//               },
              
//             });

//         }
//         catch(error)
//         {
//             Swal.fire({
//               title:"Error in deletion",
//               timer: 1000,
//               position: 'top',
//               toast: true,
//               showConfirmButton: false,
//               timerProgressBar: true,
             
            
//               showClass: {
//                 popup: 'swal2-noanimation'  // disables show animation
//               },
              
//             });
//           console.log(error);
//         }
//     }

//     const handleRegister=async()=>{
//         try{
//             if(!user){
//                 navigate("/login");
//                  Swal.fire({
//               title:"Please Login",
//               timer: 1000,
//               position: 'top',
//               toast: true,
//               showConfirmButton: false,
//               timerProgressBar: true,
//               icon: 'success',
            
//               showClass: {
//                 popup: 'swal2-noanimation'  // disables show animation
//               },
              
//             });
//               return;}
//             const res=await axios.post(`${apiUrl}/webinar/register/${id}`,{},{withCredentials:true});
//             console.log(res.data)
//             Swal.fire({
//               title:res.data,
//               timer: 1000,
//               position: 'top-end',
//               toast: true,
//               showConfirmButton: false,
//               timerProgressBar: true,
//               icon: 'success',
            
//               showClass: {
//                 popup: 'swal2-noanimation'  // disables show animation
//               },
              
//             });
//           navigate("/webinar")

            
//         }
//         catch(error)
//         {
//             console.log(error)
//         }
//     }
//     if (!event || !event.name) {
//   return <div className="text-center mt-10 text-xl">Loading event...</div>;
// }


//   return (
//     <div className='flex flex-col items-center text-center bg-[#caf0f6]'>
//    <div className="flex flex-col items-center text-center mt-7 w-[500px]">
//   <h1 className="text-4xl font-bold mb-2 text-blue-800">{event.name.toUpperCase()}</h1>
//     <img src={event.image} className='rounded-md my-3' height="320" width="300"/>
//   <p className="text-lg text-gray-700 mb-1">🏫 <b>College: </b>{event.college}</p>
//             <p className="text-lg text-gray-700 mb-1">📍<b> Location:</b> {event.location}</p>
           
            
//             <p className="text-lg text-gray-700 mb-1">📅<b> Date: </b>{new Date(event.date).toLocaleDateString()}</p>
//              <p className="text-lg text-gray-700 mb-1">💰<b> Registration fee: </b>₹{event.registrationFee || 200}</p>
//             <p className="text-lg text-gray-700 mt-4"><b>Description:</b>
//             {event.description}</p>
//             { (user && user.admin &&  user._id.toString()==event.webAdmin.toString())? <div className='flex flex-row '> <button className='p-3 rounded-md bg-blue-700 shadow shadow-gray-900 m-4 text-white font-bold text-xl px-4' onClick={()=>navigate(`/editWebinar/${event._id}`)} >Edit</button> <button className='p-3 rounded-md bg-blue-700 shadow shadow-gray-900 m-4 text-white font-bold text-xl' onClick={()=>navigate(`/WebinaRegistrations/${event._id}`)} >Registrations</button>
//             <button className='p-3 rounded-md bg-red-700 shadow shadow-gray-900 m-4 text-white font-bold text-xl' onClick={()=>handleDelete(event._id)} >Delete</button></div>
//              :
//             <button className='p-3 rounded-md bg-blue-700 shadow shadow-gray-900 m-4 text-white font-bold text-xl' onClick={handleRegister} >Register</button>
//               }  </div>
//             </div>
//   )
// }

// export default SingleWebinar




import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate,  useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const apiUrl = import.meta.env.VITE_API_URL;
function SingleWebinar() {
    const {id}=useParams();
    
    const navigate=useNavigate();
    const [event,setEvent]=useState([]);
   const user=useSelector((state)=>state.user);
    const fetchEvent=async()=>{
        try{

            const res=await axios.get(`${apiUrl}/webinar/${id}`,{withCredentials:true});
          
            setEvent(res.data);
          
        }
        catch(error)
        {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchEvent();

    },[id]);

    const handleDelete=async(eventId)=>{
        try{
           await axios.delete(`${apiUrl}/webinar/${eventId}/delete`,{withCredentials:true});
           navigate("/webinar");
             Swal.fire({
              title:"Deleted Succesfully",
              timer: 1000,
              position: 'top',
              toast: true,
              showConfirmButton: false,
              timerProgressBar: true,
              icon: 'success',
            
              showClass: {
                popup: 'swal2-noanimation'  // disables show animation
              },
              
            });

        }
        catch(error)
        {
            Swal.fire({
              title:"Error in deletion",
              timer: 1000,
              position: 'top',
              toast: true,
              showConfirmButton: false,
              timerProgressBar: true,
             
            
              showClass: {
                popup: 'swal2-noanimation'  // disables show animation
              },
              
            });
          console.log(error);
        }
    }

    const handleRegister=async()=>{
        try{
            if(!user){
                navigate("/login");
                 Swal.fire({
              title:"Please Login",
              timer: 1000,
              position: 'top',
              toast: true,
              showConfirmButton: false,
              timerProgressBar: true,
              icon: 'success',
            
              showClass: {
                popup: 'swal2-noanimation'  // disables show animation
              },
              
            });
              return;}
            const res=await axios.post(`${apiUrl}/webinar/register/${id}`,{},{withCredentials:true});
            console.log(res.data.message)
            Swal.fire({
              title:res.data.message,
              timer: 1000,
              position: 'top-end',
              toast: true,
              showConfirmButton: false,
              timerProgressBar: true,
              icon: 'success',
            
              showClass: {
                popup: 'swal2-noanimation'  // disables show animation
              },
              
            });
          navigate("/webinar")

            
        }
        catch(error)
        {
            console.log(error)
        }
    }
    if (!event || !event.name) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-xl text-gray-600">Loading event details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative container mx-auto px-6 py-16">
                    <div className="text-center text-white">
                        <div className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                            </svg>
                            WEBINAR EVENT
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            {event.name.toUpperCase()}
                        </h1>
                        <p className="text-xl opacity-90 max-w-3xl mx-auto">
                            Join us for an engaging and informative webinar experience
                        </p>
                    </div>
                </div>
                {/* Decorative wave */}
               
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Image and Quick Info */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                {/* Event Image */}
                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
                                    <img 
                                        src={event.image} 
                                        alt={event.name}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            
                                            <span className="text-2xl font-bold text-gray-700">
                                                ₹{event.registrationFee || 200}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-white rounded-2xl shadow-xl p-6">
                                    {(user && user.admin && user._id.toString() === event.webAdmin.toString()) ? (
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Actions</h3>
                                            <button 
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                                                onClick={() => navigate(`/editWebinar/${event._id}`)}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit Event
                                            </button>
                                            <button 
                                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                                                onClick={() => navigate(`/WebinaRegistrations/${event._id}`)}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                View Registrations
                                            </button>
                                            <button 
                                                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                                                onClick={() => handleDelete(event._id)}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete Event
                                            </button>
                                        </div>
                                    ) : (
                                        <button 
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-lg"
                                            onClick={handleRegister}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Register Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Event Details */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Details</h2>
                                
                                {/* Event Info Grid */}
                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-blue-100 rounded-lg p-3">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Institution</h3>
                                            <p className="text-gray-600">{event.college.toUpperCase()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="bg-green-100 rounded-lg p-3">
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Location</h3>
                                            <p className="text-gray-600">{event.location.toUpperCase()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="bg-purple-100 rounded-lg p-3">
                                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Date & Time</h3>
                                            <p className="text-gray-600">{new Date(event.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="bg-yellow-100 rounded-lg p-3">
                                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Registration Fee</h3>
                                            <p className="text-gray-600">₹{event.registrationFee || 200}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="border-t pt-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">About This Webinar</h3>
                                    <div className="prose prose-gray max-w-none">
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {event.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleWebinar