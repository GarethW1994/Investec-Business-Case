import 'reflect-metadata';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ParentEntity } from './ParentEntity';

@Entity()
export class _Entity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true, default: 0})
    entityId: number

    @Column({type: "varchar"})
    entityName: string;

    @OneToMany(type => ParentEntity, parent_entity => parent_entity.entity, {
      cascadeInsert: true,
      cascadeUpdate: true
    })
    parent: ParentEntity[];
}
