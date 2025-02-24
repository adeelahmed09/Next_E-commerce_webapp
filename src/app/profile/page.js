"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

function page() {
    const {data:session,status} = useSession()
    const [userInfo, setUserInfo] = useState({
        name:"",
        avatar:"",
        email:"",
        role:""
    })
    useEffect(()=>{
        const user = session?.user
        if(!user){
            return
        }
        console.log(user.avatar);
        setUserInfo({...userInfo,name:user.name,email:user.email,avatar:user.avatar,role:user.role})
        
    },[session])
  return (
    <div className='w-full px-4 justify-center items-center  bg-zinc-200 flex gap-2  h-screen'>
      <div className='w-full h-[90%] grid  grid-rows-2 grid-cols-3 bg-white border-2  border-zinc-300'>
        <div className=' col-span-2 '>
          <h1 className='text-4xl font-semibold px-5 pt-5 text-zinc-800'>{userInfo.name}</h1>
          <div className='ml-16 text-xl '>
            <h2>Email : {userInfo.email}</h2>
          </div>
        </div>
        <div className='w-full content-center justify-items-center h-full'>
          <img src={"/nodp.jpg"} className='w-52 rounded-full object-cover object-center h-52' alt="" />
        </div>
        <div className='px-5  col-span-3  '>
          <h1 className='text-3xl font-semibold'>Order</h1>
          <div className='w-full flex items-center border-2 border-zinc-200 justify-center h-44 mt-9'>
            <h1 className='text-xl px-5 py-2 rounded-3xl bg-zinc-500 text-white'>No Order</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
