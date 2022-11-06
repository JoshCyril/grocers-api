const {
    Schema,
    model
} = require("mongoose");

const orderSchema = new Schema({
    user_id: String,
    products: [{
        product_id: String,
        product_count: Number
    }],
    status: String,
    totalAmount: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// create new collection
const Order = new model("Order", orderSchema)

module.exports = Order;