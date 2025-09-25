import mongoose, { Schema } from "mongoose";
const Schema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    authorImage:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
const BlogModel=mongoose.models.blog || mongoose.model('blog',Schema)
export default BlogModel