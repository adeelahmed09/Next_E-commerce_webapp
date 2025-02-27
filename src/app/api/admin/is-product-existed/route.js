import Product from "@/models/product.model";
import connectDB from "@/app/lib/db";
import { NextResponse } from "next/server";

const res = NextResponse
export async function POST(req){
    try {
        const {name} = await req.json()
        await connectDB()
        if(!name){
            return res.json({error:"Enter Name"},{status:401})
        }
        const isNameExisted = await Product.findOne({name})
        if(isNameExisted){
            return res.json({error:"Name is already used!!"},{status:401})
        }
        return res.json({message:"Name not existed"},{status:200})
    } catch (error) {
        return res.json({error:"Something went worng"},{status:401})
    }
}