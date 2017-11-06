import 'reflect-metadata';
import {Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {EntityLimit} from './EntityLimit';


@Entity()
export class Facility {
  @PrimaryColumn({ type: "int", length: 8, default: 0 })
  facilityID: number;

  @Column({ type: "char", length: 1, default: ""})
  facilityType: string;

  @OneToMany(type => EntityLimit, entity_limit => entity_limit.facilityLimit, {
    cascadeInsert: true,
    cascadeUpdate: true
  })
  entityLimit: EntityLimit[];
}
