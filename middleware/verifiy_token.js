var jwt = require('jsonwebtoken');
require('dotenv').config()
const httpStatusText=require("../utils/httpStatusText")



const verifyToken=(req,res,next) => {
    const authHeader=req.headers['Authorization']||req.headers["authorization"];
    if(!authHeader) {
        return next(res.status(401).json({status:httpStatusText.ERROR,msg:"token is required"}));

    }
    const token=authHeader.split(' ')[1]
    try{
        const decodedToken= jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.currentUser=decodedToken
        next()
    }catch(e){
        
        return next(res.status(401).json({status:httpStatusText.ERROR,msg:"invalid token"}))
    }


}

module.exports =verifyToken
