import { Document } from 'mongoose';
import ErrorHandler from "../utlis/ErrorHandler";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";
import { create } from 'domain';
import { createMocsDb } from '../services/mocs.service';
import mocsModel from '../models/moocs.model';

export const uploadMocs = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const data = req.body;
        const document = data.document;
        if(document){
            const myCloud = await cloudinary.v2.uploader.upload(document,{
                folder:"Document_Mocs"
            });

            data.document ={
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
        }
        createMocsDb(data,res,next);
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 400)); 
    }
});

// edit mocs
export const editMocs = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const data = req.body;
        const document = data.document;
        if(document){
            await cloudinary.v2.uploader.destroy(document.public_id)
            const myCloud = await cloudinary.v2.uploader.upload(document,{
                folder:"Document_Mocs"
            });

            data.document ={
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            };
        }

        const mocsId = req.params.id;
        const mocs = await mocsModel.findByIdAndUpdate(
            mocsId,
            {
                $set:data,
            },
            {new:true}
        );
        res.status(201).json({
            success:true,
            mocs
        })
        
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 400)); 
    }
});