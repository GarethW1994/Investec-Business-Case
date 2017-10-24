import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { ParentEntity } from './ParentEntity';

@Entity()
export class ChildEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    entityId: number;

    @Column('text')
    entityName: string;

    @ManyToOne(type => ParentEntity, parent_entity => parent_entity.children)
    parent: ParentEntity;
}
