'use client'
import { assets } from '@/Assets/assets'
import { set } from 'mongoose'
import Image from 'next/image'
import React, { useState } from 'react'

const page = () => {
    const[image,setImage]=useState(null)
    const[data,setData]=useState({
        title:"",
        description:"",
        category:"StartUp",
        author:"Alex Bennet",
        authorImg:"/author_img.png"
    })
    const onChangeHandler=(event)=>{
        const name=event.target.name
        const value=event.target.value
        setData(data=>({...data,[name]:value}))
    }
  return (
    <div>
        <form className='pt-5 px-5 sm:pt-12 sm:pl-16'>
            <p className='text-xl'>Upload Thumbnail</p>
            <label htmlFor='image' >
            <Image className='mt-4 cursor-pointer' src={!image ? assets.upload_area:URL.createObjectURL(image)} alt='' width={140} height={70}  />
            </label>
            
            <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required />
            <p className='text-xl mt-4'>Blog Title</p>
            <input className='w-full sm:w-[500px] mt-4 px-4 py-3 border outline-none' type='text' placeholder='Type here ' required />
            <p className='text-xl mt-4'>Blog Description</p>
            <textarea className='w-full sm:w-[500px] mt-4 px-4 py-3 border outline-none' type='text' placeholder='write content ' rows={6} required />
            <p className='text-xl mt-4'> Blog Category</p>
            <select name='category' className='mt-3 w-40 px-4 py-3 border text-gray-500'>
                <option value='Startup'>StartUp</option>
                <option value='Technology'>Technology</option>
                <option value='LifeStyle'>Life Style</option>

            </select>
            <br></br>
            <button type='submit' className='mt-8 w-40 h-12 bg-black text-white'>ADD</button>



        </form>
      
    </div>
  )
}

export default page
