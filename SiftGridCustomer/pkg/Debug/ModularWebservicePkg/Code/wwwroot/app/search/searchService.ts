import {Component,Output,EventEmitter, AfterViewInit, OnInit, ViewChild } from "@angular/core"
import { Injectable } from "@angular/core";
declare var jQuery: any;
import { Http, Headers, RequestOptions, Response } from "@angular/http";

 import { Observable }       from "rxjs/Observable";
import {Authenticator} from '../auth/Authenticator';
import "rxjs/add/operator/map"
import "rxjs/add/operator/buffer"
import {BehaviorSubject} from "rxjs/Rx";
import {Subject} from "rxjs/Rx";
import {AreaService} from '../area/areaService'

import {ReplaySubject} from "rxjs/Rx"

@Injectable()
export class SearchService {

    //InsertObjectDocObservable = new Subject();
    //TexteditingObjectDocObservable = new Subject();
    //createDiagram$ = new Subject();
    //deletingDocObservable = new Subject();

    //constructor(private http: Http) {
    //    this.InsertObjectDocObservable.subscribe(val => {
    //        let body = JSON.stringify(val);

    //        let url = "/Home/InsertDocObject";
    //        let headers = new Headers({ 'Content-Type': 'application/json' });
    //        let options = new RequestOptions({ headers: headers });

    //        this.http.post(url, body, options).map(res => res).
    //            subscribe((response) => { console.log(response) },
    //            (error) => { console.log(error); },
    //            () => { console.log("Insert document completed."); });

    //    });
    //    this.TexteditingObjectDocObservable.subscribe(val => {
    //        let body = JSON.stringify(val);

    //        let url = "/Home/EditingTextDocObject";
    //        let headers = new Headers({ 'Content-Type': 'application/json' });
    //        let options = new RequestOptions({ headers: headers });

    //        this.http.put(url, body, options).map(res => res).
    //            subscribe((response) => { console.log(response) },
    //            (error) => { console.log(error); },
    //            () => { console.log("EditingText document completed."); });

    //    });

    //    this.deletingDocObservable.subscribe(val => {
    //        // let body = JSON.stringify(val);
    //        console.log("deleting doc val  id " + val);
    //        let url = `/Home/DeletingDocObject?deleteid=${val}`;
    //        let headers = new Headers({ 'Content-Type': 'application/json' });
    //        let options = new RequestOptions({ headers: headers });

    //        this.http.delete(url, options).map(res => res).
    //            subscribe((response) => { console.log(response) },
    //            (error) => { console.log(error); },
    //            () => { console.log("EditingText document completed."); });

    //    });
    //}

    //search(search: string) {

    //    return this.http.get(`/Home/GetSearchDocument?search=${search}`).map(res => {

    //        console.log(res.json());
    //        return res.json();
    //        //   this.filteredList = res.json();
    //    }).cache();
    //}


    //Getid_Name(item: string) {
    //    return this.http.get(`/Home/GetSearchDetails?item=${item}`).map(res => { return res.json() }).cache();
    //}






    //Areas 

    InsertObjectDocObservable = new Subject();
    TexteditingObjectDocObservable = new Subject();
    deletingDocObservable = new Subject();
    createDiagram$ = new Subject();

    //Location Group Names
    InsertLoc_GroupDocObservable = new Subject();
    Textediting_groupObjDocObservable = new Subject();
    deletingGroupDocObservable = new Subject();
    createDiagramWithLocation$ = new Subject();

    //ungroup 
    GetGroupID = new Subject();

    // People 
    InsertPeopleDocObservable = new Subject();
    EditPeopleDocObservable = new Subject();
    deletePeopleDocObservable = new Subject();
    createpeopleDiagramWithLocation$ = new Subject();

    // People Title
    InsertPeoplewithTitleDocObservable = new Subject();
    EditPeoplewithTitleDocObservable = new Subject();
    tenantName;
    tenantId;

    constructor(private http: Http, private _authenticator: Authenticator
        , public areaService: AreaService) {
        //Areas
        this.InsertObjectDocObservable.subscribe(val => {
            let body = JSON.stringify(val);

            let url = "/Home/InsertAreaDocObject";
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.post(url, body, options).map(res => res).
                subscribe((response) => { console.log(response) },
                (error) => { console.log(error); },
                () => { console.log("Insert document completed."); });

        });
        this.TexteditingObjectDocObservable.subscribe(val => {
            let body = JSON.stringify(val);

            let url = "/Home/UpdateTextAreaDocObject";
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.put(url, body, options).map(res => res).
                subscribe((response) => { console.log(response) },
                (error) => { console.log(error); },
                () => { console.log("EditingText document completed."); });

        });
        this.deletingDocObservable.subscribe(val => {
            // let body = JSON.stringify(val);
            console.log("deleting doc val  id " + val);
            let url = `/Home/DeletingAreaDocObject?deleteid=${val}` + '&secretKey=' + this.tenantName + "-" + this.tenantId;
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.delete(url, options).map(res => res).
                subscribe((response) => { console.log(response) },
                (error) => { console.log(error); },
                () => { console.log("deleting document completed."); });

        });

        //location Group
        this.InsertLoc_GroupDocObservable.subscribe(val => {
            let body = JSON.stringify(val);

            let url = "/Home/InsertLoc_GroupDocObject";
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.post(url, body, options).map(res => res).
                subscribe((response) => { console.log(response) },
                (error) => { console.log(error); },
                () => { console.log("Insert document completed."); });
        });
        this.Textediting_groupObjDocObservable.subscribe(val => {
            let body = JSON.stringify(val);

            let url = "/Home/EditingText_GroupDocObject";
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.put(url, body, options).map(res => res).
                subscribe((response) => { console.log(response) },
                (error) => { console.log(error); },
                () => { console.log("EditingText document completed."); });

        });
        this.deletingGroupDocObservable.subscribe(val => {
            // let body = JSON.stringify(val);
            console.log("deleting doc val  id " + val);
            let url = `/Home/DeletingLoc_GroupDocObject?deleteid=${val}` + '&secretKey=' + this.tenantName + "-" + this.tenantId;
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.delete(url, options).map(res => res).
                subscribe((response) => { console.log(response) },
                (error) => { console.log(error); },
                () => { console.log("deleting document completed."); });

        });

        // People 

        this.InsertPeopleDocObservable.subscribe(val => {
            let body = JSON.stringify(val);

            let url = "/Home/InsertPeopleDocObject";
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.post(url, body, options).map(res => res).
                subscribe((response) => { console.log(response) },
                (error) => { console.log(error); },
                () => { console.log("Insert people document completed."); });
        });
        this.EditPeopleDocObservable.subscribe(val => {
            let body = JSON.stringify(val);

            let url = "/Home/EditingText_PeopleDocObject";
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.put(url, body, options).map(res => res).
                subscribe((response) => { console.log(response) },
                (error) => { console.log(error); },
                () => { console.log("EditingText document completed."); });
        });
        this.deletePeopleDocObservable.subscribe(val => {
            // let body = JSON.stringify(val);
            console.log("deleting doc val  id " + val);
            let url = `/Home/DeletingPeopleDocObject?deleteid=${val}` + '&secretKey=' + this.tenantName + "-" + this.tenantId;
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.delete(url, options).map(res => res).
                subscribe((response) => { console.log(response) },
                (error) => { console.log(error); },
                () => { console.log("deleting document completed."); });

        });

        this.InsertPeoplewithTitleDocObservable.subscribe(val => {
            let body = JSON.stringify(val);

            let url = "/Home/InsertPeopleWithTitleDocObject";
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.post(url, body, options).map(res => res).
                subscribe((response) => { console.log(response) },
                (error) => { console.log(error); },
                () => { console.log("Insert people document completed."); });
        });
        this.EditPeoplewithTitleDocObservable.subscribe(val => {
            let body = JSON.stringify(val);
            let url = "/Home/EditingText_PeopleTitleDocObject";
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http.put(url, body, options).map(res => res).
                subscribe((response) => { console.log(response) },
                (error) => { console.log(error); },
                () => { console.log("EditingText document completed."); });
        });

        this.tenantName = this._authenticator.TenantName




    }

    search(search: string) {

        return this.http.get(`/Home/GetSearchDocument?search=${search}` + '&secretKey=' + this.tenantName + "-" + this.tenantId)
            .map(res => {
            console.log(res.json());
            return res.json();
            //   this.filteredList = res.json();
        }).cache();
    }

    Getid_Name(item: string) {
        return this.http.get(`/Home/GetSearchDetails?item=${item}` + '&secretKey=' + this.tenantName + "-" + this.tenantId)
            .map(res => {
            console.log("get id_Name", res);
            return res.json();
        }).cache();
    }

}

