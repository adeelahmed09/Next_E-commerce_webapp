import {model, models, Schema} from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String, // image URl
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
    },
    role:{
        type:String,
        required:true
    }
},{timestamps:true})

userSchema.pre("save",async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next()
})

const User = models.User ||  model("User",userSchema)
export default User