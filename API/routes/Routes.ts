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
        const id : number = Number(req.params.id);

        const entityLimit = await EntityLimitRepo
        .find({
          join: {
            alias: "entity_limit",
            leftJoinAndSelect: {
              entity: "entity_limit.entity"
            }
          }
        }).then(limitLoaded => {
          let arr = [];

          for (var i in limitLoaded) {
            if (limitLoaded[i].entity.entityId === id)
            arr.push(limitLoaded[i]);
          }

          res.json({
            status: 200,
            data: arr
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
      const entityRelationshipRepo = getRepository(EntityRelationship);
      let parentId : number = Number(req.params.id);

      const entityRelationship  = await entityRelationshipRepo
      .find({
        join: {
          alias: "entity_relationship",
          leftJoinAndSelect: {
            parent: "entity_relationship.parent",
            child: "entity_relationship.child"
          }
        }
      }).then(async loadedEntityRelationship => {
        let arr = [];

        for (var i in loadedEntityRelationship) {
          if (loadedEntityRelationship[i].parent.entityId === parentId)
          arr.push(loadedEntityRelationship[i].child);
        }

        res.json({
          status: 200,
          data: arr
        })
      });
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
