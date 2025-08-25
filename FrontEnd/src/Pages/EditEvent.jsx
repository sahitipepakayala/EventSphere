// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
// function EditEvent() {
//   const { id } = useParams();
//   const [name, setname] = useState('');
//   const [description, setDescription] = useState('');
//   const [date, setdate] = useState('');
//   const [category, setCategory] = useState('');
//   const [image, setImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const navigate = useNavigate();

//   const fetchEvent = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/event/getEvent/${id}`,{withCredentials:true});
//       const data = res.data.data;
//       setCategory(data.category);
//       setname(data.name);
//       setDescription(data.description);
//       setdate(data.date.slice(0, 10));
//       setPreviewUrl(data.image); // image URL from backend
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchEvent();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('name', name);
//       formData.append('description', description);
//       formData.append('date', date);
//       formData.append('category', category);
//       if (image) formData.append('image', image);

//       const res = await axios.put(
//         `${apiUrl}/event/${id}/edit`,
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//         Swal.fire({
//   title:"Edited Event successfully",
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

//       navigate(`/editfestpage/${res.data.data.festId}`);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <h1 className="text-3xl font-bold mt-4">Edit Event</h1>
//       <form
//         className="border-blue-200 border-2 shadow-2xl shadow-gray-500 p-5 my-5 rounded-2xl bg-white w-lg"
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//       >
//         <fieldset className="fieldset m-4">
//           <legend className="fieldset-legend text-xl font-medium">Name</legend>
//           <input
//             type="text"
//             value={name}
//             className="input w-full border-2 border-gray-500 my-3 p-1 rounded-md"
//             onChange={(e) => setname(e.target.value)}
//           />
//         </fieldset>

//         <div className="flex flex-col gap-3 m-4">
//           <legend className="fieldset-legend text-xl font-medium">Category</legend>
//           <select
//             value={category}
//             required
//             className="w-2xs border-2 border-gray-400 p-1 rounded-md"
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="" disabled>Select Category</option>
//             <option value="technical">Technical</option>
//             <option value="non-technical">Non-Technical</option>
//             <option value="cultural">Cultural</option>
//           </select>
//         </div>

//         <fieldset className="fieldset m-4">
//           <legend className="fieldset-legend text-xl font-medium">Image</legend>
//           {previewUrl && (
//             <img
//               src={previewUrl}
//               alt="Event Preview"
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

//         <fieldset className="fieldset mx-4">
//           <legend className="fieldset-legend text-xl font-medium">Date</legend>
//           <input
//             type="date"
//             value={date}
//             className="input w-full border-2 border-gray-500 my-3 p-1 rounded-md"
//             onChange={(e) => setdate(e.target.value)}
//           />
//         </fieldset>

//         <fieldset className="fieldset m-4">
//           <legend className="fieldset-legend text-xl font-medium">Description</legend>
//           <textarea
//             cols={50}
//             rows={10}
//             value={description}
//             className="input w-full border-2 border-gray-500 my-3 p-1 rounded-md"
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </fieldset>

//         <button className="mx-5 bg-blue-500 border-2 border-blue-600 px-2 py-1 text-white font-bold rounded-md">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default EditEvent;




import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const apiUrl = import.meta.env.VITE_API_URL;

function EditEvent() {
  const { id } = useParams();
  const [name, setname] = useState('');
  const [description, setDescription] = useState('');
  const [date, setdate] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${apiUrl}/event/getEvent/${id}`, { withCredentials: true });
      const data = res.data.data;
      setCategory(data.category);
      setname(data.name);
      setDescription(data.description);
      setdate(data.date.slice(0, 10));
      setPreviewUrl(data.image);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create preview URL for new image
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('date', date);
      formData.append('category', category);
      if (image) formData.append('image', image);

      const res = await axios.put(
        `${apiUrl}/event/${id}/edit`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      Swal.fire({
        title: "Event updated successfully!",
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

      navigate(`/editfestpage/${res.data.data.festId}`);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error updating event",
        timer: 2000,
        position: 'top',
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
        icon: 'error',
        showClass: {
          popup: 'swal2-noanimation'
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Edit Event
            </h1>
            <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          <p className="text-gray-600 mt-4 text-lg">Update your event details below</p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
              
              {/* Event Name */}
              <div className="space-y-3">
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  🎯 Event Name
                </label>
                <input
                  type="text"
                  value={name}
                  required
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-800 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter event name..."
                  onChange={(e) => setname(e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="space-y-3">
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  📂 Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-800 bg-white/50 backdrop-blur-sm appearance-none cursor-pointer"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="technical">💻 Technical</option>
                    <option value="non-technical">🎯 Non-Technical</option>
                    <option value="cultural">🎭 Cultural</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-3">
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  🖼️ Event Image
                </label>
                
                {/* Image Preview */}
                {previewUrl && (
                  <div className="relative group">
                    <img
                      src={previewUrl}
                      alt="Event Preview"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white font-medium">Current Event Image</p>
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
                  <div className="w-full px-6 py-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-all duration-300 text-center bg-gray-50/50 backdrop-blur-sm">
                    <div className="text-4xl mb-4">📸</div>
                    <p className="text-gray-600 font-medium">Click to upload new image</p>
                    <p className="text-sm text-gray-400 mt-2">Supports: JPG, PNG, GIF (Max: 5MB)</p>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="space-y-3">
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  📅 Event Date
                </label>
                <input
                  type="date"
                  value={date}
                  required
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-800 bg-white/50 backdrop-blur-sm"
                  onChange={(e) => setdate(e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  📝 Description
                </label>
                <textarea
                  rows={8}
                  value={description}
                  required
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-800 bg-white/50 backdrop-blur-sm resize-none"
                  placeholder="Describe your event in detail..."
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="text-right">
                  <span className="text-sm text-gray-400">
                    {description.length}/500 characters
                  </span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-200"
                >
                  ← Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                      Updating...
                    </div>
                  ) : (
                    '✨ Update Event'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            💡 Tip: Make sure to add an engaging description and high-quality image to attract more participants!
          </p>
        </div>
      </div>
    </div>
  );
}

export default EditEvent;