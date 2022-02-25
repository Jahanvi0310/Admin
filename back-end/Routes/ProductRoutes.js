const express=require("express");
const ProductModel=require("../Model/ProductModel");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const asynexpress=require("express-async-handler");
const ProductRoute=express.Router();


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
let upload = multer({ storage, fileFilter });



 ProductRoute.route('/AddProduct').post((upload.single('photo'),asynexpress(async(req,res)=>{
    const category = req.body.category;
    const subcategory = req.body.subcategory;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const description = req.body.description;
    const photo = req.file.filename;
    console.log(category);
    console.log(photo);
    const prodata = {
        category,
        subcategory,
        price,
        quantity,
        description,
        photo
    }

    const ProductModel1 = new ProductModel(prodata);
    console.log("hellloooo"+(prodata.photo))
    ProductModel1.save()
           .then(() => res.json("Helllooo"))
           .catch(err => res.status(400).json('Error: ' + err));
 })));

module.exports=ProductRoute;