import 'reflect-metadata';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";

import { _Entity } from './Entity';

@Entity()
export class EntityRelationship {
  @PrimaryGeneratedColumn()
  relationshipID: number;

  @Column()
  relationshipType: string;


  @ManyToOne(type => _Entity, _entity => _entity.ParentRelationship, {
    cascadeInsert: true,
    cascadeUpdate: true,
    cascadeRemove: true
  })
  parent: _Entity;

  @ManyToOne(type => _Entity, _entity => _entity.ChildRelationship, {
    cascadeInsert: true,
    cascadeUpdate: true,
    cascadeRemove: true
  })
  child: _Entity;
}
