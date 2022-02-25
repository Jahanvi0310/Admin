const mongoose=require("mongoose");
const ProductSchema=mongoose.Schema({
      category:String,
      subcategory:String,
      productname:String,
      price:Number,
      quantity:Number,
      description:String,
      file:String
});

const Products=mongoose.model("products",ProductSchema);
module.exports=Products;