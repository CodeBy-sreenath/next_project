import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className="px-5 py-5 md:px-12 lg:px-28">
      {/* Top Logo + Button */}
      <div className="flex items-center justify-between">
        <Image
          src={assets.logo}
          width={180}
          alt="Logo"
          className="w-[130px] sm:w-auto"
        />
        <button className="flex items-center gap-2 font-medium py-2 px-4 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
          Get Started
          <Image src={assets.arrow} alt="Arrow" />
        </button>
      </div>

      {/* Title + Description */}
      <div className="text-center my-12">
        <h1 className="text-3xl sm:text-5xl font-semibold">Latest Blogs</h1>
        <p className="mt-6 max-w-[740px] mx-auto text-sm sm:text-base text-gray-700">
          The blogs are used to engage people in various activities. They support
          them to continue their daily tasks.
        </p>

        {/* Subscription Form */}
        <form
          action=""
          className="flex items-center justify-between max-w-[500px] mx-auto mt-8 border border-black rounded-md overflow-hidden"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 outline-none text-sm sm:text-base"
          />
           <button type='submit' className="px-6 py-3 border border-black transition duration-300 hover:bg-black hover:text-white">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

export default Header
