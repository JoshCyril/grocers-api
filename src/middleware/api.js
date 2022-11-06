const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const saltRounds = 10;

const User = require('../models/user');
const Product = require("../models/product");

// const MongoClient = require("mongodb").MongoClient;
// const GridFSBucket = require("mongodb").GridFSBucket;
const upload = require("../middleware/upload");

let arrName = [];
let arrEmail = [];
let arrMain = [];

// ? Login
router.get("/login", async (req, res) => {
    try {
        // const squery = req.query.name === null ? req.query.email : req.query.name
        // console.log(req.query)
        var user = await User.findOne({$or:[
        { name: req.query.name},
        { email: req.query.email}]});

        // var user = await User.findOne({name: req.query.name});
        // console.log(user, user == null)
        // if (!user == null) {
        //     var user = await User.findOne({email: req.query.email});
        // }
        // console.log(user)
      if (user){
        const cmp = await bcrypt.compare(req.query.password, user.password);
        if (cmp) {
          //   ..... further code to maintain authentication like jwt or sessions
          res.status(202).send(`${user.name} Auth Successful`);
        } else {
          res.status(406).send(`${user.name} Wrong password.`);
        }
      }else{
        res.status(406).send("Wrong username / Email ID.");
      }

    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error Occured");
    }
  });


  router.get('/reg',(req,res,next)=>{
    arrName = [];
    arrEmail = [];
    arrMain = [];
    User.find({},{
        "name": 1,
        "email": 1
     }).then((data)=>{
        data.map(e => {
            arrName.push(e.name)
            arrEmail.push(e.email)
        });
        arrMain.push(arrName, arrEmail)
        // console.log(arrName, arrEmail)
        res.send(arrMain);
    }).catch(next);  
});


// ? get a list of user from the database
router.get('/all',(req,res,next)=>{
    getDBName(req.query._db, res)
    if (isDBExits){
        CtrDB.find({}).then((data)=>{
            res.send(data);
        }).catch(next);
    }else{
        res.send(`DB ${req.query._db} not found`);
    }   
});

// ? find by ID
router.get('/:id',(req,res,next)=>{
    getDBName(req.query._db, res)
    if (isDBExits){
        CtrDB.findOne({"_id": req.params.id}).then((data)=>{
            res.send(data);
        }).catch(next);
    }else{
        res.send(`DB ${req.query._db} not found`);
    }   
});


// ? add a new user to database
router.post('/add/user',async (req,res,next)=>{
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
});

router.post('/add',async (req,res,next)=>{
    getDBName(req.query._db, res)
    if (isDBExits){
        
        CtrDB.save().then(()=>{
            res.status(201).send(CtrDB);
        }).catch((e)=>{
            res.status(400).send(e);
        })

    }else{
        res.send(`DB ${req.query._db} not found`);
    }
});

// ? update a user in the database
router.put('/modify/:id',(req,res)=>{
    // User.findOneAndUpdate({_id: req.params.id},req.body).then(function(user){
    //     User.findOne({_id: req.params.id}).then(function(user){
    //         res.send(user);
    //     });
    // });
    getDBName(req.query._db, res)
    if (isDBExits){
        CtrDB.findOneAndUpdate({_id: req.params.id},req.body).then((data)=>{
            CtrDB.findOne({_id: req.params.id}).then((data)=>{
                res.send(data);
            }); });
    }else{
        res.send(`DB ${req.query._db} not found`);
    }

});

// ? delete a user in the database
router.delete('/remove/:id',(req,res, next) =>{
    // User.findOneAndDelete({_id: req.params.id}).then(function(user){
    //     res.send(user);
    // });
    getDBName(req.query._db, res)
    if (isDBExits){
        CtrDB.findOneAndDelete({_id: req.params.id}).then(()=>{
            res.send(`Deleted '${req.params.id}' from '${req.query._db}' DB`);
        }).catch(next);
    }else{
        res.send(`DB ${req.query._db} not found`);
    }
});

// ! Upload logic
// router.post('/upload',async (req,res,next)=>{
//     try {
//       await upload(req, res);
//       console.log(req.file);
  
//       if (req.file == undefined) {
//         return res.send({
//           message: "You must select a file.",
//         });
//       }
  
//       return res.send({
//         message: "File has been uploaded.",
//       });
//     } catch (error) {
//       console.log(error);
  
//       return res.send({
//         message: `Error when trying upload image: ${error}`,
//       });
//     }
//   });


// ! fn to get DB name from query string
function getDBName(chkDB, res){
    if(chkDB !== undefined){
        switch(chkDB) {
            case "user":
                CtrDB = User
                isDBExits = true
                break;
            case "product":
                CtrDB = Product
                isDBExits = true
                break;
            default:
                isDBExits = false 
            }
    }else{
        res.send(`query _db not found`);
    }
}


module.exports = router;