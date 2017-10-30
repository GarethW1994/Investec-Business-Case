import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class EntitiesService {
    private BASE_URL: string = "http://localhost:3000/api";
    entities: string[];
    parent: string[];

    constructor(private http: HttpClient ) { this.ngOnInit() }

    ngOnInit(): void {
        this.http.get(this.BASE_URL + "/entity")
        .subscribe(data => {
            this.entities = data['data'];
        });

        this.http.get(this.BASE_URL + "/parent_entity")
        .subscribe(data => {
            this.parent = data['data'];
        });
    }

    getEntities() {
        return this.entities;
    }

    getParentEntities() {
        return this.parent;
    }


    private handleError(error: Response) {
        return error.statusText;
    }
}
