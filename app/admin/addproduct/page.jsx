'use client'
import { assets } from '@/Assets/assets'
import { set } from 'mongoose'
import Image from 'next/image'
import React, { useState } from 'react'

const page = () => {
    const[image,setImage]=useState(null)
  return (
    <div>
        <form className='pt-5 px-5 sm:pt-12 sm:pl-16'>
            <p className='text-xl'>Upload Thumbnail</p>
            <label htmlFor='image' >
            <Image className='mt-4 cursor-pointer' src={!image ? assets.upload_area:URL.createObjectURL(image)} alt='' width={140} height={70}  />
            </label>
            
            <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required />
            <p className='text-xl mt-4'>Blog Title</p>
            <input type='text' placeholder='Type here ' required />


        </form>
      
    </div>
  )
}

export default page
