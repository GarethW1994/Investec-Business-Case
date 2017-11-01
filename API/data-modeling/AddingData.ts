// Repositories
import { Limits } from '../entities/Limits';
import { Relationship } from '../entities/Relationship';
import { _Entity } from '../entities/Entity';
import { ParentEntity } from '../entities/ParentEntity';
import { ChildEntity } from '../entities/ChildEntity';
import { getRepository, Connection } from 'typeorm';
import { FileParser } from '../csv-converter/FileParser';
import { Converter } from 'csvtojson';
import { ConnectionDB } from '../db-connection/Connection';


export class AddingData {
  LimitsConverter = () => {
    let file = "/home/bootcamp/projects/Investect-BC/investec-app/API/csv/limits.csv";
    const converter = new Converter();

    converter.fromFile(file, (err, rawData) => {
      const manager = getRepository(Limits);
      let LimitRepo: Limits = new Limits();

      manager.query("DELETE from limits");

      rawData.forEach((data) => {
        LimitRepo = data;

        LimitRepo.Entity_Id = data["Entity Id"];
        LimitRepo.RiskTaker_Group_Name = data["Risk Taker Group Name"];
        LimitRepo.Risk_Taker_Name = data["Risk Taker Name"];
        LimitRepo.Facility_Id = data["Facility Id"];
        LimitRepo.Facility_Type = data["Facility Type"];
        LimitRepo.Limit_Id = data["Limit Id"];
        LimitRepo.Limit_Type = data["Limit Type"];
        LimitRepo.Product = data["Product"];
        LimitRepo.Risk_Type = data["Risk Type"];
        LimitRepo.Currency = data["Currency"];
        LimitRepo.Exposure_Amount = data["Exposure Amount"];
        LimitRepo.Total_Current_Limit = data["Total Current Limit"];
        LimitRepo.Total_Approved_Limit = data["Total Approved Limit"];

        manager.save(LimitRepo)
          .catch((error) => {
            console.log(error);
          });
      });
    });
  }

  EntitiesConverter = () => {
    let file = "/home/bootcamp/projects/Investect-BC/investec-app/API/csv/entities.csv";
    const converter = new Converter();

    converter.fromFile(file, async (err, rawData) => {
      const manager = getRepository(_Entity);
      let _EntityRepo: _Entity = new _Entity();

      rawData.forEach(async (data) => {
        let entity = new _Entity();

          entity.entityId = data["Parent Entity Id"];
          entity.entityName = data["Parent Entity Name"];

        manager
          .save(entity)
          .then(entity => console.log('Parent Entities Saved!'))
          .catch((error) => { console.log(error) });
        });

        rawData.forEach(async (data) => {
          let entity = new _Entity();

            entity.entityId = data["Entity Id"];
            entity.entityName = data["Entity Name"];

          manager
            .save(entity)
            .then(entity => console.log('Child Entities Saved!'))
            .catch((error) => { console.log(error) });
          });
    });
  }

  ParentEntityConverter = () => {
    let file = "/home/bootcamp/projects/Investect-BC/investec-app/API/csv/entities.csv";
    const converter = new Converter();

    converter.fromFile(file, (err, rawData) => {
      let _entityRepository = getRepository(_Entity);
      let parentRepository = getRepository(ParentEntity);
      let childRepository = getRepository(ChildEntity);

      let currentParent : ParentEntity;

      parentRepository.query('DELETE FROM parent_entity');

      rawData.forEach(async (data) => {
        currentParent = data;

        let currentParentEntityId = data["Parent Entity Id"];
        let currentRowEntity = await _entityRepository.findOne({ entityId: currentParentEntityId });



        try {
          if (currentParent["Parent Entity Name"] !== currentRowEntity.entityName) {
            //create a new parent
            let newParent = new ParentEntity()

            newParent.parentId = data["Parent Entity Id"];
            newParent.Relationship_Type = data["Relationship Type"];
            newParent.entity = currentRowEntity;

            // save the parent
            currentParent = await parentRepository.save(newParent);
            console.log('Saved Parent Successfully.../')
          }
        } catch(e) {
          console.log("Could not find parent... moving on .../")
        }

        //get child
        let currentRowChildEntity = await _entityRepository.findOne({ entityId: data["Entity Id"] });

        if (currentParent["Entity Name"] !== currentRowChildEntity.entityName) {
            // create the child
            let childEntity = new ChildEntity()

            // set the values
            childEntity.childId = data["Entity Id"];
            childEntity.entity = currentRowChildEntity;
            childEntity.parent = currentParent;


            await parentRepository.save(currentParent);

            // save the child
            await childRepository.save(childEntity)
          }

      });
    })
  }
}
