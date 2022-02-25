const express=require("express");
const CatModel=require("../Model/categoryModel");
const CatRoute=express.Router();
const asynexpress=require("express-async-handler");

 CatRoute.post("/AddCategory",asynexpress(async(req,res)=>{
	const newcategory=req.body;


	try
    {
        CatModel.findOne({category:newcategory},(error,found)=>
        {
            if(found)
            {
				console.log("already exist");
                res.status(400).send("Category already exist")
                return;
            }
            else{
                console.log("Submitted");
				data=CatModel(newcategory)
                data.save();
                res.send(found);
            }
        })
    }
    catch(error)
    {
        res.status(400).send("Invalid Data")};
}))





module.exports=CatRoute;