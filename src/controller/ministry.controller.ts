import { CreateMinistryInputDTO } from "../dto/ministry.dto";
import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { MinistryService, MinistryServiceInterface } from "../service/ministry.service";

export class MinistryController extends BaseController {
    private ministryService: MinistryServiceInterface;

    public constructor() {
        super();
        this.ministryService = new MinistryService();
    }

    public async store(req: Request, res: Response) {
        try {
            const input = req.body as CreateMinistryInputDTO;

            const output = await this.ministryService.create(input);

            return super.success(res, output, 201);
        } catch(e) {
            return super.error(res, e);
        }
    }

    public async index(req: Request, res: Response) {
        try {
            const output = await this.ministryService.findAll();

            return super.success(res, output);
        } catch(e) {
            return super.error(res, e);
        }
    }
}