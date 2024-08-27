const { Timestamp } = require('bson');
const {userModel}= require('../model/user')
const {setUser,getUser} = require('../Services/user')
async function handleLoginUser(req,res) {
    
    if(!req.body){
        console.log("body is null");
        return;
    }

    const {email,password} = req.body;

    console.log(email);
    
    user = await userModel.find({email});
    
        if (!user) {
            return res.render('login');            
        }
        token = setUser(user)
        console.log(token);
        
        res.cookie("uid", token);
        return res.redirect('/');
    

}
async function handleSignUpUser(req,res) {
    if(!req.body){
        console.log("body is null");
        return;
    }

    const {email,password,username} = req.body;

    userModel.create({
        email,
        password,
        username
    },{Timestamp:true})

    res.render('login');
}


module.exports={
    handleLoginUser,
    handleSignUpUser,
}