const User=require("../models/UserModel")
const CatchAsyncError=require("../middleware/catchAsycerror")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
const bcrypt=require("bcryptjs")
const cookieParser=require("cookie-parser")
const ErrorHandler = require("../utils/Errorhandler")
const sendEmail = require("../utils/sendEmail")
const Products=require("../models/ProductModel")
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



// Forgot Password
exports.forgotPassword = CatchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
  
    await user.save({ validateBeforeSave: false });
  
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;
  
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: `Ecommerce Password Recovery`,
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorHandler(error.message, 500));
    }
  });

  // Reset Password
exports.resetPassword = CatchAsyncError(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  
    if (!user) {
      return next(
        new ErrorHandler(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }
  
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHander("Password does not password", 400));
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
  
    sendToken(user, 200, res);
  });
  
  exports.getUserDetails = CatchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id); // As logged in users info is already in req.user saved by us
    res.status(200).json({
      success: true,
      user,
    });
  })
// update password --User
  exports.updatePassword = CatchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    const isPasswordMatched = await bcrypt.compare(req.body.oldPassword, user.password);

    if (!isPasswordMatched) {
        return res.status(400).json({
            success: false,
            message: "Old password is incorrect"
        });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password does not match"
        });
    }

    // Optionally, you might want to add a check to ensure new password is different from the old password
    const isSameAsOldPassword = await bcrypt.compare(req.body.newPassword, user.password);
    if (isSameAsOldPassword) {
        return res.status(400).json({
            success: false,
            message: "New password cannot be the same as the old password"
        });
    }

    user.password = req.body.newPassword;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    res.status(200).json({
        success: true,
        message: "Password updated successfully",
        token
    });
});
// Update profile --User
exports.updateProfile = CatchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    })
})
/// Get all users --Admin
exports.getAllUsers = CatchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    })
})
//Sinngle user --Admin
exports.getSingleUser = CatchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return next(
      res.status(404).json({
        success: false,
        message: "User not found",
      })
    );
  }
  res.status(200).json({
    success: true,
    user,
})
})

//Update user role --Admin
exports.updateUserRole = CatchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };
    
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    
    res.status(200).json({
        success: true,
        user,
    })
})
// Delete user --Admin
exports.deleteUser = CatchAsyncError(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
        return next(
          res.status(404).json({
            success: false,
            message: "User not found",
          })
        );
    }
    
    await user.remove();
    
    res.status(200).json({
        success: true,
    })
})
// Create or Update Review
exports.createOrUpdateReview = CatchAsyncError(async (req, res, next) => {
  console.log(req.body)

    const { rating, comment, productid } = req.body;
  
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }
    console.log("first")
    const product = await Products.findById(productid)
       
    console.log(product)
    let isReviewed = product.reviews.find(// reviews is array , this is like forEach method but is finding too
        (rev) => rev.user.toString() === req.user._id.toString() // checking if the user has already reviewed the product by checking user id 
        // which is in review.user (check schema)
    )
    console.log("second")
    
    if (isReviewed) {// already reviewed then
        product.reviews.forEach((rev) => {//itreating over all reviews 
            if (rev.user.toString() === req.user._id.toString())// and updating the review of the login user only , by given rating and comment
            (rev.rating = rating), (rev.comment = comment)
        });
    }

    else { // Else if the user has not reviewed the product yet , pusing the review in reviews array
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length // updating number of reviews as new review is added
    }

    let avg = 0;
    
    product.reviews.forEach((rev) => {
        avg += rev.rating

    })
    
    product.ratings = avg / product.reviews.length // udating ratings by calculating avg
    
    await product.save({ validateBeforeSave: false });
    
    res.status(200).json({
        success: true,
    })

})