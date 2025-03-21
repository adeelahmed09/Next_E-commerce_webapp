import { model , models , Schema} from "mongoose";

const productSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    desc:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    publish:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    }
},{timestamps:true})

const Product = models.Product || model("Product",productSchema)
export default Product