import { Router } from "express";
import { UserController } from "../controllers/UserController";

//需要添加更多的路由。请帮我。

const routes = Router();
const userController = new UserController();

routes.get("/user/:id",userController.get_user);
routes.post("/user/validate",userController.validate_user);
routes.post("/user/login",userController.log_user)

export { routes };

