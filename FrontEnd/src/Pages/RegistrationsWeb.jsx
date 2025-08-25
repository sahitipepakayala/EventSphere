// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function RegistrationsWeb() {
//   const { id } = useParams();
//   const [webinars, setWebinars] = useState([]);
//   const [error, setError] = useState(""); // Step 1: Error state
// const apiUrl = import.meta.env.VITE_API_URL;
//   const fetchWebinars = async () => {
//     try {
//       const res = await axios.get(
//         `${apiUrl}/webinar/allRegistrations/${id}`,
//         { withCredentials: true }
//       );
//       console.log(res.data.data);
//       setWebinars(res.data.data);
//       setError(""); // clear previous errors if any
//     } catch (error) {
//       console.log(error);
//       if (error.response && error.response.status === 403) {
//         setError("You are not authorized to view these registrations.");
//       } else if (error.response && error.response.status === 404) {
//         setError("Webinar not found.");
//       } else {
//         setError("Something went wrong while fetching data.");
//       }
//       setWebinars([]); // clear old data
//     }
//   };

//   useEffect(() => {
//     fetchWebinars();
//   }, []);

//   return (
//     <div>
//       <div className="text-2xl text-blue-500 font-bold text-center">Registrations</div>

//       {error ? (
//         <div className="text-red-500 text-center mt-4">{error}</div> // Step 3: Display error
//       ) : (
//         (webinars && webinars.length > 0) ? (
//           <div className="border-2 border-blue-400 shadow-xl shadow-gray-600 m-5 p-5 rounded-2xl">
//             {webinars.map((webinar) => (
//               <div key={webinar._id} className="text-xl font-medium">
//                 {webinar.user.name.toUpperCase()} ({webinar.user.emailId})
//               </div>
//             ))}
//           </div>
//         ) : (
//           <h3 className="text-center mt-4">No registrations found</h3>
//         )
//       )}
//     </div>
//   );
// }

// export default RegistrationsWeb;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function RegistrationsWeb() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [webinars, setWebinars] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [webinarTitle, setWebinarTitle] = useState("");
  
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchWebinars = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${apiUrl}/webinar/allRegistrations/${id}`,
        { withCredentials: true }
      );
      console.log(res.data.data);
      setWebinars(res.data.data);
      // If you have webinar title in response, set it
      if (res.data.webinarTitle) {
        setWebinarTitle(res.data.webinarTitle);
      }
      setError("");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 403) {
        setError("You are not authorized to view these registrations.");
      } else if (error.response && error.response.status === 404) {
        setError("Webinar not found.");
      } else {
        setError("Something went wrong while fetching data.");
      }
      setWebinars([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebinars();
  }, [id]);

  const exportToCSV = () => {
    if (webinars.length === 0) return;
    
    const headers = ['Name', 'Email', 'Registration Date'];
    const csvData = webinars.map(webinar => [
      webinar.user.name,
      webinar.user.emailId,
      new Date(webinar.createdAt || Date.now()).toLocaleDateString()
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `webinar_registrations_${id}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Webinar Registrations</h1>
              {webinarTitle && (
                <p className="text-gray-600">For: {webinarTitle}</p>
              )}
            </div>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors duration-200"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Error State */}
        {error ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchWebinars}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Stats and Actions Bar */}
            {webinars && webinars.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{webinars.length}</div>
                      <div className="text-gray-600 font-medium">Total Registrations</div>
                    </div>
                    <div className="h-12 w-px bg-gray-300"></div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-600">
                        ₹{webinars.length * (webinars[0]?.registrationFee || 0)}
                      </div>
                      <div className="text-gray-600 font-medium">Total Revenue</div>
                    </div>
                  </div>
                  <button
                    onClick={exportToCSV}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>
            )}

            {/* Registrations List */}
            {webinars && webinars.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">Registered Participants</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {webinars.map((webinar, index) => (
                    <div key={webinar._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex items-center space-x-4">
                        
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {webinar.user.name.charAt(0).toUpperCase()}
                        </div>
                        
                        {/* User Info */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-bold text-gray-800">
                              {webinar.user.name.toUpperCase()}
                            </h3>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                              #{index + 1}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-gray-600">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                              </svg>
                              {webinar.user.emailId}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2z"></path>
                              </svg>
                              Registered: {new Date(webinar.createdAt || Date.now()).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        
                        {/* Status Badge */}
                        <div className="text-right">
                          <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                            Confirmed
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No Registrations Yet</h2>
                <p className="text-gray-600 text-lg mb-6">
                  This webinar doesn't have any registrations at the moment.
                </p>
                <button
                  onClick={fetchWebinars}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Refresh
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default RegistrationsWeb;