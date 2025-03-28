"use client"
import { addProduct } from '@/slice/cartSlice'
import axios from 'axios'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function page() {
    const dispatch = useDispatch()
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get("/api/admin/get-all-products")
            .then((res) => {
                setProducts(res.data.products)
            })
            .catch((error) => {
            })
    }, [])
    const onclickCartHandler = (img)=>{
        
        if (!img) {
            console.error("Product is undefined!");
            return;
          }
        const product = img
        const productAmount = 1
        const productPrice = 1       
        dispatch(addProduct({product,productAmount,productPrice}))
    }
    const productsDisplay = () => {
        return products.map((img, index) => (
            <div className='w-[250px]  flex gap-1   flex-col overflow-hidden justify-start items-start rounded-xl bg-white ' key={index}>
                <img src={img.image} className='w-full h-[225px] object-center object-cover' alt="" />
                <h1 className='text-start px-2 font-semibold '>{img.name}</h1>

                <div className='px-2 w-full'>
                    <h1 className='text-sm '> Rs.{img.price}</h1>
                </div>
                <div className='w-full px-2 mb-2 flex items-center justify-end gap-2 '>
                    <button onClick={()=>{onclickCartHandler(img)}} className='bg-orange-400 text-white px-2 py-1 text-sm rounded-xl'>
                        Add To Cart
                    </button>
                    <button  className='bg-red-500 text-white px-2 py-1 text-sm rounded-xl'>
                        See Product
                    </button>
                </div>
            </div>


        ))
    }
    return (
        <div className='w-full min-h-[88vh] px-[10vw] pt-2'>
            <div className='w-full flex items-center justify-between'>
                <h1 className='text-3xl font-semibold '>
                    Products:
                </h1>
                <div className='flex items-center gap-1'>
                    <input type="text" className=" hover:drop-shadow-md rounded-3xl py-1 outline-none border-none px-3" placeholder='search' />
                    <button>
                        <Search size={18} />
                    </button>
                </div>
            </div>
            <div className='w-full gap-2 flex mt-5 flex-col px-5 justify-center items-center'>
                <div className='w-full gap-2 flex '>
                    {productsDisplay()}
                </div>
            </div>
        </div>
    )
}

export default page
