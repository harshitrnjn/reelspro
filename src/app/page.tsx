import Link from 'next/link';
import React from 'react'
import { AiOutlineWarning } from "react-icons/ai";

const page = () => {
  return (
    <div>
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-14 g-gray-100 text-white">
        <section className="text-center mb-8 md:mb-12  ">
          <h1 className="text-3xl md:text-5xl font-bold text-black">
            REELS PRO — Dive into the World of Creating Reels.
          </h1>
          <p className="mt-5 md:mt-10 text-base md:text-lg text-black/50 font-bold">
            A clone built to challenge the reel deal
            
          </p>
        </section>
      </main>
      <div className="h-[68.8vh] w-full flex flex-col justify-center items-center gap-y-8 bg-gray-200 " >
        <h1 className="text-4xl font-bold text-center " >CREATE YOUR REEL ACCOUNT, NOW! </h1>
        <div className="flex items-center justify-center gap-x-8">
          <Link href={"/login"}><button className="px-6 py-3 border-2 border-black/65 font-bold rounded text-lg">LOG IN</button></Link>
          <Link href={"/register"}><button className="px-6 py-3 border-2 border-black/65 font-bold rounded text-lg">REGISTER</button></Link>
        </div>
      </div>
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © 2023 True Feedback. All rights reserved.
      </footer>
    </div>
  ) 
}

export default page
