import mongoose from "mongoose";

type Connection = {
    isConnected?: number 
}

const Connection: Connection = {}

async function dbConnect() {
    if(Connection.isConnected){
        console.log("DB ALREADY CONNECTED")
    }
    
    try {

        const response = await mongoose.connect(`${process.env.MONGODB_URI}`)
        Connection.isConnected = response?.connections[0].readyState
        console.log("DATABASE CONNECTTED SUCCESSFULLY")
        // console.log(response)
        
    } catch (error: any) {
        console.log("ERROR CONNECTING DATABASE", error.message)
        process.exit(1)
    }
}

export default dbConnect;