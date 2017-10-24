import 'reflect-metadata';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

import { ChildEntity } from './ChildEntity';

@Entity()
export class ParentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    entityId: number;

    @Column("text")
    entityName: string;

    @OneToMany(type => ChildEntity, child_entity => child_entity.parent)
    children: ChildEntity[];
}
