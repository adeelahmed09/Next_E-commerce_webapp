
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
export async function POST(request) {
    try {
        const formData = await request.formData();
        console.log(formData);
        const url = formData.get("imageURL")
        let urlBreakDown = url.split("/")
        let rawID = urlBreakDown[urlBreakDown.length - 2] + "/" + urlBreakDown[urlBreakDown.length - 1]
        let idArray = rawID.split(".")
        let id = idArray[0]
        const file = formData.get("file")
        console.log(file);
        if (!file) {
            return NextResponse.json({ error: "File not Found" }, { status: 400 })
        }
        if (!file instanceof Blob) {
            console.error("file is not a Blob or File object")
          }
        console.log(file);
        const bites = await file.arrayBuffer();
        const buffer = Buffer.from(bites)

        const result = await new Promise((resolve, reject) => {
            const uplasdStream = cloudinary.uploader.upload_stream(
                { folder: "products" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result)
                }
            )
            uplasdStream.end(buffer)
        })
        if (!result.url) {
            return NextResponse.json({ error: "Something went worng during Uploading image" }, { status: 500 })
        }
        const deletePreviousImage =await cloudinary.uploader.destroy(id)
        console.log(deletePreviousImage);
        return NextResponse.json({ imgurl: result.url }, { status: 200 })
    } catch (error) {
        console.log("Upload Image Fieled :", error);
        return NextResponse.json({ error: `upload image failed ${error}` }, { status: 500 })
    }
}