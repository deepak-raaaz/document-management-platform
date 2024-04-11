import { isAuthenticate } from "../middleware/auth";
import express from "express";
import {
  editMocs,
  uploadMoocs,
} from "../controllers/mocs.controller";
import { authorizeRoles } from "../middleware/auth";

const mocsRouter = express.Router();

mocsRouter.post("/upload-moocs", isAuthenticate, uploadMoocs);

mocsRouter.post(
  "/edit-moocs",
  isAuthenticate,
  authorizeRoles("admin"),
  editMocs
);


export default mocsRouter;
