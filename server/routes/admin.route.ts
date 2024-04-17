import { isAuthenticate } from './../middleware/auth';
import express from 'express';
import { authorizeRoles } from './../middleware/auth';
import { addMarCategory, allStudentDetails, deleteMarCategory, editMarCategory, getMarList, rejectStudent, singleStudentDetail, verifyMarDocument, verifyMoocsDocument, verifyStudent } from '../controllers/admin.controller';
import { createMoocsCourse } from '../controllers/admin.controller';
import { getMoocsList } from '../controllers/mocs.controller';

const adminRouter = express.Router();

adminRouter.get("/all-student-details",isAuthenticate,authorizeRoles("admin"),allStudentDetails);

adminRouter.get("/single-student-details/:id",isAuthenticate,authorizeRoles("admin"),singleStudentDetail);

//create moocs course list
adminRouter.post("/create-moocs-course", isAuthenticate,authorizeRoles("admin"), createMoocsCourse);

adminRouter.get("/moocs-course-list", isAuthenticate,authorizeRoles("admin"), getMoocsList);

adminRouter.get("/mar-course-list", isAuthenticate,authorizeRoles("admin"), getMarList);

adminRouter.put("/account-verify/:id", isAuthenticate,authorizeRoles("admin"), verifyStudent);

adminRouter.put("/account-reject/:id", isAuthenticate,authorizeRoles("admin"), rejectStudent);

adminRouter.post("/add-mar-category", isAuthenticate,authorizeRoles("admin"), addMarCategory);

adminRouter.put("/edit-mar-category/:id", isAuthenticate,authorizeRoles("admin"), editMarCategory);

adminRouter.put("/delete-mar-category/:id", isAuthenticate,authorizeRoles("admin"), deleteMarCategory);

adminRouter.put("/mar-verify/:id", isAuthenticate,authorizeRoles("admin"),verifyMarDocument );

adminRouter.put("/moocs-verify/:id", isAuthenticate,authorizeRoles("admin"),verifyMoocsDocument );








export default adminRouter;