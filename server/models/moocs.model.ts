require('dotenv').config();
import bcrypt from "bcryptjs";
import mongoose, { Document, Schema } from "mongoose";
import jwt  from "jsonwebtoken";
import { Model } from "mongoose";



export interface IMoocsDb extends Document{
    user : object,
    title : string;
    platform : string;
    credit:number;
    startDate: string;
    endDate:string;
    year:number,
    document:object
};

const moocsDbSchema = new Schema<IMoocsDb>({
    user :{
        type: Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    title:{
        type:String,
        required:true,
    },
    platform:{
        type:String,
        required:true,
    },
    credit:{
        type:Number,
        required:true,
    },
    startDate:{
        type:String,
        required:true,
    },
    endDate:{
        type:String,
        required:true,
    },
    year:{
        type:Number,
        required:true,
    },
    document:{
        public_id:{
            required:true,
            type:String
        },
        url :{
            required:true,
            type:String
        }
    }
});

const moocsModel: Model<IMoocsDb> =mongoose.model("Moocs",moocsDbSchema);

export default moocsModel;