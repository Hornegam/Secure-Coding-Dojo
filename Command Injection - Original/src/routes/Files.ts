import { Router } from "express";
import { FileController } from "../controllers/FileController";

const routes = Router();


const fileController = new FileController();
routes.post("/create",fileController.create);

export { routes };

