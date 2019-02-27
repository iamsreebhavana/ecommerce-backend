const express=require('express');
const router=express.Router();
const{User}=require('../models/user');
//npm install --save validator
const {authenticateUser}=require('../middlewares/authentication');
router.post('/',function(req,res){
    let body=req.body;
    let user=new User(body);
    user.save().then(function(user){  
        return user.generateToken()
    })
    .then(function(token){
        res.header('x-auth',token).send();
    })
    .catch(function(err){
        res.send(err)
    })
});

router.post('/login',function(req,res){
    let body=req.body;
    User.findByCredentials(body.email,body.password).then(function(user){
        return user.generateToken();
    }).then(function(token){
        res.header('x-auth',token).send();
    }).catch(function(err){
        res.status(401).send(err)
    })
    
});

    
   router.get('/profile',authenticateUser,function(req,res){
       const{user,token}=req;
       const tokenInfo=user.tokens.find(function(tokenItem){
           return tokenItem.token==token;
       })
       user.tokens.id(tokenInfo._id).remove()
       user.save().then(user){
           res.send({
               notice:'successfully logged out'
           })
       }
   })


    
    module.exports={
        usersController:router

    }