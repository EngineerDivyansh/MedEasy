require('dotenv').config();
const express=require("express");
const ejs=require("ejs");
const bodyParser=require("body-parser");

const mongoose=require("mongoose");
const session = require('express-session')
const passport=require("passport")
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate')

// const detail=require("../models/detail");
// const slider=require("../models/slider");
// const Service=require("../models/service");
 const user=require(__dirname+"/models/signUp")
const callBack=require(__dirname+"/models/callBack")
const tablet= require(__dirname+"/models/medicineDetail");
const vitamin=require(__dirname+"/models/vitaminDetail")
const medicineDetail = require(__dirname+'/models/medicineDetail');
const vitaminDetail = require(__dirname+'/models/vitaminDetail');
const purchase=require(__dirname+'/models/purchase');

// const detail=require("./models/detail");
// const slider=require("./models/slider");
// const service=require("./models/service");
let alert=require("alert")
const app=express()

//app.use(express.static("medicine"))
app.use('/static',express.static("medicine"));
app.set("view engine",'ejs')
app.use(bodyParser.urlencoded({
    extended:true
}))
 //(template engine)



app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }))
   
  app.use(passport.initialize())
  app.use(passport.session())
  
  passport.use(user.createStrategy())
  
  passport.serializeUser(user.serializeUser());
  
  passport.deserializeUser(user.deserializeUser())
  



//db connections
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Database connected")
});

app.get("/",async(req,res)=>{
    var log=false;
    if(req.isAuthenticated()){
        log=req.user.username;
     }
    const tab=await tablet.find({});
    const vit=await vitamin.find({});
     res.render("index",{
        log:log,
        tab:tab,
        vit:vit
    })
 })

app.get("/about",async(req,res)=>{
    var log=false;
    if(req.isAuthenticated()){
        log=req.user.username;
     }
    res.render("about",
    {log:log}
    )
})
app.get("/medicine",async(req,res)=>{
    var log=false;
    if(req.isAuthenticated()){
        log=req.user.username;
     }
    res.render("medicine",
    {log:log})
})
app.get("/news",async(req,res)=>{
    var log=false;
    if(req.isAuthenticated()){
        log=req.user.username;
     }
    res.render("news",
    {log:log})
})
app.get("/buy",async(req,res)=>{
    var log=false;
    if(req.isAuthenticated()){
        log=req.user.username;
     }
    
    const tab=await tablet.find({});
    const vit=await vitamin.find({});
    res.render("buy",{
        log:log,
        tab:tab,
        vit:vit
    })
})
app.get("/contact",async(req,res)=>{
    var log=false;
    if(req.isAuthenticated()){
        log=req.user.username;
     }
    res.render("contact",
    {log:log})
})

app.get("/login",async(req,res)=>{
    res.render("login")
})
app.get("/signUp",async(req,res)=>{
    res.render("signUp")
})

//data entry of medicine
app.get("/med",async(req,res)=>{
    res.render("medDetail")
})
 // close of data entry

 //get method of tablet and vitamin pages
app.get("/tablet/:medicine", async(req,res)=>{
    var log=false;
    if(req.isAuthenticated()){
        log=req.user.username;
        const name=req.params.medicine;
    const detail=await medicineDetail.findOne({medicineName:name})
    res.render("tablet/medicine",{detail:detail,
    log:log})
     }else{
         res.redirect("/login")
     }
    
})

app.get("/vitamins/:vitamin", async(req,res)=>{
    var log=false;
    if(req.isAuthenticated()){
        log=req.user.username;
        const name=req.params.vitamin;
        const detail=await vitaminDetail.findOne({medicineName:name})
       res.render("tablet/vitamin",{detail:detail,
    log:log})
     }else{
         res.redirect("/login")
     }
  
})
//close of method of tablet and vitamin pages

//start of form page for buying
app.get("/tablet/purchase/:name", async(req,res)=>{
    const name=req.params.name;
    const data=await medicineDetail.findOne({medicineName:name})
    res.render("purchase/buy",{data:data})
})


app.get("/vitamins/purchase/:name", async(req,res)=>{
    const name=req.params.name;
    const data=await vitaminDetail.findOne({medicineName:name})
    res.render("purchase/buy",{data:data})
})

app.get("/search",async(req, res) => {
     var log=false;
    if(req.isAuthenticated()){
        log=req.user.username;
     }
    
    const tab=await tablet.find({});
    const vit=await vitamin.find({});
    res.render("search",{
        log:log,
        tab:tab,
        vit:vit
    })
})


app.get("/logout",(req,res)=>{
    req.logout(()=>{
        
    });
    res.redirect("/")
})

//for search in database

app.post("/search",async(req,res)=>{
    console.log(req.body.search);
    const result=await medicineDetail.find();
    const tab=[];
    for(var i=0;i<result.length;i++){
        if(req.body.search.toLowerCase()==result[i].disease.toLowerCase()){
            tab.push(result[i]);
        }
    }
    var log=false;
    if(req.isAuthenticated()){
        log=req.user.username;
     }
    
    
    const vit=await vitamin.find({});
     const dis=req.body.disease;
    res.render("search",{
        dis:dis,
        log:log,
        vit:tab
    })

})

// app.get('/gallery',async (req,res)=>{
//     const det=await detail.findOne({"_id":"6411cad62864a52ae9ecccd6"});
//     res.render("gallery",{
//         det:det
//     });
// })


//sign up
app.post("/process-signUp",async (req,res)=>{

    user.register({username:req.body.username,email:req.body.email},req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            res.redirect("/")
        }else{
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/");
            })
        }
    })
    // console.log(req.body);
    // //save the data to db
    // try{
    //     const data=await user.create(req.body);
    //     console.log(data);
    //     res.redirect("/");
    // }catch (e){
    //     console.log(e);
    //     res.redirect("/");
    // }
}) 

//log-in
app.post("/process-login",async (req,res)=>{
    const User=new user({username:req.body.username,email:req.body.email,
        password:req.body.password});
    
        req.login(User,(err)=>{
            if(err){
                console.log(err);
            }else{
                passport.authenticate("local")(req,res,()=>{
                    res.redirect("/");
                    console.log("success")
                })
            }
        })
    
})

//callBackDetail
app.post("/process-callBack",async (req,res)=>{
    console.log(req.body);
    //save the data to db
    try{
        const data=await callBack.create(req.body);
        console.log(data);
        res.redirect("/contact");
    }catch (e){
        console.log(e);
        res.redirect("/");
    }
})
app.post("/process-callBack1",async (req,res)=>{
    console.log(req.body);
    //save the data to db
    try{
        const data=await callBack.create(req.body);
        console.log(data);
        res.redirect("/");
    }catch (e){
        console.log(e);
        res.redirect("/");
    }
})


app.post("/process-medicine",async (req,res)=>{
    console.log(req.body);
    //save the data to db
    try{
        const data=await vitamin.create(req.body);
        console.log(data);
        res.redirect("/med");
    }catch (e){
        console.log(e);
        res.redirect("/");
    }
})


app.post("/med",async (req, res) => {
    const Medname=req.body.name;
    const data=await medi.find({ name:Medname}).exec();
})

app.post("/vitamins/purchase/process-purchase",async (req,res)=>{
    console.log(req.body);
    //save the data to db
    try{
        const data=await purchase.create(req.body);
        console.log(data);
        const message="Purchase successfull Order will be delivered in 2 Days"
        res.send(message);
    }catch (e){
        console.log(e);
        res.redirect("/");
    }
})

app.post("/tablet/purchase/process-purchase",async (req,res)=>{
    console.log(req.body);
    //save the data to db
    try{
        const data=await purchase.create(req.body);
        console.log(data);
        const message="Purchase successfull Order will be delivered in 2 Days"
        res.send(message);
    }catch (e){
        console.log(e);
        res.redirect("/");
    }
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("server started");
})





