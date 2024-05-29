
const CatchAsyncError=require('../middleware/catchAsycerror');
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv');
const User = require('../models/UserModel');
dotenv.config({path:'./config.env'})

const isAuthtenticate=CatchAsyncError(async(req,res,next)=>{
     const {token}=req.cookies 
     if(!token){
         return res.status(401).json({
             success:false,
             message:"Please Login to access this resource"
         })
     }

     const decodedData=await jwt.verify(token,process.env.JWT_SECRET) // decoded the data that we incrypted in token
     
     req.user= await User.findById(decodedData.id)// now we can access the users detail in the request till he/she is logged in
    
     next()
})

const AuthorizeRole=(...roles)=>{ //...roles means we can pass multiple roles as an array
    return (req,res,next)=>{
        if(roles.includes(req.user.role)){ // if array roles contains the role of the user then it will return true and we can access the resource
           return next()// we are using req.user.role because we have stored the role of logged in user in upper function
        }
        else{ // if not then we will return an error
            return next(res.status(403).json({
                success:false,
                message:"You are not allowed to access this resource"
            }))
        }
}}

module.exports={isAuthtenticate,AuthorizeRole}