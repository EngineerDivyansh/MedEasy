const mongoose=require("mongoose");

const vitaminDetail=mongoose.Schema({
    medicineName:String,
    disease:String,
    company:String,
    noOfTablet_inStrip:Number,
    price:Number,
    description:String,
    image1:String,
    image2:String
})

module.exports=mongoose.model("vitaminDetail",vitaminDetail);