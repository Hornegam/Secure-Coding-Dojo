import { Router } from "express";
import { UserController } from "../controllers/UserController";

const routes = Router();


const fileController = new UserController();
routes.get("/user/:id",fileController.get_user);

export { routes };

