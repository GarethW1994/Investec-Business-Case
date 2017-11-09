import 'reflect-metadata';
import {Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {EntityLimit} from './EntityLimit';


@Entity()
export class Limits {
  @PrimaryColumn({ type: "int" })
  limitID: number;

  @Column({ type: "varchar", default: "" })
  limitType: string;

  @OneToMany(type => EntityLimit, entity_limit => entity_limit.entityLimit, {
    cascadeInsert: true,
    cascadeUpdate: true
  })
  entityLimit: EntityLimit[];
}
