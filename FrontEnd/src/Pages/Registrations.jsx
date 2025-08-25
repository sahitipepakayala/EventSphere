// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom'; // To get fest ID from URL if applicable

// function Registrations() {
//   const { id } = useParams(); // fest id
//   const [regCount, setRegCount] = useState(0);
//   const [eventWiseRegistrations, setEventWiseRegistrations] = useState({});
 
//   const [loading, setLoading] = useState(true);
//   const [festName,setfestname]=useState("");

//   useEffect(() => {
//     axios.get(`${apiUrl}/register/count/${id}`,{withCredentials:true})
//       .then(res => {
//         setRegCount(res.data.regCount);
//         setEventWiseRegistrations(res.data.eventRegistrations);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Error fetching registrations:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   useEffect(()=>{
//     axios.get(`${apiUrl}/fest/${id}`, { withCredentials: true })
//     .then((res)=>setfestname(res.data.name))
//     .catch(err => {
//         console.error("Error fetching registrations:", err);
//         setLoading(false);
//     }
//     )

//   },[])

 
//       if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Total Registrations for {festName.toUpperCase()}: {regCount}</h1>

//       {eventWiseRegistrations &&Object.keys(eventWiseRegistrations).map(event => (
//         <div key={event} className="mb-6 border border-blue-500 p-4 rounded bg-white shadow">
//           <h2 className="text-xl font-semibold text-blue-800">{event}  ({eventWiseRegistrations[event].length})</h2>
//           <ul className="list-disc list-inside ml-4">
//             {eventWiseRegistrations[event].map((user, idx) => (
//               <li key={idx}>
//                 {user.username} ({user.emailId})
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}

    
//     </div>
//   );
// }

// export default Registrations;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Registrations() {
  const { id } = useParams();
  const [regCount, setRegCount] = useState(0);
  const [eventWiseRegistrations, setEventWiseRegistrations] = useState({});
  const [loading, setLoading] = useState(true);
  const [festName, setFestName] = useState("");
  const [expandedEvents, setExpandedEvents] = useState({});
const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await axios.get(`${apiUrl}/register/count/${id}`, { withCredentials: true });
        setRegCount(res.data.regCount);
        setEventWiseRegistrations(res.data.eventRegistrations);
      } catch (err) {
        console.error("Error fetching registrations:", err);
      }
    };

    const fetchFestName = async () => {
      try {
        const res = await axios.get(`${apiUrl}/fest/${id}`, { withCredentials: true });
        setFestName(res.data.name);
      } catch (err) {
        console.error("Error fetching fest name:", err);
      }
    };

    Promise.all([fetchRegistrations(), fetchFestName()])
      .finally(() => setLoading(false));
  }, [id]);

  const toggleEventExpansion = (eventName) => {
    setExpandedEvents(prev => ({
      ...prev,
      [eventName]: !prev[eventName]
    }));
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Event,Name,Email\n" +
      Object.entries(eventWiseRegistrations)
        .flatMap(([eventName, users]) => 
          users.map(user => `"${eventName}","${user.username}","${user.emailId}"`)
        )
        .join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${festName}_registrations.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">Loading registration data...</p>
        </div>
      </div>
    );
  }

  const eventEntries = Object.entries(eventWiseRegistrations);
  const hasRegistrations = eventEntries.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative px-6 py-16 mx-auto max-w-7xl">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
                Registration Analytics
              </h1>
              <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 inline-block">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {festName.toUpperCase()}
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  {regCount}
                </div>
                <div className="text-gray-600">
                  <div className="font-semibold">Total Registrations</div>
                  <div className="text-sm">Across all events</div>
                </div>
              </div>
            </div>

            {hasRegistrations && (
              <button
                onClick={downloadCSV}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                📊 Download CSV Report
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 pb-12 mx-auto max-w-7xl">
        {hasRegistrations ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {eventEntries.map(([eventName, users]) => {
              const isExpanded = expandedEvents[eventName];
              const userCount = users.length;
              
              return (
                <div key={eventName} className="group">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden transform transition-all duration-300 group-hover:scale-[1.02]">
                    {/* Event Header */}
                    <div 
                      className="p-6 cursor-pointer bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-white/20"
                      onClick={() => toggleEventExpansion(eventName)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-3">
                            <span className="text-white text-lg">🎯</span>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{eventName}</h3>
                            <p className="text-gray-600">{userCount} participant{userCount !== 1 ? 's' : ''}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full font-bold">
                            {userCount}
                          </div>
                          <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Participants List */}
                    <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                      <div className="p-6">
                        <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="mr-2">👥</span>
                          Registered Participants
                        </h4>
                        <div className="max-h-64 overflow-y-auto space-y-3">
                          {users.map((user, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                              <div className="flex items-center space-x-3">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2">
                                  <span className="text-white text-sm">👤</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-gray-800 truncate">{user.username}</p>
                                  <p className="text-sm text-gray-600 truncate">{user.emailId}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 max-w-2xl mx-auto">
              <div className="text-6xl mb-6">📋</div>
              <h3 className="text-3xl font-bold text-gray-700 mb-4">No Registrations Yet</h3>
              <p className="text-gray-500 mb-8 text-lg">
                Once students start registering for events in <span className="font-semibold">{festName}</span>, 
                their information will appear here.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h4 className="font-semibold text-blue-800 mb-3">💡 Pro Tips:</h4>
                <ul className="text-left text-blue-700 space-y-2">
                  <li>• Share your event links on social media</li>
                  <li>• Send invitations to student groups</li>
                  <li>• Add attractive event descriptions and images</li>
                  <li>• Set early bird registration incentives</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        {hasRegistrations && (
          <div className="mt-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">📊 Registration Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {eventEntries.length}
                  </div>
                  <p className="text-gray-600 font-medium">Active Events</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                    {regCount}
                  </div>
                  <p className="text-gray-600 font-medium">Total Registrations</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {eventEntries.length > 0 ? Math.round(regCount / eventEntries.length) : 0}
                  </div>
                  <p className="text-gray-600 font-medium">Avg. per Event</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Registrations;