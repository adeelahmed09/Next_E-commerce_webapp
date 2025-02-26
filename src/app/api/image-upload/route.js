import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file")
        console.log(file);
        if (!file) {
            return NextResponse.json({ error: "File not Found" }, { status: 400 })
        }
        console.log(file);
        const bites = await file.arrayBuffer();
        const buffer = Buffer.from(bites)

        const result = await new Promise((resolve, reject) => {
            const uplasdStream = cloudinary.uploader.upload_stream(
                { folder: "avatar" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result)
                }
            )
            uplasdStream.end(buffer)
        })
        return NextResponse.json({imgurl:result.url},{status:200})
    } catch (error) {
        console.log("Upload Image Fieled :",error);
        return NextResponse.json({error:`upload image failed ${error}`},{status:500})
    }
}