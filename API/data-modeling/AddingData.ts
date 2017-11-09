// Repositories
import { EntityLimit } from '../entities/EntityLimit';
import { EntityRelationship } from '../entities/EntityRelationship';
import { _Entity } from '../entities/Entity';
import { Facility } from '../entities/Facility';
import { Limits } from '../entities/Limits';

import { getRepository, Connection } from 'typeorm';
import { Converter } from 'csvtojson';
import { ConnectionDB } from '../db-connection/Connection';

export class AddingData {
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

  EntityRelationshipConverter = () => {
    let file = "/home/bootcamp/projects/Investect-BC/investec-app/API/csv/entities.csv";
    const converter = new Converter();

    converter.fromFile(file, (err, rawData) => {
      const entityRelationshipRepo = getRepository(EntityRelationship);
      const _entityRepository = getRepository(_Entity);

      let currentEntity: EntityRelationship;

      entityRelationshipRepo.query("DELETE FROM entity_relationship");

      rawData.forEach(async (data) => {
        currentEntity = data;

        let currentParentEntityID = data["Parent Entity Id"];

        let currentRowEntity = await _entityRepository.findOne({ entityId: currentParentEntityID });
        let currentRowRelationship = await entityRelationshipRepo.findOne({ relationshipType: data["Relationship Type"] })

        let currentChildEntityID = data["Entity Id"];
        let currentChildEntityRow = await _entityRepository.findOne({ entityId: currentChildEntityID });

        try {
          if (currentEntity["Parent Entity Name"] !== currentRowEntity.entityName) {

                      // create a new parent
                      let newRelationship = new EntityRelationship()
                      newRelationship.relationshipType = data["Relationship Type"];
                      newRelationship.parent = currentRowEntity;
                      newRelationship.child = currentChildEntityRow;

                      // save the parent
                      currentEntity = await entityRelationshipRepo.save(newRelationship);
                      console.log('Saved Relationship Successfully.../');
          }
        }
         catch(e) {
          console.log('Could not find parent... moving on.../');
        }
      });
    })
  }

 FacilityConverter = () => {
   let file = "/home/bootcamp/projects/Investect-BC/investec-app/API/csv/limits.csv";

   const converter = new Converter();

   converter.fromFile(file, (err, rawData) => {
      let facilityRepo = getRepository(Facility);

      let currentFacility: Facility;

      facilityRepo.query("DELETE FROM facility");

      rawData.forEach(async (data) => {
          currentFacility = data;

          let currentFacilityId = data["Facility Id"];

          let currentFacilityRow = await facilityRepo.findOne({ facilityID: currentFacilityId });

          try {
            if (!currentFacilityRow) {
              // let check = currentFacilityId === currentFacilityRow.facilityID ? true : false || undefined;
              // console.log(check);
              let newFacility = new Facility();
              //
              newFacility.facilityID = data["Facility Id"];
              newFacility.facilityType = data["Facility Type"];

              //save new facility
              currentFacility = await facilityRepo.save(newFacility);
              console.log("saved facility successfully");
            }
          } catch(e) {
            console.log('Facility Already Exists In Database');
          }
      });
   });
 }

 LimitConverter = () => {
   let file = "/home/bootcamp/projects/Investect-BC/investec-app/API/csv/limits.csv";

   const converter = new Converter();

   converter.fromFile(file, (err, rawData) => {
     const limitRepo = getRepository(Limits);

     let currentLimit: Limits;

     limitRepo.query("DELETE FROM limits");

     rawData.forEach(async (data) => {
            currentLimit = data;

            let currentLimitId = data["Limit Id"];

            let currentLimitRow = await limitRepo.findOne({ limitID: currentLimitId });

            try {
              if (!currentLimitRow) {
                let newLimit = new Limits();

                newLimit.limitID = data["Limit Id"];
                newLimit.limitType = data["Limit Type"];

                //save new limit
                currentLimit = await limitRepo.save(newLimit);
                console.log("saved limit successfully");
              }
            } catch(e) {
              console.log('Limit Already Exists In Database');
            }
     });
   });
 }

   LimitsConverter = () => {
        let file = "/home/bootcamp/projects/Investect-BC/investec-app/API/csv/limits.csv";
        let file2 = "/home/bootcamp/projects/Investect-BC/investec-app/API/csv/entities.csv";

      const converter = new Converter();

      converter.fromFile(file, (err, rawData) => {
        const entityLimitRepo = getRepository(EntityLimit);
        const facilityRepo = getRepository(Facility);
        const _entityRepository = getRepository(_Entity);
        const limitRepo  = getRepository(Limits);

        let currentEntity: EntityLimit;

        entityLimitRepo.query("DELETE FROM entity_limit");

        rawData.forEach(async (data) => {
          currentEntity = data;

          let currentEntityID = data["Entity Id"];

          let currentRowEntity = await _entityRepository.findOne({ entityId: currentEntityID });
          let currentFacilityLimit = await facilityRepo.findOne({ facilityID: data["Facility Id"] });
          let currentLimit = await limitRepo.findOne({ limitID: data["Limit Id"] });

          try {
            if (currentRowEntity) {
                        // create a new limit
                        let newEntityLimit = new EntityLimit()
                        newEntityLimit.RiskTaker_Group_Name = data["Risk Taker Group Name"];
                        newEntityLimit.Risk_Taker_Name = data["Risk Taker Name"];
                        newEntityLimit.Product = data["Product"];
                        newEntityLimit.Risk_Type = data["Risk Type"];
                        newEntityLimit.Currency = data["Currency"];
                        newEntityLimit.Exposure_Amount = data["Exposure Amount"];
                        newEntityLimit.Total_Current_Limit = data["Total Current Limit"];
                        newEntityLimit.Total_Approved_Limit = data["Total Approved Limit"];
                        newEntityLimit.entity = currentRowEntity;
                        newEntityLimit.facilityLimit = currentFacilityLimit;
                        newEntityLimit.entityLimit = currentLimit;
                        // save the parent
                        currentEntity = await entityLimitRepo.save(newEntityLimit);
                        console.log('Saved Entity Limit Successfully.../');
            }
          }
           catch(e) {
            console.log(e);
          }
        });
      });
    }
}
