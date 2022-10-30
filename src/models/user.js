const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:[true, "This username is taken."],
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true, "This Email ID is taken"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default: false
    }
})

// create new collection
const User = new mongoose.model("User",userSchema)

module.exports =User;