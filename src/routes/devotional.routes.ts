import * as express from "express";
import { validation } from "../middleware/validation.middleware";
import { DevotionalController } from "../controller/devotional.controller";
import { CreateDevotionalInputDTO } from "../dto/devotional.dto";
import { authentification } from "../middleware/authentication.middleware";

const Router = express.Router();
const devotionalController = new DevotionalController();

Router.post('/', authentification, validation(CreateDevotionalInputDTO), devotionalController.store.bind(devotionalController));
Router.get('/', devotionalController.index.bind(devotionalController));
Router.get('/:id', devotionalController.show.bind(devotionalController));

export { Router as devotionalRouter };