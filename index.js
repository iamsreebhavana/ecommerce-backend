const express=require('express');
const app=express();
const {mongoose}=require('./config/db');

const port=3000;
const {categoriesControllerController}=require('./app/controllers/categoriesController');
app.use(express.json());
app.get('/',function(req,res){
    res.send('welcome to the site');
});

// categories,categoriesController 
app.use('/categories',categoriesController)
// users,usersController
app.use('/users',usersController)



app.listen(port,function(){
console.log('listening on port',port);
})