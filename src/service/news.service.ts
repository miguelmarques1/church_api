import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Member } from "../entity/Member";
import { NotFoundException } from "../exception/NotFoundException";
import { CreateNewsInputDTO, NewsOutputDTO } from "../dto/news.dto";
import { News } from "../entity/News";
import { NewsMapper } from "../mapper/NewsMapper";

export interface NewsServiceInterface {
    create(input: CreateNewsInputDTO): Promise<NewsOutputDTO>;
    list(): Promise<NewsOutputDTO[]>;
}

export class NewsService implements NewsServiceInterface {
    private newsRepository: Repository<News>;
    private memberRepository: Repository<Member>;

    public constructor() {
        this.newsRepository = AppDataSource.getRepository(News);
        this.memberRepository = AppDataSource.getRepository(Member);
    }

    async create(input: CreateNewsInputDTO): Promise<NewsOutputDTO> {
        const news = NewsMapper.inputToEntity(input);
        const author = await this.memberRepository.findOne({
            where: {
                id: input.authorId,
            }
        });
        if(!author) {
            throw new NotFoundException('Autor não encontrado');
        }

        news.author = author;

        const result = await this.newsRepository.save(news);

        return NewsMapper.entityToOutput(result);
    }

    async list(): Promise<NewsOutputDTO[]> {
        const devotionals = await this.newsRepository.find();

        return devotionals.map(NewsMapper.entityToOutput);
    }

}