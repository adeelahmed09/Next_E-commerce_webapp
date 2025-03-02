"use client"
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
  const searchParams = useSearchParams();
  const [product,setProduct] = useState()
  const [rawFormData, setRawFormData] = useState()
  const id = searchParams.get('id')
  useEffect(()=>{
    axios.post("/api/get-product",{id})
    .then((res)=>{
      setProduct(res.data.product)
    })
    .catch((err)=>{
      console.log(err);
    })
  },[id])
  useEffect(()=>{
    console.log(product);
    setRawFormData(
      {
        name:product?.name,
        desc:product?.desc,
        stock:product?.stock,
        publish:product?.publish,
        image:product?.image
      }
    )
  },[product])
  return (
    <div className='w-full px-5 py-5 '>
      <h1 className='text-3xl font-semibold'>
        Edit Product
      </h1>
      <div className='w-full flex gap-3 justify-center items-center overflow-hidden h-[75vh]'>
        <div className='w-1/2 rounded-2xl overflow-hidden bg-zinc-500 h-[90%]'>
        <img src={product?.image?product.image:"#"} className='object-center w-full h-full object-cover' alt="" />
        </div>
        <div className='w-1/2 h-[90%]'>
        <div>
        <h1>Name</h1>
        <input type="text"  value={rawFormData?.name} />
        </div>
        </div>
      </div>
    </div>
  )
}

export default page
