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
    <div className='w-full h-screen '>

    </div>
  )
}

export default page
