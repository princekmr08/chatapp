import mongoose from "mongoose";


const connectdB=async()=>{
     await mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log("MONGO DB connection is successful")
        }).catch((err)=>{
            console.log(err)
        })
}
export  default connectdB