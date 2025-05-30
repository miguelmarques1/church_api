import { CreateDevotionalInputDTO, DevotionalOutputDTO } from "../dto/devotional.dto";
import { Devotional } from "../entity/Devotional";
import { MemberMapper } from "./MemberMapper";
import { RoleMapper } from "./RoleMapper";

export class DevotionalMapper {
    static inputToEntity(input: CreateDevotionalInputDTO): Devotional {
        const devotional = new Devotional();
        devotional.title = input.title;
        devotional.verseText = input.verse_text;
        devotional.content = input.content;
        devotional.reference = input.reference;
        devotional.publicationDate = new Date();
        devotional.imageUrl = input.image_url;

        return devotional;
    }

    static entityToOutput(entity: Devotional): DevotionalOutputDTO {
        return new DevotionalOutputDTO(
            entity.id,
            entity.title,
            entity.verseText,
            entity.content,
            entity.reference,
            entity.publicationDate,
            entity.imageUrl,
            entity.author ? MemberMapper.entityToOutput(entity.author) : undefined,
            entity.targetRole ? RoleMapper.entityToOutput(entity.targetRole) : undefined,
        );
    }
}