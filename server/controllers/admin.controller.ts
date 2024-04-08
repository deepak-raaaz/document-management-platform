import { Document } from 'mongoose';
import ErrorHandler from "../utlis/ErrorHandler";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";
import { create } from 'domain';
import { createMocsDb } from '../services/mocs.service';
import mocsModel from '../models/mocs.model';
import userModel from '../models/user.model';

// get all details of the student :-
export const allStudentDetails = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const allStudentDetails = await userModel.find().sort({createdAt:-1});
        res.status(201).json({
            success:true,
            allStudentDetails
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 400)); 
    }
})


// get single stiudent detail.
export const singleStudentDetail = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    try {
        
        const universityRoll = req.params.universityRoll;
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 400)); 
    }
})