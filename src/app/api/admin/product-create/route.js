import Product from "@/models/product.model";
import connectDB from "@/app/lib/db";
import { NextResponse } from "next/server";

const res = NextResponse
export async function POST(req){
    try {
        await connectDB()
        const {name,desc,stock,price,publish,image} = await req.json()
        console.log(image,"im");
        if(!name || !desc || !publish || !image){
            return res.json({error:"All fields are required!!"},{status:401})
        }
        const product = await Product.create({
            name,
            image,
            desc,
            stock,
            price,
            publish,
        })
        if(!product){
            return res.json({error:"Something went worng during creating Product !!"},{status:500})
        }
        const productCreated = await  Product.findById({_id:product._id})
        return res.json({product:productCreated},{message:"Product is Created!!"},{status:200})
    } catch (error) {
        console.log("err", error);
        return res.json({error:`Something went wrong : ${error}`})
    }
}