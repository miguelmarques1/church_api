import * as express from "express";
import { memberRouter } from "./member.routes";
import { familyRouter } from "./family.routes";
import { ministryRouter } from "./ministry.routes";
import { devotionalRouter } from "./devotional.routes";
import { newsRouter } from "./news.routes";
import { roleRouter } from "./role.routes";
import { authRouter } from "./auth.routes";
import { eventRouter } from "./event.routes";

const Router = express.Router();

Router.use('/', authRouter);
Router.use('/members', memberRouter);
Router.use('/families', familyRouter);
Router.use('/ministries', ministryRouter);
Router.use('/devotionals', devotionalRouter);
Router.use('/news', newsRouter);
Router.use('/roles', roleRouter);
Router.use('/events', eventRouter);

export { Router as router };