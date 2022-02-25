const mongoose=require("mongoose");
const LoginSchema=mongoose.Schema({
      pass:String,  
      user_name:String
      
});

const loginModel=mongoose.model("admins",LoginSchema);

module.exports=loginModel;


