const jwt  = require("jsonwebtoken");
const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
require("dotenv").config();
const adminSchema=new mongoose.Schema({
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
        default:true
    },
    college:{
        type:String,
        required:true
    }
   
})

adminSchema.methods.getJWT=async function(){
    const admin=this;
    const token=await jwt.sign({_id:admin._id},process.env.TOKEN, { expiresIn: "1d" });
    return token;
}

adminSchema.methods.validatePassword=async function(password){
    admin=this;
    const check=await bcrypt.compare(password,admin.password);
    return check;
}

const Admin=mongoose.model("Admin",adminSchema);
module.exports=Admin;