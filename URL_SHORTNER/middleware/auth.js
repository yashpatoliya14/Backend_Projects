const {userModel}= require('../model/user')
const {getUser,setUser}= require('../Services/user')

async function restrictToLoggedIn(req,res,next) {
    console.log(req.cookies?.uid);
    

    if(!req.cookies.uid) return res.render('login')

    const token = req.cookies.uid;

    const user = getUser(token)['0']
    console.log(user);    
    if(!user) {return res.render('login')}

    req.user=user;

    next();
}

function authorization(role=[]){
    return function (req,res,next){
        if(!req.user){
            return res.redirect('/login');
        }

        if(!role.includes(req.user.role)){
            return res.redirect('/login');
        }

        return next();
    }
}

module.exports = {
    restrictToLoggedIn,
    authorization
};


