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
export class CompanyService {

    constructor(private http: Http) {
        this.IntializeObservables();
    }

    updateFindCompanyObservable = new Subject();
    updatePasswordObservable = new Subject();
    updateDomainObservable = new Subject();

    IntializeObservables() {
        this.updateFindCompanyObservable.subscribe(val => {
            console.log(val);
            let body = JSON.stringify(val);
            console.log(body);
            let url = "/api/values/";
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.post(url, body, options).map(res => res.json()).
                subscribe((response) => {
                    console.log(response)
                },
                (error) => { console.log(error); },
                () => { console.log("completed."); });
        });
        this.updatePasswordObservable.subscribe(val => {
            console.log(val);
            let body = JSON.stringify(val);
            console.log(body);
            let url = "/Home/PostPassword";
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.post(url, body, options).map(res => res.json()).
                subscribe((response) => {
                    console.log(response)
                },
                (error) => { console.log(error); },
                () => { console.log("completed."); });
        });

        this.updateDomainObservable.subscribe(val => {
            console.log(val);
            let body = JSON.stringify(val);
            console.log(body);
            let url = "/Home/PostDomain";
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.post(url, body, options).map(res => res.json()).
                subscribe((response) => {
                    console.log(response)
                },
                (error) => { console.log(error); },
                () => { console.log("completed."); });
        });

    }
    createAuthorizationHeader(headers: Headers) {
        let token = localStorage.getItem('auth_token');
        headers.append('Authorization', 'Bearer ' + token);
        
    }


    get(url): Observable<any[]> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, { headers: headers })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}

