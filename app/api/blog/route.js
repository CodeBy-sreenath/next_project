import { connectDb } from "@/app/blogs/[id]/lib/config/db"
import BlogModel from "@/app/blogs/[id]/lib/models/BlogModel"
import { writeFile } from "fs/promises"
import { NextResponse } from "next/server"
const fs=require('fs')

// ✅ Fix: Actually call the function
const LoadDbB = async () => {
  await connectDb()
}
LoadDbB()

// ✅ GET route
export async function GET(request) {
  const blogId=request.nextUrl.searchParams.get("id") //id get from the front end
  if(blogId)
  {
    const blog=await BlogModel.findById(blogId)
    return NextResponse.json({blog})
  }
  else
  {
    
    const blogs=await BlogModel.find({})
  console.log("Blog Get Hit")
  return NextResponse.json({ blogs })

  }

}

//API end point for uploading blog data

// ✅ POST route
export async function POST(request) {
  try {
    const formData = await request.formData()
    const timeStamp = Date.now()
    const image = formData.get("image")

    if (!image) {
      return NextResponse.json({ success: false, msg: "No image provided" }, { status: 400 })
    }

    // Convert image to buffer
    const imageByteData = await image.arrayBuffer()
    const buffer = Buffer.from(imageByteData)
    const path = `./public/${timeStamp}_${image.name}`

    await writeFile(path, buffer) // save image to /public folder

    //const imgUrl = `${timeStamp}_${image.name}`
    const imgUrl = `/${timeStamp}_${image.name}`
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      authorImg: formData.get("authorImg"),
    }

    // ✅ Fix: await works only if DB is connected
    const newBlog = await BlogModel.create(blogData)
    console.log("Blog saved:", newBlog.title)

    return NextResponse.json({ success: true, msg: "Blog added successfully" })
  } catch (error) {
    console.error("Error saving blog:", error)
    return NextResponse.json({ success: false, msg: "Internal Server Error", error: error.message }, { status: 500 })
  }
}
//APi end point for deleting the blog
export async function DELETE(request) {
  try {
    await connectDb();
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, msg: "Missing blog ID" },
        { status: 400 }
      );
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, msg: "Blog not found" },
        { status: 404 }
      );
    }

    // Delete image file if it exists
    const imagePath = `./public${blog.image}`;
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting image:", err);
        else console.log("🗑️ Image deleted:", imagePath);
      });
    }

    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      msg: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, msg: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}