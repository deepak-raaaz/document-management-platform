import { isAuthenticate } from './../middleware/auth';
import express from 'express';
import { authorizeRoles } from './../middleware/auth';
import { activateMarCategory, addMarCategory, allStudentDetails, deleteMarCategory, editMarCategory,  getAllMarData,  getAllMoocsData,  getMarListAdmin, getMoocsListAdmin, rejectMarDocument, rejectMoocsDocument, rejectStudent, singleStudentDetail, verifyMarDocument, verifyMoocsDocument, verifyStudent } from '../controllers/admin.controller';
import { createMoocsCourse } from '../controllers/admin.controller';
import { getMoocsList } from '../controllers/mocs.controller';

const adminRouter = express.Router();

adminRouter.get("/all-student-details",isAuthenticate,authorizeRoles("admin"),allStudentDetails);

adminRouter.get("/single-student-details/:id",isAuthenticate,authorizeRoles("admin"),singleStudentDetail);

//create moocs course list
adminRouter.post("/create-moocs-course", isAuthenticate,authorizeRoles("admin"), createMoocsCourse);

adminRouter.get("/moocs-course-list", isAuthenticate,authorizeRoles("admin"), getMoocsListAdmin);

adminRouter.get("/mar-category", isAuthenticate,authorizeRoles("admin"), getMarListAdmin);

adminRouter.put("/account-verify/:id", isAuthenticate,authorizeRoles("admin"), verifyStudent);

adminRouter.put("/account-reject/:id", isAuthenticate,authorizeRoles("admin"), rejectStudent);

adminRouter.post("/add-mar-category", isAuthenticate,authorizeRoles("admin"), addMarCategory);

adminRouter.put("/edit-mar-category/:id", isAuthenticate,authorizeRoles("admin"), editMarCategory);

adminRouter.put("/deactivate-mar-category/:id", isAuthenticate,authorizeRoles("admin"), deleteMarCategory);

adminRouter.put("/activate-mar-category/:id", isAuthenticate,authorizeRoles("admin"), activateMarCategory);


adminRouter.put("/mar-verify/:id", isAuthenticate,authorizeRoles("admin"),verifyMarDocument );

adminRouter.put("/moocs-verify/:id", isAuthenticate,authorizeRoles("admin"),verifyMoocsDocument );

adminRouter.get("/all-moocs-list", isAuthenticate,authorizeRoles("admin"), getAllMoocsData  );

adminRouter.get("/all-mar-list", isAuthenticate,authorizeRoles("admin"), getAllMarData  );

adminRouter.put("/moocs-verify/:id", isAuthenticate,authorizeRoles("admin"), verifyMoocsDocument );

adminRouter.put("/moocs-verify/:id", isAuthenticate,authorizeRoles("admin"), verifyMarDocument );


adminRouter.put("/moocs-reject/:id", isAuthenticate,authorizeRoles("admin"), rejectMoocsDocument );

adminRouter.put("/mar-reject/:id", isAuthenticate,authorizeRoles("admin"), rejectMarDocument );











export default adminRouter;