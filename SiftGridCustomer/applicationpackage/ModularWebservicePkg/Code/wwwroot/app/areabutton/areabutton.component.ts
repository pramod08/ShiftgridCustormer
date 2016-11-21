/// <reference path="../enteprisepane/enterprise.component.ts" />
import {Component, HostListener, EventEmitter, Output} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AreaService} from '../area/areaService'
import {EnterprisePaneComponent}  from '../EnteprisePane/enterprise.component';
import {DiagramAreaComponent}  from '../diagramarea/diagramarea.component'
import {AspectRatioService} from '../aspectratiocalculation/AspectRatioService'

declare var $: any;
@Component({
    selector: 'areabutton',
    templateUrl: 'app/areabutton/areabutton.template.html'
})
export class AreaButtonComponent {
    @Output() createAreaDiagramEvent = new EventEmitter();

    json: Object;
    constructor(public http: Http, public areaService: AreaService, public uiBackground: EnterprisePaneComponent,
        public aspectRatio: AspectRatioService) {

    }

    /**
     * this function is used to get device width
     */
    ngOnInit() {

        this.getCSSJSONData();
        //this.createDynamicCSS();

    }

   @HostListener('window:resize')
    onResize() {
        this.getCSSJSONData();
    }

    getCSSJSONData() {
        this.aspectRatio.GetCSSJSONData().subscribe(json => {
            this.json = json;
            this.createDynamicCSS();
        })
    }

    private handleError(error: Response) {

    }

    createDynamicCSS() {

        let deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        let UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        let currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        let currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["AreasButton"])["width"]);
        let currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["AreasButton"])["height"] / (this.json["AreasButton"])["width"]);
        let currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["AreasButton"])["left"]);
        let currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["AreasButton"])["top"] / (this.json["AreasButton"])["left"]);
        
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#AreasButton": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "margin-right": 0,
                "padding": 0,
                "background-color": "#1c1a1a",
                "color": "white",
                "position": "absolute"
            }
        }); // end of dynamic css

    }




    GenerateAreaDiagram(diagramID) {
        this.uiBackground.showArea = false;
        this.uiBackground.showLocation = true;
        this.uiBackground.showPeople = true;
        this.areaService.showEnterprisePane$.next(10)
        this.areaService.displayAreaPaletteDiagram$.next(10);
        this.areaService.showEnterprisePane$.next(10)
        this.areaService.CreateAreasDiagram$.next(diagramID);
        this.areaService.CreateAreasPaletteDiagram$.next(10);
    }

}