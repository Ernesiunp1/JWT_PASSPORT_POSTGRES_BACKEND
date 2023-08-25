import { IsString } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string 

    @Column("text")
    name: string;

    @Column("text", {default: ""})
    surname: string;

    @Column("text", {unique: true})    
    email: string;

    @Column()
    password: string;

    @Column("int")
    telefono: number;

    @Column("bool", {default: true})
    isActive: boolean;

    @Column({default: true})
    subscribe: boolean


    @BeforeInsert()
    chequeoDeCampo(){
        this.email.toLowerCase().trim()
    }


    @BeforeUpdate()
    chequeoAntesDeUpdate(){
        this.chequeoDeCampo()
    }


}
