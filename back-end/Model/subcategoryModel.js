const mongoose=require("mongoose");
const SubCategorySchema=mongoose.Schema({
        category:String,
        subCategory:String
});

const SubCategories=mongoose.model("subcategories",SubCategorySchema);

module.exports=SubCategories;