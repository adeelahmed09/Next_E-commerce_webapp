"use client"

import { useState } from "react"

function page() {
  const [formData, setFormData] = useState(
    {
      name: "",
      desc: "",
      price: "",
      stock: "",
      publish: false,
      image: ""
    }
  )
  return (
    <div className="w-full h-[88vh] flex flex-col px-5 gap-3 py-3 ">
      <h1 className="text-3xl font-semibold">Product :</h1>
      <div>
        <h2 className="text-lg font-medium">Add Product:</h2>
        <form>
          <div>
            <label htmlFor="nameProduct">Product Name</label>
            <input type="text" id="nameProduct" name="product" required />
          </div>
          <div>
            <label htmlFor="descProduct">Product Description</label>
            <input type="text" id="descProduct" name="desc" required />
          </div>
          <div>
            <label htmlFor="priceProduct">Product Price</label>
            <input type="text" id="priceProduct" name="price" required />
          </div>
          <div>
            <label htmlFor="stockProduct">Product Stock</label>
            <input type="text" id="stockProduct" name="stock" required />
          </div>
          <div>
            <label htmlFor="publishProduct">Publish</label>
            <input type="checkbox" id="publishProduct" name="publish" required />
          </div>
          <div>
            <label htmlFor="imageProduct">Product Image</label>
            <input type="file" id="imageProduct" name="image" required/>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page
