import { Router } from "express";
import { UserController } from "../controllers/UserController";

//Need to add more routes. Please help me.

const routes = Router();


const fileController = new UserController();
routes.get("/user/:id",fileController.get_user);

export { routes };

