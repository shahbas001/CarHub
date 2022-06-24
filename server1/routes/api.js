const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
const jwt = require('jsonwebtoken');
const CartModel=require('../models/cart');


router.get('/store',function(req,res){
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  Product.find()
              .then(function(products){
                  res.send(products);
              });
});

router.post('/delete',function(req,res){
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  const id=req.body._id;
  Product.remove({_id:id}).then((err)=>{
      res.send({"msg":"Product Removed Successfully"})
  })
});

router.post('/getproduct',function(req,res){
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  const id=req.body._id;
  Product.findOne({_id:id})
    .then(function(product){
        res.send(product);
      });
});
router.post('/get',function(req,res){
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  const id=req.body._id;
  Product.findOne({_id:id})
    .then(function(product){
        res.send(product);
      });
});

router.post('/updateproduct',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  var product = {
      productId : req.body.product.productId,
      productName : req.body.product.productName,
      description : req.body.product.description,
      expiryDate : req.body.product.expiryDate,
      price : req.body.product.price,
      imageUrl : req.body.product.imageUrl
 }
  Product.update({_id:req.body.product._id},product).then((err)=>{
      res.send({msg:"Product Updated"});
  });
});

router.post('/find', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  const name = req.body.productName;
  Product.find({ $and: [{ productName: name }] }).then((data) => {
      res.send(data)
  })
});


router.post('/register',(req,res)=>{
  let userData=req.body;
  userData.usertype="user";
  let user = new User(userData)
  user.save((err,registeredUser)=>{
    if(err){
      console.log(err)
    } else{
      let payload = {subject: registeredUser._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({email: userData.email}, (err, user) => {
    if (err) {
      console.log(err)    
    } else {
      if (!user) {
        res.status(401).send('Invalid Email')
      } else 
      if ( user.password == userData.password) {
        var userDetails = {};
        let payload = {subject: user._id}
        console.log("testing")

        let token = jwt.sign(payload, 'secretKey')
        userDetails.user=user;
        userDetails.token=token;
        res.status(200).send(userDetails)

      } else {
        res.status(401).send('Invalid Password')
      }
    }
  })
})

router.post('/add',function(req,res){

  let productData = req.body
  let product = new Product(productData)
  product.save();
  res.send({msg:"Item Inserted"})
})

router.post('/addtocart/:id',(req,res)=>{
  const item = req.body.Product;
  const user_id = req.params.id;

  CartModel.findOne({userId :user_id},(err,cart)=>{
      if(!cart){
          console.log("add ");
          var cart = new CartModel({
              userId : user_id
          })
          cart.cartItem.push({
              itemId: item._id,
              itemName :item.itemName,
              itemImage :item.itemImage,
              itemPrice :parseFloat(item.itemPrice),  
              quantity: 1,
          })
          cart.save((err,cart)=>{
              if(!err){
                  res.send({msg:'New cart created' ,'cart':cart});
                  console.log('done');
                  
              }else{
                  console.log(err);
              }
          })
      }else{
          console.log("update");
          CartModel.findOne({$and :[ {userId: user_id},{cartItem: { $elemMatch: { $and: [{itemId : item._id}] } } } ] },(err,cart)=>{
          if(cart){
              console.log(err);

          CartModel.findOneAndUpdate({$and :[ {userId: user_id},{cartItem: { $elemMatch: { $and: [{itemId : item._id}] } } } ] },{$inc: {"cartItem.$.quantity" :1}},(err,cart)=>{
                      if(cart){
              console.log(err);

                          console.log('quan updated')
                          res.send({msg:'Item exist.Quantity Updated' ,'cart':cart});
                      }else{
                          console.log('err')
                      }
                  })
              }else{
          var cartItem={
                  itemId: item._id,
                  itemName :item.itemName,
                  itemImage :item.itemImage,
                  itemPrice :parseFloat(item.itemPrice),  
                  quantity: 1,
              }
          CartModel.findOneAndUpdate({userId:user_id},{"$push" :{"cartItem" :cartItem}},(err,cart)=>{
              if(cart){
                  res.send({msg:'New Item added','cart': cart});
              }else{
                  console.log('err')
              }
          })
      }
      })

      }
  })
});
router.get('/getcart/:id',(req,res)=>{
  const user_id = req.params.id;
  CartModel.findOne({userId :user_id},(err,cart)=>{
      if(cart){
          res.send({'msg':'cart exist',cart})
      }else{
          console.log('err')
      }
  })
})

module.exports = router;