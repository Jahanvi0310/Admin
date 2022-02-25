const express=require("express");
const SubCatModel=require("../Model/subcategoryModel");
const SubCatRoute=express.Router();

const asynexpress=require("express-async-handler");


 SubCatRoute.post("/AddSubCategory",asynexpress(async(req,res)=>{
	// console.log("ggh");
 	console.log(req.body);
 	data=SubCatModel(req.body)
 	data.save();
 	res.send("Helllooo");
 }));

module.exports=SubCatRoute;