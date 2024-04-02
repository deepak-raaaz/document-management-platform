import { isAuthenticate } from './../middleware/auth';
import express from 'express';
import { editMocs, uploadMocs } from '../controllers/mocs.controller';
import { authorizeRoles } from './../middleware/auth';

const mocsRouter = express.Router();

mocsRouter.post("/create-mocs",isAuthenticate,authorizeRoles("admin"),uploadMocs);

mocsRouter.post("/edit-mocs",isAuthenticate,authorizeRoles("admin"),editMocs);

export default mocsRouter;