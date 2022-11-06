const {
    Schema,
    model
} = require("mongoose");

const wishlistSchema = new Schema({
    user_id: String,
    product_id: String,
    isLiked: Boolean
})

// create new collection
const Wishlist = new model("Wishlist", wishlistSchema)

module.exports = Wishlist;