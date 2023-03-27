const jwt = require("jsonwebtoken")
require("dotenv").config()

const validate = (req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token,process.env.PrivetKey,(err,decoded)=>{
            if(err){res.send({err:`login first`})}
            else{
                req.body.user=decoded.user
                req.body.name=decoded.name
                next()
            }
        })
    }else{
        res.send({msg:"protected route"})
    }      
}

module.exports={validate}