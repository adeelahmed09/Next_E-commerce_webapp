"use client"

import Link from "next/link"

function Main() {
  return (
    <div className='w-screen  sm:flex-row flex flex-col  justify-between items-center gap-3 sm:px-[10vw] px-5 py-5 sm:h-[88vh]'>
      <div className=' flex sm:gap-[2vw] gap-[4vw] flex-col justify-center sm:items-start items-center w-[100vw] sm:h-[80vh] h-[40vh]' >
      <h1 className="text-4xl text-start sm:w-[70%] w-[90%] font-semibold">
        Take Your Style to the Next Level
      </h1>
      <p className="text-xl text-start font-light sm:w-[75%] w-[90%]">Discover the latest trends and timeless styles, designed to elevate your wardrobe effortlessly.</p>
      <button className="px-4 py-2 bg-zinc-800 text-white rounded-lg">
        <Link href={"/products"}>See All Product</Link>
      </button>
      </div>
      <div className=' w-[90vw] overflow-hidden rounded-2xl h-[70vh]'>
        <img src="/model.jpg" className='w-full h-full object-center object-cover ' alt="" />
      </div>
    </div>
  )
}

export default Main
