// import {configureStore} from '@reduxjs/toolkit'
// import userReducer from "./UserSlice"

// const UserStore=configureStore({
//     reducer:{

//         user:userReducer
//     }
// })

// export default UserStore;




import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';

const savedUser = localStorage.getItem('user');
let parsedUser = null;

try {
  parsedUser = savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
} catch (e) {
  parsedUser = null; // fallback if JSON parsing fails
}

const preloadedState = {
  user: parsedUser
};



const UserStore = configureStore({
  reducer: {
    user: userReducer
  },
  preloadedState
});

export default UserStore;
