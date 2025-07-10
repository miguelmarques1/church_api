import { Request, Response } from "express";
import { CreateEventInputDTO, UpdateEventInputDTO, EventAttendeeDTO } from "../dto/event.dto";
import { EventService, EventServiceInterface } from "../service/event.service";
import { BaseController } from "./base.controller";

export class EventController extends BaseController {
    private eventService: EventServiceInterface;

    public constructor() {
        super();
        this.eventService = new EventService();
    }

    public async show(req: Request, res: Response) {
        try {
            const id = Number.parseInt(req.params.id);
            const output = await this.eventService.find(id);
            return super.success(res, output);
        } catch(e) {
            return super.error(res, e);
        }
    }

    public async store(req: Request, res: Response) {
        try {
            const organizerId = req['member_id'] as number;
            const input = req.body as CreateEventInputDTO;
            input.organizer_id = organizerId;

            const output = await this.eventService.create(input);
            return super.success(res, output, 201);
        } catch(e) {
            return super.error(res, e);
        }
    }

    public async index(req: Request, res: Response) {
        try {
            const { start, end } = req.query;

            const startDate = start ? new Date(start as string) : undefined;
            const endDate = end ? new Date(end as string) : undefined;

            if (startDate && isNaN(startDate.getTime())) {
                return super.error(res, { message: 'Data inicial inválida' }, 400);
            }

            if (endDate && isNaN(endDate.getTime())) {
                return super.error(res, { message: 'Data final inválida' }, 400);
            }

            if (startDate && endDate && startDate > endDate) {
                return super.error(res, { message: 'Data inicial não pode ser maior que data final' }, 400);
            }

            const events = await this.eventService.list(startDate, endDate);
            return super.success(res, events);

        } catch (e) {
            return super.error(res, e);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id = Number.parseInt(req.params.id);
            const organizerId = req['member_id'] as number;
            const input = req.body as UpdateEventInputDTO;
            input.organizer_id = organizerId;

            const output = await this.eventService.update(id, input);
            return super.success(res, output);
        } catch(e) {
            return super.error(res, e);
        }
    }

    public async addAttendee(req: Request, res: Response) {
        try {
            const eventId = Number.parseInt(req.params.id);
            const memberId = Number.parseInt(req.params.memberId);

            await this.eventService.addAttendee(eventId, memberId);
            return super.success(res, { message: 'Participante adicionado com sucesso' });
        } catch(e) {
            return super.error(res, e);
        }
    }

    public async removeAttendee(req: Request, res: Response) {
        try {
            const eventId = Number.parseInt(req.params.id);
            const memberId = Number.parseInt(req.params.memberId);

            await this.eventService.removeAttendee(eventId, memberId);
            return super.success(res, { message: 'Participante removido com sucesso' });
        } catch(e) {
            return super.error(res, e);
        }
    }
}