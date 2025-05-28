import * as express from "express";
import { validation } from "../middleware/validation.middleware";
import { MinistryController } from "../controller/ministry.controller";
import { CreateMinistryInputDTO } from "../dto/ministry.dto";

const Router = express.Router();
const ministryController = new MinistryController();

Router.post('/', validation(CreateMinistryInputDTO), ministryController.store.bind(ministryController));
Router.get('/', ministryController.index.bind(ministryController));

export { Router as ministryRouter };