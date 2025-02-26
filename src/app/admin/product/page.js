"use client"

import axios from "axios"
import { useEffect, useState } from "react"

function page() {
  const [file, setFile] = useState()
  const [imageValue, setimageValue] = useState("")
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
  const onChangeTextHandler = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const onChangeCheckHandler = (e) => {
    const { name, checked } = e.target
    setFormData({ ...formData, [name]: checked })
  }
  const onChangeFileHandler = (e) => {
    const { files, name ,value} = e.target
    setimageValue(value)
    console.log(files[0]);
    if (files[0].size > 1 * 1024 * 1024) {
      alert("Image must be under 1MB")
      e.target.value = ""
      setimageURL("/nodp.png")
      return
    }
    if ((files[0].type !== "image/png" && files[0].type !== "image/jpeg" && files[0].type !== "image/webp")) {
      alert("Please Add Correct Image type")
      setimageURL("/nodp.png")
      e.target.value = ""
      return
    }
    setFile(files)
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append("file", file[0]);
    const result = await axios.post("/api/image-upload", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    )
    if (!result) {
      alert("Image Couldn't uploaded")
      setFormData({
        name: "",
        desc: "",
        price: "",
        stock: "",
        publish: false,
        image: ""
      })
      setimageValue("")
      setFile("")
      return
    }
    if (result.data.imgurl) {
      const url = result.data.imgurl
      console.log(url);
      console.log(formData);
      axios.post("/api/admin/product-create", {
        name: formData.name,
        desc: formData.desc,
        price: formData.price,
        stock: formData.stock,
        publish: formData.publish ? "true" : "false",
        image: url
      })
        .then((res) => {
          console.log(res);
          alert('Product is Created')
          setFormData({
            name: "",
            desc: "",
            price: "",
            stock: "",
            publish: false,
            image: ""
          })
          setimageValue("")
          setFile()
          return
        })
        .catch((err) => {
          console.log(err);
          alert("Some thing went worng during uploading product")
          setFormData({
            name: "",
            desc: "",
            price: "",
            stock: "",
            publish: false,
            image: ""
          })
          setFile()
          setimageValue("")
          return
        })
    }
    else{
      alert("something went wrong")
      setFormData({
        name: "",
        desc: "",
        price: "",
        stock: "",
        publish: false,
        image: ""
      })
      setFile()
    }

  }
  const productRender = () => {

  }
  return (
    <div className="w-full  flex flex-col px-5 gap-3 py-3 ">
      <h1 className="text-4xl font-semibold">Product :</h1>
      <div className="w-72">
        <div>
          <h2 className="text-2xl font-medium">Add Product:</h2>
          <form onSubmit={onSubmitHandler} className="w-full px-5 flex flex-col gap-3">
            <div className="flex flex-col justify-center items-start ">
              <label htmlFor="nameProduct" className="text-xl">Product Name</label>
              <input className="px-3 w-64  rounded-3xl bg-transparent border-2 border-black py-1" type="text" id="nameProduct" name="name" value={formData.name} onChange={onChangeTextHandler} required />
            </div>
            <div className="flex flex-col justify-center items-start ">
              <label htmlFor="descProduct" className="text-xl">Product Description</label>
              <input className="px-3 w-64  rounded-3xl bg-transparent border-2 border-black py-1" type="text" id="descProduct" name="desc" value={formData.desc} onChange={onChangeTextHandler} required />
            </div>
            <div className="flex flex-col justify-center items-start ">
              <label htmlFor="priceProduct" className="text-xl">Product Price</label>
              <input className="px-3 w-64  rounded-3xl bg-transparent border-2 border-black py-1" type="text" id="priceProduct" name="price" value={formData.price} onChange={onChangeTextHandler} required />
            </div>
            <div className="flex flex-col justify-center items-start ">
              <label htmlFor="stockProduct" className="text-xl">Product Stock</label>
              <input className="px-3 w-64 rounded-3xl bg-transparent border-2 border-black py-1" type="text" id="stockProduct" name="stock" value={formData.stock} onChange={onChangeTextHandler} required />
            </div>
            <div className="flex  justify-start gap-2 items-center ">
              <label htmlFor="publishProduct" className="text-xl">Publish</label>
              <input type="checkbox" className="text-center" id="publishProduct" name="publish" onChange={onChangeCheckHandler} required />
            </div>
            <div className="flex flex-col justify-center items-start ">
              <label htmlFor="imageProduct" className="text-xl">Product Image</label>
              <input type="file" value={imageValue}  id="imageProduct" name="image" onChange={onChangeFileHandler} required />
            </div>
            <div className="w-64  text-white flex justify-end ">
              <button type="submit" className="px-3 py-2 bg-green-400 text-white font-medium rounded-3xl">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className=" overflow-x-scroll w-full ">
        {productRender}
      </div>
    </div>
  )
}

export default page
