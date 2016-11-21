import {Component, HostListener} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AspectRatioService} from '../aspectratiocalculation/AspectRatioService'

declare var $: any;
@Component({
    selector: 'volumetricbutton',
    templateUrl: 'app/volumetricbutton/volumetricbutton.template.html'
})
export class VolumetricsButtonComponent {

    json: Object;
    constructor(public http: Http, public aspectRatio: AspectRatioService) {

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
        let currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["VolumetricsButton"])["width"]);
        let currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["VolumetricsButton"])["height"] / (this.json["VolumetricsButton"])["width"]);
        let currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["VolumetricsButton"])["left"]);
        let currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["VolumetricsButton"])["top"] / (this.json["VolumetricsButton"])["top"]);
        
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#VolumetricsButton": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": "100%",
                "margin-right": 0,
                "padding": 0
            }
        }); // end of dynamic css

    }



}