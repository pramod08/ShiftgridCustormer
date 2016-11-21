import {Component, HostListener} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {UIBackgroundComponent} from '../UIBackground/UIBackground.component';
import { AreaService} from "../area/areaService";
import {AspectRatioService} from '../aspectratiocalculation/AspectRatioService'

declare var $: any;
@Component({
    selector: 'diagramarea',
    templateUrl: 'app/diagramarea/diagramarea.template.html',
    styleUrls: ['app/diagramarea/inputElementStyle.css']

})
export class DiagramAreaComponent {

     showAreaPaletteDiagram: boolean = true;
     showDiagram: boolean = true;
     showPeopleDiagram: boolean = true;
    json: Object;
    constructor(public http: Http, public uiBackground: UIBackgroundComponent,
        public areaService: AreaService, public aspectRatio: AspectRatioService) {
        areaService.displayAreaPaletteDiagram$
            .subscribe(res => this.displayAreaPaletteDiagram());
        areaService.displayDiagram$
            .subscribe(res => this.displayDiagram());
        areaService.displayPeopleDiagram$
            .subscribe(res => this.displayPeopleDiagram());

    }

    /**
     * this function is used to get device width
     */
    ngOnInit() {
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

    displayAreaPaletteDiagram() {
        this.showAreaPaletteDiagram = false;
        this.showPeopleDiagram = true;
        this.showDiagram = true;
    }

    displayDiagram() {
        this.showDiagram = false;
        this.showAreaPaletteDiagram = true;
        this.showPeopleDiagram = true;
    }

    displayPeopleDiagram() {
        this.showPeopleDiagram = false;
        this.showAreaPaletteDiagram = true;
        this.showDiagram = true;
    }


   
    @HostListener('window:resize')
    onResize() {
        if (!this.uiBackground.showEnterprisePane) {
            let deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            let UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
            let currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
            let currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["SmallDiagramArea"])["width"]);
            let currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["SmallDiagramArea"])["height"] / (this.json["SmallDiagramArea"])["width"]);
            let currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["SmallDiagramArea"])["left"]);
            let currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["SmallDiagramArea"])["top"] / (this.json["SmallDiagramArea"])["left"]);

            /**
             * this is used to create dynamic CSS
             */
            $.injectCSS({
                ".DiagramArea": {
                    "height": currentComponentHeight,
                    "width": currentComponentWidth,
                    "margin-left": currentComponentLeft,
                    "margin-top": currentComponentTop,
                    "position": "absolute",
                    "z-index": 0
                }
            }); // end of dynamic css


        } else {
            this.getCSSJSONData();
        }
    }

    createDynamicCSS() {

        let deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        let UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        let currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        let currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["DiagramArea"])["width"]);
        let currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["DiagramArea"])["height"] / (this.json["DiagramArea"])["width"]);
        let currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["DiagramArea"])["left"]);
        let currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["DiagramArea"])["top"] / (this.json["DiagramArea"])["left"]);

        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            ".DiagramArea": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "position": "absolute"
            }
        }); // end of dynamic css



        let areaPalletcurrentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        let areaPalletcurrentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["AreaPaneBig"])["width"]);
        let areaPalletcurrentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["AreaPaneBig"])["height"] / (this.json["AreaPaneBig"])["width"]);
        let areaPalletcurrentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["AreaPaneBig"])["left"]);
        let areaPalletcurrentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["AreaPaneBig"])["top"] / (this.json["AreaPaneBig"])["left"]);

        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            ".AreaPaneSmall": {
                "height": areaPalletcurrentComponentHeight,
                "width": areaPalletcurrentComponentWidth,
                "margin-left": areaPalletcurrentComponentLeft,
                "margin-top": areaPalletcurrentComponentTop,
                "position": "absolute",

            }
        }); // end of dynamic css

    }


    



}