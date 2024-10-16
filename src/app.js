import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();


app.use(cors())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// routes
// import { registerUser } from "./controllers/user.controller.js";
// import { registerUser } from "./controllers/user.controller.js";
// app.use("/users", registerUser)



import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);