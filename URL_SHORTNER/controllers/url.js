const {urlModel}= require('../model/url')
const shortid = require('shortid');
async function URLGenerator(req,res) {
    if(!req.body) return res.redirect('/');

    console.log(req.user);
    
  console.log(req.body);
  
    const repeat = await urlModel.findOne({
        redirectURL:req.body.redirectURL
    }) 
if(!repeat){

  
  
  const shortId = shortid();
  
  urlModel.create({
    shortId:shortId,
    redirectURL:req.body.redirectURL,
    visitHistory:[],
    createdBy:req.user._id
  })
  
  
  res.render('url',{Id:shortId});
}else{
  res.render('url',{Id:repeat.shortId})
}



}


async function redirectUrl(req,res){
  const shortId = req.params.shortId;
  console.log(shortId);
  
  const entry = await urlModel.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  console.log(entry);
  
  //redirect to original url
    try{

      res.redirect(entry.redirectURL);
    }catch(err){
      console.log(err);
      
    }
}


module.exports={
    URLGenerator,
    redirectUrl
}