const mongoose=require('mongoose');
const schema=mongoose.schema;
const productSchema=new schema({
    name:{
        type:string,
        required:true
        
    },
    price:{
        type:Number,
        required:true,
        min:1
    },
    description:{
        type:string,
        required:true,
        minlength:10,
        maxlength:1000
    
    },
    category:{
        type:schema.types.ObjectId,
        required:true

    },
    codEligible:{
        type:Boolean,
        required:true,
        default:true,
        validate:{
            validator:function(value){
                return !(this.price>=25000 && this.codEligible)
            },
            message:function(){
                return 'cod eligible is not available for product about 25000'
            }
        }
    },
    stock:{
        type:Number,
        required:true,
        min:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


//above all are the productschema 
const product=mongoose.model('product', productSchema);
// this is product model  
module.exports={
    product
}