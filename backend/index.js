const express = require("express");
require("./db/Config");
const User = require("./db/User");
const Product= require("./db/Product");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const Jwt= require('jsonwebtoken');
const jwtKey='eCommerce'
//user signUp api
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});
//user login api
app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({user},jwtKey,(err,token)=>{
        if(err){
          res.send('User not found');
        }
        res.send({user,auth:token});
      })
      
    } else {
      res.send("User not found");
    }
  } else {
    res.send("Both the fields are necessery");
  }
});
//add product api
app.post("/add",async(req,res)=>{
  let product= new Product(req.body);
  let result= await product.save();
  res.send(result);
})
//product list for user api
app.get('/products/:id',async(req,res)=>{
  let user= req.params.id
  let products= await Product.find({userId:`${user}`})
  if(products.length>0){
    res.send(products)
  }
  else{
    res.send("No products found")
  }
})
//product search by id api
app.get('/findProduct/:id',async(req,res)=>{
  let result= await Product.findById(req.params.id)
  res.send(result);
})
//delete product api
app.delete('/delete/:id',async(req,res)=>{
  let id= req.params.id
  let result= await Product.deleteOne({_id:`${id}`});
  res.send(result);
})
//update product api
app.put('/update/:id',async(req,res)=>{
  let result= await Product.updateOne({_id:req.params.id},{
    $set:req.body
  })
  res.send(result)
})
//product search api
app.get('/search/:key',async(req,res)=>{
  let result = await Product.find({
    $or:[
      {name:{$regex:req.params.key,$options:"/^ABC/i"}},
      {company:{$regex:req.params.key,$options:"/^ABC/i"}}
    ]
  })
  res.send(result)
})
app.listen(4000);
