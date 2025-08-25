const mongoose=require("mongoose");

const webregSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    webinar:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Webinar",
        required:true
    }
},{timestamps:true});

const WebReg=mongoose.model("WebReg",webregSchema);

module.exports=WebReg;