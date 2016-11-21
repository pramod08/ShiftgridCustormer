import {Injectable, Component, Output, EventEmitter, AfterViewInit, OnInit, ViewChild } from "@angular/core"
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import "rxjs/add/operator/map"
import "rxjs/add/operator/buffer"
import {BehaviorSubject} from "rxjs/Rx";
import {Subject} from "rxjs/Rx";
import {ReplaySubject} from "rxjs/Rx"
declare var jQuery: any;


@Injectable()
export class PeopleService {

    constructor(private http: Http) {
        this.IntializeObservables();
    }


    updateUserObservable = new Subject();
    CreatePeopleDiagram$ = new Subject();
    getUserById(id: string,tenantName): Observable<any[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get("/Home/GetPeopleById?id=" + id + "&tenantName=" + tenantName, headers)
            .map((res: Response) => {
                console.log(res.json())
                return res.json();
            })
            .publishReplay(-1)
            .refCount()
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')).cache();
    }



    IntializeObservables() {
        this.updateUserObservable.subscribe(val => {
            console.log(val);
            let body = JSON.stringify(val);
            console.log("===> body :" + body);
            let url = "/Home/PutPeople";
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.put(url, body, options).map(res => res.json()).cache().
                subscribe((response) => { console.log(response) },
                (error) => { console.log(error); },
                () => { console.log("completed."); });
        });
    }
}

