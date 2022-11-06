const {
    Schema,
    model
} = require("mongoose");

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "This product already exists."],
        minlength: 3
    },
    imgUrl: {
        type: String,
        required: true
    }
})

// create new collection
const Category = new model("Category", categorySchema)

module.exports = Category;