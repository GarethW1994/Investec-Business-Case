import 'reflect-metadata';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { EntityRelationship } from './EntityRelationship';
import { EntityLimit } from './EntityLimit';

@Entity()
export class _Entity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true, default: 0})
    entityId: number

    @Column({type: "varchar"})
    entityName: string;

    @OneToMany(type => EntityRelationship, entity_relationship => entity_relationship.child, {
      cascadeInsert: true,
      cascadeUpdate: true
    })
    ChildRelationship: EntityRelationship[];

    @OneToMany(type => EntityRelationship, entity_relationship => entity_relationship.parent, {
      cascadeInsert: true,
      cascadeUpdate: true
    })
    ParentRelationship: EntityRelationship[];

    @OneToMany(type => EntityLimit, entity_limit => entity_limit.entity, {
      cascadeInsert: true,
      cascadeUpdate: true
    })
    limit: EntityLimit[];
}
