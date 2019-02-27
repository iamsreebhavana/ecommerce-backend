const express=require('express');
const router=express.Router();
//npm install --save mongodb
const {ObjectID} = require('mongodb')
//

const {category}=require('..models/category');
// two dots will take one folder back


//express middleware
const validateID=(req,res,next)=>{
    let id=req.params.id;
    if(!ObjectID.isValid(id)){
        res.send({
            notice:'invalid object id'
        })
    } else{
        next();
    }
    
}

//GET method
//localhost:3000/categories/

router.get('/',function(req,res){
    Categories.find().then(function(categories){
        res.send(categories);
    }).catch(function(err){
        res.send(err);
    })
});

//GET method through id
//localhost:3000/categories/id

router.get('/:id',validateID,function(req,res){
    
    Categories.findById(id).then(function(req,res){
        res.send(category);
    }).catch(function(err){
        res.send(err);
    })
});

//POST method
//localhost:3000/categories
router.post('/',function(req,res){
               let body =req.body;
                 let c =new Category(body);
                 c.save().then(function(req,res){
                     res.send(category);
                 }).catch(function(err){
                     res.send(err);
                 })
});


// DELETE method through id
//localhost:3000/categories/id
router.delete('/:id',validateID,function(req,res){
    
    Category.findByIdAndRemove(id).then(function(req,res){
        res.send({
            notice:'successfully deleted the category'
        });
    }).catch(function(err){
        res.send(err);
    })
})


// PUT method through id
//localhost:3000/categories/id
router.put('id',function(req,res){
    let id=req.params.id;
    Category.findById(id).then(function(req,res){
        res.send(category);
    }).catch(function(err){
        res.send(err);
    })

});

module.exports={
    categoriesController:router
}
  
    
