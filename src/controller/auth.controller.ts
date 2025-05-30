import { AuthInputDTO } from "../dto/auth.dto";
import { AuthService, AuthServiceInterface } from "../service/auth.service";
import { RoleService, RoleServiceInterface } from "../service/role.service";
import { BaseController } from "./base.controller";
import { Request, Response } from "express";

export class AuthController extends BaseController {
    private authService: AuthServiceInterface;

    public constructor() {
        super();
        this.authService = new AuthService();
    }

    public async login(req: Request, res: Response) {
        try {
            const { phone, password } = req.body as AuthInputDTO;

            const output = await this.authService.authenticate(phone, password);

            return super.success(res, output);
        } catch(e) {
            return super.error(res, e);
        }
    }
}