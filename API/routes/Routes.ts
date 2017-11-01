import 'reflect-metadata';
import { getManager, getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';

// Repositories
import { Limits } from '../entities/Limits';
import { _Entity } from '../entities/Entity';
import { Relationship } from  '../entities/Relationship';
import { ParentEntity } from '../entities/ParentEntity';
import { ChildEntity } from '../entities/ChildEntity';

// Connection
import { ConnectionDB } from '../db-connection/Connection';

export class Routes {
    async getLimits(req: Request, res: Response, next: NextFunction) {
        const manager = getRepository(Limits);

        const rawData = await manager.query("SELECT * FROM limits");

        res.json({
            status: 200,
            data: rawData
        });
    }

    async getEntity(req: Request, res: Response, next: NextFunction) {
      const entityRepo = getRepository(_Entity);

      const entity = await entityRepo
      .createQueryBuilder("_entity")
      .leftJoinAndSelect("_entity.parent", "parent_entity")
      .leftJoinAndSelect("_entity.child", "child_entity")
      .getMany();

      // entity["child"].findOne({id: 2});

      res.json({
        status: 200,
        data: entity
      });
    }

    async getRelationship(req: Request, res: Response, next: NextFunction) {
      const manager = getRepository(Relationship);

      const rawData = await manager.query("SELECT * FROM relationship");

      res.json({
        status: 200,
        data: rawData
      });
    }


    async getChildEntity(req: Request, res: Response, next: NextFunction) {
        const childRepo = getRepository(ChildEntity);

          const child = await childRepo
          .createQueryBuilder("child_entity")
          .leftJoinAndSelect("child_entity.parent", "parent_entity")
          .getMany();

          res.json({
            status: 200,
            data: child
          })
    }

    async getParentEntity(req: Request, res: Response, next: NextFunction) {
      const parentRepo = getRepository(ParentEntity);

      const parent = await parentRepo
      .createQueryBuilder("parent_entity")
      .leftJoinAndSelect("parent_entity.children", "child_entity")
      .getMany();

      res.json({
        status: 200,
        data: parent
      })
    }
}
