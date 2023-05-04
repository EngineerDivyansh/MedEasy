const mongoose=require("mongoose");

const medicineDetail=mongoose.Schema({
    medicineName:String,
    disease:String,
    company:String,
    noOfTablet_inStrip:Number,
    price:Number,
    description:String,
    image1:String,
    image2:String
})

module.exports=mongoose.model("medicineDetail",medicineDetail);