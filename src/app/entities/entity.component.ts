import { Component, OnInit } from '@angular/core';
import { EntitiesService } from './entities.services';

@Component({
    selector: "app-entity",
    templateUrl: "./entity.component.html"
})
export class EntityComponent implements OnInit {
    entitiesData;
    entity = [];

    constructor(private entities: EntitiesService) {
        setTimeout(()=>{
            this.ngOnInit();
        }, 5000);
    }

    ngOnInit() {
        this.entitiesData = this.entities.getEntities();
        this.entities.getParentEntities();
    }
}
