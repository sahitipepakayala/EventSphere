// const User = require('../Models/User');
// const {oauth2client} =require('../utils/googleConfig');
// const axios =requier('axios');

// const googlelogin=async(req,res)=>{
//     try{
//         const {code}=req.query;
//         const googleres=await oauth2client.getToken(code);
//         oauth2client.setCredentials(googleres.tokens);

//         const userres=await axios.get(`https:www.googleapis.com/oauth2v1/userinfo?alt=json&access_token=${googleres.tokens.access_token}`)
//         const {email,name,picture}=userres.data;
//          const user=new User({
//             name,emailId:email,image:picture
//         })
//         await user.save();

//         const token=await user.getJwt();
//         res.cookie("token",token,  {
//   httpOnly: true,
//   secure: true, // set to true in production (https)
//   sameSite: "strict",
//   maxAge: 24 * 60 * 60 * 1000 // 1 day
// })
// res.json({data:user,message:"signup success"});
//     }
//     catch(error)
//     {
//    console.log(error.message);
//         res.status(400).json({message:error.message});
//     }
// }

// module.exports={

// }
