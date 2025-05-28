import { CreateFamilyInputDTO } from "../dto/family.dto";
import { FamilyService, FamilyServiceInterface } from "../service/family.service";
import { BaseController } from "./base.controller";
import { Request, Response } from "express";

export class FamilyController extends BaseController {
    private familyService: FamilyServiceInterface;

    public constructor() {
        super();
        this.familyService = new FamilyService();
    }
    
    public async store(req: Request, res: Response) {
        try {
            const input = req.body as CreateFamilyInputDTO;
            
            const output = await this.familyService.create(input);

            return super.success(res, output, 201);
        } catch(e) {
            return super.error(res, e);
        }
    }

    public async index(req: Request, res: Response) {
        try {
            const output = await this.familyService.list();

            return super.success(res, output);
        } catch(e) {
            return super.error(res, e);
        }
    }
}