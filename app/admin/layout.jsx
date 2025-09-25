'use client'

import { assets } from "@/Assets/assets"
import SideBar from "@/Components/AdminComponents/SideBar"
import Image from "next/image"

export default function layOut({children})
{
    return(
        <>
        <div className="flex">
            <SideBar />
        
        <div className="flex flex-col w-full">
            <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
                <h3 className="font-medium">Admin Panel</h3>
                <Image src={assets.profile_icon} alt="" width={40} />
          

            </div>
                  {
            children
        }

        </div>
        
        
        </div>
        </>
    )

}