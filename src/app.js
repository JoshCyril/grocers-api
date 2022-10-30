const express = require("express"),
      bcrypt = require("bcrypt"),
      app = express();
    //   bodyParser = require("body-parser");

require("./db/conn")
const User = require("./models/user")
const Product = require("./models/product")

const saltRounds = 10;
const port = process.env.PORT || 3000

app.use(express.json());

app.listen(port, ()=>{
    console.log(`Connected to port: ${port}`)
});

app.get("/" ,(req, res)=>{
    res.send("Welcome to Grocers API");
})

app.post("/" ,async(req, res)=>{
  console.log(req.query)
  res.send("Reached")
})

// add new user
app.post("/user/add", async (req, res)=>{
    console.log(req.body)
    // const user = new User(req.body)
    const hashedPwd = await bcrypt.hash(req.body.password, saltRounds)
    const insertResult = await User.create({
        name: req.body.name,
        password: hashedPwd,
        email:req.body.email,
        isAdmin:req.body.isAdmin
      });

    insertResult.save().then(()=>{
        res.status(201).send(insertResult);
    }).catch((e)=>{
        res.status(400).send(e);
    })

})

app.post("/user/login", async (req, res) => {
    try {
        // const squery = req.query.name === null ? req.query.email : req.query.name
      
      var isAuth = false
      var user = await User.findOne({ name: req.query.name });

      if (user) {
        isAuth = true
      } else {
          var user = await User.findOne({ email: req.query.email });
          if (user){
          isAuth = true
          } else {
            isAuth = false
          }
      }

      if (isAuth){
        const cmp = await bcrypt.compare(req.query.password, user.password);
        if (cmp) {
          //   ..... further code to maintain authentication like jwt or sessions
          res.status(202).send("Auth Successful");
        } else {
          res.status(406).send("Wrong password.");
        }
      }else{
        res.status(406).send("Wrong username / email ID.");
      }

    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error Occured");
    }
  });

// add new product
app.post("/product/add", (req, res)=>{
    console.log(req.body)
    const product = new Product(req.body)

    product.save().then(()=>{
        res.status(201).send(product);
    }).catch((e)=>{
        res.status(400).send(e);
    })

})