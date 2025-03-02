import Product from "@/models/product.model";
import connectDB from "@/app/lib/db";
import { NextResponse } from "next/server";

const res = NextResponse

export async function GET(){
    try {
        await connectDB()
        const products = await Product.find()
        if(!products){
            return res.json({message:"No Products Are Available"},{status:200})
        }
        return res.json({products:products},{status:200})
    } catch (error) {
        return res.json({error:error},{status:400})
    }
}