const express = require('express');
const { URLGenerator,redirectUrl} = require('../controllers/url');
const Router = express.Router();

Router.post('/url', URLGenerator)
Router.get('/:shortId', redirectUrl)


module.exports=Router