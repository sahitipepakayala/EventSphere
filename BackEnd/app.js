const express=require("express");
const {  mongoose } = require("mongoose");
const adminRouter = require("./Routers/AdminRouter");
const userRouter=require("./Routers/UserRouter")
const app=express();

require("dotenv").config();
const cookieParser=require("cookie-parser");
const festRouter = require("./Routers/FestRouter");
const cors=require("cors");
const eventRouter = require("./Routers/EventRouter");
const regRouter = require("./Routers/RegistrationRouter");
const webinarRouter = require("./Routers/WebinarRouter");
const uploadImage = require("./cloudinary");
const webinarRegRouter = require("./Routers/WebinarRegistrations");

app.use(express.json())
app.use(cookieParser());

app.use(cors({
    origin:process.env.FRONTEND,
    credentials:true
}))

const connectDb=async () =>{
    try{
        await mongoose.connect(process.env.MONGOLINK,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
         console.log("connected succesfully")
    }

    
    catch(error)
    {
        console.log("Error in connectiong the db catched the file")
    }


}
connectDb()
.then(()=>{
app.listen(process.env.PORT||5000,()=>{
    console.log("CONNECTED SUCCESFULLY");
})})
.catch((error)=>{
    console.log(" Not CONNECTED SUCCESFULLY");

})

app.get("/",(req,res)=>{
    res.send("success")
})
app.post("/uploadImage",(req,res)=>{
    uploadImage(req,Body.image)
    .then((url)=>res.send(url))
    .catch((err)=>res.status(500).send(err))
});

app.use("/admin",adminRouter);
app.use("/user",userRouter);
app.use("/fest",festRouter);
app.use("/event",eventRouter);
app.use("/register",regRouter);
app.use("/webinar",webinarRouter);
app.use("/webinar",webinarRegRouter);
app.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // true if using HTTPS
    sameSite: "lax",
    path: "/"
  });
  return res.status(200).json({ message: "Logged out successfully" });
});

