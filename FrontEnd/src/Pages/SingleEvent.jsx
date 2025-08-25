// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import {useSelector} from 'react-redux'

// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
// function SingleEvent() {
//     const {id}=useParams();
    
//     const navigate=useNavigate();
//     const [event,setEvent]=useState([]);
//     const user=useSelector((state)=>state.user);
//     const fetchEvent=async()=>{
//         try{
//             const res=await axios.get(`${apiUrl}/event/getEvent/${id}`,{withCredentials:true});
//             setEvent(res.data.data);
          
//         }
//         catch(error)
//         {
//             console.log(error)
//         }
//     }
//     useEffect(()=>{
//         fetchEvent();

//     },[id]);

//     const handleRegister=async()=>{
//         try{
//             if(!user)
//                 navigate("/login");
//             const res=await axios.post(`${apiUrl}/register/${id}/newRegistration`,{},{withCredentials:true});
            
//             Swal.fire({
//                          title: res.data.message,
//                          timer: 1000,
//                          position: 'top-end',
//                          toast: true,
//                          showConfirmButton: false,
//                          timerProgressBar: true,
//                          icon: 'success',
                       
//                          showClass: {
//                            popup: 'swal2-noanimation'  // disables show animation
//                          },
                         
//                        });
//            navigate(`/singleFest/${res.data.data.festid}`);

            
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
//    <div className="flex flex-col items-center text-center mt-7">
//   <h1 className="text-5xl font-bold mb-2 text-blue-800">{event.name.toUpperCase()}</h1>
//   <p className="text-2xl text-gray-700 mb-1 font-medium"> Fest: {event.festId.name.toUpperCase()}</p>
//     <img src={event.image} className='rounded-md my-3' height="320" width="300"/>
//   <p className="text-lg text-gray-700 mb-1">🏫 College: {event.college}</p>
//             <p className="text-lg text-gray-700 mb-1">📍 Location: {event.location}</p>
//             <p className="text-lg text-gray-700 mb-1">📍 Category: {event.category}</p>
            
//             <p className="text-lg text-gray-700 mb-1">📅 Date: {new Date(event.date).toLocaleDateString()}</p>
//             <p className="text-lg text-gray-500 mt-4"><b>Description:</b>{event.description}</p>
//             <button className='p-3 rounded-md bg-blue-700 shadow shadow-gray-900 m-4 text-white font-bold text-xl' onClick={handleRegister}>Register for the Event</button>
//             </div>
//   )
// }

// export default SingleEvent


import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const apiUrl = import.meta.env.VITE_API_URL;
function SingleEvent() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const user = useSelector((state) => state.user);
    
    const fetchEvent = async() => {
        try {
            const res = await axios.get(`${apiUrl}/event/getEvent/${id}`, {withCredentials: true});
            setEvent(res.data.data);
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchEvent();
    }, [id]);

    const handleRegister = async() => {
        if (!user) {
            navigate("/login");
            return;
        }
        
        setRegistering(true);
        try {
            const res = await axios.post(`${apiUrl}/register/${id}/newRegistration`, {}, {withCredentials: true});
            console.log(res)
            Swal.fire({
                title: res.data.message,
                timer: 2000,
                position: 'top-end',
                toast: true,
                showConfirmButton: false,
                timerProgressBar: true,
                icon: 'success',
                showClass: {
                    popup: 'swal2-noanimation'
                },
            });
            navigate(`/singleFest/${res.data.data.festid}`);
        }
        catch(error) {
            console.log(error);
            Swal.fire({
                title: 'Registration failed. Please try again.',
                timer: 2000,
                position: 'top-end',
                toast: true,
                showConfirmButton: false,
                timerProgressBar: true,
                icon: 'error',
                showClass: {
                    popup: 'swal2-noanimation'
                },
            });
        }
        finally {
            setRegistering(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
                    <h2 className="text-2xl font-semibold text-slate-700 mb-2">Loading Event</h2>
                    <p className="text-slate-500">Please wait while we fetch the details...</p>
                </div>
            </div>
        );
    }

    if (!event || !event.name) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="text-center bg-white rounded-3xl p-12 shadow-xl max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">Event Not Found</h3>
                    <p className="text-slate-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
                    <button 
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
                
                <div className="relative z-10 container mx-auto px-6 py-16">
                    <div className="text-center mb-8">
                        <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-6">
                            <span className="text-white font-semibold text-sm">🎯 {event.category?.toUpperCase()} EVENT</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
                            {event.name?.toUpperCase()}
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto rounded-full mb-6"></div>
                        <p className="text-xl text-white/90 font-medium">
                            Part of <span className="font-bold text-yellow-300">{event.festId?.name?.toUpperCase()}</span> Festival
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        
                        {/* Event Image */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative">
                                <img 
                                    src={event.image} 
                                    alt={event.name}
                                    className="w-full aspect-square object-cover rounded-2xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
                                    Live Event
                                </div>
                            </div>
                        </div>

                        {/* Event Details */}
                        <div className="space-y-6">
                            
                            {/* Details Grid */}
                            <div className="grid gap-6">
                                
                                {/* College */}
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-100 rounded-xl">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-sm font-medium">College</p>
                                            <p className="text-slate-800 text-lg font-bold">{event.college}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Location & Date */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-emerald-100 rounded-xl">
                                                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-slate-500 text-sm font-medium">Location</p>
                                                <p className="text-slate-800 text-lg font-bold">{event.location}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-purple-100 rounded-xl">
                                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-slate-500 text-sm font-medium">Event Date</p>
                                                <p className="text-slate-800 text-lg font-bold">{new Date(event.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-orange-100 rounded-xl flex-shrink-0">
                                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-slate-500 text-sm font-medium mb-2">Description</p>
                                            <p className="text-slate-700 leading-relaxed">{event.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Registration Button */}
                            <div className="pt-6">
                                <button 
                                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold text-xl py-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    onClick={handleRegister}
                                    disabled={registering}
                                >
                                    {registering ? (
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                            <span>Registering...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-3">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                            </svg>
                                            <span>Register for Event</span>
                                        </div>
                                    )}
                                </button>
                            </div>

                            {/* Additional Info */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 mb-2">Registration Information</h4>
                                        <ul className="text-slate-600 text-sm space-y-1">
                                            <li>• Registration is free and instant</li>
                                            <li>• You'll receive confirmation via email</li>
                                            <li>• Bring a valid ID on the event day</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleEvent;