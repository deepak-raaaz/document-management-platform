import { Document } from "mongoose";
import ErrorHandler from "../utlis/ErrorHandler";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";
import { create } from 'domain';
import { createMocsDb } from '../services/mocs.service';
import { moocsModel } from "../models/moocs.model";
import userModel from '../models/user.model';

// get all details of the student :-
export const allStudentDetails = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allStudentDetails = await userModel.find().sort({ createdAt: -1 });
      res.status(201).json({
        success: true,
        allStudentDetails,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get single student detail.
export const singleStudentDetail = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const universityRoll = req.params.universityRoll;
      const singleStudent = await userModel.findById(universityRoll);
      if(!universityRoll){
        return next(new ErrorHandler("Not record found!", 400));
      }
      res.status(201).json({
        success: true,
        singleStudent,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// verify student (when student register for first time)

export const verifyStudent = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const student = await userModel.findById(req.params.id);
      if (!student) {
        return next(new Error("User not found"));
      }
      if(student.isVerfied){
        return next(new Error("Already verified!"));
      }
      if (!student.isVerfied) {
        student.isVerfied = true;
      }
      await student.save();
      res.status(201).json({
        success: true,
        message:"verfied Done"
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


