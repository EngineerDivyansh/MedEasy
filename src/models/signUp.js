require('dotenv').config()
const mongoose=require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate')
const user=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
})

user.plugin(passportLocalMongoose);
user.plugin(findOrCreate);
module.exports=mongoose.model("Users",user);
