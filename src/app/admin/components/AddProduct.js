import axios from "axios"
import { useEffect, useState } from "react"

function AddProduct() {
    const [uploading, setUploading] = useState(false)
    const [rawFormData, setRawFormData] = useState(
        {
            name: "",
            desc: "",
            price: 0,
            publish: false,
            stock: 0,
            image: [],
        }
    )
    const [imgDicInput, setimgDicInput] = useState("")


    // OnChangeInputs Handlers
    const onChangeTextOrNumberHandler = (e) => {
        const { name, value } = e.target
        const valueInt = parseFloat(value)
        if (valueInt) {
            setRawFormData({ ...rawFormData, [name]: valueInt })
        }
        else {
            setRawFormData({ ...rawFormData, [name]: value })
        }
    }
    const onChangeCheckHandler = (e) => {
        const { name, checked, value } = e.target
        setRawFormData({ ...rawFormData, [name]: checked })
    }
    const onChangeImageHandler = (e) => {
        const { files, name, value } = e.target
        setimgDicInput(value)
        console.log(files[0]);
        if (!files.length > 0) {
            setRawFormData({ ...rawFormData, [name]: [] })
            return
        }
        else if (files[0].size > 1 * 1024 * 1024) {
            alert("Image must be under 1MB")
            setimgDicInput("")
            return
        }
        else if ((files[0].type !== "image/png" && files[0].type !== "image/jpeg" && files[0].type !== "image/webp")) {
            alert("Please Add Correct Image type")
            setimgDicInput("")
            return
        }
        // const filesArray = Array.from(files)
        setRawFormData({ ...rawFormData, [name]: files })
    }


    //Form Cleaning Function
    const cleaningForm = (alertMessage) => {
        if (alertMessage) {
            alert(alertMessage)
        }
        setUploading(false)
        setRawFormData(
            {
                name: "",
                desc: "",
                price: 0,
                publish: false,
                stock: 0,
                image: [],
            }
        )
        setimgDicInput("")
    }


    //onClickFunctions
    const onClickCanelHandler = (e) => {
        e.preventDefault()
        cleaningForm("")
    }


    //onSubmitHandler
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setUploading(true)
        const formdata = new FormData()
        formdata.append("file", rawFormData.image[0]);
        try {
            const isNameExisted = await axios.post("/api/admin/is-product-existed",{
                name: rawFormData.name
            })
            console.log(isNameExisted);
            if(isNameExisted.status !== 200){
                cleaningForm("Name is Already Taken")
                return
            }
            const fileUpload = await axios.post("/api/admin/product-image-uploader", formdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            if (!fileUpload.data.imgurl) {
                cleaningForm("Image Could Not Upload")
                return
            }
            const imgUrl = fileUpload.data.imgurl
            const productCreate = await axios.post("/api/admin/product-create", {
                name: rawFormData.name,
                desc: rawFormData.desc,
                price: rawFormData.price,
                stock: rawFormData.stock,
                publish: rawFormData.publish ? "true" : "false",
                image: imgUrl,
            })
            if(productCreate.status !==200){
                cleaningForm("SomeThing Went worng During Uploading Product")
            }
            cleaningForm("Product Is Successfully Created")
        } catch (error) {
            console.log(error);
            if(error.response.data.error){
                cleaningForm(error.response.data.error)
                return
            }
            cleaningForm("Some thing went worng :: Please Check Your connection!! and try agian")
        }
    }



    // Classes
    const formDivClass = "flex flex-col justify-center items-start"
    const formInputTextClass = "px-3 w-64  rounded-3xl bg-transparent border-2 border-black py-1"
    const formlabel = " text-xl "
    return (
        <div className="w-72 px-2 flex flex-col">
            <h1 className="text-3xl font-semibold">Add Product</h1>
            <form onSubmit={onSubmitHandler} className="flex flex-col gap-2 px-2">
                <div className={formDivClass}>
                    <label htmlFor="name" className={formlabel}>Product Name</label>
                    <input className={formInputTextClass} type="text" id="name" name="name" value={rawFormData.name} onChange={onChangeTextOrNumberHandler} required />
                </div>
                <div className={formDivClass}>
                    <label htmlFor="desc" className={formlabel}>Product Description</label>
                    <input className={formInputTextClass} type="text" id="desc" name="desc" value={rawFormData.desc} onChange={onChangeTextOrNumberHandler} required />
                </div>
                <div className={formDivClass}>
                    <label htmlFor="price" className={formlabel}>Product Price</label>
                    <input className={formInputTextClass} type="number" id="price" name="price" value={rawFormData.price} onChange={onChangeTextOrNumberHandler} required />
                </div>
                <div className={formDivClass}>
                    <label htmlFor="stock" className={formlabel}>Product Stock</label>
                    <input className={formInputTextClass} type="number" id="stock" name="stock" value={rawFormData.stock} onChange={onChangeTextOrNumberHandler} required />
                </div>
                <div className="flex  justify-start gap-2 items-center ">
                    <label htmlFor="publish" className={formlabel}>Publish</label>
                    <input type="checkbox" id="publish" name="publish" value={rawFormData.publish} onChange={onChangeCheckHandler} />
                </div>
                <div className={formDivClass}>
                    <label htmlFor="file" className={formlabel}>Product Image</label>
                    <input type="file" id="file" name="image" value={imgDicInput} onChange={onChangeImageHandler} required />
                </div>
                <div className="flex w-full justify-end gap-2 ">
                    <button onClick={onClickCanelHandler} className="px-3 py-1 rounded-3xl bg-red-500 text-white font-medium text-lg">Cancel</button>
                    <button type="submit" className={`px-3 py-1 rounded-3xl text-white font-medium text-lg ${uploading?"bg-black":"bg-green-500"}`}>{uploading?"Uploading..":"Submit"}</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct
