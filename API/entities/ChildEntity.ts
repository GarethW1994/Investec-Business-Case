import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { ParentEntity } from './ParentEntity';

@Entity()
export class ChildEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 0})
    entityId: number;

    @Column({type: "varchar", default: "text"})
    entityName: string;

    // @ManyToOne(type => ParentEntity, parent_entity => parent_entity.children, {
    //   cascadeInsert: true,
    //   cascadeUpdate: true,
    //   cascadeRemove: true
    // })
    // parent: ParentEntity;
}
