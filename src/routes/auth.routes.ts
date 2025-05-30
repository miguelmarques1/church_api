import * as express from "express";
import { validation } from "../middleware/validation.middleware";
import { AuthController } from "../controller/auth.controller";
import { AuthInputDTO } from "../dto/auth.dto";

const Router = express.Router();
const authController = new AuthController();

Router.post('/login', validation(AuthInputDTO), authController.login.bind(authController));

export { Router as authRouter };