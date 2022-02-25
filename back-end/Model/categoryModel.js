const mongoose=require("mongoose");
const CategorySchema=mongoose.Schema({
      category:String
});

const Categories=mongoose.model("categories",CategorySchema);

module.exports=Categories;