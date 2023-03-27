require("dotenv").config()
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {userModle} = require("../config/userModle")

const userRouter = express.Router()
userRouter.use(express.json())

userRouter.post("/reg",async(req,res)=>{
    try{
        const alredy = await userModle.findOne({email:req.body.email})
        if(alredy){res.json({msg:`User already exist, please login`})}
        else{
            req.body.password = await bcrypt.hash(req.body.password,2)
            let newUser = new userModle(req.body)
            await newUser.save()
            res.json({msg:`new user created.`})
        }
    }catch(err){
        res.json({err:err.messege})
    }
})

userRouter.post("/log",async(req,res)=>{
    try{
        const alredy = await userModle.findOne({email:req.body.email})
        if(!alredy){res.json({msg:`User Dosenot exist, please create`})}
        else{
            if(await bcrypt.compare(req.body.password,alredy.password)){
                let token = jwt.sign({user:alredy._id,name:alredy.name},process.env.PrivetKey,{expiresIn:"1h"})
                res.send({msg:"done",token})
            }else{
                res.json({err:"password wrong"})
            }
            }
        }catch(err){
        res.json({err:err.messege})
    }
})

module.exports={userRouter}
