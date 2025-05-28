import * as express from "express";
import { validation } from "../middleware/validation.middleware";
import { DevotionalController } from "../controller/devotional.controller";
import { CreateDevotionalInputDTO } from "../dto/devotional.dto";

const Router = express.Router();
const devotionalController = new DevotionalController();

Router.post('/', validation(CreateDevotionalInputDTO), devotionalController.store.bind(devotionalController));
Router.get('/', devotionalController.index.bind(devotionalController));

export { Router as devotionalRouter };