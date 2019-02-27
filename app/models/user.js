const mongoose=require('mongoose');

const Schema=mongoose.Schema;
//npm install --save validator
const validator=require('validator');

const userSchema=new Schema({
    username:{
        type:string,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:string,
        required:true,
        unique:true,
        trim:true,
    
        //validate the format of the email-custom validation
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(){
                return 'invalid email format'
            }
        }
    },
    password:{
        type:string,
        minlength:8,
        maxlength:128,
        required:true
},
mobile:{
    type:string,
    unique:true,
    required:true,
    minlength:10,
    maxlength:10,
    trim:true,
    validate:{
        validator:function(value){
            return this.validator.isNumeric(value)

        },
        message:function(){
            return 'invalid mobile format'
        }
    }
},
tokens:[{
    token:{
        type:string
    }
}]
});
// to define our own instance methods
userSchema.methods.generateToken=function(){
    let user=this;
    let tokenData={
        userId:this._id
    }
    let jwtToken=jwt.sign(tokenData,'supersecret')
    user.tokens.push({token:jwtToken});
    return user.save().then(function(user){
        return jwtToken;
    })
}
// npm install --save bcryptjs
userSchema.pre('save',function(next){
    let user=this;
    
        //console.log('this function was called even before saving ')
        bcryptjs.genSalt(10).then(function(salt){
            bcryptjs.hash(user.password,salt).then(function(encrypted){
                user.password=encrypted
                next();

            })
        }).catch(function(err){
            console.log(err)
        })
    
});
userSchema.statics.findByCredentials=function(email,password){
    let User=this;
    return User.findOne({email:email}).then(function(user){
        if(!user){
            return Promise.reject('invalid email or password');
        }
        return bcryptjs.compare(password,user.password).then(function(res){
            if(res){
                return Promise.resolve(user)
            } else{
                return Promise.reject('invalid email or password')
            }
        })
    })
}
userSchema.statics.findByToken=function(token){
    let User=this;
    let tokenData;
    try{
        tokenData=jwt.verify(token,'supersecret');
    }catch(err){
        return Promise.reject(err.message);
    }
    return User.findOne({
        '_id':tokenData.userId,
        'tokens.token':token // token is array ,token is the field in that 
    })
}









const User=mongoose.model('User',userSchema)
module.exports={
    User
};










bcryptjs.genSalt(10).then(function(salt){
    bcryptjs.hash(user.password,salt).then(function(encrypted))
    user.password=encrypted
    next()
})
}).catch(function(err){
    console.log(err)
})
})
userSchema.statistics.findByToken=function(token){
    let User=this
    let tokenData;
    try{
        tokenData=jwt.verify(token,'supersecret')
    } catch(err){
        return Promise.reject(err.message)
    }
    return User.findOne({
        '_id':tokenData.userId,
        'tokens.token':token
    })
    }
    //pre validate-function()
    //actual validation
    //post validate-function()
    //pre save-function()
    //actual save
    //post save-function()



    })
}