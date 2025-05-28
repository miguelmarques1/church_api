import * as express from "express";
import { FamilyController } from "../controller/family.controller";
import { validation } from "../middleware/validation.middleware";
import { CreateFamilyInputDTO } from "../dto/family.dto";

const Router = express.Router();
const familyController = new FamilyController();

Router.post('/', validation(CreateFamilyInputDTO), familyController.store.bind(familyController));
Router.get('/', familyController.index.bind(familyController));

export { Router as familyRouter };