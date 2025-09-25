import { assets, blog_data } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogItems = ({title,description,category,image,id}) => {
  return (
    <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_000000]'>
      <Link href={`/blogs/${id}`}>
        <Image src={image} alt='/' width={400} height={400} className='border-b border-black w-fit' />
        </Link>
        <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm pb-1.5 pt-1.5'>{category}</p>
        <div className="p-5 hover:shadow-[-7px_7px_0px_000000]">
          <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{title}</h5>
          <p className='mb-3 text-sm tracking-tight text-gray-800'>{description}</p>
          <Link href={`/blogs/${id}`} className='inline-flex items-center py-2 font-semibold text-center gap-4 '>
            Read More <Image src={assets.arrow} width={12}  alt='' className='ml-2' />
          </Link>
        </div>
      
    </div>
  )
}

export default BlogItems
