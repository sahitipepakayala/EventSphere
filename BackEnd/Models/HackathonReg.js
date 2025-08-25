const mongoose=require("mongoose");
const hackRegSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    hackathon:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"Hackathon",
        required:true
    },
    teamName: {
    type: String,
    required:true,
} },{timestamps:true})

const HackathonReg=mongoose.model("HackathonReg",hackRegSchema);

module.exports=HackathonReg;