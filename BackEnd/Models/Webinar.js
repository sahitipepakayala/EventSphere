const mongoose=require("mongoose");
const webinarSchema=new mongoose.Schema({
     name:{
        type:String,
        required:true
    },
    description: {
    type: String,
    required: true
},
     college:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    registrationFee:{
        type:Number,
        required:true,
        default:200
    },
    webAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    },
    image:{
        type:String,
        required:true,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSvTcFyf5bC16r-oTkJ9EvM5CYqBILIeiRPg&s"
    }
},{timestamps:true})

module.exports=mongoose.model("Webinar",webinarSchema);