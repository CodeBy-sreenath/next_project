'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const [image, setImage] = useState(null)
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "StartUp",
    author: "Alex Bennet",
    authorImg: "/author_img.png"
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!image) {
      toast.error("Please select an image")
      return
    }

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('author', data.author)
    formData.append('authorImg', data.authorImg)
    formData.append('image', image)

    try {
      // ✅ Ensure the API route name matches your backend (check /api/blog or /api/blogs)
      const response = await axios.post('/api/blog', formData)

      if (response.data.success) {
        toast.success(response.data.msg)
        // Optional: reset form
        setData({
          title: "",
          description: "",
          category: "StartUp",
          author: "Alex Bennet",
          authorImg: "/author_img.png"
        })
        setImage(null)
      } else {
        toast.error("Failed to add blog")
      }
    } catch (error) {
      console.error("Error uploading blog:", error)
      toast.error("Something went wrong")
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Upload Thumbnail</p>
        <label htmlFor='image'>
          <Image
            className='mt-4 cursor-pointer'
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=''
            width={140}
            height={70}
          />
        </label>

        <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />

        <p className='text-xl mt-4'>Blog Title</p>
        <input
          name='title'
          onChange={onChangeHandler}
          value={data.title}
          className='w-full sm:w-[500px] mt-4 px-4 py-3 border outline-none'
          type='text'
          placeholder='Type here'
          required
        />

        <p className='text-xl mt-4'>Blog Description</p>
        <textarea
          name='description'
          onChange={onChangeHandler}
          value={data.description}
          className='w-full sm:w-[500px] mt-4 px-4 py-3 border outline-none'
          placeholder='Write content'
          rows={6}
          required
        />

        <p className='text-xl mt-4'>Blog Category</p>
        <select
          name='category'
          onChange={onChangeHandler}
          value={data.category}
          className='mt-3 w-40 px-4 py-3 border text-gray-500'
        >
          <option value='StartUp'>StartUp</option>
          <option value='Technology'>Technology</option>
          <option value='LifeStyle'>Life Style</option>
        </select>

        <br />
        <button type='submit' className='mt-8 w-40 h-12 bg-black text-white'>ADD</button>
      </form>
    </div>
  )
}

export default Page
