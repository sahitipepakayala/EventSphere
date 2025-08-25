// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

// function NewFest() {
//   const [name, setName] = useState(null);
//   const [date, setDate] = useState(null);
//   const [college, setCollege] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [image, setImage] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('date', date);
//     formData.append('college', college);
//     formData.append('location', location);
//     if (image) formData.append('image', image); // must match backend field name

//     try {
//       const res = await axios.post('${apiUrl}/fest/new', formData, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log(res.data);
//       Swal.fire({
//   title: "Fest added successfully",
//   timer: 1000,
//   position: 'top',
//   toast: true,
//   showConfirmButton: false,
//   timerProgressBar: true,
//   icon: 'success',

//   showClass: {
//     popup: 'swal2-noanimation'  // disables show animation
//   },
  
// });
//       navigate(`/editfestpage/${res.data.data._id}`);
//     } catch (error) {
//       console.log(error.response.data);
//        Swal.fire({
//   title: error.response.data,
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
//   };

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <h1 className="text-3xl font-bold mt-4">New Fest</h1>
//       <form
//         className="border-blue-200 border-2 shadow-2xl shadow-gray-500 p-5 my-5 rounded-2xl w-96 bg-white"
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//       >
//         <fieldset className="fieldset m-4">
//           <legend className="fieldset-legend text-xl font-medium">Name</legend>
//           <input
//             type="text"
//             className="input w-full border-2 border-gray-500 my-3 p-1 rounded-md"
//             placeholder="Type here"
//             onChange={(e) => setName(e.target.value)}
//           />
//         </fieldset>
//         <fieldset className="fieldset m-4">
//           <legend className="fieldset-legend text-xl font-medium">College</legend>
//           <input
//             type="text"
//             className="input w-full border-2 border-gray-500 my-3 p-1 rounded-md"
//             placeholder="Type here"
//             onChange={(e) => setCollege(e.target.value)}
//           />
//         </fieldset>
//         <fieldset className="fieldset m-4">
//           <legend className="fieldset-legend text-xl font-medium">Location</legend>
//           <input
//             type="text"
//             className="input w-full border-2 border-gray-500 my-3 p-1 rounded-md"
//             placeholder="Type here"
//             onChange={(e) => setLocation(e.target.value)}
//           />
//         </fieldset>
//         <fieldset className="fieldset m-4">
//           <legend className="fieldset-legend text-xl font-medium">Date</legend>
//           <input
//             type="date"
//             className="input w-full border-2 border-gray-500 my-3 p-1 rounded-md"
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </fieldset>
//         <fieldset className="fieldset m-4">
//           <legend className="fieldset-legend text-xl font-medium">Fest Poster</legend>
//           <input
//             type="file"
//             accept="image/*"
//             className="w-full border-2 border-gray-500 my-3 p-1 rounded-md"
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//         </fieldset>
//         <button className="mx-5 bg-blue-500 border-2 border-blue-600 px-2 py-1 text-white font-bold rounded-md">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default NewFest;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const apiUrl = import.meta.env.VITE_API_URL;
function NewFest() {
  const [name, setName] = useState(null);
  const [date, setDate] = useState(null);
  const [college, setCollege] = useState(null);
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('date', date);
    formData.append('college', college);
    formData.append('location', location);
    if (image) formData.append('image', image);

    try {
      const res = await axios.post(`${apiUrl}/fest/new`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res.data);
      Swal.fire({
        title: "Festival created successfully!",
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
      navigate(`/editfestpage/${res.data.data._id}`);
    } catch (error) {
      console.log(error.response.data);
      Swal.fire({
        title: error.response.data,
        timer: 3000,
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
        icon: 'error',
        showClass: {
          popup: 'swal2-noanimation'
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Create New Festival
          </h1>
          <p className="text-slate-600 text-lg max-w-md mx-auto">
            Bring your community together with an amazing festival experience
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
            
            {/* Festival Name */}
            <div className="group">
              <label className="block text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Festival Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-700 text-lg focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 group-hover:border-slate-300"
                  placeholder="Enter festival name..."
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H7z"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* College */}
            <div className="group">
              <label className="block text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                College/Institution
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-700 text-lg focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all duration-300 group-hover:border-slate-300"
                  placeholder="Enter college name..."
                  onChange={(e) => setCollege(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Location and Date Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Location */}
              <div className="group">
                <label className="block text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-700 text-lg focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all duration-300 group-hover:border-slate-300"
                    placeholder="Enter location..."
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="group">
                <label className="block text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Event Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-700 text-lg focus:border-red-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-300 group-hover:border-slate-300"
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="group">
              <label className="block text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Festival Poster
              </label>
              
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={handleImageChange}
                />
                
                {imagePreview ? (
                  <div className="relative border-2 border-dashed border-yellow-300 rounded-2xl p-4 bg-yellow-50/50 hover:border-yellow-400 transition-colors">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <div className="text-center">
                      <p className="text-yellow-700 font-medium">Click to change poster</p>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50 hover:border-yellow-400 hover:bg-yellow-50/50 transition-all duration-300 cursor-pointer">
                    <div className="inline-block p-4 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl mb-4">
                      <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                    </div>
                    <p className="text-slate-600 font-medium mb-2">Upload Festival Poster</p>
                    <p className="text-slate-400 text-sm">Drag and drop or click to browse</p>
                    <p className="text-slate-400 text-xs mt-2">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white font-bold text-lg py-5 rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Creating Festival...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span>Create Festival</span>
                  </div>
                )}
              </button>
            </div>

            {/* Help Text */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Quick Tips</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Choose a catchy and memorable name for your festival</li>
                    <li>• Upload a high-quality poster to attract more participants</li>
                    <li>• Make sure all details are accurate before submitting</li>
                  </ul>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default NewFest;
