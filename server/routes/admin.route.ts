import { isAuthenticate } from './../middleware/auth';
import express from 'express';
import { authorizeRoles } from './../middleware/auth';
import { allStudentDetails, singleStudentDetail, verifyStudent } from '../controllers/admin.controller';
import { createMoocsCourse } from '../controllers/mocs.controller';

const adminRouter = express.Router();

adminRouter.get("/all-student-details",isAuthenticate,authorizeRoles("admin"),allStudentDetails);

adminRouter.get("/single-student-details",isAuthenticate,authorizeRoles("admin"),singleStudentDetail);

//create moocs course list
adminRouter.post("/create-moocs-course", isAuthenticate,authorizeRoles("admin"), createMoocsCourse);

adminRouter.put("/account-verify/:id", isAuthenticate,authorizeRoles("admin"), verifyStudent);





export default adminRouter;