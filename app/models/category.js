const mongoose=require('mongoose');
const schema=mongoose.schema;
//deciding the fields required for our documents
//category-name
const categorySchema=new schema({
    name:{
        type:string,
        required:true,
        minlength:3,
        maxlength:64
    }
});
//model names - should be singular and should be in pascal case
const Category=mongoose.model('Category', categorySchema);
//let c1=new Category({ name:'Sports'})
// c1.save();