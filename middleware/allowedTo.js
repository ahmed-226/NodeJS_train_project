module.exports=(...roles)=>{

    return(req,res,next)=>{
        if( roles.includes(req.currentUser)){
            
            return next(res.json({status:401,msg:"this role not authorized" }))
        }
        next()
    }
} 