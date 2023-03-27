require("dotenv").config()
const {connection} = require("./config/connect")
const {userRouter} = require("./routes/user")
const {postRouter} = require("./routes/post")
const {validate} = require("./middleware/validater")
const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

app.use("/user",userRouter)
app.use("/posts",validate)
app.use("/posts",postRouter)
app.get("/",(req,res)=>{
    res.send({msg:"welcome to user manegment system"})
})

app.listen(process.env.PORT,async(req,res)=>{
    try{
        await connection
        console.log(`connected to DB ....`)
    }catch(err){
        console.log({err:err.messege})
    }
    console.log(`server is runing on port ${process.env.PORT}`)
})
