import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, User, Mail, School, Phone, Code, Calendar, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate=useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let res;

        try {
          // try fetching user profile first
          res = await axios.get(`${apiUrl}/user/profile`, { withCredentials: true });
        } catch (err) {
          // if user not found, try admin profile
          res = await axios.get(`${apiUrl}/admin/profile`, { withCredentials: true });
        }

        setProfile(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
          <p className="text-gray-600 mt-4 text-center">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex justify-center items-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-red-600 text-lg font-semibold">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-600 text-lg">No profile found.</p>
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = profile.admin === true;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isAdmin ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'
          }`}>
            {isAdmin ? (
              <Shield className="h-10 w-10 text-white" />
            ) : (
              <User className="h-10 w-10 text-white" />
            )}
          </div>
          <h1 className={`text-3xl font-bold bg-gradient-to-r ${
            isAdmin ? 'from-purple-600 to-pink-600' : 'from-blue-600 to-indigo-600'
          } bg-clip-text text-transparent`}>
            {isAdmin ? "Admin Profile" : "User Profile"}
          </h1>
          <p className="text-gray-500 mt-2">Welcome back, {profile.name}!</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${
            isAdmin ? 'from-purple-500 to-pink-500' : 'from-blue-500 to-indigo-500'
          }`}></div>
          
          <div className="p-8">
            <div className="grid gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Full Name</p>
                    <p className="text-lg font-semibold text-gray-900">{profile.name.toUpperCase()}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email Address</p>
                    <p className="text-lg font-semibold text-gray-900">{profile.emailId}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <School className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">College</p>
                    <p className="text-lg font-semibold text-gray-900">{profile.college.toUpperCase()}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Phone Number</p>
                    <p className="text-lg font-semibold text-gray-900">{profile.number}</p>
                  </div>
                </div>
              </div>

              {/* Student Specific Info */}
              {profile.admin === false && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Code className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Branch</p>
                        <p className="text-lg font-semibold text-gray-900">{profile.branch}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Academic Year</p>
                        <p className="text-lg font-semibold text-gray-900">{profile.Year}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="mt-8 text-center">
              <button className={`px-8 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ${
                isAdmin 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
              }`} onClick={()=>navigate("/editProfile")}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}