import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Member } from "./Member"

@Entity()
export class Family {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    phone: string

    @Column()
    address: string

    @Column()
    receiveSupport: boolean

    @OneToMany(() => Member, member => member.family)
    members: Member[];
}
