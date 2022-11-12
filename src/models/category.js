const {
    Schema,
    model
} = require("mongoose");

const categorySchema = new Schema({
    name: {
        type: String,
        minlength: 3
    },
    imgUrl: {
        type: String,
    }
})

// create new collection
const Category = new model("Category", categorySchema)

module.exports = Category;