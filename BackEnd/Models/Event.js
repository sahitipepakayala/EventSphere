const mongoose=require("mongoose");
const Fest=require("./Fests")

const eventSchema=new mongoose.Schema({
    festId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Fest"
    },
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
    category: {
    type: String,
    enum: ['technical', 'non-technical', 'cultural'],
    required: true
},
eventAdmin:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Admin",
    required:true
},
image: {
  type: String,
  default:"https://th.bing.com/th/id/R.2cfdd4efdfa9b39e029604c1ef0ced2b?rik=wD558AFd%2fV%2fhsA&riu=http%3a%2f%2fdannorris.me%2fwp-content%2fuploads%2f2016%2f07%2fbooks-feature-1.jpg&ehk=AnthLyYjZsnTvWrrR2FKMO59TngIsPqAPhaXTb2gBB0%3d&risl=&pid=ImgRaw&r=0"
}

},{timestamps:true});

const Event=mongoose.model("Event",eventSchema);
module.exports=Event;