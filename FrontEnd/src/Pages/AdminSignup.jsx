// import React, { useState } from 'react'
// import axios from "axios"
// import { useNavigate } from 'react-router-dom';
// import {useDispatch} from "react-redux"
// import { addUser } from '../Redux/UserSlice';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
// function AdminSignup() {  const [name,setname]=useState(null);
//     const [emailId,setEmailid]=useState(null);
//     const [password,setPassword]=useState(null);
//     const [college,setCollege]=useState(null);
//     const [number,setNumber]=useState(0);
//     const navigate=useNavigate();
//     const dispatch=useDispatch();


//     const handleSubmit=async(e)=>{
//         e.preventDefault();
//        try{
//        const res=await axios.post("${apiUrl}/admin/signup",{name,college,number,emailId,password}, { withCredentials: true });
//         dispatch(addUser(res.data.data))
//         localStorage.setItem('user', JSON.stringify(res.data.data));
//         Swal.fire({
//   title: "signed in successfully",
//   timer: 1000,
//   position: 'top-end',
//   toast: true,
//   showConfirmButton: false,
//   timerProgressBar: true,
//   icon: 'success',
//   customClass: {
//     popup: 'bg-blue-600 text-white'
//   },
//   showClass: {
//     popup: 'swal2-noanimation'  // disables show animation
//   },
//   hideClass: {
//     popup: '' // disables hide animation
//   }
// });

//         navigate("/")

//        }
//        catch(error)
//        {
//           Swal.fire({
//                     title: error.response.data.message,
//                     timer: 1000,
//                     position: 'top',
//                     toast: true,
//                     showConfirmButton: false,
//                     timerProgressBar: true,
//                     icon: 'success',
                  
//                     showClass: {
//                       popup: 'swal2-noanimation'  // disables show animation
//                     },
                    
//                   });
//         console.log(error)
//        }
//     }
//   return (
//     <div className='flex flex-col justify-center items-center my-10'>
//         <h1 className='text-blue-600 font-bold text-4xl'>Welcome To EventSphere</h1>
//         <h1 className='text-2xl font-bold my-5'>Admin Sign in</h1>
//       <form className='flex flex-col justify-center border-5 rounded-xl border-blue-200 p-5 shadow-2xl w-full max-w-md' onSubmit={handleSubmit}>
//   <fieldset className="mb-4">
//     <legend className="text-lg font-medium text-gray-800">Name</legend>
//     <input
//       type="text"
//       className="border-2 border-gray-400 shadow-sm w-full rounded-xl p-2 text-base hover:shadow-2xl"
//       placeholder="Type here"  onChange={(e)=>setname(e.target.value)}
//     />
//   </fieldset>

//   <fieldset className="mb-4">
//     <legend className="text-lg font-medium text-gray-800">Email Id</legend>
//     <input
//       type="email"
//       className="border-2 border-gray-400 shadow-sm w-full rounded-xl p-2 text-base hover:shadow-2xl"
//       placeholder="Type here" onChange={(e)=> setEmailid(e.target.value)}
//     />
//   </fieldset>

//   <fieldset className="mb-4">
//     <legend className="text-lg font-medium text-gray-800">Password</legend>
//     <input
//       type="password"
//       className="border-2 border-gray-400 shadow-sm w-full rounded-xl p-2 text-base hover:shadow-2xl"
//       placeholder="Type here" onChange={(e)=>setPassword(e.target.value)}
//     />
//   </fieldset>

//   <fieldset className="mb-4">
//     <legend className="text-lg font-medium text-gray-800">College</legend>
//     <input
//       type="text"
//       className="border-2 border-gray-400 shadow-sm w-full rounded-xl p-2 text-base hover:shadow-2xl"
//       placeholder="Type here"  onChange={(e)=> setCollege(e.target.value)}
//     />
//   </fieldset>

//   <fieldset className="mb-4">
//     <legend className="text-lg font-medium text-gray-800">Number</legend>
//     <input
//       type="number"
//       className="border-2 border-gray-400 shadow-sm w-full rounded-xl p-2 text-base hover:shadow-2xl"
//       placeholder="Type here"  onChange={(e)=> setNumber(e.target.value)}
//     />
//   </fieldset>
//   <div className='flex flex-col justify-center items-center'>
//   <button className='flex items-center w-1/2 bg-blue-600 justify-center rounded-md p-2 cursor-pointer text-white font-bold' >SignUp</button>
//   <h1 className='text-gray-800 mt-1'>Already Have An Account? <span className='text-blue-900  cursor-pointer'  onClick={()=>navigate("/adminlogin")}><u>Log In</u></span></h1>
//     <h1 className='text-gray-800 mt-1'>Are you an User/student? <span className='text-blue-900 cursor-pointer '  onClick={()=>navigate("/signup")}><u>Sign In</u></span></h1>
 
//   </div>
// </form>

//     </div>
//   )
// }

// export default AdminSignup





import React, { useState } from 'react';
import { User, Mail, Lock, Building, Phone, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../Redux/UserSlice';
const apiUrl = import.meta.env.VITE_API_URL;
import axios from "axios"
import Swal from 'sweetalert2/dist/sweetalert2.js'
 import 'sweetalert2/src/sweetalert2.scss'
import { useDispatch } from 'react-redux';

function AdminSignup() {
  const [name, setName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  
  const [college, setCollege] = useState('');
  const [number, setNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!emailId.trim()) newErrors.emailId = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(emailId)) newErrors.emailId = 'Email is invalid';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!college.trim()) newErrors.college = 'College is required';
    if (!number.trim()) newErrors.number = 'Phone number is required';
    else if (!/^\d{10}$/.test(number)) newErrors.number = 'Phone number must be 10 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
       const res=await axios.post(`${apiUrl}/admin/signup`,{name,college,number,emailId,password}, { withCredentials: true });
       console.log(res.data)
         dispatch(addUser(res.data));
         localStorage.setItem('user', JSON.stringify(res.data.data));
       Swal.fire({
   title: "Signedin successfully",
   timer: 1000,
   position: 'top-end',
   toast: true,
  showConfirmButton: false,
   timerProgressBar: true,
   icon: 'success',
   customClass: {
     popup: 'bg-blue-600 text-white'
   },
   showClass: {
     popup: 'swal2-noanimation'  // disables show animation
   },
   hideClass: {
     popup: '' // disables hide animation
   }}
  )
      // Success notification would go here
      console.log('User signup successful', { name, emailId, college, number});
      navigate("/")
      
    } catch (error) {
      console.error('Signup error:', error);
       Swal.fire({
   title: "Error in Sign in",
   timer: 1000,
   position: 'top-end',
   toast: true,
  showConfirmButton: false,
   timerProgressBar: true,
   icon: 'success',
   customClass: {
     popup: 'bg-blue-600 text-white'
   },
   showClass: {
     popup: 'swal2-noanimation'  // disables show animation
   },
   hideClass: {
     popup: '' // disables hide animation
   }}
  )
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl transform hover:scale-110 transition-all duration-300">
              <Building className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-3">
              EventSphere
            </h1>
            <p className="text-gray-600 text-lg font-medium">Join the Revolution</p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-4"></div>
          </div>

          {/* Form Card */}
          <div className="backdrop-blur-sm bg-white/80 rounded-3xl border border-gray-200 shadow-2xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-white mb-1">Create Your Admin Account</h2>
              <p className="text-blue-100">Begin your journey with us</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="space-y-6">
                {/* Full Name */}
                <div className="group">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 transition-colors group-focus-within:text-purple-600" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm mt-2 ml-2">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="group">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 transition-colors group-focus-within:text-purple-600" />
                    <input
                      type="email"
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                      placeholder="Email Address"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                    />
                  </div>
                  {errors.emailId && <p className="text-red-500 text-sm mt-2 ml-2">{errors.emailId}</p>}
                </div>

                {/* Password */}
                <div className="group">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 transition-colors group-focus-within:text-purple-600" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create Password"
                      className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-purple-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-2 ml-2">{errors.password}</p>}
                </div>

                {/* College */}
                <div className="group">
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 transition-colors group-focus-within:text-purple-600" />
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="College/Institution"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                    />
                  </div>
                  {errors.college && <p className="text-red-500 text-sm mt-2 ml-2">{errors.college}</p>}
                </div>

              

                {/* Phone Number */}
                <div className="group">
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 transition-colors group-focus-within:text-purple-600" />
                    <input
                      type="tel"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder="Phone Number"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                    />
                  </div>
                  {errors.number && <p className="text-red-500 text-sm mt-2 ml-2">{errors.number}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all duration-300 transform ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 shadow-xl hover:shadow-2xl active:scale-95'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Creating Your Account...
                    </div>
                  ) : (
                    <span className="flex items-center justify-center">
                      🚀 Launch My Journey
                    </span>
                  )}
                </button>
              </div>

              {/* Navigation Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center space-y-3">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => navigate("/adminlogin")}
                      className="text-blue-600 hover:text-purple-600 font-semibold hover:underline transition-all duration-200 transform hover:scale-105 inline-block"
                    >
                      Sign In →
                    </button>
                  </p>
                  <p className="text-gray-600">
                    Are you an User?{' '}
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="text-purple-600 hover:text-blue-600 font-semibold hover:underline transition-all duration-200 transform hover:scale-105 inline-block"
                    >
                      User Portal
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              By creating an account, you agree to our{' '}
              <span className="text-blue-600 hover:underline cursor-pointer">Terms of Service</span>
              {' '}and{' '}
              <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default AdminSignup;