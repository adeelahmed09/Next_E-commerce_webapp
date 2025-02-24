import connectDB from "@/app/lib/db";
import Admin from "@/models/admin.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
const res = NextResponse

export async function POST(req) {
    try {
        let { name, email, password, avatar, status, adminKey, role } = await req.json()
        if (!name || !email || !password || !status || !adminKey || !role) {
            return res.json({ error: "all fields are required expect profile pic", status: 401 })
        }
        if (!avatar) {
            avatar = "/nodp.jpg"
        }
        if (adminKey !== process.env.ADMIN_KEY) {
            return res.json({ error: "Admin Key is not correct", status: 401 })
        }
        await connectDB()
        const isUserExisted = await User.findOne({ email });

        if (isUserExisted) {
            return res.json({ error: "User is existed with this email!!", status: 401 })
        }

        const isAdminExisted = await Admin.findOne({ name });
        const isEmailExisted = await Admin.findOne({ email });
        if (isAdminExisted) {
            return res.json({ error: "Admin Name is Already in use", status: 401 })
        }
        if (isEmailExisted) {
            return res.json({ error: "Email is already in use", status: 401 })
        }

        const admin = await Admin.create({
            name,
            avatar,
            password,
            status,
            email,
            role
        })
        if (!admin) {
            return res.json({ error: "Something went worng During creating user", status: 500 })
        }
        const createdAdmin = await Admin.findById({_id:admin._id})
        if(!createdAdmin){
            return res.json({ error: "Something went worng During getting user", status: 500 })
        }
        return res.json({meassage:"Admin Successfully Created !",admin:createdAdmin})
    } catch (error) {
        console.log(error);
        return res.json({ error: "Something went worng During creating user"+error, status: 500 })
    }
}