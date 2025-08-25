// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
// const apiUrl = import.meta.env.VITE_API_URL;
// function EditWebinar() {
//   const { id } = useParams();
//   const [name, setName] = useState('');
//   const [date, setDate] = useState('');
//   const [college, setCollege] = useState('');
//   const [location, setLocation] = useState('');
//   const [registrationFee,setRegistration]=useState(0);
//   const [description,setDescription]=useState('');
//   const [image, setImage] = useState(null); // new
//   const [previewUrl, setPreviewUrl] = useState(null); // for showing current image

//   const navigate = useNavigate();

//   const fetchFest = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/webinar/${id}`, {
//         withCredentials: true,
//       });
//       const data = res.data;
//       console.log(res.data)
//       setName(data.name);
//       setCollege(data.college);
//       setLocation(data.location);
//       setDate(data.date.slice(0, 10));
//       setPreviewUrl(data.image); // assume backend sends image URL as 'image'
//       setRegistration(data.registrationFee);
//       setDescription(data.description);
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
//       formData.append('registrationFee',registrationFee);
//       formData.append('description',description);
//       if (image) formData.append('image', image);

//       await axios.put(`${apiUrl}/webinar/${id}/edit`, formData, {
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

//       navigate(`/singleWebinar/${id}`);
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <h1 className="text-3xl font-bold mt-4">Edit Webinar</h1>
//       <form
//         className="border-blue-400 border-2 shadow-2xl shadow-gray-500 p-5 my-5 rounded-2xl bg-white w-96"
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
//           <fieldset className="fieldset m-4">
//           <legend className="fieldset-legend text-xl font-medium">Registration Fee</legend>
//           <input
//             type="number"
//             value={registrationFee}
//             className="input w-full border-2 border-gray-500 my-3 p-1 rounded-md"
//             onChange={(e) => setRegistration(e.target.value)}
//           />
//         </fieldset>
//  <fieldset className="fieldset m-4">
//           <legend className="fieldset-legend text-xl font-medium">Description</legend>
//           <textarea
           
//             value={description}
//             cols={30} rows={5}
//             className="input w-full border-2 border-gray-500 my-3 p-1 rounded-md"
//             onChange={(e) => setDescription(e.target.value)}
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

// export default EditWebinar;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const apiUrl = import.meta.env.VITE_API_URL;

function EditWebinar() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [college, setCollege] = useState('');
  const [location, setLocation] = useState('');
  const [registrationFee, setRegistration] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFest = async () => {
    try {
      setFetchLoading(true);
      const res = await axios.get(`${apiUrl}/webinar/${id}`, {
        withCredentials: true,
      });
      const data = res.data;
      console.log(res.data);
      setName(data.name);
      setCollege(data.college);
      setLocation(data.location);
      setDate(data.date.slice(0, 10));
      setPreviewUrl(data.image);
      setRegistration(data.registrationFee);
      setDescription(data.description);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error fetching webinar data",
        text: "Could not load webinar details",
        icon: 'error',
        confirmButtonColor: '#3B82F6'
      });
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
      formData.append('registrationFee', registrationFee);
      formData.append('description', description);
      if (image) formData.append('image', image);

      await axios.put(`${apiUrl}/webinar/${id}/edit`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        title: "Webinar updated successfully!",
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

      navigate(`/singleWebinar/${id}`);
    } catch (error) {
      console.log(error.response?.data || error.message);
      Swal.fire({
        title: "Error updating webinar",
        text: error.response?.data?.message || "Something went wrong",
        icon: 'error',
        confirmButtonColor: '#3B82F6'
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading webinar details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Edit Webinar</h1>
          <p className="text-gray-600">Update your webinar details</p>
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
                    value={registrationFee}
                    onChange={(e) => setRegistration(e.target.value)}
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
              
              {/* Current Image Preview */}
              {previewUrl && (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Webinar Preview"
                    className="w-full h-48 object-cover rounded-lg border-2 border-gray-200 mb-3"
                  />
                  <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-3 py-1">
                    <span className="text-sm font-medium text-gray-700">Current Image</span>
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              
              <p className="text-sm text-gray-500 mt-2">
                {image ? `New image: ${image.name}` : "Upload a new image to replace current poster"}
              </p>
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

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(`/singleWebinar/${id}`)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Updating...
                  </div>
                ) : (
                  'Update Webinar'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Changes will be saved and visible immediately after updating
          </p>
        </div>
      </div>
    </div>
  );
}

export default EditWebinar;