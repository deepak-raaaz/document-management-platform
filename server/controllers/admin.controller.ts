import { Document } from "mongoose";
import ErrorHandler from "../utlis/ErrorHandler";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";
import { create } from "domain";

import { moocsCourseModel, moocsModel } from "../models/moocs.model";
import userModel from "../models/user.model";
import nodemailer from 'nodemailer';
import ejs from "ejs";
import path from "path";
import sendMail from "../utlis/sendMail";
import { marModel } from "../models/mar.model";

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

      res.status(201).json({
        success: true,
        message: `Account verified !`,
        
      });
        
     
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

// edit moocs course add or remove moocs list and credit

export const createMoocsCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, platform, credit } = req.body;
      if (!title) {
        return next(new ErrorHandler("Enter Course Title", 400));
      }
      if (!platform) {
        return next(new ErrorHandler("Enter Course Platform", 400));
      }
      if (!credit) {
        return next(new ErrorHandler("Enter Course Credit", 400));
      }

      const data = {
        title: title,
        platform: platform,
        credit: credit,
      };

      const moocsCourse = await moocsCourseModel.create(data);
      res.status(201).json({
        success: true,
        moocsCourse,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// edit moocs list by admin
export const editMoocsCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const { title, platform, credit } = req.body;
      
      if (!title) {
        return next(new ErrorHandler("Enter Course Title", 400));
      }
      if (!platform) {
        return next(new ErrorHandler("Enter Course Platform", 400));
      }
      if (!credit) {
        return next(new ErrorHandler("Enter Course Credit", 400));
      }

      const updatedCourse = await moocsCourseModel.findByIdAndUpdate(courseId, {
        title: title,
        platform: platform,
        credit: credit,
      }, { new: true });

      if (!updatedCourse) {
        return next(new Error("Course not found"));
      }

      res.status(200).json({
        success: true,
        updatedCourse,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// edit mar list :-
export const editMAR = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const marId = req.params.id;
      const { title, year, category, points } = req.body;
      
      if (!title) {
        return next(new ErrorHandler("Enter MAR Title", 400));
      }
      if (!year) {
        return next(new ErrorHandler("Enter MAR Year", 400));
      }
      if (!category) {
        return next(new ErrorHandler("Enter MAR Category", 400));
      }
      if (!points) {
        return next(new ErrorHandler("Enter MAR Points", 400));
      }

      const updatedMAR = await marModel.findByIdAndUpdate(marId, {
        title: title,
        year: year,
        category: category,
        points: points,
      }, { new: true });

      if (!updatedMAR) {
        return next(new Error("MAR not found"));
      }

      res.status(200).json({
        success: true,
        updatedMAR,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);



//  delete moocs list :-

export const deleteMoocsCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const updatedCourse = await moocsCourseModel.findByIdAndUpdate(courseId, { isActive: false }, { new: true });

      if (!updatedCourse) {
        return next(new Error("Course not found"));
      }

      res.status(200).json({
        success: true,
        message: "Course deactivated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//  delete mar list :-
export const deactivateMAR = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const marId = req.params.id;
      const updatedMAR = await marModel.findByIdAndUpdate(marId, { isActive: false }, { new: true });

      if (!updatedMAR) {
        return next(new Error("MAR not found"));
      }

      res.status(200).json({
        success: true,
        message: "MAR deactivated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
