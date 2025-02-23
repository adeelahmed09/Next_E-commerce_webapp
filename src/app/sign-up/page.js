"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function page() {
    
    const router = useRouter()
    const [imageURL, setimageURL] = useState("/nodp.jpg")
    const [RawFormData, setRawFormData] = useState(
        {
            name: "",
            email: "",
            password: "",
            file: "",
            avatar: ""
        }
    )
    const onChangeHandlerText = (e) => {
        const { name, value } = e.target
        setRawFormData({ ...RawFormData, [name]: value })
    }
    const [uploading, setUploading] = useState(false)
    const onChangeHandlerImage = (e) => {
        const { files, name } = e.target
        console.log(files[0]);
        if (files[0].size > 1. * 1024 * 1024) {
            alert("Image must be under 1MB")
            e.target.value = ""
            setimageURL("/nodp.png")
            return
        }
        if((files[0].type !== "image/png" && files[0].type !== "image/jpeg" && files[0].type !== "image/webp")){
            alert("Please Add Correct Image type")
            setimageURL("/nodp.png")
            e.target.value = ""
            return
        }
        setRawFormData({ ...RawFormData, [name]: files })
        const fileURl = Array.from(files).map((img) => URL.createObjectURL(img))
        setimageURL(fileURl[0])
        setTimeout(() => { URL.revokeObjectURL(fileURl) }, 5000)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setUploading(true)
        const formData = new FormData()

        formData.append("name", RawFormData.name)
        formData.append("email", RawFormData.email)
        formData.append("password", RawFormData.password)
        if (RawFormData.file && RawFormData.file.length > 0) {
            formData.append("file", RawFormData.file[0]);
            const uploadedImage = await axios.post("/api/image-upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (!uploadedImage.data.imgurl) {
                alert("Image fail To upload!!")
                return
            }
            const result = await axios.post("/api/register", {
                name: RawFormData.name,
                email: RawFormData.email,
                password: RawFormData.password,
                avatar: uploadedImage.data.imgurl
            })
            console.log(result);
            if (result.data.error) {
                console.log(result.data.error);
                alert(`Failed to Sign Up ${result.data.error}`)
                setUploading(false)
                return
            }
            if (result.data.user) {
                alert("Successfully Sign Up")
                setUploading(false)
                setRawFormData(
                    {
                        name: "",
                        email: "",
                        password: "",
                        file: "",
                        avatar: ""
                    }
                )
                router.push("/log-in")
            }

        }
        else {
            const result = await axios.post("/api/register", {
                name: RawFormData.name,
                email: RawFormData.email,
                password: RawFormData.password,
                avatar: "/nodp.jpg"
            })
            console.log(result);
            if (result.data.error) {
                alert(`Failed to Sign Up ${result.data.error}`)
                setUploading(false)
                return
            }
            if (result.data.user) {
                setRawFormData(
                    {
                        name: "",
                        email: "",
                        password: "",
                        file: "",
                        avatar: ""
                    }
                )
                alert("Successfully Sign Up")
                setUploading(false)
                router.push("/log-in")

            }
        }
    }
    useEffect(() => { console.log(RawFormData.file); }, [RawFormData.file])
    return (
        <div className="w-full flex justify-center px-5 items-center bg-zinc-200 h-screen">
            <div className="sm:w-[38vw] w-full flex flex-col justify-center gap-3 items-center bg-white sm:h-[85vh] h-[80vh] rounded-2xl">
                <h1 className="text-3xl font-bold ">Sign Up</h1>
                <form onSubmit={onSubmitHandler} className="w-full gap-2 flex flex-col justify-center items-center px-6">
                    <div className=" w-full ">
                        <label className="text-2xl font-normal" htmlFor="name">Name :</label>
                        <input required name="name" value={RawFormData.name} onChange={onChangeHandlerText} className="w-full mt-2 px-2 py-2 border-2 rounded-3xl border-black" type="text" id="name" />
                    </div>
                    <div className=" w-full ">
                        <label className="text-2xl font-normal" htmlFor="email">Email :</label>
                        <input required name="email" value={RawFormData.email} onChange={onChangeHandlerText} className="w-full mt-2 px-2 py-2 border-2 rounded-3xl border-black" type="email" id="email" />
                    </div >
                    <div className=" w-full ">
                        <label className="text-2xl font-normal" htmlFor="password">Password:</label>
                        <input required name="password" value={RawFormData.password} onChange={onChangeHandlerText} className="w-full px-2 mt-2 py-2 border-2 rounded-3xl border-black" type="text" id="password" />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <div className="w-[60%]">
                            <label className="text-2xl font-normal" htmlFor="avatar">Select Profile Image</label>
                            <input onChange={onChangeHandlerImage} name="file" type="file" className="mt-2" id="avatar" />
                        </div>
                        <div className="w-10 h-10 overflow-hidden bg-zinc-700 rounded-full">
                            <img src={imageURL} className="w-full h-full object-center object-cover" alt="" />
                        </div>
                    </div>
                    <div className="w-full flex gap-3 justify-end">
                        <button className="px-3 py-2 outline-none bg-red-500 text-white rounded-xl font-medium text-lg">Cancel</button>
                        <button type="submit" className="px-3 py-2 outline-none bg-green-500 text-white rounded-xl font-medium text-lg">{(uploading) ? "uploading..." : "Submit"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page
