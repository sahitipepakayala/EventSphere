// import React from 'react';

// function About() {
//   return (
//     <div className="p-8 bg-gray-100 min-h-screen text-gray-800">
//       <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow-md">
//         <h1 className="text-4xl font-bold text-blue-800 mb-4">About EventSphere</h1>
//         <p className="text-lg leading-7 mb-6">
//           EventSphere is a centralized platform that brings together all the vibrant fests and events 
//           from various colleges and universities across the country. Born out of a need to streamline 
//           the traditional offline promotion process, EventSphere offers a digital solution to discover, 
//           register, and participate in cultural, technical, and non-technical events seamlessly.
//         </p>

//         <h2 className="text-2xl font-semibold text-blue-700 mb-2">🎯 Our Mission</h2>
//         <p className="mb-6">
//           To empower students and institutions by providing a digital ecosystem that fosters event discovery, 
//           collaboration, and student engagement — reducing the need for manual promotion and enhancing reach.
//         </p>

//         <h2 className="text-2xl font-semibold text-blue-700 mb-2">🚀 Key Features</h2>
//         <ul className="list-disc pl-6 mb-6">
//           <li>Two login portals: one for admins to manage events, and one for students to register</li>
//           <li>Search and filter events or webinars across different colleges</li>
//           <li>Detailed event categories: Cultural, Technical, Non-Technical</li>
//           <li>Webinar management and registration</li>
//           <li>Notification system for updates and reminders</li>
//           <li>Analytics dashboard for event organizers</li>
//         </ul>

//         <h2 className="text-2xl font-semibold text-blue-700 mb-2">🌐 Why EventSphere?</h2>
//         <p>
//           Instead of physically visiting colleges to promote fests, organizers can now simply upload 
//           their event details on EventSphere and reach a larger student audience effortlessly. Students, 
//           in turn, can explore diverse opportunities and engage in events that suit their interests — 
//           all in one place.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default About;


import React from 'react';

function About() {
  const features = [
    {
      icon: "👥",
      title: "Dual Login System",
      description: "Separate portals for admins to manage events and students to register seamlessly"
    },
    {
      icon: "🔍",
      title: "Smart Search & Filter",
      description: "Find events and webinars across different colleges with advanced filtering"
    },
    {
      icon: "📚",
      title: "Event Categories",
      description: "Organized into Cultural, Technical, and Non-Technical event categories"
    },
    {
      icon: "💻",
      title: "Webinar Management",
      description: "Complete webinar hosting and registration management system"
    },
    {
      icon: "🔔",
      title: "Smart Notifications",
      description: "Real-time updates and reminders for events and registrations"
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Comprehensive insights and analytics for event organizers"
    }
  ];

  const stats = [
    { number: "50+", label: "Colleges Connected" },
    { number: "1000+", label: "Events Hosted" },
    { number: "10K+", label: "Students Engaged" },
    { number: "95%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative px-6 py-20 mx-auto max-w-7xl">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
                EventSphere
              </h1>
              <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              A centralized platform that brings together all the vibrant fests and events 
              from various colleges and universities across the country.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-16 mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 mx-auto max-w-7xl">
        {/* Mission Section */}
        <div className="mb-20">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20">
            <div className="text-center mb-12">
              <div className="text-5xl mb-6">🎯</div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Our Mission
              </h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
              To empower students and institutions by providing a digital ecosystem that fosters event discovery, 
              collaboration, and student engagement — reducing the need for manual promotion and enhancing reach 
              across the academic community.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <div className="text-5xl mb-6">🚀</div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what makes EventSphere the ultimate platform for college event management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 h-full transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                  <div className="text-4xl mb-6 text-center">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why EventSphere Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-xl">
            <div className="text-center mb-12">
              <div className="text-5xl mb-6">🌐</div>
              <h2 className="text-4xl font-bold mb-6">
                Why EventSphere?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-3">📢 For Organizers</h3>
                  <p className="text-white/90">
                    Skip the physical college visits. Upload your event details and reach thousands 
                    of students across multiple institutions instantly.
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-3">🎓 For Students</h3>
                  <p className="text-white/90">
                    Explore diverse opportunities, discover events that match your interests, 
                    and engage with the broader academic community — all in one place.
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-16 inline-block">
                  <div className="text-6xl">🎪</div>
                </div>
                <p className="mt-6 text-lg text-white/90">
                  Connecting students and events like never before
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pb-20">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20">
            <div className="text-5xl mb-6">✨</div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Ready to Transform Your Event Experience?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of students and institutions already using EventSphere to create 
              memorable experiences and build stronger communities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                🎯 Explore Events
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                🚀 Host Your Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;