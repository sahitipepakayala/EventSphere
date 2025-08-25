// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Eventcard from './Eventcard';

// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
// function EditfestPage() {
//   const { id } = useParams();
//   const [fest, setFest] = useState(null);
//   const [events1,setEvents1]=useState([]);
//    const [events2,setEvents2]=useState([]);
//     const [events3,setEvents3]=useState([]);
// const navigate=useNavigate();
//   const fetchfest=()=>{
//     axios.get(`${apiUrl}/fest/${id}`, { withCredentials: true })
//         .then(res => setFest(res.data))
//         .catch((error) => console.log(error));
//   }

// const fetchEvent1 = async () => {
//   try {
//     const res = await axios.get(`${apiUrl}/event/${id}/allEvents/technical`, { withCredentials: true });
//     setEvents1(res.data.data);
//     return res.data.data;
//   } catch  {
//     console.log("error");
//   }
// };

// const fetchEvent2 = async () => {
//   try {
//     const res = await axios.get(`${apiUrl}/event/${id}/allEvents/non-technical`, { withCredentials: true });
//     setEvents2(res.data.data);
//     return res.data.data;
//   } catch  {
//     console.log("error");
//   }
// };

// const fetchEvent3 = async () => {
//   try {
//     const res = await axios.get(`${apiUrl}/event/${id}/allEvents/cultural`, { withCredentials: true });
//     setEvents3(res.data.data);
//     return res.data.data;
//   } catch  {
//     console.log("error");
//   }
// };

//   useEffect(() => {
//     if (id) {
//       fetchfest();
//       fetchEvent1();
//       fetchEvent2();
//       fetchEvent3();
//     }
//   }, [id]);

//    const handledelete = async (eventid) => {
//   try {
//     await axios.delete(`${apiUrl}/event/${eventid}/delete`, {
//       withCredentials: true,
//     });

//     // Optimistically remove event from all local event arrays
//     setEvents1(prev => prev.filter(event => event._id !== eventid));
//     setEvents2(prev => prev.filter(event => event._id !== eventid));
//     setEvents3(prev => prev.filter(event => event._id !== eventid));
//     Swal.fire({
//       title: "Deleted event successfully",
//       timer: 1000,
//       position: 'top',
//       toast: true,
//       showConfirmButton: false,
//       timerProgressBar: true,
//       icon: 'success',
    
//       showClass: {
//         popup: 'swal2-noanimation'  // disables show animation
//       },
      
//     });

//     // Optional: re-fetch everything again to keep in sync
//     // await fetchAllEvents();
//   } catch (error) {
//      Swal.fire({
//       title: "Error occured during deletion",
//       timer: 1000,
//       position: 'top',
//       toast: true,
//       showConfirmButton: false,
//       timerProgressBar: true,
//       icon: 'success',
    
//       showClass: {
//         popup: 'swal2-noanimation'  // disables show animation
//       },
      
//     });
//     console.log(error);
//   }
// };





//   return (
//     <div>
//     <div className="p-10 max-full mx-auto bg-blue-100 w-full ">
//       {
//         fest ? (
//           <>
//         <div className="flex flex-col items-center text-center">
//   <h1 className="text-5xl font-bold mb-2 text-blue-800">{fest.name.toUpperCase()}</h1>
//   <p className="text-2xl text-gray-700 mb-1">🏫 College: {fest.college}</p>


//             <p className="text-lg text-gray-700 mb-1">📍 Location: {fest.location}</p>
            
//             <p className="text-lg text-gray-700 mb-1">📅 Date: {new Date(fest.date).toLocaleDateString()}</p>
//             <p className="text-sm text-gray-500 mt-4">Created at: {new Date(fest.createdAt).toLocaleString()}</p>
//             <div className='flex flex-row gap-4'>
//             <button className='text-xl font-bold bg-blue-400 shadow-2xl px-3 mt-3 rounded-md border-2 border-blue-950' onClick={()=>navigate(`/editFest/${fest._id}`)}>Edit Fest</button>
//              <button className='text-xl font-bold bg-blue-400 shadow-2xl px-3 mt-3 rounded-md border-2 border-blue-950' onClick={()=>navigate(`/newEvent/${fest._id}`)}>Add Event</button>
//             </div>
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
//       {events1.map(event => (<div className='flex flex-col items-center justify-center'>
//         <Eventcard key={event._id} event={event} />
//          <div className='flex flex-row gap-3'> <button onClick={()=>navigate(`/editEvent/${event._id}`)} className='text-xl w-32 font-bold text-blue-800 shadow-2xl px-3 mt-3 rounded-md border-2 border-blue-500'>Edit</button>
//            <button onClick={()=>handledelete(event._id)} className='text-xl w-28 font-bold text-blue-800 shadow-2xl px-3 mt-3 rounded-md border-2 border-red-500'>Delete</button>
//            </div>
//         </div>
//       ))}
//     </div>
//   </div>
// )}

//      {events2 && events2.length > 0 && (
//   <div className="p-6">
//     <h1 className='text-2xl font-bold mb-4'>Non-Technical</h1>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//      {events2.map(event => (<div className='flex flex-col items-center justify-center'>
//         <Eventcard key={event._id} event={event} />
//         <div className='flex flex-row gap-3'> <button onClick={()=>navigate(`/editEvent/${event._id}`)} className='text-xl w-32 font-bold text-blue-800 shadow-2xl px-3 mt-3 rounded-md border-2 border-blue-500'>Edit</button>
//            <button onClick={()=>handledelete(event._id)} className='text-xl w-28 font-bold text-blue-800 shadow-2xl px-3 mt-3 rounded-md border-2 border-red-500'>Delete</button>
//            </div> 
//         </div>
//       ))}
//     </div>
//   </div>
// )}


//   {events3 && events3.length > 0 && (
//   <div className="p-6">
//     <h1 className='text-2xl font-bold mb-4'>Cultural</h1>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {events3.map(event => (<div className='flex flex-col items-center justify-center'>
//         <Eventcard key={event._id} event={event} />
//          <div className='flex flex-row gap-3'> <button onClick={()=>navigate(`/editEvent/${event._id}`)} className='text-xl w-32 font-bold text-blue-800 shadow-2xl px-3 mt-3 rounded-md border-2 border-blue-500'>Edit</button>
//            <button onClick={()=>handledelete(event._id)} className='text-xl w-28 font-bold text-blue-800 shadow-2xl px-3 mt-3 rounded-md border-2 border-red-500'>Delete</button>
//            </div>
//         </div>
//       ))}
//     </div>
//   </div>
// )}

//     </div>
//   );
// }



// export default EditfestPage





import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Eventcard from './Eventcard';
const apiUrl = import.meta.env.VITE_API_URL;
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function EditfestPage() {
  const { id } = useParams();
  const [fest, setFest] = useState(null);
  const [events1, setEvents1] = useState([]);
  const [events2, setEvents2] = useState([]);
  const [events3, setEvents3] = useState([]);
  const navigate = useNavigate();

  const fetchfest = () => {
    axios.get(`${apiUrl}/fest/${id}`, { withCredentials: true })
      .then(res => setFest(res.data))
      .catch((error) => console.log(error));
  }

  const fetchEvent1 = async () => {
    try {
      const res = await axios.get(`${apiUrl}/event/${id}/allEvents/technical`, { withCredentials: true });
      setEvents1(res.data.data);
      return res.data.data;
    } catch {
      console.log("error");
    }
  };

  const fetchEvent2 = async () => {
    try {
      const res = await axios.get(`${apiUrl}/event/${id}/allEvents/non-technical`, { withCredentials: true });
      setEvents2(res.data.data);
      return res.data.data;
    } catch {
      console.log("error");
    }
  };

  const fetchEvent3 = async () => {
    try {
      const res = await axios.get(`${apiUrl}/event/${id}/allEvents/cultural`, { withCredentials: true });
      setEvents3(res.data.data);
      return res.data.data;
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    if (id) {
      fetchfest();
      fetchEvent1();
      fetchEvent2();
      fetchEvent3();
    }
  }, [id]);

  const handledelete = async (eventid) => {
    try {
      await axios.delete(`${apiUrl}/event/${eventid}/delete`, {
        withCredentials: true,
      });

      // Optimistically remove event from all local event arrays
      setEvents1(prev => prev.filter(event => event._id !== eventid));
      setEvents2(prev => prev.filter(event => event._id !== eventid));
      setEvents3(prev => prev.filter(event => event._id !== eventid));
      
      Swal.fire({
        title: "Deleted event successfully",
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
    } catch (error) {
      Swal.fire({
        title: "Error occurred during deletion",
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
      console.log(error);
    }
  };

  const EventSection = ({ title, events, icon }) => (
    events && events.length > 0 && (
      <div className="mb-12">
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-3 mr-4 shadow-lg">
            <span className="text-white text-xl">{icon}</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <div key={event._id} className="group">
              <div className="transform transition-all duration-300 group-hover:scale-105">
                <Eventcard event={event} />
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <button 
                  onClick={() => navigate(`/editEvent/${event._id}`)}
                  className="flex-1 max-w-32 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  ✏️ Edit
                </button>
                <button 
                  onClick={() => handledelete(event._id)}
                  className="flex-1 max-w-28 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative px-6 py-16 mx-auto max-w-6xl">
          {fest ? (
            <div className="text-center space-y-6">
              <div className="inline-block">
                <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
                  {fest.name.toUpperCase()}
                </h1>
                <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                  <div className="text-3xl mb-3">🏫</div>
                  <h3 className="font-semibold text-gray-800 mb-2">College</h3>
                  <p className="text-gray-600">{fest.college}</p>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                  <div className="text-3xl mb-3">📍</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
                  <p className="text-gray-600">{fest.location}</p>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                  <div className="text-3xl mb-3">📅</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Date</h3>
                  <p className="text-gray-600">{new Date(fest.date).toLocaleDateString()}</p>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-8">
                Created: {new Date(fest.createdAt).toLocaleString()}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
                <button 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={() => navigate(`/editFest/${fest._id}`)}
                >
                  ⚙️ Edit Festival
                </button>
                <button 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={() => navigate(`/newEvent/${fest._id}`)}
                >
                  ➕ Add New Event
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
              <p className="text-xl text-gray-600">Loading festival details...</p>
            </div>
          )}
        </div>
      </div>

      {/* Events Sections */}
      <div className="px-6 py-12 mx-auto max-w-7xl">
        <EventSection 
          title="Technical Events" 
          events={events1} 
          icon="💻"
        />
        
        <EventSection 
          title="Non-Technical Events" 
          events={events2} 
          icon="🎯"
        />
        
        <EventSection 
          title="Cultural Events" 
          events={events3} 
          icon="🎭"
        />

        {/* Empty State */}
        {(!events1?.length && !events2?.length && !events3?.length) && fest && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🎪</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No Events Yet</h3>
            <p className="text-gray-500 mb-8">Start building your festival by adding some exciting events!</p>
            <button 
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() => navigate(`/newEvent/${fest._id}`)}
            >
              🚀 Add Your First Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditfestPage;