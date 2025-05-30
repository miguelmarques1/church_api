import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, OneToMany } from "typeorm"
import { Gender } from "../enum/Gender"
import { Family } from "./Family";
import { Ministry } from "./Ministry";
import { Devotional } from "./Devotional";
import { News } from "./News";
import { Role } from "./Role";

@Entity()
export class Member {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    birthdate?: Date;

    @Column({
        type: "enum",
        enum: Gender,
        default: Gender.FEMALE
    })
    gender: Gender;

    @ManyToOne(() => Role, role => role.members, { eager: true })
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @Column({
        unique: true,
    })
    phone: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    imageUrl?: string;

    @Column()
    password: string;

    @ManyToOne(() => Family, family => family.members)
    @JoinColumn({name: 'family_id'})
    family: Family
    
    @ManyToMany(() => Ministry, ministry => ministry.members)
    ministries?: Ministry[]; 

    @OneToMany(() => Devotional, (devotional) => devotional.author)
    devotionals: Devotional[];

    @OneToMany(() => News, (news) => news.author)
    news: News[];
}
