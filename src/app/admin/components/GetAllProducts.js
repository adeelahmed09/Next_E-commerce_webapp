"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function GetAllProducts() {
    const navigaiton  = useRouter()
    const [products, setProducts] = useState([])
    useEffect(()=>{
        axios.get("/api/admin/get-all-products")
        .then((res)=>{
            setProducts(res.data.products)
        })
        .catch((error)=>{
        })
    },[])
    const onClickEditHandler = (e)=>{
        const {id} = e.target
        navigaiton.push(`/admin/edit-product?id=${id}`)
    }
    const productsDisplay = ()=>{
        return products.map((img,index)=>(
            <div className='w-[250px] px-2 py-2 flex gap-1   flex-col justify-start items-center rounded-2xl bg-white ' key={index}>
                <img src={img.image} className='w-full rounded-2xl h-[225px] object-center object-cover' alt="" />
                <h1 className='text-center text-lg font-semibold mb-2'>{img.name}</h1>
                <div>
                    <h1 className='text-lg'>Price : Rs.{img.price}</h1>
                    <h1 className='text-lg'>Stock : {img.stock}</h1>
                </div>
                <div>
                    <button id={img._id}  onClick={onClickEditHandler} className='px-3 py-1 bg-green-500 font-medium text-white rounded-xl'>Edit</button>
                </div>
            </div>
        ))
    }
    useEffect(()=>{
        console.log(products);
    },[products])
  return (
    <div className='w-full gap-2 flex mt-5 flex-col px-5 justify-center items-center'>
      <h1 className='text-3xl font-semibold'>All Products</h1>
      <div className='w-full gap-2 flex overflow-x-scroll '>
        {productsDisplay()}
      </div>
    </div>
  )
}

export default GetAllProducts
