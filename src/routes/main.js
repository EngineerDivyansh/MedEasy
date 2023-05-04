const express=require('express');
const routes=express.Router();
// const detail=require("../models/detail");
// const slider=require("../models/slider");
// const Service=require("../models/service");
 const user=require("../models/signUp")
const callBack=require("../models/callBack")
const tablet= require("../models/medicineDetail");
const vitamin=require("../models/vitaminDetail")
const medicineDetail = require('../models/medicineDetail');
const vitaminDetail = require('../models/vitaminDetail');
const purchase=require('../models/purchase');
const _=require("lodash")

// routes.get("/",async(req,res)=>{
//     res.sendFile("C://Users/Divyansh/WebstormProjects/medicineWebsite/medicine/index.html");
// })


 routes.get("/",async(req,res)=>{
    const tab=await tablet.find({});
    console.log(tab)
    const vit=await vitamin.find({});
     res.render("index",{
        tab:tab,
        vit:vit
    })
 })
routes.get("/about",async(req,res)=>{
    res.render("about")
})
routes.get("/medicine",async(req,res)=>{
    res.render("medicine")
})
routes.get("/news",async(req,res)=>{
    res.render("news")
})
routes.get("/buy",async(req,res)=>{
    
    const tab=await tablet.find({});
    const vit=await vitamin.find({});
    res.render("buy",{
        tab:tab,
        vit:vit
    })
})
routes.get("/contact",async(req,res)=>{
    res.render("contact")
})

routes.get("/login",async(req,res)=>{
    res.render("login")
})
routes.get("/signUp",async(req,res)=>{
    res.render("signUp")
})

//data entry of medicine
routes.get("/med",async(req,res)=>{
    res.render("medDetail")
})
 // close of data entry

 //get method of tablet and vitamin pages
routes.get("/tablet/:medicine", async(req,res)=>{
    const name=req.params.medicine;
    const detail=await medicineDetail.findOne({medicineName:name})
    res.render("tablet/medicine",{detail:detail})
})

routes.get("/vitamins/:vitamin", async(req,res)=>{
    const name=req.params.vitamin;
    const detail=await vitaminDetail.findOne({medicineName:name})
   res.render("tablet/vitamin",{detail:detail})
})
//close of method of tablet and vitamin pages

//start of form page for buying
routes.get("/tablet/purchase/:name", async(req,res)=>{
    const name=req.params.name;
    const data=await medicineDetail.findOne({medicineName:name})
    res.render("purchase/buy",{data:data})
})


routes.get("/vitamins/purchase/:name", async(req,res)=>{
    const name=req.params.name;
    const data=await vitaminDetail.findOne({medicineName:name})
    res.render("purchase/buy",{data:data})
})




// routes.get('/gallery',async (req,res)=>{
//     const det=await detail.findOne({"_id":"6411cad62864a52ae9ecccd6"});
//     res.render("gallery",{
//         det:det
//     });
// })


//sign up
routes.post("/process-signUp",async (req,res)=>{
    console.log(req.body);
    //save the data to db
    try{
        const data=await user.create(req.body);
        console.log(data);
        res.redirect("/");
    }catch (e){
        console.log(e);
        res.redirect("/");
    }
})

//log-in
routes.post("/process-login",async (req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
        const usermail=await user.findOne({email:email});
        if(usermail.password==password){
            res.status(201).render("index");
        }else{
            res.send("invalid login Details");
        }
    }catch (e){
         res.status(400).send("invalid login Details");
    }
})

//callBackDetail
routes.post("/process-callBack",async (req,res)=>{
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
routes.post("/process-callBack1",async (req,res)=>{
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


routes.post("/process-medicine",async (req,res)=>{
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


routes.post("/med",async (req, res) => {
    const Medname=req.body.name;
    const data=await medi.find({ name:Medname}).exec();
})

routes.post("/process-purchase",async (req,res)=>{
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
module.exports = routes;