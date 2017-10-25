import 'reflect-metadata';
import { createConnection, Connection, getRepository } from "typeorm";

// Repositories
import { Relationship } from '../entities/Relationship';
import { _Entity } from '../entities/Entity';
import { ParentEntity } from '../entities/ParentEntity';
import { ChildEntity } from '../entities/ChildEntity';

export class ConnectionDB {
    private conn;

    async connectToDb() {
        const connection = await createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "$G_Code1!",
            database: "investec_data",
            synchronize: true,
            entities: [ Relationship, _Entity, ParentEntity, ChildEntity ]
        })
      }
}
