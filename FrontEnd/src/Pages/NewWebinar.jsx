// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
// const apiUrl = import.meta.env.VITE_API_URL;
// function NewWebinar() {
//   const [name, setName] = useState(null);
//   const [date, setDate] = useState(null);
//   const [college, setCollege] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [image, setImage] = useState(null);
//   const [description,setDescription]=useState("");
//   const [fee,setFee]=useState(0);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('date', date);
//     formData.append('college', college);
//     formData.append('location', location);
//     formData.append('description',description);
//     formData.append('registrationFee',fee)
//     if (image) formData.append('image', image); // must match backend field name

//     try {
//       const res = await axios.post(`${apiUrl}/webinar/newWebinar`, formData, {
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
//       navigate(`/webinar`);
//     } catch (error) {
//       console.log(error.response.data);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <h1 className="text-3xl font-bold mt-4">New Webinar</h1>
//       <form
//         className="border-blue-200 border-2 shadow-2xl shadow-gray-500 p-5 my-5 rounded-md w-96"
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
//           <fieldset className="fieldset m-4">
//           <legend className="fieldset-legend text-xl font-medium">Registration fee</legend>
//           <input
//             type="number"
//             className="input w-full border-2 border-gray-500 my-3 p-1 rounded-md"
//             onChange={(e) => setFee(e.target.value)}
//           />
//         </fieldset>
//         <fieldset className="fieldset m-4">
//           <legend className="fieldset-legend text-xl font-medium">Webinar Poster</legend>
//           <input
//             type="file"
//             accept="image/*"
//             className="w-full border-2 border-gray-500 my-3 p-1 rounded-md"
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//         </fieldset>
        
//           <fieldset className="fieldset m-4">
//         <legend className="fieldset-legend text-xl font-medium">Description</legend>
//         <textarea cols={50} rows={10} className="input  w-full border-2 border-gray-500 my-3 p-1 rounded-md" placeholder="Type here"  onChange={(e)=>setDescription(e.target.value)} />
//         </fieldset>
//         <button className="mx-5 bg-blue-500 border-2 border-blue-600 px-2 py-1 text-white font-bold rounded-md">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default NewWebinar;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const apiUrl = import.meta.env.VITE_API_URL;

function NewWebinar() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [college, setCollege] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [fee, setFee] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('date', date);
    formData.append('college', college);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('registrationFee', fee);
    if (image) formData.append('image', image);

    try {
      const res = await axios.post(`${apiUrl}/webinar/newWebinar`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res.data);
      Swal.fire({
        title: "Webinar created successfully!",
        timer: 2000,
        position: 'top',
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
        icon: 'success',
        showClass: {
          popup: 'swal2-noanimation'
        },
      });
      navigate(`/webinar`);
    } catch (error) {
      console.log(error.response?.data);
      Swal.fire({
        title: "Error creating webinar",
        text: error.response?.data?.message || "Something went wrong",
        icon: 'error',
        confirmButtonColor: '#3B82F6'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create New Webinar</h1>
          <p className="text-gray-600">Fill in the details to create your webinar event</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            
            {/* Webinar Name */}
            <div className="space-y-2">
              <label className="text-lg font-semibold text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Webinar Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700"
                placeholder="Enter webinar name"
                required
              />
            </div>

            {/* College and Location Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-lg font-semibold text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  College/Organization
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700"
                  placeholder="Enter college/organization name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-lg font-semibold text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700"
                  placeholder="Enter location"
                  required
                />
              </div>
            </div>

            {/* Date and Fee Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-lg font-semibold text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-lg font-semibold text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  Registration Fee
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                  <input
                    type="number"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Webinar Poster */}
            <div className="space-y-2">
              <label className="text-lg font-semibold text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                Webinar Poster
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {image && (
                  <p className="mt-2 text-sm text-green-600">✓ {image.name} selected</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-lg font-semibold text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="6"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700 resize-vertical"
                placeholder="Describe your webinar, topics to be covered, target audience, etc..."
                required
              />
              <p className="text-sm text-gray-500">{description.length}/500 characters</p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Webinar...
                  </div>
                ) : (
                  'Create Webinar'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Make sure all information is accurate before submitting
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewWebinar;