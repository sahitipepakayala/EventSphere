// import React from 'react';
// import { Link } from 'react-router-dom';

// function Eventcard({ event }) {
//   return (
//     <div className="w-[300px] h-[350px] p-5 border-2 border-blue-400 hover:bg-blue-100 rounded-xl shadow-2xl bg-white flex flex-col">
//       {event ? (
//         <>
//           {/* Image */}
//           <div className="w-full h-[160px] overflow-hidden rounded-md">
//             <img
//               src={event.image}
//               alt={event.name}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Title */}
//           <h1 className="text-xl font-bold text-blue-800 text-center mt-3">
//             {event.name?.toUpperCase()}
//           </h1>

//           {/* Content */}
//           <div className="text-sm text-gray-700 mt-2 ">
//             <p><b>📍 Location:</b> {event.location}</p>
//             <p><b>📅 Date:</b> {new Date(event.date).toLocaleDateString()}</p>
//             <span className="break-words overflow-hidden">
//               <b>Description:</b>
//               {event.description?.length > 50
//                 ? event.description.slice(0, 50) + "..."
//                 : event.description}
//             </span>
//           </div>

//           {/* Button */}
//           <div className="flex justify-center mt-4">
//             <Link
//               to={`/singleEvent/${event._id}`}
//               className="text-sm font-bold text-blue-700 border-2 border-blue-600 px-3 py-1 rounded-lg"
//             >
//               More Details
//             </Link>
//           </div>
//         </>
//       ) : (
//         <p className="text-center text-gray-600">Loading event details...</p>
//       )}
//     </div>
//   );
// }

// export default Eventcard;


import React from 'react';
import { Link } from 'react-router-dom';

function Eventcard({ event }) {
  return (
    <div className="group relative w-full max-w-sm mx-auto bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-slate-200">
      {event ? (
        <>
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20">
                Event
              </span>
            </div>

            {/* Floating Action */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="p-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-colors cursor-pointer">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Content Container */}
          <div className="p-6">
            {/* Title */}
            <h2 className="text-xl font-bold text-slate-800 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
              {event.name?.toUpperCase()}
            </h2>

            {/* Event Details */}
            <div className="space-y-3 mb-6">
              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Location</p>
                  <p className="text-sm text-slate-700 font-semibold">{event.location.toUpperCase()}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Event Date</p>
                  <p className="text-sm text-slate-700 font-semibold">{new Date(event.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-slate-600 text-sm leading-relaxed">
                {event.description?.length > 80
                  ? event.description.slice(0, 80) + "..."
                  : event.description || "No description available"}
              </p>
            </div>

            {/* Action Button */}
            <Link
              to={`/singleEvent/${event._id}`}
              className="block w-full"
            >
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
                <span className="flex items-center justify-center gap-2">
                  <span>View Details</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
              </button>
            </Link>
          </div>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </>
      ) : (
        // Loading State
        <div className="p-6 flex flex-col items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-600 font-medium">Loading event details...</p>
        </div>
      )}
    </div>
  );
}

export default Eventcard;