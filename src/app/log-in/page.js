"use client"
import { useState } from "react"
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation"
function page() {
    const  router = useRouter()
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState()
    const [RawFormData, setRawFormData] = useState(
        {
            email: "",
            password: "",
            
        }
    )
    const onChangeHandlerText = (e) => {
        const { name, value } = e.target
        setRawFormData({ ...RawFormData, [name]: value })
    }
    
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(RawFormData);
        setUploading(true)
        const result = await signIn("credentials", {
          redirect: false,
          email:RawFormData.email,
          password:RawFormData.password,
        });
        console.log(result);
        if (result.error) {
            setError(result.error);
            setUploading(false)
        } else {
            router.push("/"); // Redirect to a protected page
            setUploading(false)
        }
        }
    return (
        <div className="w-full flex justify-center px-3 items-center bg-zinc-200 h-screen">
            <div className="sm:w-[38vw] w-full flex flex-col justify-center gap-3 items-center bg-white sm:h-[85vh] h-[55vh] rounded-2xl">
                <h1 className="text-3xl font-bold ">Log In</h1>
                <form onSubmit={onSubmitHandler} className="w-full gap-2 flex flex-col justify-center items-center px-6">
                    
                    <div className=" w-full ">
                        <label className="text-2xl font-normal" htmlFor="email">Email :</label>
                        <input required name="email" value={RawFormData.email} onChange={onChangeHandlerText} className="w-full mt-2 px-2 py-2 border-2 rounded-3xl border-black" type="email" id="email" />
                    </div >
                    <div className=" w-full ">
                        <label className="text-2xl font-normal" htmlFor="password">Password:</label>
                        <input required name="password" value={RawFormData.password} onChange={onChangeHandlerText} className="w-full px-2 mt-2 py-2 border-2 rounded-3xl border-black" type="text" id="password" />
                    </div>
                    <div className="w-full flex gap-3 justify-end">
                        <button className="px-3 py-2 outline-none bg-red-500 text-white rounded-xl font-medium text-lg">Cancel</button>
                        <button type="submit" className="px-3 py-2 outline-none bg-green-500 text-white rounded-xl font-medium text-lg">{uploading?"Uploading...":" Submit"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page
