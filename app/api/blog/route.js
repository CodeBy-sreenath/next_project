import { connectDb } from "@/app/blogs/[id]/lib/config/db"
import BlogModel from "@/app/blogs/[id]/lib/models/BlogModel"
import {writeFile} from 'fs/promises'

const { NextResponse } = require("next/server")
const LoadDbB=async()=>{
    await connectDb
}
LoadDbB() // using this function api will connected to the database




export async function GET(request)

{
    console.log("Blog Get Hit")
    return NextResponse.json({msg:"API is working"})
}
export async function POST(request)
{
    const formData=await request.formData()
    const timeStamp=Date.now()
    const image=formData.get('image')
    const imageByteData=await image.arrayBuffer()
    const buffer=Buffer.from(imageByteData)
    const path=`./public/${timeStamp}_${image.name}`
    await writeFile(path,buffer) //for storing images in the public folder
    const imgUrl=`${timeStamp}_${image.name}`
    const blogData={
        title:`${formData.get('title')}`,
        description:`${formData.get('description')}`,
        category:`${formData.get('category')}`,
        author:`${formData.get('author')}`,
        image:`${imgUrl}`,
        authorImg:`${formData.get('authorImg')}`
    }
    await BlogModel.create(blogData)
    console.log("Blog saved")
    return NextResponse.json({success:true,msg:"blog added"})
   
}