const {
    Schema,
    model
} = require("mongoose");

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "This product already exists."],
        minlength: 3
    },
    description: String,
    price: {
        type: Number,
        required: true,
        min: 0.00
    },
    quantity: {
        type: Number,
        required: true,
    },
    discount: [{
        isDiscounted: {
            type: Boolean,
            default: false,
        },
        percentage: {
            type: Number,
            default: 0
        }
    }],
    category_id: {
        type: String,
        required: true,
    },
    imgUrls: [String],
    tags: [String]
})

// create new collection
const Product = new model("Product", productSchema)

module.exports = Product;