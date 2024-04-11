import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { NextFunction, Response } from "express";
import { moocsModel } from "../models/moocs.model";

export const createMoocsDb = CatchAsyncError(async(data:any,res:Response,next:NextFunction)=>{
    const mocs = await moocsModel.create(data);
    res.status(201).json({
        success:true,
        mocs
    });
})