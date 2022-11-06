const {Schema, model} = require("mongoose");
const validator = require("validator")

const userSchema = new Schema({
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
const User = new model("User",userSchema)

module.exports =User;