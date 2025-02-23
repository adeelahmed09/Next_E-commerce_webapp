import connectDB from "@/app/lib/db";
import Admin from "@/models/admin.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

const res = NextResponse

export async function POST(req) {
    try {
        let {name,email,password,avatar} = await req.json()
        if(!name && !email && !password){
            return res.json({error:"all fields are required expect profile pic",status:401})
        }
       
        console.log(avatar);
        if(!avatar){
            avatar = "/nodp.jpg"
        }
        console.log(avatar);
        await connectDB()
        const isUserNameExisted = await User.findOne({name})
        if(isUserNameExisted){
            return res.json({error:"User Name alerady Existed",status:401})
        }
        const isEmailExisted = await User.findOne({email})
        if(isEmailExisted){
            return res.json({error:"Email alerady used",status:401})
        }
        const isAdmin = await Admin.findOne({email})
        if(isAdmin){
            return res.json({error:"YOU CAN NOT USE THIS EMAIL!! 501",status:401})
        }
        const role= "user"
        const user = await User.create({
            name,
            password,
            email,
            role,
            avatar
        })
        if(!user){
            return res.json({error:"Something went wrong during creating user",status:500})
        }
        const userCreated =  await User.findById(user._id)

        return res.json({user:userCreated},{message:"Successfuly Created User",status:200})
        
    } catch (error) {
        return res.json({error:"Something went wrong during creating user",status:500})
    }
}