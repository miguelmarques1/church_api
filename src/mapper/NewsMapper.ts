import { CreateNewsInputDTO, NewsOutputDTO } from "../dto/news.dto";
import { News } from "../entity/News";
import { MemberMapper } from "./MemberMapper";

export class NewsMapper {
    static inputToEntity(input: CreateNewsInputDTO): News {
        const news = new News();
        news.title = input.title;
        news.content = input.content;
        news.publicationDate = input.publication_date;
        news.featured = input.featured ?? false;
        news.featuredImage = input.featured_image;
        return news;
    }

    static entityToOutput(entity: News): NewsOutputDTO {
        return new NewsOutputDTO(
            entity.id,
            entity.title,
            entity.content,
            entity.publicationDate,
            MemberMapper.entityToOutput(entity.author),
            entity.featured,
            entity.featuredImage
        );
    }
}