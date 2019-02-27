const express=require('express');
const router=express.Router();
//npm install --save mongodb

const {product}=require('..models/product');
// two dots will take one folder back

//GET method
//localhost:3000/product

router.get