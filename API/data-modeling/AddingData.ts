// Repositories
import { Limits } from '../entities/Limits';
import { Relationship } from '../entities/Relationship';
import { _Entity } from '../entities/Entity';
import { ParentEntity } from '../entities/ParentEntity';
import { ChildEntity } from '../entities/ChildEntity';
import { getRepository, Connection } from 'typeorm';
import { FileParser } from '../csv-converter/FileParser';
import { Converter } from 'csvtojson';
import { ConnectionDB } from '../db-connection/Connection'
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

      let parentMap = [];
      let childMap = {};

      rawData.forEach(async (data) => {
        let entity = new _Entity();
        let currentEntityID = data["Parent Entity Id"];


          entity.entityId = data["Parent Entity Id"];
          entity.entityName = data["Parent Entity Name"];
          entity.entityId = data["Entity Id"];
          entity.entityName = data["Entity Name"]

          manager
          .save(entity)
          .then(entity => console.log('Entity Table Saved!'))
          .catch((error) => { console.log(error) });
        });
    });
  }

  RelationshipsEntityConverter = () => {
    let file = "/home/bootcamp/projects/Investect-BC/investec-app/API/csv/entities.csv";
    const converter = new Converter();

    converter.fromFile(file, (err, rawData) => {
      const manager = getRepository(Relationship);

      let RelationshipRepo: Relationship = new Relationship();

      manager.query("DELETE from relationship");

      const relationshipMap = {};

      rawData.forEach(data => {
        RelationshipRepo = data;

        RelationshipRepo.Relationship_Type = data["Relationship Type"];

        manager.save(RelationshipRepo)
          .catch((error) => {
            console.log("duplicate catched");
          });
      });
    });
  }

  ParentEntityConverter = () => {
    let file = "/home/bootcamp/projects/Investect-BC/investec-app/API/csv/entities.csv";
    const converter = new Converter();

    //let currentParentEntity = "";

    converter.fromFile(file, (err, rawData) => {
      let _entityRepository = getRepository(_Entity);
      let parentRepository = getRepository(ParentEntity);
      let childRepository = getRepository(ChildEntity);

      let currentParent : ParentEntity;

      rawData.forEach(async (data) => {
        currentParent = data;

        let currentParentEntityId = data["Parent Entity Id"];
        let currentRowEntity = await _entityRepository.findOne({ entityId: currentParentEntityId });

        if (currentParent[0].entityName !== currentRowEntity.entityName) {

          //create a new parent
          let newParent = new ParentEntity()

          newParent.Relationship_Type = data["Parent Entity Name"];
          newParent.entity = currentRowEntity;

          // save the parent
          currentParent = await parentRepository.save(newParent);
        }


        let ParentEntityId = await _entityRepository.findOne({ entityId:  data["Parent Entity Id"]})

        if (ParentEntityId) {
            // create the child
            let childEntity = new ChildEntity()

            // set the values
            childEntity.entityId = data["Entity Id"];
            childEntity.entityName = data["Entity Name"];

            currentParent.children = [childEntity];

            await parentRepository.save(currentParent);

            // save the child
            await childRepository.save(childEntity)
          }

      });
    })
  }


  ChildEntityConverter = (connection) => {
    let file = "/home/bootcamp/projects/Investect-BC/investec-app/API/csv/entities.csv";

    const converter = new Converter();
    const childRepo = getRepository(ChildEntity);
    const parentRepo = getRepository(ParentEntity);
    const parentMap = {};
    const childMap = {};
  //
  //   converter.fromFile(file, async (err, rawData) => {
  //
  //
  //     let child = new ChildEntity();
  //
  //     child.entityId = rawData[0]["Entity Id"];
  //     child.entityName = rawData[0]["Entity Name"];
  //
  //   await childRepo
  //     .save(child)
  //     .then(child => console.log("Child Has Been Saved"))
  //     .catch(error => console.log("Cannot save. Error: ", error));
  //
  //     let child2 = new ChildEntity();
  //
  //     child2.entityId = rawData[1]["Entity Id"];
  //     child2.entityName = rawData[1]["Entity Name"];
  //
  //   await childRepo
  //       .save(child2)
  //       .then(child => console.log("Child Has Been Saved"))
  //       .catch(error => console.log("Cannot save. Error: ", error));
  //
  //
  //     let parent = new ParentEntity();
  //
  //     parent.entityId = rawData[0]["Parent Entity Id"];
  //     parent.entityName = rawData[0]["Parent Entity Name"];
  //     parent.children = [child, child2];
  //
  //     parentRepo
  //       .save(parent)
  //       .then(parent => console.log("Parent Has Been Saved"))
  //       .catch(error => console.log("Cannot save. Error: ", error));
  //
  //   });
  }

}
