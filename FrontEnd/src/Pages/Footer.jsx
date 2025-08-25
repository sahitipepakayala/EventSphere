// import React from 'react';
// import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";


// function Footer() {
//   return (
//     <div className='bg-blue-900 text-white px-8 pt-5 pb-2 font-sans'>
//       <div className='flex flex-col md:flex-row justify-between items-start gap-3'>

//         {/* Logo */}
//         <div className='flex flex-col items-start'>
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbecDBiqFR5-ELsllz_C5suG6uB76FkjNd1w&s"
//             alt="EventSphere Logo"
//             height="100"
//             width="100"
//             className='rounded-md mb-3'
//           />
//           <p className="text-sm w-60">Connecting Colleges, Celebrating Cultures.</p>
//         </div>

//         {/* Social Media */}
//         <div>
//           <h1 className="text-lg font-bold mb-2">Follow Us</h1>
//           <div className='flex gap-4 text-2xl'>
//             <MdEmail className="hover:text-yellow-300 cursor-pointer" />
//             <FaFacebook className="hover:text-blue-500 cursor-pointer" />
//             <FaInstagram className="hover:text-pink-400 cursor-pointer" />
//             <FaLinkedin className="hover:text-blue-400 cursor-pointer" />
//           </div>
//         </div>

//         {/* Contact Info */}
//         <div>
//           <h1 className="text-lg font-bold mb-3">Contact Us</h1>
//           <p>📍 EventSphere HQ, Andhra Pradesh, India</p>
//           <p>📧 support@eventsphere.in</p>
//           <p>📞 +91 98765 43210</p>
//         </div>

//       </div>

//       {/* Footer Bottom */}
//       <div className="mt-8 border-t border-white text-center text-sm">
//         © 2025 EventSphere. All rights reserved by SahitiPepakayala
//       </div>
//     </div>
//   );
// }

// export default Footer;


import React from 'react';
import { Mail, Facebook, Instagram, Linkedin, MapPin, Phone, Heart } from 'lucide-react';

function Footer() {
  return (
    <div className='bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden'>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
      
      <div className="relative z-10 px-8 pt-12 pb-6">
        <div className='max-w-6xl mx-auto'>
          <div className='flex flex-col lg:flex-row justify-between items-start gap-8 mb-8'>

            {/* Logo & Description */}
            <div className='flex flex-col items-start space-y-4'>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbecDBiqFR5-ELsllz_C5suG6uB76FkjNd1w&s"
                  alt="EventSphere Logo"
                  className='relative w-16 h-16 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300'
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  EventSphere
                </h2>
                <p className="text-slate-300 max-w-xs leading-relaxed">
                  Connecting Colleges, Celebrating Cultures. Where innovation meets tradition in the world of events.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Contact Us
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                  <MapPin className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span>EventSphere HQ, Andhra Pradesh, India</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                  <Mail className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <a href="mailto:support@eventsphere.in" className="hover:underline">
                    support@eventsphere.in
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                  <Phone className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <a href="tel:+919876543210" className="hover:underline">
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                Follow Us
              </h3>
              <p className="text-slate-300 mb-4">Stay connected for the latest updates</p>
              <div className='flex gap-4'>
                {[
                  { Icon: Mail, color: 'hover:bg-red-500', label: 'Email' },
                  { Icon: Facebook, color: 'hover:bg-blue-600', label: 'Facebook' },
                  { Icon: Instagram, color: 'hover:bg-pink-500', label: 'Instagram' },
                  { Icon: Linkedin, color: 'hover:bg-blue-700', label: 'LinkedIn' }
                ].map(({ Icon, color, label }) => (
                  <button
                    key={label}
                    className={`p-3 bg-white/10 backdrop-blur-sm rounded-xl ${color} hover:scale-110 hover:shadow-lg transition-all duration-300 group`}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-white group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Newsletter Section */}
          <div className="border-t border-white/10 pt-8 mb-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Stay in the loop</h4>
                  <p className="text-slate-300 text-sm">Get the latest event updates and exclusive offers</p>
                </div>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-64"
                  />
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/10 pt-6 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-sm">
                © 2025 EventSphere. All rights reserved by <b>Chaitu's 65</b>
              </p>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>for the community</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;