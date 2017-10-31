import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { ParentEntity } from './ParentEntity';

@Entity()
export class ChildEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    entityId: number;

    @Column({type: "varchar"})
    entityName: string;

    @ManyToOne(type => ParentEntity, parent_entity => parent_entity.children, {
      cascadeInsert: true,
      cascadeUpdate: true,
      cascadeRemove: true
    })
    parent: ParentEntity;
}
