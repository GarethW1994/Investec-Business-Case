import 'reflect-metadata';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { _Entity } from './Entity';

@Entity()
export class ParentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0, unique: true})
    parentId: number;

    @Column({type: "varchar", default: "parent"})
    parentName: string;

    @ManyToOne(type => _Entity, _entity => _entity.parent, {
      cascadeInsert: true
    })
    entity: _Entity;
}
