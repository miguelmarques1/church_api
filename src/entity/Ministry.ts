import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Member } from "./Member";

@Entity()
export class Ministry {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Member, member => member.ministries)
    @JoinTable({
        name: "member_ministry",
        joinColumn: {
            name: "ministry_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "member_id",
            referencedColumnName: "id"
        }
    })
    members: Member[];

}
