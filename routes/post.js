
const express = require("express")
const {postModle} = require("../config/postModle")

const postRouter = express.Router()
postRouter.use(express.json())

postRouter.post("/add",async(req,res)=>{
    try{
        let newPost = new postModle(req.body)
        await newPost.save()
        res.send({msg:`post added`})
    }catch(err){
        res.json({err:err.messege})
    }
})

postRouter.get("/",async(req,res)=>{
    try{
        if(req.query.min && req.query.max){
            let newPost = await postModle.find({$and:[{user:req.body.user},{no_of_comments:{$gte:req.query.min}},{no_of_comments:{$lte:req.query.max}}]})
            res.send(newPost) 
        }else if(req.query.page){
            if(req.query.page ==1){
                req.query.page=0
            }
            let page=req.query.page*3-3
            let newPost = await postModle.find({user:req.body.user}).skip(page).limit(3)
            res.send(newPost)
        }else if(req.query.device){
            let newPost = await postModle.find({$and:[{user:req.body.user},{device:req.query.device}]}).limit(3)
            res.send(newPost)
        }else if(req.query.device1 && req.query.device2){
            let newPost = await postModle.find({$and:[{user:req.body.user},{device:req.query.device1},{device:req.query.device2}]})
            res.send(newPost)
        }else{
            let newPost = await postModle.find({user:req.body.user})
            res.send(newPost)
        }
    }catch(err){
        res.json({err:err.messege})
    }
})

postRouter.get("/top",async(req,res)=>{
    try{
        let newPost = await postModle.find({user:req.body.user}).sort({no_of_comments:-1}).limit(3)
        res.send(newPost)
    }catch(err){
        res.json({err:err.messege})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    try{
        await postModle.findByIdAndUpdate({_id:req.params.id},req.body)
        res.send({msg:`updated`})
    }catch(err){
        res.json({err:err.messege})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    try{
        await postModle.findByIdAndDelete({_id:req.params.id})
        res.send({msg:`deleted`})
    }catch(err){
        res.json({err:err.messege})
    }
})

module.exports={postRouter}
