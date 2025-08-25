// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
// const apiUrl = import.meta.env.VITE_API_URL;
// function EditFest() {
//   const { id } = useParams();
//   const [name, setName] = useState('');
//   const [date, setDate] = useState('');
//   const [college, setCollege] = useState('');
//   const [location, setLocation] = useState('');
//   const [image, setImage] = useState(null); // new
//   const [previewUrl, setPreviewUrl] = useState(null); // for showing current image

//   const navigate = useNavigate();

//   const fetchFest = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/fest/${id}`, {
//         withCredentials: true,
//       });
//       const data = res.data;
//       setName(data.name);
//       setCollege(data.college);
//       setLocation(data.location);
//       setDate(data.date.slice(0, 10));
//       setPreviewUrl(data.image); // assume backend sends image URL as 'image'
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchFest();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('name', name);
//       formData.append('date', date);
//       formData.append('college', college);
//       formData.append('location', location);
//       if (image) formData.append('image', image);

//       await axios.put(`${apiUrl}/fest/${id}/edit`, formData, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       Swal.fire({
//   title:"Edited Fest successfully",
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

//       navigate(`/editfestpage/${id}`);
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <h1 className="text-3xl font-bold mt-4">Edit Fest</h1>
//       <form
//         className="border-blue-200 border-2 shadow-2xl shadow-gray-500 p-5 my-5 rounded-2xl bg-white w-96"
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//       >
//         <fieldset className="fieldset m-4">
//           <legend className="fieldset-legend text-xl font-medium">Name</legend>
//           <input
//             type="text"
//             value={name}
//             className="input w-full border-2 border-gray-500 my-3 p-1 rounded-md"
//             onChange={(e) => setName(e.target.value)}
//           />
//         </fieldset>

//         <fieldset className="fieldset m-4">
//           <legend className="fieldset-legend text-xl font-medium">College</legend>
//           <input
//             type="text"
//             value={college}
//             className="input w-full border-2 border-gray-500 my-3 p-1 rounded-md"
//             onChange={(e) => setCollege(e.target.value)}
//           />
//         </fieldset>

//         <fieldset className="fieldset m-4">
//           <legend className="fieldset-legend text-xl font-medium">Location</legend>
//           <input
//             type="text"
//             value={location}
//             className="input w-full border-2 border-gray-500 my-3 p-1 rounded-md"
//             onChange={(e) => setLocation(e.target.value)}
//           />
//         </fieldset>

//         <fieldset className="fieldset m-4">
//           <legend className="fieldset-legend text-xl font-medium">Date</legend>
//           <input
//             type="date"
//             value={date}
//             className="input w-full border-2 border-gray-500 my-3 p-1 rounded-md"
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </fieldset>

//         <fieldset className="fieldset m-4">
//           <legend className="fieldset-legend text-xl font-medium">Poster Image</legend>
//           {previewUrl && (
//             <img
//               src={previewUrl}
//               alt="Fest Preview"
//               className="mb-3 rounded-md w-full object-cover max-h-52"
//             />
//           )}
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

// export default EditFest;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Calendar, MapPin, Building2, ImageIcon, Edit3, Save, Loader2 } from 'lucide-react';

const apiUrl = import.meta.env.VITE_API_URL;

function EditFest() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [college, setCollege] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const navigate = useNavigate();

  const fetchFest = async () => {
    try {
      setFetchLoading(true);
      const res = await axios.get(`${apiUrl}/fest/${id}`, {
        withCredentials: true,
      });
      const data = res.data;
      setName(data.name);
      setCollege(data.college);
      setLocation(data.location);
      setDate(data.date.slice(0, 10));
      setPreviewUrl(data.image);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchFest();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('date', date);
      formData.append('college', college);
      formData.append('location', location);
      if (image) formData.append('image', image);

      await axios.put(`${apiUrl}/fest/${id}/edit`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      Swal.fire({
        title: "Edited Fest successfully",
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

      navigate(`/editfestpage/${id}`);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl mb-6">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Festival Data...</h2>
          <p className="text-gray-600">Please wait while we fetch the details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-br from-violet-200 to-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-bl from-pink-200 to-rose-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-indigo-200 to-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-3xl mb-8 shadow-2xl transform hover:scale-110 transition-all duration-300">
              <Edit3 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Edit Festival
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
              Update your festival details and make it even more amazing
            </p>
            <div className="w-32 h-1.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto mt-8"></div>
          </div>

          {/* Form Container */}
          <div className="backdrop-blur-sm bg-white/90 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 px-12 py-8">
              <h2 className="text-3xl font-bold text-white mb-2">Festival Information</h2>
              <p className="text-violet-100 text-lg">Update the details to perfect your festival</p>
            </div>
            
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-12">
              <div className="space-y-8">
                
                {/* Festival Name */}
                <div className="group">
                  <label className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-4">
                    <div className="p-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl">
                      <Edit3 className="w-5 h-5 text-violet-600" />
                    </div>
                    Festival Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 text-lg placeholder-gray-400 focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100 transition-all duration-300 hover:border-gray-300"
                    placeholder="Enter festival name..."
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* College */}
                <div className="group">
                  <label className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-4">
                    <div className="p-2 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl">
                      <Building2 className="w-5 h-5 text-indigo-600" />
                    </div>
                    College/Institution
                  </label>
                  <input
                    type="text"
                    value={college}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 text-lg placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300 hover:border-gray-300"
                    placeholder="Enter college name..."
                    onChange={(e) => setCollege(e.target.value)}
                    required
                  />
                </div>

                {/* Location and Date Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Location */}
                  <div className="group">
                    <label className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-4">
                      <div className="p-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                      </div>
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 text-lg placeholder-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all duration-300 hover:border-gray-300"
                      placeholder="Enter location..."
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>

                  {/* Date */}
                  <div className="group">
                    <label className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-4">
                      <div className="p-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl">
                        <Calendar className="w-5 h-5 text-rose-600" />
                      </div>
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 text-lg focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-100 transition-all duration-300 hover:border-gray-300"
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="group">
                  <label className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-4">
                    <div className="p-2 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl">
                      <ImageIcon className="w-5 h-5 text-amber-600" />
                    </div>
                    Festival Poster
                  </label>
                  
                  <div className="space-y-4">
                    {/* Current/Preview Image */}
                    {previewUrl && (
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt="Festival Preview"
                          className="w-full h-64 object-cover rounded-2xl shadow-lg border-2 border-gray-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 rounded-2xl flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg opacity-0 hover:opacity-100 transition-all duration-300">
                            <p className="text-sm font-medium text-gray-700">Click below to change poster</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* File Input */}
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handleImageChange}
                      />
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gradient-to-br from-gray-50 to-slate-50 hover:from-amber-50 hover:to-yellow-50 hover:border-amber-400 transition-all duration-300 cursor-pointer">
                        <div className="inline-block p-4 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl mb-4">
                          <ImageIcon className="w-8 h-8 text-amber-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          {previewUrl ? 'Change Festival Poster' : 'Upload Festival Poster'}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4">
                          {previewUrl ? 'Select a new image to replace the current poster' : 'Drag and drop or click to browse'}
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold rounded-xl text-sm">
                          <ImageIcon className="w-4 h-4" />
                          {previewUrl ? 'Change Image' : 'Choose File'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-xl py-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-violet-200 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-2xl hover:shadow-3xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-4">
                        <Loader2 className="w-7 h-7 animate-spin" />
                        <span>Updating Festival...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-4">
                        <Save className="w-7 h-7" />
                        <span>💫 Save Changes</span>
                      </div>
                    )}
                  </button>
                </div>

                {/* Help Section */}
                <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-pink-50 border-2 border-violet-100 rounded-2xl p-8 mt-10">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Editing Tips
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-violet-700">
                          <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                          <span>Only upload a new image if you want to change it</span>
                        </div>
                        <div className="flex items-center gap-3 text-purple-700">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Make sure all information is current and accurate</span>
                        </div>
                        <div className="flex items-center gap-3 text-pink-700">
                          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          <span>Changes will be reflected immediately after saving</span>
                        </div>
                        <div className="flex items-center gap-3 text-indigo-700">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <span>Double-check dates and locations for accuracy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditFest;