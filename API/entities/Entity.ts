import 'reflect-metadata';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ParentEntity } from './ParentEntity';

@Entity()
export class _Entity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    entityId: number

    @Column({type: "varchar"})
    entityName: string;
}
