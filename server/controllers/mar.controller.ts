import { Document } from "mongoose";
import ErrorHandler from "../utlis/ErrorHandler";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";

import {
    documentsModel,
    marCourseModel,
    marModel,
  } from "../models/mar.model";
  import userModel from "../models/user.model";
  import multer from "multer";
  import fs from "fs";
  import { redis } from "../utlis/redis";
  
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage }).single("file");










interface IMARUpload {
    title: string;
    year: number;
    category: string;
    points: number;
  }
  
  export const uploadMAR = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        upload(req, res, async (err: any) => {
          if (err) {
            return next(new ErrorHandler("File upload failed", 400));
          }
          try {
            const { title, year, category, points } =
              req.body as IMARUpload;
  
            // Check if the user exists
            const user = await userModel.findById(req.user?._id);
            if (!user) {
              return next(new ErrorHandler("User not found", 400));
            }
  
            // Check if the user has already uploaded MAR with the same title
            const existingMAR = await marModel.findOne({
              user: user._id,
              title: title,
            });
  
            if (existingMAR) {
              return next(new ErrorHandler("You have already uploaded MAR with this title", 400));
            }
  
            const file = req.file; // Access the uploaded file
            if (!file) {
              return next(new ErrorHandler("No file uploaded", 400));
            }
  
            // Create a temporary file path
            const tempFilePath = `temp_${Date.now()}_${file.originalname}`;
  
            // Write the buffer to the temporary file
            fs.writeFileSync(tempFilePath, file.buffer);
  
            // Upload temporary file to Cloudinary
            const myCloud = await cloudinary.v2.uploader.upload(tempFilePath, {
              folder: "Document_MAR",
            });
  
            // Delete the temporary file
            fs.unlinkSync(tempFilePath);
  
            const documentData = {
              user: user._id,
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
              pageCount: myCloud.pages,
              size: myCloud.bytes,
              format: myCloud.format,
            };
  
            const marDocument = await documentsModel.create(documentData);
            const data = {
              user: user._id,
              title: title,
              year: year,
              category: category,
              points: points,
              document: marDocument._id,
            };
  
            const mar = await marModel.create(data);

          // Push the newly created MAR document ID to the user's mar array
          user.mar.push(mar._id);
          await user.save();
          await redis.set(req.user?._id, JSON.stringify(user));
  
            res.status(201).json({
              success: true,
              mar,
            });
          } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
          }
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    }
  );

  
  export const deleteMAR = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const marId = req.params.id;
  
        // Find the MAR entry by its ID
        const mar = await marModel.findById(marId);
        if (!mar) {
          return next(new ErrorHandler("MAR entry not found", 404));
        }
  
        // Check if the logged-in user is the owner of the MAR entry
        if (mar.user.toString() !== req.user?._id.toString()) {
          return next(new ErrorHandler("You are not authorized to delete this MAR entry", 403));
        }
  
        // Delete the document from Cloudinary
        const document = await documentsModel.findById(mar.document);
        if (document) {
          await cloudinary.v2.uploader.destroy(document.public_id);
          await (document as any).remove();
        }
  
        // Delete the MAR entry from the database
        await (mar as any).remove();
  
        res.status(200).json({
          success: true,
          message: "MAR entry and associated document deleted successfully",
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    }
  );


// get all mar point list 
export const getMyMar = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userModel.findById(req.user?._id).populate({
        path: "mar",
        populate: [
          {
            path: "marCourse",
            model: "MarCourse",
          },
          {
            path: "document",
            model: "MarDocuments",
          },
        ],
      });

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const moocs = user.moocs as any;

      // Calculate total credit points of verified Moocs entries
      let totalMarPoints = 0;
      moocs.forEach((mar : any) => {
        if (mar.status === "verified") { // Ensure mooc is properly typed as MoocsDocument
          totalMarPoints += mar.marCourse.marPoint;
        }
      });

      res.status(200).json({
        success: true,
        totalMarPoints,
        moocs,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
  