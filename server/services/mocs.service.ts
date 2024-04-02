import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { Response } from "express";
import marModel from "../models/mocs.model";

export const createMocsDb = CatchAsyncError(async(data:any,res:Response)=>{
    const mocs = await marModel.create(data);
    res.status(201).json({
        success:true,
        mocs
    });
})