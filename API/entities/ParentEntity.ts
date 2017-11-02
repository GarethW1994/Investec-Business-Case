import 'reflect-metadata';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { _Entity } from './Entity';
import { ChildEntity } from  './ChildEntity';

@Entity()
export class ParentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    parentId: number;

    @ManyToOne(type => _Entity, _entity => _entity.parent, {
      cascadeInsert: true
    })
    entity: _Entity;

    @OneToMany(type => ChildEntity, child_entity => child_entity.parent, {
      cascadeInsert: true,
      cascadeUpdate: true
    })
    children: ChildEntity[];
}
