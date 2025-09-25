import mongoose  from "mongoose";
 export const connectDb=async()=>{
    await mongoose.connect('mongodb+srv://sreenathts655:sreenath@cluster0.babcixv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log("db connected successfully")

}