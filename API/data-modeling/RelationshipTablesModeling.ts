import { getRepository } from 'typeorm';
import { _Entity } from '../entities/Entity';
import { ParentEntity } from '../entities/ParentEntity';

export class RelationshipTableModeling {
  async PopulateParentEntity() {
  //   let entityRepo = getRepository(_Entity);
  //
  //   let ParentEntityManger = getRepository(ParentEntity);
  //   let parentEntityRepo: ParentEntity = new ParentEntity();
  //
  //   let entityData = await entityRepo.find({});
  //
  //
  //   entityData.forEach((data) => {
  //
  //       parentEntityRepo.entityId = data.entityId;
  //       parentEntityRepo.entityName = data.entityName;
  //
  //       ParentEntityManger.save(parentEntityRepo);
  //   });
  //
  //   let parent = await ParentEntityManger.find({});
  //
  //   console.log(parent);
  }
}
