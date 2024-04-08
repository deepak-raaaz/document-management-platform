import { isAuthenticate } from './../middleware/auth';
import express from 'express';
import { authorizeRoles } from './../middleware/auth';
import { allStudentDetails } from '../controllers/admin.controller';

const adminRouter = express.Router();

adminRouter.get("/all-student-details",isAuthenticate,authorizeRoles("admin"),allStudentDetails);



export default adminRouter;