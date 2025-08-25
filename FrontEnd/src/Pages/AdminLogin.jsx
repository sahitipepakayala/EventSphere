// import React, { useState } from 'react'
// import axios from "axios"
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux"
// import { addUser } from '../Redux/UserSlice';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
// const apiUrl = import.meta.env.VITE_API_URL;

// function AdminLogin() {
//   const [emailId, setEmailid] = useState("bannu149@gmail.com");
//   const [password, setPassword] = useState("bannu@149");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${apiUrl}/admin/login`,
//         { emailId, password },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data.data));
//       localStorage.setItem('user', JSON.stringify(res.data.data));

//       Swal.fire({
//         title: "Logged in successfully",
//         timer: 1000,
//         position: 'top-end',
//         toast: true,
//         showConfirmButton: false,
//         timerProgressBar: true,
//         icon: 'success',
//         customClass: {
//           popup: 'bg-blue-600 text-white'
//         },
//         showClass: {
//           popup: 'swal2-noanimation'
//         },
//         hideClass: {
//           popup: ''
//         }
//       });

//       navigate("/");
//     } catch (error) {
//       Swal.fire({
//         title: error.response?.data?.message || "Login failed",
//         timer: 1000,
//         position: 'top',
//         toast: true,
//         showConfirmButton: false,
//         timerProgressBar: true,
//         icon: 'error',
//         showClass: {
//           popup: 'swal2-noanimation'
//         }
//       });
//       console.log(error);
//     }
//   };

//   return (
//     <div className='flex flex-col justify-center items-center my-10'>
//       <h1 className='text-blue-600 font-bold text-4xl'>Welcome Back To EventSphere</h1>
//       <h1 className='text-2xl font-bold my-5'>Admin Log in</h1>

//       <form
//         className='flex flex-col justify-center border-5 rounded-xl border-blue-200 p-5 shadow-2xl w-full max-w-md'
//         onSubmit={handleSubmit}
//       >
//         <fieldset className="mb-4">
//           <legend className="text-lg font-medium text-gray-800">Email Id</legend>
//           <input
//             type="email"
//             className="border-2 border-gray-400 shadow-sm w-full rounded-xl p-2 text-base hover:shadow-2xl"
//             placeholder="Type here"
//             onChange={(e) => setEmailid(e.target.value)}
//             value={emailId}
//           />
//         </fieldset>

//         <fieldset className="mb-4">
//           <legend className="text-lg font-medium text-gray-800">Password</legend>
//           <input
//             type="password"
//             className="border-2 border-gray-400 shadow-sm w-full rounded-xl p-2 text-base hover:shadow-2xl"
//             placeholder="Type here"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//           />
//         </fieldset>

//         {/* Submit button stays inside form */}
//         <button
//           type="submit"
//           className='flex items-center w-1/2 bg-blue-600 justify-center rounded-md p-2 cursor-pointer text-white font-bold'
//         >
//           Log In
//         </button>
//       </form>

//       {/* Navigation buttons outside the form */}
//       <h1 className='text-gray-800 mt-4'>
//         Don't Have An Admin Account?
//         <button
//           type="button" // prevents submit
//           className='text-blue-900 cursor-pointer ml-1'
//           onClick={() => navigate("/adminsignup")}
//         >
//           <u>Sign In</u>
//         </button>
//       </h1>

//       <h1 className='text-gray-800 mt-1'>
//         Are you a User/Student?{" "}
//         <span
//           className='text-blue-900 cursor-pointer'
//           onClick={() => navigate("/login")}
//         >
//           <u>Log In</u>
//         </span>
//       </h1>
//     </div>
//   );
// }

// export default AdminLogin;

import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { addUser } from '../Redux/UserSlice';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Mail, Lock, Building, Eye, EyeOff } from 'lucide-react';

const apiUrl = import.meta.env.VITE_API_URL;

function AdminLogin() {
  const [emailId, setEmailid] = useState("bannu149@gmail.com");
  const [password, setPassword] = useState("bannu@149");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${apiUrl}/admin/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      localStorage.setItem('user', JSON.stringify(res.data.data));

      Swal.fire({
        title: "Logged in successfully",
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
          popup: 'swal2-noanimation'
        },
        hideClass: {
          popup: ''
        }
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        title: error.response?.data?.message || "Login failed",
        timer: 1000,
        position: 'top',
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
        icon: 'error',
        showClass: {
          popup: 'swal2-noanimation'
        }
      });
      console.log(error);
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
            <p className="text-gray-600 text-lg font-medium">Welcome Back</p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-4"></div>
          </div>

          {/* Form Card */}
          <div className="backdrop-blur-sm bg-white/80 rounded-3xl border border-gray-200 shadow-2xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-white mb-1">Admin Log in</h2>
              <p className="text-blue-100">Access your admin dashboard</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="space-y-6">
                {/* Email */}
                <div className="group">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 transition-colors group-focus-within:text-purple-600" />
                    <input
                      type="email"
                      value={emailId}
                      onChange={(e) => setEmailid(e.target.value)}
                      placeholder="Email Address"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="group">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 transition-colors group-focus-within:text-purple-600" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
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
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all duration-300 transform bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 shadow-xl hover:shadow-2xl active:scale-95"
                >
                  <span className="flex items-center justify-center">
                    🚀 Access Dashboard
                  </span>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center space-y-3">
                  <p className="text-gray-600">
                    Don't Have An Admin Account?{' '}
                    <button
                      type="button"
                      onClick={() => navigate("/adminsignup")}
                      className="text-blue-600 hover:text-purple-600 font-semibold hover:underline transition-all duration-200 transform hover:scale-105 inline-block"
                    >
                      Sign In →
                    </button>
                  </p>
                  <p className="text-gray-600">
                    Are you a User/Student?{' '}
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="text-purple-600 hover:text-blue-600 font-semibold hover:underline transition-all duration-200 transform hover:scale-105 inline-block"
                    >
                      Log In 👤
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Secure admin access protected by{' '}
              <span className="text-blue-600 hover:underline cursor-pointer">Advanced Security</span>
              {' '}and{' '}
              <span className="text-blue-600 hover:underline cursor-pointer">Encryption</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;