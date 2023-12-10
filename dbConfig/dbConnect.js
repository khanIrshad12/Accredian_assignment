import mongoose from "mongoose";

const dbConnect = async() => {
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log('Database connected')
      } catch (error) {
        console.log("connection failed",error)
      }
}

export default dbConnect
