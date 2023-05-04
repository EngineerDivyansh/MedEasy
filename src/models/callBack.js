const mongoose=require("mongoose");

const callBack=mongoose.Schema({
    Name:String,
    Phone:String,
    Email:String,
    Medicine:String,
    Message:String,
})

module.exports=mongoose.model("callBackDetail",callBack);