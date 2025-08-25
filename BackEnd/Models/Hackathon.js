const mongoose=require("mongoose");

const hackathonSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    date:{
        type:Date,
        required:true
    },
    location:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRau4ALwN__E3bI0_j68H6knWsmUAbWdMtRwA&s"
    },
    contact:{
        type:Number,
        required:true, validate: {
    validator: function (v) {
      return /^[0-9]{10}$/.test(v);
    },
    message: props => `${props.value} is not a valid 10-digit contact number!`
  }
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    registrationFee:{
        type:Number,
        required:true,
        default:200
    },
    team:{
        type:Number,
        required:true,
        default:3,
        max:15
    },
    hackAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        required:true
    }
},{timestamps:true});

const Hackathon=mongoose.model("Hackathon",hackathonSchema);
module.exports=Hackathon;