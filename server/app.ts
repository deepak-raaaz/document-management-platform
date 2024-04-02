require('dotenv').config();
import cookieParser from "cookie-parser";
import express, { NextFunction,Request,Response } from "express";
export const app = express();
import cors from "cors"
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import mocsRouter from "./routes/mocs.route";

app.use(express.json({limit:"50mb"}));

app.use(cookieParser());


//cors = cross origin resource sharing
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
app.use("/api/v2",userRouter);
app.use("/api/v2",mocsRouter);

// testing api
app.get("/test",(req:Request,res:Response,next:NextFunction) =>{
    res.status(200).json({
        success:true,
        message:"API is working"
    });

});


app.use(ErrorMiddleware);