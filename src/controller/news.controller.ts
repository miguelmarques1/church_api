import { CreateDevotionalInputDTO } from "../dto/devotional.dto";
import { CreateNewsInputDTO } from "../dto/news.dto";
import { DevotionalService, DevotionalServiceInterface } from "../service/devotional.service";
import { NewsService, NewsServiceInterface } from "../service/news.service";
import { BaseController } from "./base.controller";
import { Request, Response } from "express";

export class NewsController extends BaseController {
    private newsService: NewsServiceInterface;

    public constructor() {
        super();
        this.newsService = new NewsService();
    }
    
    public async store(req: Request, res: Response) {
        try {
            const input = req.body as CreateNewsInputDTO;
            
            const output = await this.newsService.create(input);

            return super.success(res, output, 201);
        } catch(e) {
            return super.error(res, e);
        }
    }

    public async index(req: Request, res: Response) {
        try {
            const output = await this.newsService.list();

            return super.success(res, output);
        } catch(e) {
            return super.error(res, e);
        }
    }
}