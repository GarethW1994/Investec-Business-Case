import 'reflect-metadata';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";

@Entity()
export class Relationship {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    Relationship_Type: string;


    // parent : Entity;


    // children : Entity[];


}
