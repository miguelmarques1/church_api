import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Event } from "../entity/Event";
import { Member } from "../entity/Member";
import { EventMapper } from "../mapper/EventMapper";
import { CreateEventInputDTO, EventOutputDTO, UpdateEventInputDTO, EventAttendeeDTO } from "../dto/event.dto";
import { NotFoundException } from "../exception/NotFoundException";

export interface EventServiceInterface {
    create(input: CreateEventInputDTO): Promise<EventOutputDTO>;
    find(id: number): Promise<EventOutputDTO>;
    list(startAt?: Date, endAt?: Date): Promise<EventOutputDTO[]>;
    update(id: number, input: UpdateEventInputDTO): Promise<EventOutputDTO>;
    addAttendee(eventId: number, memberId: number): Promise<void>;
    removeAttendee(eventId: number, memberId: number): Promise<void>;
}

export class EventService implements EventServiceInterface {
    private eventRepository: Repository<Event>;
    private memberRepository: Repository<Member>;

    public constructor() {
        this.eventRepository = AppDataSource.getRepository(Event);
        this.memberRepository = AppDataSource.getRepository(Member);
    }

    async create(input: CreateEventInputDTO): Promise<EventOutputDTO> {
        const event = EventMapper.inputToEntity(input);

        await this.syncRelations(input, event);

        if (input.attendees && input.attendees.length > 0) {
            await this.syncAttendees(input.attendees, event);
        }

        const result = await this.eventRepository.save(event);
        return this.find(result.id);
    }

    async find(id: number): Promise<EventOutputDTO> {
        const event = await this.eventRepository.findOne({
            where: { id },
            relations: {
                organizer: {
                    family: true,
                    ministries: true,
                    role: true,
                },
                attendees: true,
            },
        });

        if (!event) {
            throw new NotFoundException('Evento não encontrado');
        }

        return EventMapper.entityToOutput(event);
    }

    async list(startAt?: Date, endAt?: Date): Promise<EventOutputDTO[]> {
        console.log("Fetching events with startAt:", startAt, "endAt:", endAt);
        
        const allEvents = await this.eventRepository.find({
            relations: {
                organizer: {
                    family: true,
                    ministries: true,
                    role: true,
                },
                attendees: true
            }
        });

        const processedEvents: Event[] = [];

        for (const event of allEvents) {
            if (!event.recurring || !event.recurrencePattern) {
                if ((!startAt || event.date >= startAt) && (!endAt || event.date <= endAt)) {
                    processedEvents.push(event);
                }
            } else {
                const occurrences = this.generateRecurringEvents(event, startAt, endAt);
                processedEvents.push(...occurrences);
            }
        }

        processedEvents.sort((a, b) => a.date.getTime() - b.date.getTime());

        return processedEvents.map(EventMapper.entityToOutput);
    }

    async update(id: number, input: UpdateEventInputDTO): Promise<EventOutputDTO> {
        const event = await this.eventRepository.findOne({
            where: { id },
            relations: {
                attendees: true
            }
        });

        if (!event) {
            throw new NotFoundException('Evento não encontrado');
        }

        event.title = input.title ?? event.title;
        event.description = input.description ?? event.description;
        event.date = input.date ?? event.date;
        event.location = input.location ?? event.location;
        event.imageUrl = input.image_url ?? event.imageUrl;
        event.recurring = input.recurring ?? event.recurring;
        event.recurrencePattern = input.recurrence_pattern ?? event.recurrencePattern;
        event.endDate = input.end_date ?? event.endDate;
        event.category = input.category ?? event.category;

        await this.syncRelations(input, event);

        if (input.attendees) {
            await this.syncAttendees(input.attendees, event);
        }

        const result = await this.eventRepository.save(event);
        return this.find(result.id);
    }

    async addAttendee(eventId: number, memberId: number): Promise<void> {
        const event = await this.eventRepository.findOne({
            where: { id: eventId },
            relations: ['attendees']
        });

        if (!event) {
            throw new NotFoundException('Evento não encontrado');
        }

        const member = await this.memberRepository.findOneBy({ id: memberId });
        if (!member) {
            throw new NotFoundException('Membro não encontrado');
        }

        const isAlreadyAttending = event.attendees.some(a => a.id === memberId);
        if (!isAlreadyAttending) {
            event.attendees.push(member);
            await this.eventRepository.save(event);
        }
    }

    async removeAttendee(eventId: number, memberId: number): Promise<void> {
        const event = await this.eventRepository.findOne({
            where: { id: eventId },
            relations: ['attendees']
        });

        if (!event) {
            throw new NotFoundException('Evento não encontrado');
        }

        event.attendees = event.attendees.filter(attendee => attendee.id !== memberId);
        await this.eventRepository.save(event);
    }

    private async syncRelations(input: CreateEventInputDTO | UpdateEventInputDTO, event: Event) {
        if (input.organizer_id) {
            const organizer = await this.memberRepository.findOneBy({ id: input.organizer_id });
            if (!organizer) {
                throw new NotFoundException('Organizador não encontrado');
            }
            event.organizer = organizer;
        }
    }

    private async syncAttendees(attendees: EventAttendeeDTO[], event: Event) {
        const memberIds = attendees.map(a => a.member_id);
        const members = await this.memberRepository.findByIds(memberIds);

        if (members.length !== memberIds.length) {
            throw new NotFoundException('Um ou mais membros não foram encontrados');
        }

        event.attendees = members;
    }

    private generateRecurringEvents(event: Event, startAt?: Date, endAt?: Date): Event[] {
        if (!event.recurrencePattern || !event.endDate) return [event];

        const occurrences: Event[] = [];
        let currentDate = new Date(startAt ?? event.date);
        const endRecurrenceDate = endAt ?? new Date(event.endDate);

        const eventDuration = event.endDate.getTime() - event.date.getTime();

        const filterStart = startAt || currentDate;
        const filterEnd = endAt || endRecurrenceDate;

        while (currentDate <= endRecurrenceDate && currentDate <= filterEnd) {
            if (currentDate >= filterStart) {
                const occurrenceDate = new Date(currentDate);

                occurrenceDate.setHours(
                    event.date.getHours(),
                    event.date.getMinutes(),
                    event.date.getSeconds(),
                    event.date.getMilliseconds()
                );

                const occurrenceEndDate = new Date(occurrenceDate.getTime() + eventDuration);

                const occurrence = {
                    ...event,
                    date: occurrenceDate,
                    endDate: occurrenceEndDate,
                };

                occurrences.push(occurrence);
            }

            switch (event.recurrencePattern) {
                case 'daily':
                    currentDate.setDate(currentDate.getDate() + 1);
                    break;
                case 'weekly':
                    currentDate.setDate(currentDate.getDate() + 7);
                    break;
                case 'monthly':
                    currentDate.setMonth(currentDate.getMonth() + 1);
                    break;
                case 'yearly':
                    currentDate.setFullYear(currentDate.getFullYear() + 1);
                    break;
            }
        }

        return occurrences;
    }
}