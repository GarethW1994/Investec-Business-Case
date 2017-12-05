import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class EntitiesService {
    private BASE_URL: string = environment.url;
    entities: string[];
    parent: string[];
    child: string[];
    limit: string[];

    constructor(private http: HttpClient ) { this.ngOnInit() }

    ngOnInit(): void {
        this.http.get(this.BASE_URL + "/api/entity")
        .subscribe(data => {
          console.log(data);
            this.entities = data['data'];
        });
    }

    async findLimit(entityId) {
      await this.http.get(this.BASE_URL + "/api/entity_limit/" + entityId)
      .subscribe(async (data) => {
        this.limit = data["data"];
      });
    }

    async findChildEntity(parentId) {
      let status = await this.http.get(this.BASE_URL + "/api/child_entity/" + parentId)
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
