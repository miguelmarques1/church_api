import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Member } from "../entity/Member";
import { NotFoundException } from "../exception/NotFoundException";
import { CreateNewsInputDTO, NewsOutputDTO } from "../dto/news.dto";
import { News } from "../entity/News";
import { NewsMapper } from "../mapper/NewsMapper";

export interface NewsServiceInterface {
    create(input: CreateNewsInputDTO): Promise<NewsOutputDTO>;
    update(id: number, input: CreateNewsInputDTO): Promise<NewsOutputDTO>;
    list(): Promise<NewsOutputDTO[]>;
    find(id: number): Promise<NewsOutputDTO>;
}

export class NewsService implements NewsServiceInterface {
    private newsRepository: Repository<News>;
    private memberRepository: Repository<Member>;

    public constructor() {
        this.newsRepository = AppDataSource.getRepository(News);
        this.memberRepository = AppDataSource.getRepository(Member);
    }

    async find(id: number): Promise<NewsOutputDTO> {
        const news = await this.newsRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                author: {
                    role: true,
                    family: true,
                },
            },
        });
        if (!news) {
            throw new NotFoundException('Notícia não encontrada');
        }

        return NewsMapper.entityToOutput(news);
    }

    async update(id: number, input: CreateNewsInputDTO): Promise<NewsOutputDTO> {
        const news = await this.newsRepository.findOne({
            where: {
                id: id,
            },
        });
        if (!news) {
            throw new NotFoundException('Notícia não encontrada');
        }

        news.title = input.title;
        news.content = input.content;
        news.featuredImage = input.featured_image;
        news.featured = input.featured;
        news.publicationDate = input.publication_date;
        await this.syncRelations(input, news);

        const result = await this.newsRepository.save(news);
        return NewsMapper.entityToOutput(result);
    }

    async create(input: CreateNewsInputDTO): Promise<NewsOutputDTO> {
        const news = NewsMapper.inputToEntity(input);
        await this.syncRelations(input, news);

        const result = await this.newsRepository.save(news);

        return this.find(result.id);
    }

    async list(): Promise<NewsOutputDTO[]> {
        const devotionals = await this.newsRepository.find({
            relations: {
                author: {
                    role: true,
                    family: true,
                },
            },
        });

        return devotionals.map(NewsMapper.entityToOutput);
    }


    private async syncRelations(input: CreateNewsInputDTO, news: News): Promise<void> {
        const author = await this.memberRepository.findOne({
            where: {
                id: input.author_id,
            }
        });

        if (!author) {
            throw new NotFoundException('Autor não encontrado');
        }

        news.author = author;
    }
}