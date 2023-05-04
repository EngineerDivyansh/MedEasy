const express=require("express");
const hbs=require("hbs");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const app=express();
 const routes=require("./routes/main");
const mongoose=require("mongoose");
// const detail=require("./models/detail");
// const slider=require("./models/slider");
// const service=require("./models/service");

 app.use('/static',express.static("medicine"));
 app.use(bodyParser.urlencoded({extended:true}));
app.use('',routes);

//(template engine)

app.set('view engine','ejs');
app.set("views","views");

//db connections
mongoose.connect("mongodb://127.0.0.1:27017/medicineWebsite").then(()=>{
    console.log("Database connected")
});


app.listen(process.env.PORT | 3000,()=>{
    console.log("server started");
})





