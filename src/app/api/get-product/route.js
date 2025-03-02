import Product from "@/models/product.model";
import connectDB from "@/app/lib/db";
import { NextResponse } from "next/server";

const res = NextResponse

export async function POST(req) {
    try {
        const { id } = await req.json()
        if (!id) {
            return res.json({ message: "Id is not present" }, { status: 400 })
        }
        await connectDB()
        const product = await Product.findById(id)
        console.log(product);
        if (!product) {
            return res.json({ message: "Id is invalid" }, { status: 400 })
        }
        return res.json({ product: product }, { status: 200 })
    } catch (error) {
        console.log(error);
    }

}