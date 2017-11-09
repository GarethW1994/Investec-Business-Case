import 'reflect-metadata';
import { getManager, getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';

// Repositories
import { _Entity } from '../entities/Entity';
import { EntityRelationship } from '../entities/EntityRelationship';
import { EntityLimit } from '../entities/EntityLimit';

// Connection
import { ConnectionDB } from '../db-connection/Connection';

export class Routes {
    async getLimits(req: Request, res: Response, next: NextFunction) {
        const EntityLimitRepo = getRepository(EntityLimit);

        const entityLimit = await EntityLimitRepo
        .find({
          join: {
            alias: "entity_limit",
            leftJoinAndSelect: {
              entity: "entity_limit.entity"
            }
          }
        }).then(limitLoaded => {
          console.log("Limit Loaded", limitLoaded);

          res.json({
            status: 200,
            data: limitLoaded
          })
        })
    }

    async getEntity(req: Request, res: Response, next: NextFunction) {
      const entityRepo = getRepository(_Entity);

      const entity = await entityRepo
      .find({
        join: {
          alias: "_entity",
          leftJoinAndSelect : {
            parent: "_entity.ParentRelationship",
            child: "_entity.ChildRelationship",
            limit: "_entity.limit"
          }
        }
      }).then(loadedEntity => {
        res.json({
          status: 200,
          data: loadedEntity
        })
      })
    }

    async getRelationship(req: Request, res: Response, next: NextFunction) {
      const entityRelationshipRepo = getRepository(EntityRelationship);

      const entityRelationship  = await entityRelationshipRepo
      .find({
        join: {
          alias: "entity_relationship",
          leftJoinAndSelect: {
            parent: "entity_relationship.parent",
            child: "entity_relationship.child"
          }
        }
      }).then(loadedEntityRelationship => {
        res.json({
          status: 200,
          data: loadedEntityRelationship
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
