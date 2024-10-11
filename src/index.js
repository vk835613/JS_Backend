import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";



//config the dotenv file...

dotenv.config();


// DataBase Call...
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is runing at port : ${process.env.PORT}`);
    });
})
.catch((error)=>{
    console.log("MONGO DB Connection Failed... ", error);
})