
// import './App.css'
// import { BrowserRouter,Route,Routes } from 'react-router-dom'
// import Body from './Pages/Body'
// import MainBody from './Pages/MainBody'
// import Singlefest from './Pages/Singlefest'
// import About from './Pages/About'
// import Footer from './Pages/Footer'
// import Login from './Pages/Login'
// import Signup from './Pages/Signup'
// import { Provider, useDispatch } from 'react-redux'
// import UserStore from './Redux/UserStore'
// import AdminSignup from './Pages/AdminSignup'
// import AdminLogin from './Pages/AdminLogin'
// import FestsAuthor from './Pages/FestsAuthor'
// import EditfestPage from './Pages/EditfestPage'
// import EditFest from './Pages/EditFest'
// import NewFest from './Pages/NewFest'
// import NewEvent from './Pages/NewEvent'
// import EditEvent from './Pages/EditEvent'
// import SingleEvent from './Pages/SingleEvent'
// import RegisteredEvents from './Pages/RegisteredEvents'
// import Registrations from './Pages/Registrations'
// import Category from './Pages/Category'
// import Webinar from './Pages/Webinar'
// import SingleWebinar from './Pages/SingleWebinar'
// import NewWebinar from './Pages/NewWebinar'
// import EditWebinar from './Pages/EditWebinar'
// import RegistrationsWeb from './Pages/RegistrationsWeb'
// import Hackathons from './Pages/Hackathons'
// import { useEffect } from 'react'
// import { addUser } from './Redux/UserSlice'

// function App() {
// const dispatch = useDispatch();

  

//   return (
//     <>
// <Provider store={UserStore}>
//    <BrowserRouter basename='/'>
//    <Routes>
//     <Route path="/" element={<Body/>}>
//     <Route path="/" element={<MainBody/>}/>
//     <Route path="/footer" element={<Footer/>}/>
//     <Route path="/singleFest/:id" element={<Singlefest/>}/>
//     <Route path="/about" element={<About/>}/>
//     <Route path="/login" element={<Login/>} />
//     <Route path="/signup" element={<Signup/>} />
//     <Route path="/adminlogin" element={<AdminLogin/>} />
//     <Route path="/adminsignup" element={<AdminSignup/>} />
//     <Route path="/festsAuthor/:id" element={<FestsAuthor/>}/>
//     <Route path="/editfestpage/:id" element={<EditfestPage/>}/>
//     <Route path="/editFest/:id" element={<EditFest/>}/>
//     <Route path="/newFest" element={<NewFest/>}/>
//     <Route path="/newEvent/:id" element={<NewEvent/>}/>
//     <Route path="/editEvent/:id" element={<EditEvent/>}/>
//     <Route path="/singleEvent/:id" element={<SingleEvent/>}/>
//     <Route path="/registeredEvents" element={<RegisteredEvents/>}/>
//     <Route path="/registrations/:id" element={<Registrations/>}/>
//     <Route path="/events/:category" element={<Category/>}/>
//     <Route path="/webinar" element={<Webinar/>}/>
//     <Route path="/singleWebinar/:id" element={<SingleWebinar/>}/>
//     <Route path="/newWebinar" element={<NewWebinar/>}/>
//     <Route path="/editWebinar/:id" element={<EditWebinar/>}/>
//     <Route path="/webinaRegistrations/:id" element={<RegistrationsWeb/>}/>
//     <Route path="/hackathons" element={<Hackathons/>}/>
    
//     </Route>
//    </Routes>
//    </BrowserRouter>
//       </Provider>
//     </>
//   )
// }

// export default App




import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './Pages/Body';
import MainBody from './Pages/MainBody';
import Singlefest from './Pages/Singlefest';
import About from './Pages/About';
import Footer from './Pages/Footer';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { Provider } from 'react-redux';
import UserStore from './Redux/UserStore';
import AdminSignup from './Pages/AdminSignup';
import AdminLogin from './Pages/AdminLogin';
import FestsAuthor from './Pages/FestsAuthor';
import EditfestPage from './Pages/EditfestPage';
import EditFest from './Pages/EditFest';
import NewFest from './Pages/NewFest';
import NewEvent from './Pages/NewEvent';
import EditEvent from './Pages/EditEvent';
import SingleEvent from './Pages/SingleEvent';
import RegisteredEvents from './Pages/RegisteredEvents';
import Registrations from './Pages/Registrations';
import Category from './Pages/Category';
import Webinar from './Pages/Webinar';
import SingleWebinar from './Pages/SingleWebinar';
import NewWebinar from './Pages/NewWebinar';
import EditWebinar from './Pages/EditWebinar';
import RegistrationsWeb from './Pages/RegistrationsWeb';
import Hackathons from './Pages/Hackathons';
import Profile from './Pages/Profile'; 
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from './Redux/UserSlice';
import { useLocation } from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google'
import Editprofile from './Pages/Editprofile';

function AppWrapper() {
  return (
    <Provider store={UserStore}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </Provider>
  );
}

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicPaths = ['/login', '/signup', '/adminlogin', '/adminsignup'];
    if (publicPaths.includes(location.pathname)) return; // Skip redirect check for public routes

    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        dispatch(addUser(JSON.parse(storedUser)));
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Invalid user data in localStorage:', error);
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [dispatch, navigate, location.pathname]);

  // const GoogleAuthWrapper=()=>{
  //   return (
  //     <GoogleOAuthProvider clientId='301327008349-66u09p4erh37aq2clib39v0er4fi5914.apps.googleusercontent.com'>
  //     <Login></Login>
  //     </GoogleOAuthProvider>
  //   )
  // }

  return (
    <Routes>
      <Route path="/" element={<Body />}>
        <Route path="/" element={<MainBody />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/singleFest/:id" element={<Singlefest />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminsignup" element={<AdminSignup />} />
        <Route path="/festsAuthor/:id" element={<FestsAuthor />} />
        <Route path="/editfestpage/:id" element={<EditfestPage />} />
        <Route path="/editFest/:id" element={<EditFest />} />
        <Route path="/newFest" element={<NewFest />} />
        <Route path="/newEvent/:id" element={<NewEvent />} />
        <Route path="/editEvent/:id" element={<EditEvent />} />
        <Route path="/singleEvent/:id" element={<SingleEvent />} />
        <Route path="/registeredEvents" element={<RegisteredEvents />} />
        <Route path="/registrations/:id" element={<Registrations />} />
        <Route path="/events/:category" element={<Category />} />
        <Route path="/webinar" element={<Webinar />} />
        <Route path="/singleWebinar/:id" element={<SingleWebinar />} />
        <Route path="/newWebinar" element={<NewWebinar />} />
        <Route path="/editWebinar/:id" element={<EditWebinar />} />
        <Route path="/webinaRegistrations/:id" element={<RegistrationsWeb />} />
        <Route path="/hackathons" element={<Hackathons />} />/
        <Route path="/editProfile" element={<Editprofile/>}/>
      </Route>
    </Routes>
  );
}


export default AppWrapper;
