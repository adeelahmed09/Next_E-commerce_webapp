import mongoose from "mongoose";

const connection = {}

async function connectDB() {
    if(connection.isConnected){
        console.log("Already connected to database`");
        return
    }
    try {
        const db = await mongoose.connect(process.env.DB_URL || "",{})
        connection.isConnected = db.connections[0].readyState
        console.log("DB Connected Successfully",connection.isConnected)
    } catch (error) {
        console.log("Err: DataBase Connection Failed :",error);
        process.exit(1)
    }
}

export default connectDB