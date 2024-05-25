
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

module.exports={isAuthtenticate}