const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:[true, "This product already exists."],
        minlength:3
    },
    price:{
        type: Number,
        required: true,
        min: 0.00
    },
    quantity:{
        type: Number,
        required: true,
    },
    isDiscounted:{
        type: Boolean,
        default: false,
    },
    discountPer:{
        type: Number,
        min: 10,
        max:90
    },
    category:{
        type: String,
        required: true,
    }
})

// create new collection
const Product = new mongoose.model("Product",productSchema)

module.exports =Product;