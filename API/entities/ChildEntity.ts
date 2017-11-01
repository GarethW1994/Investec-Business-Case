import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { ParentEntity } from './ParentEntity';
import { _Entity } from './Entity';

@Entity()
export class ChildEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    childId: number;

    @ManyToOne(type => ParentEntity, parent_entity => parent_entity.children, {
      cascadeInsert: true,
      cascadeUpdate: true,
      cascadeRemove: true
    })
    parent: ParentEntity;

    @ManyToOne(type => _Entity, _entity => _entity.child, {
      cascadeInsert: true,
      cascadeUpdate: true,
      cascadeRemove: true
    })
    entity: _Entity;
}
