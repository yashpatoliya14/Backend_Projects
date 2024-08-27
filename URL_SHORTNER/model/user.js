const mongoose = require('mongoose');


const userSignUpData = mongoose.Schema({
     email:{
        type:String,
        required:true,
        unique:true
     },
     password:{
        type:String,
        required:true,
     },
     username:{
        type:String,
        required:true
     },
     role:{
        type:String,
        required:true,
        default:"student"
     }


})


const userModel = mongoose.model('user' , userSignUpData);


module.exports={userModel}