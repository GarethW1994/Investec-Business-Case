import 'reflect-metadata';
import {Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { _Entity } from  './Entity';
import { Facility } from './Facility';

@Entity()
export class EntityLimit {
    @PrimaryGeneratedColumn()
    limitID: number

    @Column({ type: "varchar", length: 100})
    RiskTaker_Group_Name: string
    //
    @Column({ type: "varchar", length: 100, default: "" })
    Risk_Taker_Name: string

    // @Column({ type: "int", length: 50, default: 0 })
    // Limit_Id: number
    //
    // @Column({ type: "varchar", default: "" })
    // Limit_Type: string

    @Column({ type: "varchar", length: 100, default: "" })
    Product: string

    @Column({ type: "varchar", length: 50, default: "" })
    Risk_Type: string

    @Column({ type: "varchar", length: 5, default: "" })
    Currency: string

    @Column({ type: "float" })
    Exposure_Amount: number

    @Column({ type: "decimal" })
    Total_Current_Limit: number

    @Column({ type: "decimal" })
    Total_Approved_Limit: number


    @ManyToOne(type => _Entity, _entity => _entity.limit, {
      cascadeInsert: true,
      cascadeUpdate: true,
      cascadeRemove: true
    })
    entity: _Entity;

    @ManyToOne(type => Facility, facility => facility.entityLimit, {
      cascadeInsert: true,
      cascadeUpdate: true,
      cascadeRemove: true
    })
    facilityLimit: Facility;
}
