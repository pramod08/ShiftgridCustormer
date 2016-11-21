import {Component, Input, Output, EventEmitter, HostListener} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable}     from 'rxjs/Observable';
import {Subject} from "rxjs/Rx";
import {AspectRatioService} from '../aspectratiocalculation/AspectRatioService'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ErrorService} from './errorService'
import { DiagramService} from "../diagram/diagramService"
 
declare var $: any;
@Component({
    selector: 'errorpane',
    templateUrl: 'app/errorpane/errorpane.template.html',
    styleUrls: ['app/errorpane/error.style.css']

})
export class ErrorPaneComponent {

    json: Object;

    /**
     * this function is used to get device width
     */
    ngOnInit() {
        this.getCSSJSONData();
    }

    @HostListener('window:resize')
    onResize() {
        this.getCSSJSONData();
    }

    getCSSJSONData() {
        this.http.get("app/css.json")
            //.map(this.extractData)
            .subscribe(json => {
                this.json = json.json();
                this.createDynamicCSS();
            });
    }

    createDynamicCSS() {
        let deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        let UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        let currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        let currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["FooterPane"])["width"]);
        let currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["FooterPane"])["height"] / (this.json["FooterPane"])["width"]);
        let currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["FooterPane"])["left"]);
        let currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["FooterPane"])["top"] / (this.json["FooterPane"])["left"]);
        
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#FooterPane": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "margin-right": 0,
                "padding": 0,
                "background-color": "#333333",
                "color": "white",
                "position": "absolute"
            }
        }); // end of dynamic css

    }




    @Input() diagram: go.Diagram;

    public JsonId;
    constructor(public http: Http, private inspector: DiagramService,
        public errorService: ErrorService, public aspectRatio: AspectRatioService) {
        var self = this;
        this.diagram = inspector._diagram;
        console.log(self.diagram);
        errorService.GetErrorsBy$.subscribe(res => this.GetErrorsBy(res));
        inspector.errorObjectObservable.map(res => res)
            .subscribe(res => {
                this.diagram = inspector._diagram;
                console.log(this.diagram);
                console.log("errorObjectObservable subscribing");
                self.JsonId = res;
                   Observable.from(self.JsonId)
                        .filter((res) => res["ValidationType"] == "Business")
                        .subscribe(res => this.ColoringObject(res, "blue"));

                    Observable.from(self.JsonId)
                        .filter((res) => res["ValidationType"] == "Application")
                        .subscribe(res => self.ColoringObject(res, "pink"));

                    Observable.from(self.JsonId)
                        .filter((res) => res["ValidationType"] == "Compliance")
                        .subscribe(res => self.ColoringObject(res, "red"));
                    
             //   }
                console.log("node lenght", self.diagram.model.nodeDataArray.length);
            },
            err => console.log(err),
            () => console.log("completed error comp"));
    }


    ColoringObject(res, color) {
        var fieldColoring = {}
        var node = this.diagram.findNodeForKey(res["LocationId"]);
        console.log(node);
        this.diagram.model.setDataProperty(node.data, "color", color);
        fieldColoring[res["LocationId"]] = {}
        fieldColoring[res["LocationId"]][res["Missing_Field"]] = color
        this.errorService.fieldColorEmitter$.next(fieldColoring);
    }
    GetErrorsBy(guid) {
        console.log("Diagram id for error :" + guid);
        this.inspector.getErrors(guid);
    }

}