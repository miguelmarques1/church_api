import { CreateDevotionalInputDTO, DevotionalOutputDTO } from "../dto/devotional.dto";
import { Devotional } from "../entity/Devotional";
import { MemberMapper } from "./MemberMapper";

export class DevotionalMapper {
    static inputToEntity(input: CreateDevotionalInputDTO): Devotional {
        const devotional = new Devotional();
        devotional.title = input.title;
        devotional.text = input.content;
        devotional.publicationDate = input.publicationDate;
        devotional.targetAudience = input.targetAudience;
        devotional.referenceVerse = input.referenceVerse;

        return devotional;
    }

    static entityToOutput(entity: Devotional): DevotionalOutputDTO {
        return new DevotionalOutputDTO(
            entity.id,
            entity.title,
            entity.text,
            entity.publicationDate,
            MemberMapper.entityToOutput(entity.author),
            entity.targetAudience as 'all' | 'leaders',
            entity.referenceVerse
        );
    }
}