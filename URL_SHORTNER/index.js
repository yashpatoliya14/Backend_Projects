//basic requirements
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 1000;
const path = require('path');
const ejs = require('ejs');
const staticRouter = require('./routes/staticRouter');
const authrouter = require('./routes/user');
const urlrouter = require('./routes/url');
const {restrictToLoggedIn,authorization} = require('./middleware/auth')


const cookieParser=require('cookie-parser')

//connection of mongoose---------------------------------------------------------

mongoose.connect('mongodb+srv://****:****@cluster0.bjsyv.mongodb.net/authorizationDemo').then(()=>{

    //fetch the body data
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.use(cookieParser())
    //set view engine
    app.set('view engine','ejs');
    app.set('views',path.resolve('./views'));

    //user request to '/login' 
    app.get('/login' , staticRouter);
    app.get('/signup' , staticRouter);


    //user click the button 
    app.post('/user/signup',authrouter)
    app.post('/user/login',authrouter)

    //home page
    app.get('/admin',restrictToLoggedIn,authorization(["student","faculty"]),staticRouter);
    app.get('/',restrictToLoggedIn,authorization(["student","faculty"]),staticRouter);
    app.post('/url',restrictToLoggedIn,urlrouter)

    //redirect url

    app.get('/:shortId' , urlrouter)

}).catch((err)=>{
    console.log("Mongodb connection is failed" , err);
})











// server is listen mode 
app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Server is started in Port number ${PORT}`);
    }
    
});