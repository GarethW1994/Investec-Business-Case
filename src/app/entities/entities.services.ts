import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class EntitiesService {
    private BASE_URL: string = "http://localhost:3000/api/";
    entities: string[];
    parent: string[];
    child: string[];
    limit: string[];

    constructor(private http: HttpClient ) { this.ngOnInit() }

    ngOnInit(): void {
        this.http.get(this.BASE_URL + "entity")
        .subscribe(data => {
            this.entities = data['data'];
        });
    }

    async findLimit(entityId) {
      await this.http.get(this.BASE_URL + "entity_limit/" + entityId)
      .subscribe(async (data) => {
        this.limit = data["data"];
      });
    }

    async findChildEntity(parentId) {
      let status = await this.http.get(this.BASE_URL + "child_entity/" + parentId)
        .subscribe(async (data) => {
          this.child = data['data'];
        })

        return status;
    }

    getEntities() {
      return this.entities;
    }

    getChildEntity() {
      return this.child;
    }

    getLimit() {
      return this.limit;
    }
    
    private handleError(error: Response) {
        return error.statusText;
    }
}
