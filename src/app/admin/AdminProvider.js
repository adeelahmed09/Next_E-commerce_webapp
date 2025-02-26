"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import AdminSideBar from "./components/AdminSideBar"

function AdminProvider({children}) {
    const {data:session ,status} = useSession()
    useEffect(()=>{
        console.log(session);
    },[session])
  if(session?.user?.role === "admin"){
    return(
        <div className="sm:h-[88vh] h-[90vh] flex">
            <AdminSideBar/>
            <div className=" w-full overflow-y-scroll ">
                {children}
            </div>
        </div>
    )
   }
   else{
    return(
        <div className="w-full flex justify-center items-center h-screen ">
            <h1 className="text-3xl font-semibold">Unauthorize</h1>
        </div>
    )
   }
}

export default AdminProvider
