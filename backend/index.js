import express from "express";
import connectdB from "./connect.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import messageRoute from "./routes/message.route.js";
import { app ,server} from "./SocketIO/server.js";
import path from "path";



dotenv.config({

    path:'./.env'

})
connectdB();



app.use(cors())


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cookieParser())



//
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.use("/test", (req, res) => {
    return res.json({ message: "Hello from server" });
});

//--code for deployment -----//

if (process.env.NODE_ENV === "production") {
    const dirPath = path.resolve();

    app.use(express.static("./frontend/dist"));

    // ✅ Catch-all route (SAFE)
    app.use((req, res) => {
        res.sendFile(path.join(dirPath, "./frontend/dist", "index.html"));
    });
}



server.listen(process.env.PORT||4002,()=>{
    console.log( `server is running in port ${process.env.PORT}`)
})