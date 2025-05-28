import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Member } from "./Member";

@Entity()
export class Devotional {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    text: string;

    @Column({ type: 'date' })
    publicationDate: Date;

    @ManyToOne(() => Member, (member) => member.devotionals)
    @JoinColumn({ name: 'author_id' })
    author: Member;

    @Column({
        type: 'enum',
        enum: ['all', 'leaders'],
        default: 'all'
    })
    targetAudience: string;

    @Column()
    referenceVerse: string;
}