"use client"
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import gsap from "gsap"


function page() {
  gsap.registerPlugin();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(
    {
      name: "",
      desc: "",
      stock: 0,
      publish: false,
      image: "",
      price: 0
    }
  )
  const [rawFormData, setRawFormData] = useState(
    {
      name: "",
      desc: "",
      stock: 0,
      publish: false,
      image: "",
      price: 0
    }
  )
  const id = searchParams.get('id')
  const [display, setDisplay] = useState(true)
  const imageAdder = useRef()
  const [imgDicInput, setimgDicInput] = useState("")
  const [file, setFile] = useState()
  useEffect(() => {
    axios.post("/api/get-product", { id })
      .then((res) => {
        setProduct(res.data.product)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [id])
  useEffect(() => {
    console.log(product);
    setRawFormData(
      {
        ...rawFormData,
        name: product?.name,
        desc: product?.desc,
        stock: product?.stock,
        publish: product?.publish,
        image: product?.image,
        price: product?.price
      }
    )
  }, [product])

  const onClickCancelImageOpener = () => {
    setFile([])
    setRawFormData({ ...rawFormData, image: product.image })
    setimgDicInput("")
    onClickImageOpener()
  }
  const onChangeFileHandler = (e) => {
    const { files, name, value } = e.target
    setimgDicInput(value)
    console.log(files[0]);
    if (files[0].size > 1 * 1024 * 1024) {
      alert("Image must be under 1MB")
      setimgDicInput("")
      return
    }
    else if ((files[0].type !== "image/png" && files[0].type !== "image/jpeg" && files[0].type !== "image/webp")) {
      alert("Please Add Correct Image type")
      setimgDicInput("")
      return
    }
    setFile(files)
    const fileArray = Array.from(files).map((img) => (URL.createObjectURL(img)))
    console.log(fileArray);
    setRawFormData({ ...rawFormData, image: fileArray[0] })
    setTimeout(() => { URL.revokeObjectURL(fileArray) }, 10000)
  }
  const onClickImageOpener = () => {
    if (!display) {
      gsap.to(imageAdder.current, {
        display: "flex",
        duration: .2,
        opacity: "100%"
      })
      setDisplay(true)
    }
    else {
      gsap.to(imageAdder.current, {
        display: "none",
        duration: .2,
        opacity: "0%"
      })
      setDisplay(false)
    }
  }
  const onChangeInputHandler = (e) => {
    let { name, value } = e.target
    if (parseFloat(value)) {
      value = parseFloat(value)
    }
    console.log(name, value);
    setRawFormData({ ...rawFormData, [name]: value })
  }
  const onChangeChecked = (e) => {
    let { name, checked } = e.target
    if (rawFormData.publish === "true") {
      setRawFormData({ ...rawFormData, publish: "false" })
    }
    else {
      setRawFormData({ ...rawFormData, publish: "true" })
    }

  }
  const onClickFormHandler = async () => {
    if (rawFormData.image != product.image) {
      const formData = new FormData();
      formData.append("imageURL", product.image)
      formData.append("file", file[0])
      const image_Upload = await axios.post("/api/admin/product-image-update", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      if (!image_Upload.data.imgurl) {
        alert("Something went worng During server")
        return
      }
      console.log(image_Upload);
      setRawFormData({...rawFormData,image:image_Upload.data.imgurl})
      const update_Product = await axios.post("/api/admin/product-update", {
        name: rawFormData.name,
        desc: rawFormData.desc,
        stock: rawFormData.stock,
        publish: rawFormData.publish,
        image: image_Upload.data.imgurl,
        price: rawFormData.price,
        id:id,
      })
      if(update_Product.status !== 200){
        alert("SomeThing Went Wrong")
        console.log(update_Product);
        return
      }
      alert("Update Successfuly")
      return
    }
    const update_Product = await axios.post("/api/admin/product-update", {
      name: rawFormData.name,
      desc: rawFormData.desc,
      stock: rawFormData.stock,
      publish: rawFormData.publish,
      image: product.image,
      price: rawFormData.price,
      id:id,
    })
    if(update_Product.status !== 200){
      alert("SomeThing Went Wrong")
      console.log(update_Product);
      return
    }
    alert("Update Successfuly")
  }
  useEffect(() => {
    console.log(rawFormData);
  }, [rawFormData])
  const HeadingClass = "text-2xl font-semibold"
  const InputClass = "bg-transparent text-lg outline-none px-2 py-1 border-2 border-black rounded-2xl "
  return (
    <div className='w-full relative px-5 py-5 '>
      <h1 className='text-3xl font-semibold'>
        Edit Product
      </h1>
      <div className='w-full flex gap-3 justify-center items-center overflow-hidden h-[75vh]'>
        <div className='w-1/2 relative rounded-2xl overflow-hidden bg-zinc-500 h-[90%]'>
          <img src={rawFormData?.image ? rawFormData.image : "#"} className='object-center w-full h-full object-cover' alt="" />
          <div onClick={onClickImageOpener} className='px-3 text-lg text-white rounded-2xl right-2 absolute bottom-2 cursor-pointer select-none bg-zinc-700 py-2'>
            <h1>Change</h1>
          </div>
        </div>
        <div className='w-1/2 flex flex-col  h-[90%]'>
          <div>
            <h1 className={HeadingClass}>Name :</h1>
            <input type="text" className={InputClass + "w-[75%]"} onChange={onChangeInputHandler} name='name' value={rawFormData?.name} />
          </div>
          <div>
            <h1 className={HeadingClass}>Desc</h1>
            <textarea type="text" className='bg-transparent outline-none border-2 border-black rounded-2xl px-2 py-2 text-lg w-full' rows="4" cols="50" onChange={onChangeInputHandler} name='desc' value={rawFormData?.desc} ></textarea>
          </div>
          <div>
            <h1 className={HeadingClass}>Stock</h1>
            <input type="number" className={InputClass} onChange={onChangeInputHandler} name='stock' value={rawFormData?.stock} />
          </div>
          <div>
            <h1 className={HeadingClass}>Publish</h1>
            <input type="checkbox" className='' onChange={onChangeChecked} checked={rawFormData?.publish === "true" ? true : false} name='publish' value={rawFormData?.publish === "true" ? true : false} />
          </div>
          <div>
            <h1 className={HeadingClass}>Price</h1>
            <input type="number" className={InputClass} onChange={onChangeInputHandler} name='price' value={rawFormData?.price} />
          </div>
          <div className='w-full flex items-center justify-end '>
            <button className='px-3 py-1 bg-green-500 text-lg font-normal text-white rounded-xl  ' onClick={onClickFormHandler}>Change</button>
          </div>
        </div>
      </div>
      <div style={{ display: "none", opacity: "0%" }} ref={imageAdder} className=' absolute gap-2  flex-col px-2 py-2 w-[30%] h-[150px] top-1/2 bg-white rounded-xl left-1/2  -translate-x-1/2 -translate-y-1/2'>
        <h1 className='text-2xl'>
          Image
        </h1>
        <input type="file" onChange={onChangeFileHandler} value={imgDicInput} />
        <div className='w-full flex gap-2 justify-end'>
          <button className='px-3 py-1 bg-red-500 text-lg font-normal text-white rounded-xl  ' onClick={onClickCancelImageOpener}>Cancel</button>
          <button className='px-3 py-1 bg-green-500 text-lg font-normal text-white rounded-xl  ' onClick={onClickImageOpener}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default page
