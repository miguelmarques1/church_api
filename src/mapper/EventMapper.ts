import { CreateEventInputDTO, EventOutputDTO, UpdateEventInputDTO } from "../dto/event.dto";
import { Event } from "../entity/Event";
import { Member } from "../entity/Member";
import { RecurrencePattern } from "../enum/RecurrencePattern";
import { fromValue } from "../helpers/fromValue";
import { MemberMapper } from "./MemberMapper";

export class EventMapper {
    public static inputToEntity(input: CreateEventInputDTO | UpdateEventInputDTO): Event {
        const event = new Event();
        
        event.title = input.title;
        event.description = input.description;
        event.date = input.date;
        event.location = input.location;
        event.imageUrl = input.image_url;
        event.recurring = input.recurring ?? false;
        event.recurrencePattern = input.recurrence_pattern;
        event.endDate = input.end_date;
        event.category = input.category;
        
        return event;
    }

    public static entityToOutput(event: Event): EventOutputDTO {
        return new EventOutputDTO(
            event.id,
            event.title,
            event.date,
            event.location,
            event.description,
            event.imageUrl,
            event.recurring,
            event.recurrencePattern ? fromValue(RecurrencePattern, event.recurrencePattern) : undefined,
            event.endDate,
            event.organizer ? MemberMapper.entityToOutput(event.organizer) : undefined,
            event.category,
            event.attendees.length,
        );
    }
}