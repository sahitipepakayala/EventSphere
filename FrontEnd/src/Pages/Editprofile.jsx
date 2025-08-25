import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, User, Mail, School, Phone, Code, Calendar, Shield, Save, X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

export default function EditProfile({ onBack, initialProfile = null }) {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(!initialProfile);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const navigate=useNavigate()
  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
      setFormData({
        name: initialProfile.name || "",
        emailId: initialProfile.emailId || "",
        college: initialProfile.college || "",
        number: initialProfile.number || "",
        branch: initialProfile.branch || "",
        Year: initialProfile.Year || "",
      });
    } else {
      fetchProfile();
    }
  }, [initialProfile]);

  const fetchProfile = async () => {
    try {
      let res;
      try {
        res = await axios.get(`${apiUrl}/user/profile`, { withCredentials: true });
      } catch (err) {
        res = await axios.get(`${apiUrl}/admin/profile`, { withCredentials: true });
      }
      
      setProfile(res.data.data);
      setFormData({
        name: res.data.data.name || "",
        emailId: res.data.data.emailId || "",
        college: res.data.data.college || "",
        number: res.data.data.number || "",
        branch: res.data.data.branch || "",
        Year: res.data.data.Year || "",
      });
    } catch (err) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.emailId.trim()) {
      errors.emailId = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
      errors.emailId = "Email is invalid";
    }
    
    if (!formData.college.trim()) {
      errors.college = "College is required";
    }
    
 if (!formData.number || isNaN(formData.number)) {
  errors.number = "Number is required and must be valid";
} else if (formData.number.toString().length !== 10) {
  errors.number = "Number must be 10 digits";
}


    
    // Validate student-specific fields
    if (profile && profile.admin === false) {
      if (!formData.branch.trim()) {
        errors.branch = "Branch is required";
      }
      if (!formData.Year.trim()) {
        errors.Year = "Year is required";
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const endpoint = profile.admin === true ? "/admin/profile" : "/user/profile";
      const updateData = { ...formData };
      
      // Remove admin-only fields for user updates
      if (profile.admin === false) {
        // Keep student fields
      } else {
        // Remove student fields for admin
        delete updateData.branch;
        delete updateData.Year;
      }
      console.log(`${apiUrl}${endpoint}/edit`)
      await axios.put(`${apiUrl}${endpoint}/edit`, updateData, { withCredentials: true });
      setSuccess("Profile updated successfully!");
      
      // Update local profile state
      setProfile(prev => ({ ...prev, ...updateData }));
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
      navigate("/profile")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

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

  if (error && !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex justify-center items-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-red-600 text-lg font-semibold">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const isAdmin = profile.admin === true;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
            )}
            <div>
              <h1 className={`text-3xl font-bold bg-gradient-to-r ${
                isAdmin ? 'from-purple-600 to-pink-600' : 'from-blue-600 to-indigo-600'
              } bg-clip-text text-transparent`}>
                Edit Profile
              </h1>
              <p className="text-gray-500 mt-1">Update your information</p>
            </div>
          </div>
          
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isAdmin ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'
          }`}>
            {isAdmin ? (
              <Shield className="h-8 w-8 text-white" />
            ) : (
              <User className="h-8 w-8 text-white" />
            )}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${
            isAdmin ? 'from-purple-500 to-pink-500' : 'from-blue-500 to-indigo-500'
          }`}></div>
          
          <div className="p-8">
            {/* Success/Error Messages */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-700 font-medium">{success}</p>
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Basic Information
                </h3>

                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        validationErrors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {validationErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="emailId"
                      value={formData.emailId}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        validationErrors.emailId ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {validationErrors.emailId && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.emailId}</p>
                  )}
                </div>

                {/* College Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    College
                  </label>
                  <div className="relative">
                    <School className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        validationErrors.college ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your college name"
                    />
                  </div>
                  {validationErrors.college && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.college}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        validationErrors.number ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {validationErrors.number && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.number}</p>
                  )}
                </div>
              </div>

              {/* Academic Information (Students Only) */}
              {!isAdmin && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                    <Code className="h-5 w-5 mr-2" />
                    Academic Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Branch Field */}
                   <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Branch
  </label>
  <div className="relative">
    <Code className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
    <select
      name="branch"
      value={formData.branch}
      onChange={handleInputChange}
      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
        validationErrors.branch ? 'border-red-300' : 'border-gray-300'
      }`}
      required
    >
      <option value="">Select Branch</option>
      <option value="CSE">Computer Science</option>
      <option value="ECE">Electronics & Communication</option>
      <option value="EEE">Electrical & Electronics</option>
      <option value="Civil">Civil</option>
      <option value="MECH">Mechanical</option>
      <option value="Other">Other</option>
    </select>
  </div>
  {validationErrors.branch && (
    <p className="mt-1 text-sm text-red-600">{validationErrors.branch}</p>
  )}
</div>


                    {/* Year Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Academic Year
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <select
                          name="Year"
                          value={formData.Year}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors appearance-none bg-white ${
                            validationErrors.Year ? 'border-red-300' : 'border-gray-300'
                          }`}
                        >
                             <option value="" className="text-gray-400">Select Year</option>
                      <option value="First">First Year</option>
                      <option value="Second">Second Year</option>
                      <option value="Third">Third Year</option>
                      <option value="Final">Final Year</option>
                      <option value="Other">Other</option>
                        </select>
                      </div>
                      {validationErrors.Year && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.Year}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                {onBack && (
                  <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={saving}
                  className={`px-8 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2 ${
                    isAdmin 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                  } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}