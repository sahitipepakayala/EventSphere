// import React from 'react'
// import {Link} from "react-router-dom"

// function Webinarcard({fest}) {
 
//   return (
//     <div className=' flex flex-col items-center p-5 border-2 border-blue-200 shadow rounded-2xl bg-white'>
//         <h1 className='text-xl font-bold'>{fest.name.toUpperCase()}</h1>
//         <h1 className='text-lg text-gray-500'>{fest.college.toUpperCase()}</h1>
//          <h1 className='text-lg text-gray-500'>{fest.location.toUpperCase()}</h1>
//         <h1 className='text-lg text-gray-500'>{new Date(fest.date).toLocaleDateString()}</h1>
//         <Link to={`/singleWebinar/${fest._id}`}className='text-md font-bold text-blue-700 border-2 border-blue-600 p-1 rounded-lg mt-3'>More Details</Link>
//     </div>
//   )
// }

// export default Webinarcard

import React from 'react'
import { Link } from "react-router-dom"
function Webinarcard({ fest }) {
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 h-full">
            {/* Header with subtle gradient background */}
            <div className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-slate-200">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-semibold uppercase tracking-wide">Webinar</span>
                    </div>
                    
                </div>
                <h2 className="text-lg font-bold leading-tight line-clamp-2">{fest.name.toUpperCase()}</h2>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
                {/* Event Details */}
                <div className="space-y-3 mb-4 flex-1">
                    <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Institution</div>
                            <div className="font-semibold text-sm truncate text-gray-700">{fest.college}</div>
                        </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Location</div>
                            <div className="font-semibold text-sm truncate text-gray-700">{fest.location}</div>
                        </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Date</div>
                            <div className="font-semibold text-sm text-gray-700">{new Date(fest.date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}</div>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="pt-3 border-t border-gray-100">
                    <Link 
                        to={`/singleWebinar/${fest._id}`}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Webinarcard