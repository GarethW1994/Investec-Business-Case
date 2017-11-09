import 'reflect-metadata';
import { getManager, getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';

// Repositories
import { _Entity } from '../entities/Entity';
import { EntityRelationship } from '../entities/EntityRelationship';

// Connection
import { ConnectionDB } from '../db-connection/Connection';

export class Routes {
    async getLimits(req: Request, res: Response, next: NextFunction) {
        // const manager = getRepository(Limits);
        //
        // const rawData = await manager.query("SELECT * FROM limits");
        //
        // res.json({
        //     status: 200,
        //     data: rawData
        // });
    }

    async getEntity(req: Request, res: Response, next: NextFunction) {

      // const rawData = await entityRelationshipRepo.query("SELECT * FROM entity_relationship");

    }

    async getRelationship(req: Request, res: Response, next: NextFunction) {
      const entityRelationshipRepo = getRepository(EntityRelationship);

      const entity  = await entityRelationshipRepo
      .find({
        join: {
          alias: "entity_relationship",
          leftJoinAndSelect: {
            parent: "entity_relationship.parent",
            child: "entity_relationship.child"
          }
        }
      }).then(loadedEntity => {
        console.log("loadedEntity: ", loadedEntity);
        res.json({
          status: 200,
          data: loadedEntity
        })
      });

    }


    async getChildEntity(req: Request, res: Response, next: NextFunction) {
        // const childRepo = getRepository(ChildEntity);
        //
        //   const child = await childRepo
        //   .createQueryBuilder("child_entity")
        //   .leftJoinAndSelect("child_entity.parent", "parent_entity")
        //   .getMany();
        //
        //   res.json({
        //     status: 200,
        //     data: child
        //   })
    }

    async getParentEntity(req: Request, res: Response, next: NextFunction) {
      // const parentRepo = getRepository(ParentEntity);
      //
      // const parent = await parentRepo
      // .createQueryBuilder("parent_entity")
      // .leftJoinAndSelect("parent_entity.children", "child_entity")
      // .getMany();
      //
      // res.json({
      //   status: 200,
      //   data: parent
      // })
    }
}
