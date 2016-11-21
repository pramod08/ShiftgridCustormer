import { Component, OnInit, HostListener } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AreaService} from '../area/areaService'
import {AspectRatioService} from '../aspectratiocalculation/AspectRatioService'
declare var $: any;
@Component({
    selector: 'UIBackground',
    templateUrl: 'app/UIBackground/uibackground.template.html'
})
export class UIBackgroundComponent implements OnInit {

    json: Object;
    showEnterprisePane: boolean = true;
    showInfoPane: boolean = true;
    showDocumentPane: boolean = true;
    showErrorPane: boolean = true;
    showFuelConsumersPane: boolean = true;
    showNotesPane: boolean = true;


    constructor(public aspectRatio: AspectRatioService,public areaService: AreaService) {
        
    }

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
        this.aspectRatio.GetCSSJSONData().subscribe(json => {
            this.json = json;
            this.createDynamicCSS();
        })
    }

    createDynamicCSS() {

        let deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        let UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        let currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        let currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["EnteprisePane"])["width"]);
        let currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["EnteprisePane"])["height"] / (this.json["EnteprisePane"])["width"]);
        let currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["EnteprisePane"])["left"]);
        let currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["EnteprisePane"])["top"] / (this.json["EnteprisePane"])["left"]);

        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#UIBackground": {
                height: 1024,
                width: deviceWidth,
                left: 0,
                top: 0,
                position: "absolute"
            },
            "#container": {
                height: 1024,
                width: deviceWidth,
                left: 0,
                top: 0,
                position: "absolute"
            }
        }); // end of dynamic css

    }


}
