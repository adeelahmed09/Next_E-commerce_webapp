"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import AddProduct from "../components/AddProduct"
import GetAllProducts from "../components/GetAllProducts"

function page() {
  return (
    <div className="w-full   flex flex-col px-5 gap-3 py-3 ">
      <h1 className="text-4xl  font-semibold">Product :</h1>
      <div className= "w-full">
        <AddProduct/>
      </div>
      <div>
        <GetAllProducts/>
      </div>
    </div>
  )
}

export default page
