import express from "express";
import connectdB from "./connect.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import messageRoute from "./routes/message.route.js";
import { app ,server} from "./SocketIO/server.js";



dotenv.config({

    path:'./.env'

})
connectdB();



app.use(cors())


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("hello prince always be happy")
})

//
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);



server.listen(process.env.PORT||4002,()=>{
    console.log( `server is running in port ${process.env.PORT}`)
})