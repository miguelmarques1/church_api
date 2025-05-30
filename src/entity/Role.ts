import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Member } from "./Member";
import { RoleCredentials } from "../enum/RoleCredentials";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: RoleCredentials,
        default: RoleCredentials.MEMBER,
    })
    credentials: RoleCredentials;

    @OneToMany(() => Member, member => member.role)
    members: Member[];
}