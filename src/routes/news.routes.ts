import * as express from "express";
import { validation } from "../middleware/validation.middleware";
import { NewsController } from "../controller/news.controller";
import { CreateNewsInputDTO } from "../dto/news.dto";

const Router = express.Router();
const newsController = new NewsController();

Router.post('/', validation(CreateNewsInputDTO), newsController.store.bind(newsController));
Router.get('/', newsController.index.bind(newsController));

export { Router as devotionalRouter };