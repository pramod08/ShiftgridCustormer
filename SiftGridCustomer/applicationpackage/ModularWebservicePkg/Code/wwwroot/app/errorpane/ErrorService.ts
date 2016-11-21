import {Component, Output, EventEmitter, AfterViewInit, OnInit, ViewChild } from "@angular/core"
import { Injectable } from "@angular/core";
declare var jQuery: any;
import { Http, Headers, RequestOptions, Response } from "@angular/http";

import { Observable }       from "rxjs/Observable";

import "rxjs/add/operator/map"
import "rxjs/add/operator/buffer"
import {BehaviorSubject} from "rxjs/Rx";
import {Subject} from "rxjs/Rx";
import {Authenticator} from '../auth/Authenticator';
import {DiagramService} from '../diagram/diagramService'

import {ReplaySubject} from "rxjs/Rx"
/// <summary>
/// Injecting Inspector to all components.
/// </sumary>
@Injectable()
export class ErrorService {

    errorObjectObservable = new Subject();
    fieldColorEmitter$ = new Subject();
    GetErrorsBy$ = new Subject();
    constructor(public http: Http, private _authenticator: Authenticator, public diagramService: DiagramService) {
    }

    getErrors(id) {
        console.log("Inside getErrors, guid :" + id);
        this.http.get('/Home/GetDocument?diagramId=' + id + "&tenantName=" + this._authenticator.TenantName + "&tenantId=" + this.diagramService.tenantId)
            .map(res => res.json()).subscribe(
            (res) => {
                console.log(res);
                this.errorObjectObservable.next(res);
            },
            (error) => { console.log(error); },
            () => { console.log("Get Error list completed") });

    }
}