// Repositories
import { Limits } from '../entities/Limits';
import { Relationship } from '../entities/Relationship';
import { _Entity } from '../entities/Entity';
import { ParentEntity } from '../entities/ParentEntity';
import { ChildEntity } from '../entities/ChildEntity';
import {getRepository, Connection } from 'typeorm';
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
         let _ChildEntityRepo: _Entity = new _Entity();

         manager.query("DELETE from _entity");

         rawData.forEach(async (data) => {
             _EntityRepo = data;

             _EntityRepo.entityId = data["Parent Entity Id"];
             _EntityRepo.entityName = data["Parent Entity Name"];
             _EntityRepo.entityId = data["Entity Id"];
             _EntityRepo.entityName = data["Entity Name"];

             manager.save(_EntityRepo)
             .catch((error) => {
                console.log("duplicate catched");
             });
           })
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

   converter.fromFile(file, (err, rawData) => {
      const manager = getRepository(ParentEntity);

      let ParentEntityRelationship: ParentEntity = new ParentEntity();

      let pEntityMap = {};

      // rawData.forEach(data => {
      //   ParentEntityRelationship = data;
      //
      //   if (pEntityMap[data["Parent Entity Id"]] === undefined) {
      //     ParentEntityRelationship.entityId = data["Parent Entity Id"];
      //     ParentEntityRelationship.entityName = data["Parent Entity Name"];
      //     pEntityMap[data["Parent Entity Id"]] = 0;
      //   }

      ParentEntityRelationship.entityId = rawData[0]["Parent Entity Id"];
      ParentEntityRelationship.entityName = rawData[0]["Parent Entity Name"];
        manager.save(ParentEntityRelationship)
        .catch((error) => {
            console.log("duplicate catched");
        // });
      });
   });
 }

 ChildEntityConverter = (connection) => {
   let file = "/home/bootcamp/projects/Investect-BC/investec-app/API/csv/entities.csv";

   const converter = new Converter();
   const parentRepo = getRepository(ParentEntity);
   const childRepo = getRepository(ChildEntity);

   converter.fromFile(file, async (err, rawData) => {
      
      const parent = new ParentEntity();

      const child1 = new ChildEntity();

      child1.entityId = 168593;
      child1.entityName = "AAA BANK CHILD";
      child1.parent = parent;

      await connection.manager.save(parent , child1);
  });
 }
}
