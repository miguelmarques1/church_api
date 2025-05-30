import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Member } from "./Member";
import { Role } from "./Role"; // Assuming you have a Role entity

@Entity()
export class Devotional {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    content: string;

    @Column('text')
    verseText: string;

    @Column()
    reference: string;

    @Column({ type: 'date' })
    publicationDate: Date;

    @Column({ nullable: true })
    imageUrl?: string;

    @ManyToOne(() => Member, (member) => member.devotionals)
    @JoinColumn({ name: 'author_id' })
    author: Member;

    @ManyToOne(() => Role, { nullable: true }) 
    @JoinColumn({ name: 'target_role_id' })
    targetRole?: Role;
}