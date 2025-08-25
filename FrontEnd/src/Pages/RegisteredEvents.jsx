// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import RegisterCard from './RegisterCard';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
// import Webinarcard from './Webinarcard';

// function RegisteredEvents() {
//   const [events, setEvents] = useState([]);
//   const user=useSelector((store)=>store.user);
//   const navigate=useNavigate();
//    const [webinaRegistrations,setWebinaRegistrations]=useState([]);
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const res = await axios.get("${apiUrl}/webinar/myRegistrations", {
//         withCredentials: true
//       });
    
//       console.log(res.data.data);
//       setWebinaRegistrations(res.data.data);
//     } catch (error) {
//       console.error("Error fetching registrations:", error);
//     }
//   };

//   fetchData();
// }, []);


//   const fetchEvents = async () => {
//     try {
//       if(!user){
//          Swal.fire({
//   title: "Please Login",
//   timer: 1000,
//   position: 'top',
//   toast: true,
//   showConfirmButton: false,
//   timerProgressBar: true,
 

//   showClass: {
//     popup: 'swal2-noanimation'  // disables show animation
//   },
  
// });


//         navigate("/login");
//       }
//       const res = await axios.get(`${apiUrl}/register/registeredEvents`, {
//         withCredentials: true
//       });
//       setEvents(res.data.data);
//       console.log(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const handleUnregister = (eventId) => {
//     try{
//     setEvents((prev) => prev.filter((event) => event._id !== eventId));
//      Swal.fire({
//   title: "Unregistered succesfully",
//   timer: 1000,
//   position: 'top',
//   toast: true,
//   showConfirmButton: false,
//   timerProgressBar: true,
//    icon: 'success',
 

//   showClass: {
//     popup: 'swal2-noanimation'  // disables show animation
//   },
  
// });
//     }
//     catch
//     {
//       Swal.fire({
//   title: "Error during unregistering",
//   timer: 1000,
//   position: 'top',
//   toast: true,
//   showConfirmButton: false,
//   timerProgressBar: true,
 
 

//   showClass: {
//     popup: 'swal2-noanimation'  // disables show animation
//   },
  
// });
//     }
//   };const handleUnregisterWeb = async (eventId) => {
//   try {
//     // Call your DELETE route in backend
//     await axios.delete(`${apiUrl}/webinar/delete/${eventId}`, {
//       withCredentials: true,
//     });

//     // If deletion successful, update frontend state
//     setWebinaRegistrations((prev) => prev.filter((event) => event._id !== eventId));

//     Swal.fire({
//       title: "Unregistered successfully",
//       timer: 1000,
//       position: 'top',
//       toast: true,
//       icon: 'success',
//       showConfirmButton: false,
//       timerProgressBar: true,
//       showClass: {
//         popup: 'swal2-noanimation'
//       },
//     });
//   } catch (error) {
//     console.error("Error unregistering webinar:", error);

//     Swal.fire({
//       title: "Error during unregistering",
//       timer: 1000,
//       position: 'top',
//       toast: true,
//       icon: 'error',
//       showConfirmButton: false,
//       timerProgressBar: true,
//       showClass: {
//         popup: 'swal2-noanimation'
//       },
//     });
//   }
// };


//   return (
//     <div className="p-4">
//       <h1 className="text-4xl font-bold text-blue-600 mb-9 text-center">Registered Events</h1>
//       {
//        (events.length === 0 && webinaRegistrations.length==0)  ? (
//           <p className="text-center mt-5 text-lg text-gray-600">No events registered yet.</p>
//         ) : (
//           events.map((event) => (
//             <div 
//               key={event._id} 
//               className="flex flex-row justify-center items-center gap-4 mb-6"
//             >
//               <img 
//                 src={event.image} 
//                 alt="event" 
//                 className="rounded-md w-90 h-64 object-cover"
//               />
//               <div className="border-2 border-blue-100 shadow-md p-4 rounded-md w-[450px] h-[260px] flex items-center justify-center">
//                 <RegisterCard event={event} onUnregister={handleUnregister} />
//               </div>
//             </div>
//           ))
//         )
//       }{(webinaRegistrations && webinaRegistrations.length>0) && <h1 className="text-4xl font-bold text-blue-600 mb-9 text-center">Registered Webinars</h1>}
//         { <h1>{
//         (webinaRegistrations && webinaRegistrations.length>0) && webinaRegistrations.map((event)=>(
//           <div 
//               key={event._id} 
//               className="flex flex-row justify-center items-center gap-4 mb-6"
//             >{console.log(event+"eventuuu")}
//               <img 
//                 src= {event.webinar.image}
//                 alt="event" 
//                 className="rounded-md w-90 h-64 object-cover"
//               />
//               <div className="border-2 border-blue-100 shadow-md p-4 rounded-md w-[450px] h-[260px] flex items-center justify-center">
//                <div className='flex flex-col justify-center items-center'>
//         <h1 className='text-2xl text-purple-800 font-bold my-3'>{event.webinar.name.toUpperCase()}</h1>
      
//         <h1><b>Location:</b>{event.webinar.location}</h1>
//         <h1><b>RegistrationFee:</b>{event.webinar.registrationFee}</h1>
//         <h1><b>Description:</b>{event.webinar.description}</h1>
//         <h1><b>Date:</b>{event.webinar.date.slice(0,10)}</h1>
//         <button className='bg-blue-500 border-2 border-blue-600 text-lg font-medium text-white p-1 rounded-md my-2' onClick={()=>handleUnregisterWeb(event._id)}>Unregister</button>

//     </div>
//                 </div>
//               </div>
           
//         ))
// }
// </h1> }
//     </div>
//   );
// }

// export default RegisteredEvents;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegisterCard from './RegisterCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const apiUrl = import.meta.env.VITE_API_URL;
// Webinar Card Component
function WebinarCard({ event, onUnregister }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-6 text-white">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2 leading-tight">{event.webinar.name}</h2>
            <div className="flex items-center text-purple-100">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Webinar</span>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full ml-2">
            <span className="text-xs font-semibold">₹{event.webinar.registrationFee}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Event Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Date</div>
              <div className="font-semibold text-sm">{event.webinar.date.slice(0,10)}</div>
            </div>
          </div>

          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Location</div>
              <div className="font-semibold text-sm">{event.webinar.location}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6 flex-1">
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
            {event.webinar.description}
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
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200 flex items-center gap-2 text-sm" 
            onClick={() => onUnregister(event._id)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Unregister
          </button>
        </div>
      </div>
    </div>
  );
}

function RegisteredEvents() {
  const [events, setEvents] = useState([]);
  const [webinarRegistrations, setWebinarRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  // Fetch webinar registrations
  useEffect(() => {
    const fetchWebinarData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/webinar/myRegistrations`, {
          withCredentials: true
        });
        console.log(res.data);
        setWebinarRegistrations(res.data.data);
      } catch (error) {
        console.error("Error fetching webinar registrations:", error);
      }
    };

    fetchWebinarData();
  }, []);

  // Fetch regular events
  const fetchEvents = async () => {
    try {
      if (!user) {
        Swal.fire({
          title: "Please Login",
          timer: 1000,
          position: 'top',
          toast: true,
          showConfirmButton: false,
          timerProgressBar: true,
          showClass: {
            popup: 'swal2-noanimation'
          },
        });
        navigate("/login");
        return;
      }
      
      const res = await axios.get(`${apiUrl}/register/registeredEvents`, {
        withCredentials: true
      });
      setEvents(res.data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle event unregistration
  const handleUnregister = (eventId) => {
    try {
      setEvents((prev) => prev.filter((event) => event._id !== eventId));
      Swal.fire({
        title: "Unregistered successfully",
        timer: 1000,
        position: 'top',
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
        icon: 'success',
        showClass: {
          popup: 'swal2-noanimation'
        },
      });
    } catch  {
      Swal.fire({
        title: "Error during unregistering",
        timer: 1000,
        position: 'top',
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
        icon: 'error',
        showClass: {
          popup: 'swal2-noanimation'
        },
      });
    }
  };

  // Handle webinar unregistration
  const handleUnregisterWebinar = async (eventId) => {
    try {
      await axios.delete(`${apiUrl}/webinar/delete/${eventId}`, {
        withCredentials: true,
      });

      setWebinarRegistrations((prev) => prev.filter((event) => event._id !== eventId));

      Swal.fire({
        title: "Unregistered successfully",
        timer: 1000,
        position: 'top',
        toast: true,
        icon: 'success',
        showConfirmButton: false,
        timerProgressBar: true,
        showClass: {
          popup: 'swal2-noanimation'
        },
      });
    } catch (error) {
      console.error("Error unregistering webinar:", error);
      Swal.fire({
        title: "Error during unregistering",
        timer: 1000,
        position: 'top',
        toast: true,
        icon: 'error',
        showConfirmButton: false,
        timerProgressBar: true,
        showClass: {
          popup: 'swal2-noanimation'
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your registrations...</p>
        </div>
      </div>
    );
  }

  const hasNoRegistrations = events.length === 0 && webinarRegistrations.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Registrations
          </h1>
          <p className="text-lg text-gray-600">Manage your registered events and webinars</p>
        </div>

        {/* No registrations message */}
        {hasNoRegistrations && (
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No registrations yet</h3>
            <p className="text-gray-500 mb-8 text-lg">You haven't registered for any events or webinars.</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Browse Events
            </button>
          </div>
        )}

        {/* Regular Events Section */}
        {events.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Registered Events</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-8">
              {events.map((event) => (
                <div key={event._id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="lg:flex lg:h-80">
                    {/* Image Section */}
                    <div className="lg:w-1/3">
                      <div className="h-64 lg:h-80 relative overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="lg:w-2/3 p-8 flex items-center">
                      <div className="w-full">
                        <RegisterCard event={event} onUnregister={handleUnregister} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Webinars Section */}
        {webinarRegistrations.length > 0 && (
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Registered Webinars</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-8">
              {webinarRegistrations.map((event) => (
                <div key={event._id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="lg:flex">
                    {/* Image Section */}
                    <div className="lg:w-1/3">
                      <div className="h-64 lg:h-full relative overflow-hidden">
                        <img 
                          src={event.webinar.image} 
                          alt={event.webinar.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="lg:w-2/3 p-8 flex items-center">
                      <div className="w-full">
                        <WebinarCard event={event} onUnregister={handleUnregisterWebinar} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisteredEvents;