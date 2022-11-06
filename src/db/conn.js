const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://gro-api:w942SLz51gJa1a69@cluster0.7wpt8x6.mongodb.net/grocers-api?retryWrites=true&w=majority", {
    //     useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection is success")
}).catch((e) => {
    console.log("Not connected :" + e)
})