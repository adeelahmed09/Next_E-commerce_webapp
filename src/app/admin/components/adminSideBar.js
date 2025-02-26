import gsap from "gsap"
import { ArrowRight, Menu } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

function AdminSideBar() {
  const adminMenu = useRef()
  const [open, setopen] = useState(false)
  const adminDetails = useRef()
  const arrow = useRef()
  gsap.registerPlugin();
  const onClickHandler = ()=>{
    if(!open){
      gsap.to(adminMenu.current,{
        width:"90vw",
        border:"none",
        height:"80vh",
        borderRadius:"20px",
        bottom:"0px",
        duration:.2
      })
      gsap.to(adminDetails.current,{
        display:"flex",
        duration:.2,
      })
      gsap.to(arrow.current,{
        rotateY:180,
        duration:.5
      })
      setopen(true)
    }
    else{
      gsap.to(adminMenu.current,{
        width:"18vw",
        height:"",
        bottom:"12px",
        duration:.2
      })
      gsap.to(adminDetails.current,{
        display:"hidden",
        duration:.2,
      })
      gsap.to(arrow.current,{
        rotateY:0,
        duration:.5
      })
      setopen(false)
    }
  }
  
  const menuClose = ()=>{
    gsap.to(adminMenu.current,{
      width:"18vw",
      height:"",
      bottom:"12px",
      duration:.2
    })
    gsap.to(adminDetails.current,{
      display:"hidden",
      duration:.2,
    })
    gsap.to(arrow.current,{
      rotateY:0,
      duration:.5
    })
    setopen(false)
  }
  return (
    <div className='sm:w-[25vw] sm:rounded-none rounded-3xl sm:h-full h-12 sm:flex flex-col overflow-hidden px-5 bg-white  absolute bottom-3  z-0'  ref={adminMenu}>
      <div onClick={onClickHandler} className='mt-2 sm:hidden flex' ref={arrow} ><ArrowRight size={30} strokeWidth={1.5} /></div>
      <div className='w-[80vw] mt-5 sm:flex hidden flex-col' ref={adminDetails}>
        <h1 className='text-3xl font-semibold'>Admin Panel</h1>
        <div className='flex flex-col text-lg mt-2 gap-1'>
          <Link onClick={menuClose} href={"/admin/dashboard"}>Dashboard</Link>
          <Link onClick={menuClose} href={"/admin/product"}>Products</Link>
        </div>
      </div>
    </div>
  )
}

export default AdminSideBar
