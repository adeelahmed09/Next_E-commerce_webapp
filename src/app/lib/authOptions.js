import CredentialsProvider from "next-auth/providers/credentials";
import Admin from "@/models/admin.model";
import bcrypt from "bcryptjs";
import connectDB from "./db";
import User from "@/models/user.model";

export const authOptions = {
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials)=>{
                if(!credentials.email){
                    throw new Error("Email is required!")
                }
                if(!credentials.password){
                    throw new Error("Password is required!")
                }
                try {
                    await connectDB()
                    const isAdmin = await Admin.findOne({email:credentials.email})
                    if(isAdmin){
                        const isPasswordCorrect = await bcrypt.compare(credentials.password,isAdmin.password)
                        if(!isPasswordCorrect){
                            throw new Error("Email Restricted !! Password Incorect !!")
                        }
                        return {
                            id: isAdmin._id.toString(),
                            name: isAdmin.name,
                            email:isAdmin.email,
                            role:isAdmin.role
                        }
                    }
                    const isUser = await User.findOne({email:credentials.email})
                    if(!isUser){
                        throw new Error("Incorrect Email!!")
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password,isUser.password)
                    if(!isPasswordCorrect){
                        throw new Error("Incorrect Password!!")
                    }
                    return {
                        id : isUser._id.toString(),
                        name: isUser.name,
                        email: isUser.email,
                        role : isUser.role,
                        avatar:isUser.avatar
                    }
                } catch (error) {
                    throw error
                }
            }
        }),
    ],
    pages:{
        signIn:"/log-in",
        error:"/log-in"
    },
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id = user.id
                token.email = user.email
                token.role = user.role
                token.name = user.name
                token.avatar = user.avatar
            }
            return token
        },
        async session({session,token}){
            if(session.user){
                session.user.id = token.id 
                session.user.email = token.email
                session.user.name = token.name
                session.user.role = token.role
                session.user.avatar = token.avatar
            }
            return session
        }
        
    },
    session:{
        strategy:"jwt",
        maxAge: 30 * 24 * 60 * 60 ,
    },
    secret: process.env.NEXTAUTH_SECRET
}