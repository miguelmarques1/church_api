import { CreateDevotionalInputDTO } from "../dto/devotional.dto";
import { DevotionalService, DevotionalServiceInterface } from "../service/devotional.service";
import { BaseController } from "./base.controller";
import { Request, Response } from "express";

export class NewsController extends BaseController {
    private devotionalService: DevotionalServiceInterface;

    public constructor() {
        super();
        this.devotionalService = new DevotionalService();
    }
    
    public async store(req: Request, res: Response) {
        try {
            const input = req.body as CreateDevotionalInputDTO;
            
            const output = await this.devotionalService.create(input);

            return super.success(res, output, 201);
        } catch(e) {
            return super.error(res, e);
        }
    }

    public async index(req: Request, res: Response) {
        try {
            const output = await this.devotionalService.list();

            return super.success(res, output);
        } catch(e) {
            return super.error(res, e);
        }
    }
}