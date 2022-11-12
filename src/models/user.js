const {
    Schema,
    model
} = require("mongoose");
const validator = require("validator")

const userSchema = new Schema({
    name: {
        type: String,
        minlength: 3
    },
    email: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// create new collection
const User = new model("User", userSchema)

module.exports = User;