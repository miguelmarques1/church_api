import * as express from "express";
import { validation } from "../middleware/validation.middleware";
import { EventController } from "../controller/event.controller";
import {
    CreateEventInputDTO,
    UpdateEventInputDTO,
} from "../dto/event.dto";
import { authentification } from "../middleware/authentication.middleware";

const Router = express.Router();
const eventController = new EventController();

Router.get('/', eventController.index.bind(eventController));
Router.get('/:id', eventController.show.bind(eventController));
Router.post(
    '/',
    authentification,
    validation(CreateEventInputDTO),
    eventController.store.bind(eventController)
);
Router.put(
    '/:id',
    authentification,
    validation(UpdateEventInputDTO),
    eventController.update.bind(eventController)
);
Router.post(
    '/:id/attendees/:memberId',
    authentification,
    eventController.addAttendee.bind(eventController)
);
Router.delete(
    '/:id/attendees/:memberId',
    authentification,
    eventController.removeAttendee.bind(eventController)
);

export { Router as eventRouter };