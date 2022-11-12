const {
    Schema,
    model
} = require("mongoose");

const productSchema = new Schema({
    name: {
        type: String,
        minlength: 3
    },
    description: String,
    price: {
        type: Number,
        min: 0.00
    },
    quantity: {
        type: Number,
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
    },
    imgUrls: [String],
    tags: [String]
})

// create new collection
const Product = new model("Product", productSchema)

module.exports = Product;