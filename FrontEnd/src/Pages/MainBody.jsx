import React, { useEffect, useState } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
import {
  Search,
  Calendar,
  Users,
  Zap,
  Palette,
  Video,
  Sun,
  Moon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function MainBody() {
  const [fests, setFests] = useState([]);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllFests();
  }, []);

  const fetchAllFests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/fest/allFests`, {
        withCredentials: true
      });
      setFests(res.data.data);
    } catch (error) {
      console.log(error);
      // Fallback for demo purposes
      setFests([
        { _id: '1', name: 'Tech Summit 2024', category: 'Technical', date: '2024-03-15' },
        { _id: '2', name: 'Cultural Fest', category: 'Cultural', date: '2024-03-20' },
        { _id: '3', name: 'Startup Webinar', category: 'Webinar', date: '2024-03-25' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${apiUrl}/fest/all?search=${search}`,
        { withCredentials: true }
      );
      setFests(res.data);
      setSearch('');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const categories = [
    {
      id: 'technical',
      label: 'Technical',
      icon: Zap,
      gradient: 'from-blue-500 to-cyan-500',
      path: '/events/technical'
    },
    {
      id: 'non-technical',
      label: 'Non-Technical',
      icon: Users,
      gradient: 'from-green-500 to-emerald-500',
      path: '/events/non-technical'
    },
    {
      id: 'cultural',
      label: 'Cultural',
      icon: Palette,
      gradient: 'from-purple-500 to-pink-500',
      path: '/events/cultural'
    },
    {
      id: 'webinar',
      label: 'Webinar',
      icon: Video,
      gradient: 'from-orange-500 to-red-500',
      path: '/webinar'
    }
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category.id);
    navigate(category.path);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
      }`}
    >
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full transition-all duration-300 ${
            darkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
              : 'bg-white hover:bg-gray-50 text-gray-700 shadow-lg'
          }`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold">
            <Calendar size={16} />
            EventSphere
          </div>

          <h1
            className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${
              darkMode
                ? 'from-blue-400 via-purple-400 to-pink-400'
                : 'from-blue-600 via-purple-600 to-pink-600'
            } bg-clip-text text-transparent leading-tight`}
          >
            Discover Amazing Events
          </h1>

          <p
            className={`text-xl md:text-2xl mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            } max-w-2xl mx-auto`}
          >
            Join thousands of participants in unforgettable experiences
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`group relative overflow-hidden px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-xl`
                    : darkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600'
                    : 'bg-white hover:bg-gray-50 text-gray-700 shadow-lg border'
                }`}
              >
                <div className="flex items-center gap-2 relative z-10">
                  <Icon size={18} />
                  <span>{category.label}</span>
                </div>
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div
              className={`flex items-center rounded-2xl overflow-hidden shadow-xl ${
                darkMode
                  ? 'bg-gray-800 border border-gray-600'
                  : 'bg-white border-2 border-gray-100'
              }`}
            >
              <div className="pl-6">
                <Search className={darkMode ? 'text-gray-400' : 'text-gray-500'} size={20} />
              </div>

              <input
                type="text"
                placeholder="Search for fests by location or college..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`flex-1 px-4 py-4 text-lg outline-none ${
                  darkMode
                    ? 'bg-gray-800 text-white placeholder-gray-400'
                    : 'bg-white text-gray-900 placeholder-gray-500'
                }`}
              />

              <button
                onClick={handleSearch}
                disabled={!search.trim() || loading}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div
          className={`rounded-3xl p-8 backdrop-blur-sm ${
            darkMode
              ? 'bg-gray-800/50 border border-gray-700'
              : 'bg-white/70 border border-white/20 shadow-xl'
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-gray-300 border-t-blue-500 animate-spin"></div>
                <div className="mt-4 text-center text-gray-500">Loading events...</div>
              </div>
            </div>
          ) : fests.length === 0 ? (
            <div className="text-center py-20">
              <Calendar
                className={`mx-auto mb-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
                size={48}
              />
              <h3
                className={`text-xl font-semibold mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                No events found
              </h3>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                Try adjusting your search or check back later for new events!
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2
                  className={`text-2xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Upcoming Events
                </h2>
                <div
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {fests.length} events found
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {fests.map((fest, index) => (
                  <div
                    key={fest._id}
                    className="transform transition-all duration-300 hover:scale-105"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div
                      className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${
                        darkMode
                          ? 'bg-gray-700 hover:bg-gray-600 text-white'
                          : 'bg-white hover:shadow-xl text-gray-900'
                      }`}
                    >
                      <h3 className="text-lg font-semibold mb-2">{fest.name}</h3>
                       <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {fest.college }
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {fest.location} • {fest.date.slice(0,10)}
                      </p>
                      <div className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium text-center cursor-pointer hover:from-blue-600 hover:to-purple-600 transition-all duration-300" onClick={()=>{navigate(`/singleFest/${fest._id}`)}}>
                        View Details
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-20 left-10 w-32 h-32 rounded-full ${
            darkMode ? 'bg-blue-500/10' : 'bg-blue-300/20'
          } blur-xl animate-pulse`}
        />
        <div
          className={`absolute bottom-20 right-10 w-48 h-48 rounded-full ${
            darkMode ? 'bg-purple-500/10' : 'bg-purple-300/20'
          } blur-xl animate-pulse`}
          style={{ animationDelay: '2s' }}
        />
      </div>
    </div>
  );
}

export default MainBody;
