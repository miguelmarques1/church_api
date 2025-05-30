import * as express from "express";
import { RoleController } from "../controller/role.controller";

const Router = express.Router();
const roleController = new RoleController();

Router.get('/', roleController.index.bind(roleController));

export { Router as roleRouter };