import {Component, Output, EventEmitter, AfterViewInit, OnInit, ViewChild } from "@angular/core"
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable }       from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/buffer"
import {BehaviorSubject} from "rxjs/Rx";
import {Subject} from "rxjs/Rx";
import {ReplaySubject} from "rxjs/Rx"
import {DiagramService} from '../diagram/diagramService'
import {Authenticator} from '../auth/Authenticator';
@Injectable()
export class NotesService {

    saveNotesObservable = new Subject();
    getNotesObservable = new Subject();
    showNotesObservable = new Subject();
    UpdateNotesObservable = new Subject();
    DeleteNoteObservable = new Subject();

    constructor(private http: Http ,public diagramService: DiagramService,
        private _authenticator: Authenticator) {
        this.IntializeObservables();
    }
    response: string;
    IntializeObservables() {

        this.saveNotesObservable.subscribe(val => {
            let url = "/Home/saveNotes"
            let body = JSON.stringify(val);
            console.log(body);
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
           
            var result = null;
            console.log("Before Http Call...");

            this.http.post(url, body, options).subscribe(res => {
                console.log("Subscribed : " + res.json())
                this.showNotesObservable.next(res.json())
            });
        });

        console.log("After Http Call...");
        this.getNotesObservable.subscribe(val => {
            let url = "/Home/getNotesInfo?locationId=" + val + "&tenantName=" + this._authenticator.TenantName + "&tenantId=" + this.diagramService.tenantId;
            this.http.get(url).map(res => res.json()).
                subscribe((response) => {
                    console.log("Response from GetNotes");
                    console.log(response);
                    this.showNotesObservable.next(response)
                },
                (error) => { console.log(error); },
                () => { console.log("completed."); });
        });

        this.UpdateNotesObservable.subscribe(val => {
            let url = "/Home/updateNote"
            let body = JSON.stringify(val);
            console.log("Body : " + body);
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            this.http.put(url, body, options).map(res => res.json()).
                subscribe((response) => {
                    console.log("Response from UpdateNotes" + response);
                    this.showNotesObservable.next(response)
                    console.log(response);
                },
                (error) => { console.log(error); },
                () => { console.log("completed."); });
        });

        this.DeleteNoteObservable.subscribe(val => {

            let url = "/Home/deleteNote?noteId=" + val + "&tenantName=" + this._authenticator.TenantName + "&tenantId=" + this.diagramService.tenantId;
           
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            this.http.delete(url, options).subscribe((response) => {
                console.log("Response from DeleteNotes" + response);
                console.log(response);
                this.showNotesObservable.next(response.json())
            },
                (error) => { console.log(error); },
                () => { console.log("completed."); });
        });
    }
    
}

