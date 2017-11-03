import 'reflect-metadata';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";

import { _Entity } from './Entity';

@Entity()
export class Relationship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  Relationship_Type: string;


  // parent : Entity;


  // children : Entity[];


  // entity

  @ManyToOne(type => _Entity, _entity => _entity.relationship, {
    cascadeInsert: true,
    cascadeUpdate: true,
    cascadeRemove: true
  })
  entity: _Entity;
}
