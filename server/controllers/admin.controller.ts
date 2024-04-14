import { Document } from "mongoose";
import ErrorHandler from "../utlis/ErrorHandler";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";
import { create } from "domain";

import { moocsModel } from "../models/moocs.model";
import userModel from "../models/user.model";
import nodemailer from 'nodemailer';
import ejs from "ejs";
import path from "path";
import sendMail from "../utlis/sendMail";

// get all details of the student :-
export const allStudentDetails = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allStudentDetails = await userModel.find().sort({ createdAt: -1 });

      // Convert Mongoose documents to plain JavaScript objects
      const plainStudentDetails = allStudentDetails.map(student => student.toObject());

      // Modify isVerified property to 'active' or 'inactive' and rename to 'status'
      const modifiedDetails = plainStudentDetails.map(student => ({
        ...student,
        status: student.isVerfied ? 'active' : 'inactive'
      }));

      // Remove the isVerified property from the modified details
      const detailsWithoutIsVerified = modifiedDetails.map(({ isVerfied, ...rest }) => rest);

      res.status(201).json({
        success: true,
        allStudentDetails: detailsWithoutIsVerified,
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
      if (!universityRoll) {
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
      if (student.isVerfied) {
        return next(new Error("Already verified!"));
      }
      if (!student.isVerfied) {
        student.isVerfied = true;
      }
      await student.save();
      const {email} = req.body;
      if(email){
        const data = { user: { name: student.name } };

        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/account-verification-mail.ejs"),
          data
        );
  
        try {
          await sendMail({
            email: student.email,
            subject: "Account verification mail",
            template: "account-verification-mail.ejs",
            data,
          });
  
          res.status(201).json({
            success: true,
            message: `An email notification has been sent to the registered email : ${student.email}`,
            
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 400));
        }
      }
        
     
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


// Reject  student by admin and send mail (optional)
export const rejectStudent = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const student = await userModel.findById(req.params.id);
      if (!student) {
        return next(new Error("User not found"));
      }
      if (!student.isVerfied) {
        return next(new Error("Already not verified!"));
      }
      if (student.isVerfied) {
        student.isVerfied = false;
      }
      await student.save();
      const {email,reason} = req.body;
      if(email){
        const data = { user: { name: student.name },reason };

        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/account-rejection-mail.ejs"),
          data
        );
  
        try {
          await sendMail({
            email: student.email,
            subject: "Account Rejection mail",
            template: "account-rejection-mail.ejs",
            data,
          });
  
          res.status(201).json({
            success: true,
            message: `An email notification has been sent to the registered email : ${student.email}`,
            
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 400));
        }
      }
        
     
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

