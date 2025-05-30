import { RoleService, RoleServiceInterface } from "../service/role.service";
import { BaseController } from "./base.controller";
import { Request, Response } from "express";

export class RoleController extends BaseController {
    private roleService: RoleServiceInterface;

    public constructor() {
        super();
        this.roleService = new RoleService();
    }

    public async index(req: Request, res: Response) {
        try {
            const output = await this.roleService.list();

            return super.success(res, output);
        } catch(e) {
            return super.error(res, e);
        }
    }
}