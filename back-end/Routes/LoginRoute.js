const express=require("express");
const loginModel=require("../Model/loginModel")
const LoginRoute=express.Router();

// const asynexpress=require("express-async-handler");
  
LoginRoute.post("/logindetails",(req,res)=> {
  //  console.log(req.body);
        try{
         loginModel.findOne({user_name:req.body.user_name,pass:req.body.pass},(err,docs)=>{
        if (!docs)
         {
          res.setHeader('Content-Type', 'text/html');
          //  console.log("jj");
          res.status(400).send('User with provided email does not exist.');
          //res.end();
        }
        else
        {
          console.log("ghszd");
            // console.log(docs);  
           res.send(docs);
           
        }    
        })
      }
      catch(error)
      {
        res.status(400).json("Invalid Username");
      }
  
        });



module.exports=LoginRoute;


