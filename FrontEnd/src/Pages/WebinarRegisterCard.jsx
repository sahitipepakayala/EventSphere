import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const apiUrl = import.meta.env.VITE_API_URL;
function MyWebinarRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get(`${apiUrl}/webinar/myRegistrations`, {
        withCredentials: true
      });
      setRegistrations(res.data.data);
    } catch (error) {
      console.log(error);
      Swal.fire('Oops', 'Failed to load registrations', 'error');
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleUnregister = async (webinarId) => {
    try {
      await axios.delete(`${apiUrl}/webinar/unregister/${webinarId}`, {
        withCredentials: true
      });
      Swal.fire('Success', 'Unregistered from webinar successfully!', 'success');
      fetchRegistrations(); // Refresh the list
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Unregistration failed', 'error');
    }
  };

  if (registrations.length === 0) {
    return <p className="text-center mt-4">You haven't registered for any webinars yet.</p>;
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {registrations.map((reg) => {
        const webinar = reg.webinar; // assuming your registration object has a populated `webinar` field
        return (
          <div key={reg._id} className="border p-4 rounded shadow bg-white">
            {webinar.image && (
              <img
                src={webinar.image}
                alt={webinar.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h2 className="text-lg font-bold">{webinar.name}</h2>
            <p className="text-sm text-gray-700">{webinar.description}</p>
            <p className="text-sm text-gray-500 mt-2">Date: {new Date(webinar.date).toDateString()}</p>
            <button
              onClick={() => handleUnregister(webinar._id)}
              className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Unregister
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default MyWebinarRegistrations;
