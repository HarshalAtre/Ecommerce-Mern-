const User=require("../models/UserModel")
const CatchAsyncError=require("../middleware/catchAsycerror")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
const bcrypt=require("bcryptjs")
const cookieParser=require("cookie-parser")
dotenv.config({path:'../config.env'})


//Register a User
exports.Register= CatchAsyncError(async(req,res,next)=>{
    
    const{name, password,email}=req.body
    const user=await User.create({
        name,
        password,
        email,
        avatar:{
            public_id: "this is a sample id",
            url:"https://res.cloudinary.com/dqh0k0qjx/image/upload/v1641508415/avatars/avatar_1_zjlqv.jpg"
        }
    })

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{ //token to save in local storage so we know user is logged in
        expiresIn:"1d"
    })
    Z
    const option={ //specifying options for cookie so that we can directly pass in it
        httpOnly: true, // Helps prevent XSS // Send only over HTTPS
        sameSite: 'strict', // CSRF protection
        expires:new Date(Date.now()+ process.env.COOKIE_EXPIRE*24*60*60*1000) // calculate the expiration time in day 
      }

    res.cookie('token', token,option ).status(201).json({
        success:true,
        user,
        token
    })
})



//Login User
exports.Login=CatchAsyncError(async(req,res,next)=>{
    const{email,password}=req.body

    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Please enter email and password"
        })
    }

    const user=await User.findOne({email}).select("+password")//we have done select so that we can see password too now , 
    //as we have done false in  select in user model
    
    if(!user){
        return res.status(401).json({
            success:false,
            message:"Invalid email or password"
        })
    }

    const isPasswordMatched= await bcrypt.compare(password,user.password)
    
    if(!isPasswordMatched){
        return res.status(401).json({
            success:false,
            message:"Invalid  password"
        })
    }
    
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{ //token to sam=ve in local storage so we know user is logged in
        expiresIn:"1d"
    })
   const option={
        httpOnly: true, // Helps prevent XSS // Send only over HTTPS
        sameSite: 'strict', // CSRF protection
        expires:new Date(Date.now()+ process.env.COOKIE_EXPIRE*24*60*60*1000) // calculate the expiration time in day 
      }

    res.cookie('token', token,option ).status(201).json({
        success:true,
        user,
        token
    })
})


//logout
exports.Logout=CatchAsyncError(async(req,res,next)=>{
    res.cookie('token', null,{
        expires: new Date(Date.now()), //expiring now , so that it will be deleted
        httpOnly: true
      })

    res.status(200).json({
        success:true,   
        message:"Logged Out"
})
})