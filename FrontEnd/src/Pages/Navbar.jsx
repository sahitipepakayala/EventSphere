import React, { useState } from 'react';
import { Home, Info, Calendar, Plus, Users, LogOut, UserPlus, Sun, Moon, Menu, X, Globe } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { removeUser } from '../Redux/UserSlice';
import 'sweetalert2/src/sweetalert2.scss';
const apiUrl = import.meta.env.VITE_API_URL;
function Navbar({ darkMode = false, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  
const handleLogout = async (e) => {
  e.preventDefault();
  try {
    // Tell backend to clear cookie
    await axios.get(`${apiUrl}/logout`, { withCredentials: true });

    // Clear frontend state
    localStorage.removeItem('user');
    dispatch(removeUser());

    Swal.fire({
      title: "Logged out successfully",
      timer: 1000,
      position: 'top-end',
      toast: true,
      showConfirmButton: false,
      timerProgressBar: true,
      icon: 'success',
      customClass: {
        popup: 'bg-green-600 text-white'
      }
    });

    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { label: 'About', path: '/about', icon: Info },
    ...(user?.admin
      ? [
          { label: 'Fests', path: `/festsAuthor/${user._id}`, icon: Calendar },
          { label: 'New Fest', path: '/newfest', icon: Plus }
        ]
      : user
      ? [{ label: 'Registered Events', path: '/registeredEvents', icon: Users }]
      : [])
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${darkMode ? 'bg-gray-900/95 border-b border-gray-800' : 'bg-white/95 border-b border-gray-200 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="relative">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                darkMode
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25'
                  : 'bg-gradient-to-br from-blue-600 to-purple-700 shadow-lg shadow-blue-600/25'
              } group-hover:scale-110`}>
                <Globe size={20} className="text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            </div>
            <h1 className={`text-xl font-bold bg-gradient-to-r ${
              darkMode
                ? 'from-blue-400 to-purple-400'
                : 'from-blue-600 to-purple-700'
            } bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105`}>
              EventSphere
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            {toggleDarkMode && (
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                  darkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {/* Desktop User Section */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    darkMode
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  }`} onClick={()=>navigate('/profile')}>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                      darkMode
                        ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
                        : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                    }`}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/signup")}
                  className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                  }`}
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`md:hidden p-2 rounded-xl transition-all duration-300 ${
                darkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden absolute top-16 left-0 right-0 rounded-b-2xl shadow-2xl border-t transition-all duration-300 ${
            darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.path}
                    onClick={() => {
                      navigate(link.path);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{link.label}</span>
                  </button>
                );
              })}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        darkMode
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      }`}>
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                        {user.name || 'User'}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        handleLogout(e);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        darkMode
                          ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
                          : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                      }`}
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/signup");
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center justify-center gap-3 w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      darkMode
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    }`}
                  >
                    <UserPlus size={20} />
                    <span>Sign Up</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
