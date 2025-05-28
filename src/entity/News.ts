import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Member } from "./Member";

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    content: string;

    @Column({ type: 'datetime' })
    publicationDate: Date;

    @ManyToOne(() => Member, (member) => member.news)
    @JoinColumn({ name: 'author_id' })
    author: Member;

    @Column({ default: false })
    featured: boolean;

    @Column({ name: 'featured_image', nullable: true })
    featuredImage: string;
}