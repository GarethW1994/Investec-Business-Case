import { Component, OnInit } from '@angular/core';
import { EntitiesService } from './entities.services';

@Component({
    selector: "app-entity",
    templateUrl: "./entity.component.html"
})
export class EntityComponent implements OnInit {
    entitiesData;
    parentEntity;
    children;
    entity = [];

    constructor(private entities: EntitiesService) {
        setTimeout(()=>{
            this.ngOnInit();
        }, 5000);
    }

    ngOnInit() {
        this.entitiesData = this.entities.getEntities();
        this.parentEntity = this.entities.getParentEntities();
        this.children = this.parentEntity[0].children;

        console.log(this.children)
    }
}
