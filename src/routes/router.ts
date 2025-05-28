import * as express from "express";
import { memberRouter } from "./member.routes";
import { familyRouter } from "./family.routes";
import { ministryRouter } from "./ministry.routes";

const Router = express.Router();

Router.use('/members', memberRouter);
Router.use('/families', familyRouter);
Router.use('/ministries', ministryRouter);

export { Router as router };