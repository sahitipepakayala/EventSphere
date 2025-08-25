const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email id")
            }
        }

        },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Not a strong password")
            }
        }
    },
    number:{
        type:Number,
        required:true
    },
    admin:{
        type:Boolean,
        default:false
    },
    college:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true,
        enum:['CSE','ECE','EEE','Civil','MECH','Other']
    },
    Year:{
        type:String,
        requierd:true,
        enum:["First","Second","Third","Final","Other"]
    }
   
})

userSchema.methods.getJwt=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},process.env.TOKEN, { expiresIn: "1d" });
    return token;
}

userSchema.methods.validatePassword=async function(password){
    const user=this;
    const check=await bcrypt.compare(password,user.password);
    return check;
}

const User=mongoose.model("User",userSchema);
module.exports=User;