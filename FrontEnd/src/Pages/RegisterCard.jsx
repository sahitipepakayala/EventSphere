// import React from 'react'
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
// import axios from 'axios';

// function RegisterCard({event,onUnregister}) {

//     const handleUnregister=async(eventId)=>{
//         try{
//            const res= await axios.delete(`${apiUrl}/register/unregister/${eventId}`,{withCredentials:true})
//             Swal.fire({
//               title: res.data,
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
//               if (onUnregister) onUnregister(eventId);

//         }
//         catch(error)
//         {
//             console.log(error);
//         }
//     }
//   return (
//     <div className='flex flex-row justify-center items-center'>

//     <div className='flex flex-col justify-center items-center'>
//         <h1 className='text-2xl text-purple-800 font-bold my-3'>{event.name.toUpperCase()}</h1>
//         <h1><b>College :</b>{event.college}</h1>
//         <h1><b>Location:</b>{event.location}</h1>
//         <h1><b>Category:</b>{event.category}</h1>
//         <h1><b>Description:</b>{event.description}</h1>
//         <h1><b>Date:</b>{event.date.slice(0,10)}</h1>
//         <button className='bg-blue-500 border-2 border-blue-600 text-lg font-medium text-white p-1 rounded-md my-2' onClick={()=>handleUnregister(event._id)}>Unregister</button>

//     </div>
//     </div>
//   )
// }

// export default RegisterCard



import React from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
function RegisterCard({event, onUnregister}) {
    const handleUnregister = async(eventId) => {
        try{
           const res = await axios.delete(`${apiUrl}/register/unregister/${eventId}`, {withCredentials: true})
            Swal.fire({
              title: res.data,
              timer: 1000,
              position: 'top-end',
              toast: true,
              showConfirmButton: false,
              timerProgressBar: true,
              icon: 'success',
              showClass: {
                popup: 'swal2-noanimation'
              },
            });
            if (onUnregister) onUnregister(eventId);
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 text-white">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
                        <div className="flex items-center text-blue-100">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="text-sm font-medium">{event.college}</span>
                        </div>
                    </div>
                    <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold uppercase tracking-wide">{event.category}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Event Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Date</div>
                            <div className="font-semibold">{event.date.slice(0,10)}</div>
                        </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Location</div>
                            <div className="font-semibold">{event.location}</div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                        {event.description}
                    </p>
                </div>

                {/* Action Button */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center text-green-600 text-sm font-medium">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Registered
                    </div>
                    
                    <button 
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200 flex items-center gap-2 text-sm" 
                        onClick={() => handleUnregister(event._id)}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Unregister
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterCard