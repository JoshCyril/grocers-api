const express = require("express")
const app = express()
const path = require('path');

require("./db/conn")

const port = process.env.PORT || 3000

app.use(express.static('public'));

app.use(express.json());
// initialize routes
app.use('/api', require('./middleware/api'));

// error handling middleware
app.use(function (err, req, res, next) {
  //console.log(err);
  res.status(422).send({
    error: err.message
  });
});

app.listen(port, () => {
  console.log(`Connected to port: ${port}`)
});

app.get("/", (req, res) => {
  res.send("Welcome to Grocers API");
})

app.get('/file/:name', function (req, res, next) {
  var options = {
    root: path.join(__dirname, 'public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  var fileName = req.params.name
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
})