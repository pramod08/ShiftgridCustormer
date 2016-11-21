import {Component,Output,EventEmitter, AfterViewInit, OnInit, ViewChild } from "@angular/core"
import { Injectable } from "@angular/core";
declare var jQuery: any;
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import {DiagramData} from "../diagram/DiagramData"

 import { Observable }       from "rxjs/Observable";
 import {DiagramService} from '../diagram/diagramService'
 import {Authenticator} from '../auth/Authenticator';
import "rxjs/add/operator/map"
import "rxjs/add/operator/buffer"
import {BehaviorSubject} from "rxjs/Rx";
import {Subject} from "rxjs/Rx";

import {ReplaySubject} from "rxjs/Rx"
/// <summary>
/// Injecting Inspector to all components.
/// </sumary>
@Injectable()
export class AreaService {

    createObjectInfoObservable = new Subject();
    createDiagramInfoObservable = new Subject();
    getInfoPaneObservable = new Subject();
    DiagramJson = new Subject();
    infoApiCache = new ReplaySubject();
    updateDiagramInfoObservable = new Subject();
    updateInfoPaneObservable = new Subject();
    updateObjectProperties = new Subject();
    updateAreaInfoObservable = new Subject();
    createAreaInfoObservable = new Subject();
    errorObjectObservable = new Subject();
    getDiagramObservable = new Subject();
    showDiagramInfoObservable = new Subject();
    _diagram: go.Diagram;

    displayAreaPaletteDiagram$ = new Subject();
    displayDiagram$ = new Subject();
    displayPeopleDiagram$ = new Subject();

    displayAreaTree$ = new Subject();
    displayDiagramTree$ = new Subject();
    displayPeopleDiagramTree$ = new Subject();

    showEnterprisePane$ = new Subject();

    CreateAreasDiagram$ = new Subject();

    CreateAreasPaletteDiagram$ = new Subject();
    private cachedData = new Map<String, String>();

    constructor(private http: Http, public diagramService: DiagramService,
        private _authenticator: Authenticator) {
        this.IntializeObservables();       
    }

    
      event: go.DiagramEvent;

      IntializeObservables() {



          this.createObjectInfoObservable.subscribe(val => {
              let url = "/Home/CreateObjectInfo"
              let body = JSON.stringify(val)
              console.log(val );
              let headers = new Headers({ 'Content-Type': 'application/json' });

              let options = new RequestOptions({ headers: headers });

              var result = null;
              this.http.post(url, body, options).map(res => res.json()).
                  subscribe((response) => 
                  {
                      console.log(response);
                      //this.updateInfoPaneObservable.next(response)
                  },                  
                  (error) => { console.log(error); },
                  () => { console.log("completed."); });
          });

          this.getInfoPaneObservable.subscribe(val => {
              let url = "/Home/GetInfo?nodeInfo=" + val;

              this.http.get(url).map(res => res.json()).
                  subscribe((response) => { console.log(response); this.updateInfoPaneObservable.next(response) },
                  (error) => { console.log(error); },
                  () => { console.log("completed."); });
          });


          this.createDiagramInfoObservable.subscribe(val => {
              console.log("val is diagramId :" + val);
              let url = "/Home/GetDiagramInfo?diagramId=" + val;

              this.http.get(url).map(res => res.json()).cache().
                  subscribe((response) => {
                      console.log("Response for diagram info :" + response);
                      this.showDiagramInfoObservable.next(response)
                  },
                  (error) => { console.log(error); },
                  () => { console.log("completed."); });
          });


          this.getDiagramObservable.subscribe(val => {

              let url = "/Home/GetInfo?nodeInfo=" + val;

              this.http.get(url).map(res => res.json()).cache().
                  subscribe((response) => { console.log(response); this.updateInfoPaneObservable.next(response) },
                  (error) => { console.log(error); },
                  () => { console.log("completed."); });
          });

          this.updateDiagramInfoObservable.subscribe(val => {
              let body = JSON.stringify(val);

              let url = "/Home/Put";
              let headers = new Headers({ 'Content-Type': 'application/json' });
              let options = new RequestOptions({ headers: headers });

              this.http.put(url, body, options).map(res => res.json()).cache().
                  subscribe((response) => { console.log(response) },
                  (error) => { console.log(error); },
                  () => { console.log("completed."); });
          });

          this.updateObjectProperties.subscribe(res =>
          {
              let body = JSON.stringify(res);
              console.log("request to UpdateProps");
              console.log(res);
              console.log(body);

              let url = "/Home/UpdateObjectProps";
              let headers = new Headers({ 'Content-Type': 'application/json' });
              let options = new RequestOptions({ headers: headers });
              this.http.put(url, body, options).map(res => res.json()).
                  subscribe((response) =>
                  {
                      console.log("Response from UpdateProps");
                      this.updateInfoPaneObservable.next(response);
                      console.log(response);
                  },
                  (error) => { console.log(error); },
                  () => { console.log("completed."); });
             
          }
              


          );



          this.updateAreaInfoObservable.subscribe(val => {
              let body = JSON.stringify(val);

              let url = "/Home/PutArea";
              let headers = new Headers({ 'Content-Type': 'application/json' });
              let options = new RequestOptions({ headers: headers });

              this.http.put(url, body, options).map(res => res.json()).cache().
                  subscribe((response) => { console.log(response) },
                  (error) => { console.log(error); },
                  () => { console.log("completed."); });
          });

      }

      getDiagramJson(diagramId) {
          return this.http.get("/Home/GetDiagramJson?diagramId=" + diagramId)
              .map(res => res.json()).cache();
      }

      init(diagram) {
        this._diagram = diagram;
        var self = this;  
      }




    getErrors(id) {
        console.log("Inside getErrors, guid :"+ id);
        this.http.get('/Home/GetDocument?diagramId=' + id + "&tenantName=" + this._authenticator.TenantName + "&tenantId=" + this.diagramService.tenantId)
            .map(res => res.json()).subscribe(
            (res) => {
                //console.log(res);
                this.errorObjectObservable.next(res);
            },
            (error) => { console.log(error); },
            () => { console.log("Get Error list completed") });

    }


    UpdateAreaDiagramJson(diagramData: DiagramData, tenantName) {
        console.log(diagramData)
        let url = "/Home/UpdateAreaDiagramJson"
        let body = { "data": JSON.stringify(diagramData), "tenantName": tenantName }
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });

        let options = new RequestOptions({ headers: headers });

        var result = null;
        return this.http.put(url, body, options).map(res => res.json())
    }


    GetTenantId(tenantName) {
        return this.http.get('/Home/GetTenantId?tenantName=' + tenantName).do(res => console.log(res))
            .map(res => res.text())
    }
}

