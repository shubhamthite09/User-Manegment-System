const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    device:{type:String,enum:["Laptop", "Tablet", "Mobile"]},
    no_of_comments:{type:Number,required:true},
    user:{type:String,required:true}
})

const postModle = mongoose.model("post",postSchema)

module.exports={postModle}