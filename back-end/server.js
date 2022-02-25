const express=require("express");
const CatModel=require("./Model/categoryModel")
const SubCatModel=require("./Model/subcategoryModel")
const ProductModel=require("./Model/ProductModel")
const LoginRoute=require("./Routes/LoginRoute")
const CategoryRoutes=require("./Routes/CategoryRoutes")
const SubCategoryRoutes=require("./Routes/SubCategoryRoute")
const ProductRoute=require("./Routes/ProductRoutes")
const cors = require('cors');
const dbconnection=require("./components/database")
const bodyParser = require('body-parser')
const app=express()
const asynexpress=require("express-async-handler");
const mongoose=require("mongoose");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
dbconnection();
app.use(cors());
app.use(LoginRoute);
app.use(CategoryRoutes);
app.use(SubCategoryRoutes);
app.use(ProductRoute);


app.get("/CategoryDetails",
asynexpress(async (req,res)=>{
    const CatDetails=await CatModel.find();
    // console.log(CatDetails)
    res.json(CatDetails);
}))


app.get("/SubCategoryDetails",
asynexpress(async (req,res)=>{
    const SubCatDetails=await SubCatModel.find();
    // console.log(SubCatDetails)
    res.json(SubCatDetails);
}))

app.get("/ProductDetails",
asynexpress(async (req,res)=>{
    const ProductDetails=await ProductModel.find();
    // console.log(ProductDetails)
    res.json(ProductDetails);
}))


// const uri = process.env.ATLAS_URI;
//  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});



app.listen(9099,()=>{
console.log("server running on port 9099");

});