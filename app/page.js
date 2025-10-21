'use client'
import { blog_data } from "@/Assets/assets";
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import axios from "axios";
import { useState } from "react";
import { ToastContainer } from "react-toastify";



export default function Home() {
 // const[data,setData]=useState(null)
  
  return (
    <div>
      <ToastContainer theme="dark" />
      <Header />
      <BlogList />
      <Footer />
      
      
      
    </div>
  );
}
