'use client'
import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div>
        <form className='pt-5 px-5 sm:pt-12 sm:pl-16'>
            <p className='text-xl'>Upload Thumbnail</p>
            <label htmlFor='image' >
            <Image className='mt-4 cursor-pointer' src={assets.upload_area} alt='' width={140} height={70}  />
            </label>
            
            <input type='file' id='image' hidden required />


        </form>
      
    </div>
  )
}

export default page
