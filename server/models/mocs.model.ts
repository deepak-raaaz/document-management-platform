require('dotenv').config();
import bcrypt from "bcryptjs";
import mongoose, { Document, Schema } from "mongoose";
import jwt  from "jsonwebtoken";
import { Model } from "mongoose";



export interface IMocsDb extends Document{
    user : object,
    title : string;
    platform : string;
    credit:number;
    startDate: string;
    endDate:string;
    year:number,
    document:object
};

const mocsDbSchema = new Schema<IMocsDb>({
    user :Object,
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

const mocsModel: Model<IMocsDb> =mongoose.model("Moocs",mocsDbSchema);

export default mocsModel;