import * as express from "express";
import { validation } from "../middleware/validation.middleware";
import { MemberController } from "../controller/member.controller";
import { CreateMemberInputDTO, UpdateMemberInputDTO } from "../dto/member.dto";
import { authentification } from "../middleware/authentication.middleware";

const Router = express.Router();
const memberController = new MemberController();

Router.post('/', validation(CreateMemberInputDTO), memberController.store.bind(memberController));
Router.get('/', memberController.index.bind(memberController));
Router.get('/:id', memberController.show.bind(memberController));
Router.put('/:id', validation(UpdateMemberInputDTO), memberController.update.bind(memberController));

export { Router as memberRouter };