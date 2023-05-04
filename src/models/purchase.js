const mongoose=require("mongoose");

const purchaseUser=mongoose.Schema({
    name:String,
    phone:String,
    pincode:String,
    address:String,
    medicineName:String,
    quantity:Number,
    price_Per_piece:Number,
    total_Price:Number
})

module.exports=mongoose.model("Purchase",purchaseUser);