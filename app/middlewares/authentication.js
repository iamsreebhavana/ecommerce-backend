const {user}=require('../models/user')
const authenticateUser=(req,res,next){
    let token=req.header('x-auth')
    User.findByToken(token).then(function(user) {
        req.user=user
        req.token=token
        next()
    })
    }).catch(function(err)=> {
        res.status(401).send(err)
    

    }
    module.exports={
        authenticateUser
    }

}