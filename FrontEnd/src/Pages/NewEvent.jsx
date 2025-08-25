// import React, { useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios';
// const apiUrl = import.meta.env.VITE_API_URL;
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
// function NewEvent() {
//     const {id}=useParams();
//     const [name, setname] = useState("");
// const [description, setDescription] = useState("");
// const [date, setdate] = useState("");
// const [category, setCategory] = useState("");
// const [image,setImage]=useState(null)

//     const navigate=useNavigate();

//     const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("date", date);
//     formData.append("category", category);
//     if (image) formData.append("image", image);

//     await axios.post(
//       `${apiUrl}/event/${id}/newEvent`,
//       formData,
//       {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     Swal.fire({
//   title: "Event Added Successfully",
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
//     navigate(`/editfestpage/${id}`);
//   } catch (error) {
//      Swal.fire({
//                         title: error.response.data,
//                         timer: 1000,
//                         position: 'top',
//                         toast: true,
//                         showConfirmButton: false,
//                         timerProgressBar: true,
//                         icon: 'success',
                      
//                         showClass: {
//                           popup: 'swal2-noanimation'  // disables show animation
//                         },
                        
//                       });
//     console.log(error);
//   }
// };

//   return (
//    <div className='flex flex-col items-center justify-center'>
//         <h1 className='text-3xl font-bold mt-4'>New Event</h1>
//         <form className='border-blue-200 border-2 shadow-2xl shadow-gray-500 p-5 my-5 rounded-md w-lg' onSubmit={handleSubmit}>
//                     <fieldset className="fieldset m-4">
//         <legend className="fieldset-legend text-xl font-medium">Name</legend>
//         <input type="text" className="input w-full border-2 border-gray-500 my-3 p-1 rounded-md" placeholder="Type here" onChange={(e)=>setname(e.target.value)} />
//         </fieldset>
//         <div  className='flex flex-col gap-3 m-4'>
//               <legend className="fieldset-legend text-xl font-medium">Category</legend>
//       <select
//   value={category}
//   required
//   className="w-2xs border-2 border-gray-400 p-1 rounded-md"
//   onChange={(e) => setCategory(e.target.value)}
// >
//   <option value="" disabled>Select Category</option>
//   <option value="technical">Technical</option>
//   <option value="non-technical">Non-Technical</option>
//   <option value="cultural">Cultural</option>
// </select>


//      </div>  
//      <fieldset className="fieldset m-4">
//   <legend className="fieldset-legend text-xl font-medium">Image</legend>
//   <input 
//     type="file" 
//     accept="image/*" 
//     className="w-full border-2 border-gray-500 my-3 p-1 rounded-md"
//     onChange={(e) => setImage(e.target.files[0])}
//   />
// </fieldset>
//         <fieldset className="fieldset  mx-4">
//         <legend className="fieldset-legend text-xl font-medium">Date</legend>
//         <input type="date" className="input  w-full border-2 border-gray-500 my-3 p-1 rounded-md" placeholder="Type here"  onChange={(e)=>setdate(e.target.value)}/>
//         </fieldset>
//          <fieldset className="fieldset m-4">
//         <legend className="fieldset-legend text-xl font-medium">Description</legend>
//         <textarea cols={50} rows={10} className="input  w-full border-2 border-gray-500 my-3 p-1 rounded-md" placeholder="Type here"  onChange={(e)=>setDescription(e.target.value)} />
//         </fieldset>
//         <button className='mx-5 bg-blue-500 border-2 border-blue-600 px-2 py-1 text-white font-bold rounded-md'>Submit</button>
//         </form>
//     </div>
//   )
// }

// export default NewEvent


import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Calendar, Tag, FileText, ImageIcon, Sparkles, Plus, Clock } from 'lucide-react';

const apiUrl = import.meta.env.VITE_API_URL;

function NewEvent() {
    const { id } = useParams();
    const [name, setname] = useState("");
    const [description, setDescription] = useState("");
    const [date, setdate] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null)
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
        
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("date", date);
            formData.append("category", category);
            if (image) formData.append("image", image);

            await axios.post(
                `${apiUrl}/event/${id}/newEvent`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            Swal.fire({
                title: "Event Added Successfully",
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
            Swal.fire({
                title: error.response.data,
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
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const categoryIcons = {
        technical: "💻",
        "non-technical": "🎯",
        cultural: "🎭"
    };

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-bl from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-violet-200 to-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl mb-8 shadow-2xl transform hover:scale-110 transition-all duration-300">
                            <Plus className="w-12 h-12 text-white" />
                        </div>
                        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                            Create New Event
                        </h1>
                        <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
                            Add an exciting event to your festival and create memorable experiences for participants
                        </p>
                        <div className="w-32 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mt-8"></div>
                    </div>

                    {/* Form Container */}
                    <div className="backdrop-blur-sm bg-white/90 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-12 py-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Event Details</h2>
                            <p className="text-emerald-100 text-lg">Fill in the information to create an amazing event</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-12">
                            <div className="space-y-8">
                                
                                {/* Event Name */}
                                <div className="group">
                                    <label className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-4">
                                        <div className="p-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl">
                                            <Sparkles className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        Event Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 text-lg placeholder-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all duration-300 hover:border-gray-300"
                                        placeholder="Enter an exciting event name..."
                                        onChange={(e) => setname(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Category and Date Grid */}
                                <div className="grid lg:grid-cols-2 gap-8">
                                    {/* Category */}
                                    <div className="group">
                                        <label className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-4">
                                            <div className="p-2 bg-gradient-to-r from-purple-100 to-violet-100 rounded-xl">
                                                <Tag className="w-5 h-5 text-purple-600" />
                                            </div>
                                            Category
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={category}
                                                required
                                                className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 text-lg focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all duration-300 hover:border-gray-300 appearance-none cursor-pointer"
                                                onChange={(e) => setCategory(e.target.value)}
                                            >
                                                <option value="" disabled>Select Event Category</option>
                                                <option value="technical">💻 Technical</option>
                                                <option value="non-technical">🎯 Non-Technical</option>
                                                <option value="cultural">🎭 Cultural</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </div>
                                        </div>
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
                                            className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 text-lg focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-100 transition-all duration-300 hover:border-gray-300"
                                            onChange={(e) => setdate(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div className="group">
                                    <label className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-4">
                                        <div className="p-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl">
                                            <ImageIcon className="w-5 h-5 text-yellow-600" />
                                        </div>
                                        Event Image
                                    </label>
                                    
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            onChange={handleImageChange}
                                        />
                                        
                                        {imagePreview ? (
                                            <div className="relative border-2 border-dashed border-yellow-300 rounded-2xl p-6 bg-gradient-to-br from-yellow-50 to-orange-50 hover:border-yellow-400 transition-all duration-300">
                                                <img 
                                                    src={imagePreview} 
                                                    alt="Preview" 
                                                    className="w-full h-48 object-cover rounded-xl mb-4 shadow-lg"
                                                />
                                                <div className="text-center">
                                                    <p className="text-yellow-700 font-semibold">✨ Great choice! Click to change image</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gradient-to-br from-gray-50 to-slate-50 hover:from-yellow-50 hover:to-orange-50 hover:border-yellow-400 transition-all duration-300 cursor-pointer">
                                                <div className="inline-block p-4 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl mb-4">
                                                    <ImageIcon className="w-8 h-8 text-yellow-600" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Event Image</h3>
                                                <p className="text-gray-500 text-sm mb-4">Drag and drop or click to browse</p>
                                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl text-sm">
                                                    <Plus className="w-4 h-4" />
                                                    Choose Image
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="group">
                                    <label className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-4">
                                        <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                        </div>
                                        Event Description
                                    </label>
                                    <textarea
                                        rows={6}
                                        className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 text-lg placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300 resize-none"
                                        placeholder="Describe your event in detail. What makes it special? What can participants expect?"
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-8">
                                    <button 
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white font-bold text-xl py-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-200 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-2xl hover:shadow-3xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center gap-4">
                                                <div className="animate-spin rounded-full h-7 w-7 border-b-3 border-white"></div>
                                                <span>Creating Event...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-4">
                                                <Plus className="w-7 h-7" />
                                                <span>🎉 Create Event</span>
                                            </div>
                                        )}
                                    </button>
                                </div>

                                {/* Category Guide */}
                                <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-100 rounded-2xl p-8 mt-10">
                                    <div className="text-center mb-6">
                                        <h4 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                                            Event Categories Guide
                                        </h4>
                                        <p className="text-gray-600">Choose the right category to help participants find your event</p>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="text-center p-4 bg-white/60 rounded-xl border border-white/40">
                                            <div className="text-4xl mb-3">💻</div>
                                            <h5 className="font-semibold text-emerald-700 mb-2">Technical</h5>
                                            <p className="text-sm text-gray-600">Coding, hackathons, workshops</p>
                                        </div>
                                        <div className="text-center p-4 bg-white/60 rounded-xl border border-white/40">
                                            <div className="text-4xl mb-3">🎯</div>
                                            <h5 className="font-semibold text-teal-700 mb-2">Non-Technical</h5>
                                            <p className="text-sm text-gray-600">Quiz, debate, business events</p>
                                        </div>
                                        <div className="text-center p-4 bg-white/60 rounded-xl border border-white/40">
                                            <div className="text-4xl mb-3">🎭</div>
                                            <h5 className="font-semibold text-cyan-700 mb-2">Cultural</h5>
                                            <p className="text-sm text-gray-600">Dance, music, arts, drama</p>
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

export default NewEvent