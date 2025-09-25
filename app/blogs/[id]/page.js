'use client'
import { assets, blog_data } from '@/Assets/assets'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/Components/Footer'

const BlogPage = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!id) return
    const blog = blog_data.find((item) => item.id === Number(id))
    if (blog) setData(blog)
  }, [id])

  if (!data) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <main className="flex-1 max-w-3xl mx-auto p-6 w-full">
        {/* Blog image */}
        <div className="w-full h-[300px] relative mb-6">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Category */}
        <p className="text-sm bg-black text-white inline-block px-3 py-1 rounded mb-3">
          {data.category}
        </p>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

        {/* Author info */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 relative bg-gray-200 rounded-full flex-shrink-0">
            {data.author_img ? (
              <Image
                src={data.author_img}
                alt={data.author || 'Author'}
                fill
                className="object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="flex-1">
            <p className="font-semibold text-gray-800">
              {data.author || 'Unknown Author'}
            </p>
            {data.date && (
              <p className="text-gray-500 text-sm">Published: {data.date}</p>
            )}
          </div>

          <Link
            href="/"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Description */}
        <div className="prose prose-lg max-w-none mb-6">
          <p className="text-lg text-gray-700 leading-relaxed">{data.description}</p>
        </div>

        {/* Steps section */}
        <div className="mb-6">
          <h3 className="my-5 text-[18px] font-semibold">Step 1: Self Reflection</h3>
          <p className="my-3">You can change your life with proper plan</p>

          <h3 className="my-5 text-[18px] font-semibold">Step 2: Self Reflection</h3>
          <p className="my-3">You can change your life with proper plan</p>
        </div>

        {/* Social share */}
        <div className="flex items-center gap-2 mb-6">
          <p className="text-black font-semibold my-4">Share This Article On Social Media</p>
          <Image src={assets.facebook_icon} alt="Facebook" width={50} />
          <Image src={assets.twitter_icon} alt="Twitter" width={50} />
          <Image src={assets.googleplus_icon} alt="Google Plus" width={50} />
        </div>

        {/* Additional HTML content */}
        {data.content && (
          <div className="mt-8 prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        )}
      </main>

      {/* Footer - full width */}
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  )
}

export default BlogPage 
