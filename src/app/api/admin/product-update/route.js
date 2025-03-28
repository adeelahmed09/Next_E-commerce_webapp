import Product from "@/models/product.model";
import connectDB from "@/app/lib/db";
import { NextResponse } from "next/server";

const res = NextResponse

export async function POST(req) {
    try {
        let { name, desc, stock, publish, image, price, id } = await req.json()
        console.log(name,desc,stock,publish,image,price,id);
        if (!name || !desc || !publish || !image) {
            return res.json({ message: "All Field Are Required" }, { status: 400 })
        }
        if(!stock){
            stock = 0
        }
        if(!price){
            price = 0
        }
        if (!id) {
            return res.json({ message: "ID Is Required" }, { status: 400 })
        }
        await connectDB()
        const result = await Product.findByIdAndUpdate(
            id,
            {
                name,
                desc,
                stock,
                publish,
                price,
                image
            },
            { new: true }
        )

        if (!result) {
            return res.json({ message: "Something went worng during uploading" }, { status: 500 })
        }
        return res.json({ message: "Updated" }, { result: result }, { status: 200 })
    } catch (error) {
        return res.json({message:`Error: ${error}`},{status:400})
    }
}