// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Eventcard from './Eventcard';

// function Singlefest() {
//   const { id } = useParams();
//   const [fest, setFest] = useState(null);
//   const [events1,setEvents1]=useState([]);
//    const [events2,setEvents2]=useState([]);
//     const [events3,setEvents3]=useState([]);

//   const fetchfest=()=>{
//     axios.get(`${apiUrl}/fest/${id}`, { withCredentials: true })
//         .then(res => {setFest(res.data);
//         console.log(res.data)})
//         .catch((error) => console.log(error));
//   }

// const fetchEvent1=()=> {
//       axios.get(`${apiUrl}/event/${id}/allEvents/technical`,{withCredentials:true})
//       .then(res=>{setEvents1(res.data.data);
       
//       })
//       .catch(()=>console.log("data"))
//     }
    
// const fetchEvent2=()=> {
//       axios.get(`${apiUrl}/event/${id}/allEvents/non-technical`,{withCredentials:true})
//       .then(res=>{setEvents2(res.data.data);
        
//       })
//       .catch(()=>console.log("data"))
//     }
    
// const fetchEvent3=()=> {
//       axios.get(`${apiUrl}/event/${id}/allEvents/cultural`,{withCredentials:true})
//       .then(res=>{setEvents3(res.data.data);
     
//       })
//       .catch(()=>console.log("events"))
//     }
  
//   useEffect(() => {
//     if (id) {
//       fetchfest();
//       fetchEvent1();
//       fetchEvent2();
//       fetchEvent3();
//     }
//   }, [id]);

//   return (
//     <div>
//     <div className="p-10 max-full mx-auto bg-blue-100 w-full ">
//       {
//         fest ? (
//           <>
//         <div className="flex flex-col items-center text-center">
//   <h1 className="text-5xl font-bold mb-2 text-blue-800">{fest.name.toUpperCase()}</h1>
//   <img src={fest.image} className='rounded-md my-3' height="320" width="300"/>
//   <p className="text-2xl text-gray-700 mb-1">🏫 College: {fest.college}</p>


//             <p className="text-lg text-gray-700 mb-1">📍 Location: {fest.location}</p>
            
//             <p className="text-lg text-gray-700 mb-1">📅 Date: {new Date(fest.date).toLocaleDateString()}</p>
//             <p className="text-sm text-gray-500 mt-4">Created at: {new Date(fest.createdAt).toLocaleString()}</p>
//             </div>
//           </>
//         ) : (
//           <p className="text-center text-gray-600">Loading fest details...</p>
//         )
//       }
//     </div>
//  {events1 && events1.length > 0 && (
//   <div className="p-6">
//     <h1 className='text-2xl font-bold mb-4'>Technical</h1>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {events1.map(event => (
//         <Eventcard key={event._id} event={event} />
//       ))}
//     </div>
//   </div>
// )}

//      {events2 && events2.length > 0 && (
//   <div className="p-6">
//     <h1 className='text-2xl font-bold mb-4'>Non-Technical</h1>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {events2.map(event => (
//         <Eventcard key={event._id} event={event} />
//       ))}
//     </div>
//   </div>
// )}


//   {events3 && events3.length > 0 && (
//   <div className="p-6">
//     <h1 className='text-2xl font-bold mb-4'>Technical</h1>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {events3.map(event => (
//         <Eventcard key={event._id} event={event} />
//       ))}
//     </div>
//   </div>
// )}

//     </div>
//   );
// }

// export default Singlefest;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Eventcard from './Eventcard';
const apiUrl = import.meta.env.VITE_API_URL;
function Singlefest() {
  const { id } = useParams();
  const [fest, setFest] = useState(null);
  const [events1, setEvents1] = useState([]);
  const [events2, setEvents2] = useState([]);
  const [events3, setEvents3] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchfest = () => {
    axios.get(`${apiUrl}/fest/${id}`, { withCredentials: true })
      .then(res => {
        setFest(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  const fetchEvent1 = () => {
    axios.get(`${apiUrl}/event/${id}/allEvents/technical`, { withCredentials: true })
      .then(res => {
        setEvents1(res.data.data);
      })
      .catch(() => console.log("data"));
  }

  const fetchEvent2 = () => {
    axios.get(`${apiUrl}/event/${id}/allEvents/non-technical`, { withCredentials: true })
      .then(res => {
        setEvents2(res.data.data);
      })
      .catch(() => console.log("data"));
  }

  const fetchEvent3 = () => {
    axios.get(`${apiUrl}/event/${id}/allEvents/cultural`, { withCredentials: true })
      .then(res => {
        setEvents3(res.data.data);
      })
      .catch(() => console.log("events"));
  }

  useEffect(() => {
    if (id) {
      fetchfest();
      fetchEvent1();
      fetchEvent2();
      fetchEvent3();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-slate-700 mb-2">Loading Festival</h2>
          <p className="text-slate-500">Please wait while we fetch the details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      {/* Hero Section */}
      {fest ? (
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
          
          <div className="relative z-10 container mx-auto px-6 py-20">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              
              {/* Festival Image */}
              <div className="flex-shrink-0">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                  <img 
                    src={fest.image} 
                    alt={fest.name}
                    className="relative w-80 h-96 object-cover rounded-2xl shadow-2xl border-4 border-white/20 backdrop-blur-sm transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                    <span className="text-white font-semibold text-sm">🎉 Live Event</span>
                  </div>
                </div>
              </div>

              {/* Festival Details */}
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-6">
                  <h1 className="text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
                    {fest.name.toUpperCase()}
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto lg:mx-0 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto lg:mx-0">
                  
                  {/* College */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/30 rounded-xl">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-white/70 text-sm font-medium">College</p>
                        <p className="text-white text-lg font-bold">{fest.college}</p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-500/30 rounded-xl">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-white/70 text-sm font-medium">Location</p>
                        <p className="text-white text-lg font-bold">{fest.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-500/30 rounded-xl">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-white/70 text-sm font-medium">Event Date</p>
                        <p className="text-white text-lg font-bold">{new Date(fest.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Created At */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-pink-500/30 rounded-xl">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-white/70 text-sm font-medium">Created</p>
                        <p className="text-white text-lg font-bold">{new Date(fest.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center py-20">
          <p className="text-center text-gray-600 text-xl">Festival details not found</p>
        </div>
      )}

      {/* Events Sections */}
      <div className="container mx-auto px-6 py-16">
        
        {/* Technical Events */}
        {events1 && events1.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-block p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-slate-800 mb-4">Technical Events</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Showcase your technical prowess and innovation in these challenging competitions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events1.map(event => (
                <div key={event._id} className="transform hover:scale-105 transition-transform duration-300">
                  <Eventcard event={event} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Non-Technical Events */}
        {events2 && events2.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-block p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-slate-800 mb-4">Non-Technical Events</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Express your creativity and skills beyond technology in these engaging activities</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events2.map(event => (
                <div key={event._id} className="transform hover:scale-105 transition-transform duration-300">
                  <Eventcard event={event} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cultural Events */}
        {events3 && events3.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-slate-800 mb-4">Cultural Events</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Celebrate art, music, dance, and cultural diversity through these vibrant performances</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events3.map(event => (
                <div key={event._id} className="transform hover:scale-105 transition-transform duration-300">
                  <Eventcard event={event} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Events Message */}
        {(!events1.length && !events2.length && !events3.length) && (
          <div className="text-center py-20">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">No Events Yet</h3>
              <p className="text-slate-600">Events for this festival will be announced soon. Stay tuned!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Singlefest;