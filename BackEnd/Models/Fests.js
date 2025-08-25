const mongoose=require("mongoose");

const festSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
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
    festAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        required:true
    },
    image: {
  type: String,
  default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlhqHVkFL91rOb_tWPzvUKTowhHTdXXdqF_Q&s"
},
},{timestamps:true});

const Fest=mongoose.model("Fest",festSchema);

module.exports=Fest;