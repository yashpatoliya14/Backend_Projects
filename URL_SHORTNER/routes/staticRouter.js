const express = require('express');
const Router = express.Router();
const {handleLoginUser,handleSignUpUser} = require('../controllers/user')
const {urlModel}= require('../model/url')



Router.get('/login',async (req,res)=>{
    return res.render('login')
})

Router.get('/signup',async (req,res)=>{
    return res.render('signup')
})

Router.get('/',async (req,res)=>{
    console.log(req.user._id);
    
    if(["faculty"].includes(req.user.role)){
        allurls = await urlModel.find({});
    }else{

         allurls = await urlModel.find({createdBy:req.user._id});
        console.log(allurls);
    }

    
    return res.render('url',{urls:allurls})
})

module.exports=Router
