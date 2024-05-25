const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password:{
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false
    },
    avatar:{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    role:{
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    
      resetPasswordToken: String,
      resetPasswordExpire: Date,
})
//we not use arrow function because we need to use "this" keyword
userSchema.pre("save", async function(next){//whenever a new user is created this function will run
    if(this.isModified("password")){ //when we update name or email then also it will run so we have to check , if password is modified then only it will run
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

module.exports = mongoose.model("User", userSchema);
