"use client"

import { useSession } from "next-auth/react"

function page() {
  const {data:session,status} = useSession()
}

export default page
