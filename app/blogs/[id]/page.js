'use client'
import { assets } from '@/Assets/assets'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/Components/Footer'
import axios from 'axios'

const BlogPage = () => {
  const params = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchBlogData = async () => {
    try {
      const response = await axios.get('/api/blog', {
        params: { id: params.id },
      })
      setData(response.data.blog)
    } catch (error) {
      console.error('❌ Error fetching blog:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogData()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading blog...</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Blog not found.</p>
      </div>
    )
  }

  // ✅ Handle image properly (remote or local)
  const imageSrc =
    data.image && data.image.trim() !== ''
      ? data.image
      : '/fallback-blog.jpg' // Make sure this file exists in /public

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 max-w-3xl mx-auto p-6 w-full">
        {/* Blog image */}
        {imageSrc ? (
          <div className="w-full h-[300px] relative mb-6">
            <Image
              src={imageSrc}
              alt={data.title || 'Blog image'}
              fill
              className="object-cover rounded-lg"
              priority
              unoptimized // allows remote URLs without domain config
            />
          </div>
        ) : (
          <div className="w-full h-[300px] bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
            <p className="text-gray-500">No image available</p>
          </div>
        )}

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
                unoptimized
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
          <p className="my-3">You can change your life with a proper plan</p>

          <h3 className="my-5 text-[18px] font-semibold">Step 2: Action Plan</h3>
          <p className="my-3">Stay consistent and evaluate your progress regularly</p>
        </div>

        {/* Social share */}
        <div className="flex items-center gap-2 mb-6">
          <p className="text-black font-semibold my-4">
            Share This Article On Social Media
          </p>
          <Image src={assets.facebook_icon} alt="Facebook" width={40} />
          <Image src={assets.twitter_icon} alt="Twitter" width={40} />
          <Image src={assets.googleplus_icon} alt="Google Plus" width={40} />
        </div>

        {/* Extra content */}
        {data.content && (
          <div className="mt-8 prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        )}
      </main>

      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  )
}

export default BlogPage
