// import axios from 'axios';
// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { useSelector } from 'react-redux'
// import Webinarcard from './Webinarcard';
// import { useNavigate } from 'react-router-dom';

// function Webinar() {
//     const user=useSelector((store)=>store.user);
//     const [webinar,setWebinar]=useState([]);
//     const navigate=useNavigate();
//     const fetchweb=async()=>{
//         try{
//            const res=await axios.get("${apiUrl}/webinar/all",{withCredentials:true});
//             console.log( res.data.data);
//             setWebinar(res.data.data)

//         }
//         catch(error)
//         {
//             console.log(error);
//         }
//     }
//     useEffect(()=>{
//             fetchweb();
//     },[])
//   return (
//     <div className='m-5'>
//         <div className='flex flex-row justify-around'>
//         <h1 className='text-blue-600 font-bold text-3xl'>Webinars</h1>{user &&
//             user.admin &&
//         <button className='bg-blue-500 shadow-2 shadow-gray-600 rounded-md p-2 text-white font-medium' onClick={()=>navigate("/newWebinar")}>New Webinar</button>}
//         </div>
//         <div className=' mb-10 m-5 border-2 border-blue-100 shadow-2xlounded-2xl  px-5 py-10 '>
// <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//   {webinar.map((fest) => (
//     <Webinarcard key={fest._id } fest={fest} />
//   ))}
// </div>
// </div>
//     </div>
//   )
// }

// export default Webinar

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Webinarcard from './Webinarcard';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
function Webinar() {
    const user = useSelector((store) => store.user);
    const [webinar, setWebinar] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchWebinars = async () => {
        try {
            const res = await axios.get(`${apiUrl}/webinar/all`, { withCredentials: true });
            setWebinar(res.data.data);
        } catch (error) {
            console.error("Error fetching webinars:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWebinars();
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading webinars...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-purple-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                Webinars
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Discover and join our online learning experiences
                            </p>
                        </div>
                        
                        {user && user.admin && (
                            <button 
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                                onClick={() => navigate("/newWebinar")}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                New Webinar
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {webinar.length === 0 ? (
                    // Empty State
                    <div className="text-center py-20">
                        <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                            <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No webinars available</h3>
                        <p className="text-gray-500 mb-8 text-lg">Check back later for upcoming webinars!</p>
                        {user && user.admin && (
                            <button 
                                onClick={() => navigate('/newWebinar')}
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                            >
                                Create First Webinar
                            </button>
                        )}
                    </div>
                ) : (
                    // Webinars Grid
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Webinars</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
                            <p className="text-gray-600 mt-4">
                                {webinar.length} webinar{webinar.length !== 1 ? 's' : ''} available
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {webinar.map((fest) => (
                                <div key={fest._id} className="group">
                                    <div className="transform hover:-translate-y-2 transition-all duration-300">
                                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                                            {/* Image Section */}
                                            <div className="relative overflow-hidden">
                                                <img 
                                                    src={fest.image || '/api/placeholder/400/200'} 
                                                    alt={fest.name}
                                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                                    onError={(e) => {
                                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVIMjI1VjEyNUgxNzVWNzVaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xODcuNSA5Ni4yNUwyMDAuNjI1IDEwOS4zNzVMMjEyLjUgOTcuNUwyMjUgMTEwVjEyNUgxNzVWMTEwTDE4Ny41IDk2LjI1WiIgZmlsbD0iIzlDQTNBRiIvPgo8Y2lyY2xlIGN4PSIxOTMuNzUiIGN5PSI4Ny41IiByPSI2LjI1IiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2QjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPldlYmluYXIgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                                
                                                {/* Live Badge */}
                                               
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <Webinarcard fest={fest} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Stats Section (if webinars exist) */}
            {webinar.length > 0 && (
                <div className="bg-white border-t border-purple-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                            <div className="group">
                                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 group-hover:shadow-lg transition-shadow duration-300">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">{webinar.length}</div>
                                    <div className="text-gray-600 font-medium">Total Webinars</div>
                                </div>
                            </div>
                            
                            <div className="group">
                                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6 group-hover:shadow-lg transition-shadow duration-300">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">Live</div>
                                    <div className="text-gray-600 font-medium">Online Sessions</div>
                                </div>
                            </div>
                            
                            <div className="group">
                                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-6 group-hover:shadow-lg transition-shadow duration-300">
                                    <div className="text-3xl font-bold text-green-600 mb-2">Free</div>
                                    <div className="text-gray-600 font-medium">Registration</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Webinar