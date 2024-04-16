import { deleteMAR, getMarCategories, getMyMar, uploadMAR } from "../controllers/mar.controller";
import { isAuthenticate } from "../middleware/auth";
import express from "express";


const marRouter = express.Router();

marRouter.post("/upload-mar", isAuthenticate, uploadMAR);
marRouter.get("/mar-list", isAuthenticate, getMyMar );
marRouter.delete("/delete-mar", isAuthenticate, deleteMAR );
marRouter.get("/mar-category-list", isAuthenticate, getMarCategories );








export default marRouter;