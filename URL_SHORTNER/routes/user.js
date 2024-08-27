const express = require('express');
const { handleSignUpUser,handleLoginUser } = require('../controllers/user');
const Router = express.Router();

Router.post('/user/signup',handleSignUpUser)
Router.post('/user/login',handleLoginUser)

module.exports=Router