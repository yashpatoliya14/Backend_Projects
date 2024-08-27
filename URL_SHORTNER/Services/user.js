const jwt = require('jsonwebtoken');

const secret = "yashPatel"
function setUser(user){
    const payload = jwt.payload={
        _id:user._id,
        ...user
    }
    return jwt.sign(payload,secret);
}

function getUser(token){
    if(!token) return null;

    return jwt.verify(token,secret);
}

module.exports = {
    getUser,setUser
}