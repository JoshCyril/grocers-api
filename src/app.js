const express = require("express")
const app = express()
const cors = require('cors');

require("./db/conn")

const port = process.env.PORT || 3000

app.use(cors());
app.use(express.static('public'));

app.use(express.json());
// initialize routes
app.use('/api', require('./middleware/api'));

// error handling middleware
// app.use(function(err, req, res, next) {
//     //console.log(err);
//     res.status(422).send({
//         error: err.message
//     });
// });

app.listen(port, () => {
    console.log(`Connected to port: ${port}`)
});

app.get("/", (req, res) => {
    res.send("Welcome to Grocers API");
})
