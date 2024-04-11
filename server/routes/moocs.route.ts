import { isAuthenticate } from "../middleware/auth";
import express from "express";
import {
  editMocs,
  getMoocsList,
  getMyMoocs,
  uploadMoocs,
} from "../controllers/mocs.controller";
import { authorizeRoles } from "../middleware/auth";

const moocsRouter = express.Router();

moocsRouter.post("/upload-moocs", isAuthenticate, uploadMoocs);

moocsRouter.post(
  "/edit-moocs",
  isAuthenticate,
  authorizeRoles("admin"),
  editMocs
);

moocsRouter.get("/my-moocs", isAuthenticate, getMyMoocs);
moocsRouter.get("/moocs-list", isAuthenticate, getMoocsList);

export default moocsRouter;
