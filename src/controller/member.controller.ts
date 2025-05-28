import { CreateMemberInputDTO, UpdateMemberInputDTO } from "../dto/member.dto";
import { MemberService, MemberServiceInterface } from "../service/member.service";
import { BaseController } from "./base.controller";
import { Response, Request } from "express";

export class MemberController extends BaseController {
    private memberService: MemberServiceInterface;

    public constructor() {
        super();
        this.memberService = new MemberService();
    }

    public async store(req: Request, res: Response) {
        try {
            const input = req.body as CreateMemberInputDTO;

            const output = await this.memberService.create(input);

            return super.success(res, output, 201);
        } catch (e) {
            return super.error(res, e);
        }
    }

    public async index(req: Request, res: Response) {
        try {
            const search = req.query.search?.toString() || undefined;

            const output = await this.memberService.list(search);

            return super.success(res, output);
        } catch (e) {
            return super.error(res, e);
        }
    }

    public async show(req: Request, res: Response) {
        try {
            const id = Number.parseInt(req.params.id);

            const output = await this.memberService.find(id);

            return super.success(res, output);
        } catch (e) {
            return super.error(res, e);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const input = req.body as UpdateMemberInputDTO;
            const inputID = Number.parseInt(req.params.id);
            input.id = inputID;

            const id = req['member_id'] as number;

            const output = await this.memberService.update(id, input);

            return super.success(res, output);
        } catch (e) {
            return super.error(res, e);
        }
    }
}