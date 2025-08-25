// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios';
// import Festcard from './Festcard';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

// function FestsAuthor() {
//     const {id}=useParams();
//     const [fest,setfests]=useState([]);
//     const navigate=useNavigate();
//     const fetchfests=async()=>{
//         await axios.get(`${apiUrl}/fest/author/${id}`,{withCredentials:true})
//         .then((res)=>{setfests(res.data.data);
//             console.log(fest);
//         })
//         .catch((error)=>console.log(error))
//     }
//     useEffect(()=>{
//         if(id)
//         {
//             fetchfests();
//         }
//     },[id])

//     const deleteFest=async(id)=>{
//       try{
//         await axios.delete(`${apiUrl}/fest/${id}/delete`,{withCredentials:true});
//          Swal.fire({
//                     title: "Deleted fest Succesfully!",
//                     timer: 1000,
//                     position: 'top',
//                     toast: true,
//                     showConfirmButton: false,
//                     timerProgressBar: true,
//                     icon: 'success',
                  
//                     showClass: {
//                       popup: 'swal2-noanimation'  // disables show animation
//                     },
                    
//                   });
//         fetchfests();

//       }
//       catch(error)
//       {
//         console.log(error);
//          Swal.fire({
//             title: "Error occured in deleting fest",
//             timer: 1000,
//             position: 'top',
//             toast: true,
//             showConfirmButton: false,
//             timerProgressBar: true,
//             icon: 'success',
          
//             showClass: {
//               popup: 'swal2-noanimation'  // disables show animation
//             },
            
//           });
//       }
//     }
//   return (
//     <div>{
//         fest.map((f1)=>(<div className='grid grid-cols-1 md:grid-cols-3 justify-center items-center m-3'>
//           <img src={f1.image} className='rounded-md w-1/2 ml-15 h-48'/>
//           <Festcard fest={f1}/>
//         <div className='flex flex-col items-center justify-center'>
//         <button className='bg-blue-500 rounded-md p-2 w-20 items-center m-3' onClick={()=>navigate(`/editfestpage/${f1._id}`)} >Edit</button>
//           <button className='bg-red-400 rounded-md p-2 w-20 items-center m-3' onClick={()=>deleteFest(f1._id)}>Delete</button>
//            <button className='bg-yellow-300 rounded-md p-2 w-auto items-center m-3' onClick={()=>navigate(`/registrations/${f1._id}`)}>Registrations</button>
//         </div>
//         </div>))
//     }
//     </div>
//   )
// }

// export default FestsAuthor


import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Festcard from './Festcard';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const apiUrl = import.meta.env.VITE_API_URL;
function FestsAuthor() {
    const {id}=useParams();
    const [fest,setfests]=useState([]);
    const navigate=useNavigate();
    const fetchfests=async()=>{
        await axios.get(`${apiUrl}/fest/author/${id}`,{withCredentials:true})
        .then((res)=>{setfests(res.data.data);
            console.log(fest);
        })
        .catch((error)=>console.log(error))
    }
    useEffect(()=>{
        if(id)
        {
            fetchfests();
        }
    },[id])

    const deleteFest=async(id)=>{
      try{
        await axios.delete(`${apiUrl}/fest/${id}/delete`,{withCredentials:true});
         Swal.fire({
                    title: "Deleted fest Succesfully!",
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
        fetchfests();

      }
      catch(error)
      {
        console.log(error);
         Swal.fire({
            title: "Error occured in deleting fest",
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
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">My Festivals</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Manage and organize your created festivals. Edit details, track registrations, and engage with your community.
          </p>
        </div>

        {/* Festivals Grid */}
        <div className="space-y-8">
          {fest.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">No Festivals Yet</h3>
                <p className="text-slate-600">Start creating amazing festivals to bring your community together!</p>
              </div>
            </div>
          ) : (
            fest.map((f1) => (
              <div key={f1._id} className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.01]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Festival Image */}
                  <div className="lg:col-span-4">
                    <div className="relative h-72 lg:h-full overflow-hidden">
                      <img 
                        src={f1.image} 
                        alt="Festival"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="px-4 py-2 bg-white/20 backdrop-blur-lg text-white font-semibold rounded-full border border-white/30">
                          Featured Event
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Festival Details */}
                  <div className="lg:col-span-5 p-8 flex flex-col justify-center">
                    <Festcard fest={f1}/>
                    
                    {/* Additional Info */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        📅 Event
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        🎯 Active
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        🌟 Premium
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="lg:col-span-3 bg-gradient-to-br from-slate-50 to-blue-50 p-8 flex flex-col justify-center space-y-4">
                    
                    {/* Edit Button */}
                    <button 
                      className="group relative w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:scale-105 active:scale-95"
                      onClick={() => navigate(`/editfestpage/${f1._id}`)}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        <span>Edit Festival</span>
                      </div>
                    </button>

                    {/* Delete Button */}
                    <button 
                      className="group relative w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:scale-105 active:scale-95"
                      onClick={() => deleteFest(f1._id)}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        <span>Delete</span>
                      </div>
                    </button>

                    {/* Registrations Button */}
                    <button 
                      className="group relative w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl hover:scale-105 active:scale-95"
                      onClick={() => navigate(`/registrations/${f1._id}`)}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                        </svg>
                        <span>View Registrations</span>
                      </div>
                    </button>

                    {/* Stats Section */}
                    <div className="mt-6 pt-6 border-t border-slate-200">
                     
                        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            50
                          </div>
                          <div className="text-xs text-slate-500 uppercase tracking-wide">
                            Registered
                          </div>
                        
                        
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default FestsAuthor