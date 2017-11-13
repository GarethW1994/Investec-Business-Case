import { Component, OnInit } from '@angular/core';
import { EntitiesService } from './entities.services';

@Component({
    selector: "app-entity",
    templateUrl: "./entity.component.html"
})
export class EntityComponent implements OnInit {
    entitiesData;
    childEntities;
    limitData;
    status: string = "Init";
    parentEntities = [];
    currentActive: number = 0;
    currentViewingLimt = "";

    constructor(private entities: EntitiesService) {
        setTimeout(()=>{
            this.ngOnInit();
        }, 500);
    }

    ngOnInit() {
      this.entitiesData = this.entities.getEntities();
        this.findParent();
    }

    async findLimit(entity) {
    this.status = "Getting Limit";

    setTimeout(async ()=>{
      await this.entities.findLimit(entity.entityId);
      this.limitData = this.entities.getLimit();

      this.checkStatus()
    }, 1000)
  }

    findParent() {
      for (var i in this.entitiesData) {
        // console.log(this.entitiesData[i].ParentRelationship.length)
        if (this.entitiesData[i].ParentRelationship.length > 0) {
          this.parentEntities.push(this.entitiesData[i]);
        }
      }
    }

  async findChild(currentParent) {
    let status = await this.entities.findChildEntity(currentParent.entityId);

    if (status.closed !== true) {
      this.childEntities = await this.entities.getChildEntity()
    };
 }

  currentActiveTab(entity) {
    this.currentActive = entity.id;
    this.currentViewingLimt = entity.entityName;
  }

  checkStatus() {
    if (this.limitData.length > 0) {
      this.status = "Got Limit";
    } else if(this.limitData.length === 0) {
      this.status = "No Limit";
    }
    return this.status;
  }
}
