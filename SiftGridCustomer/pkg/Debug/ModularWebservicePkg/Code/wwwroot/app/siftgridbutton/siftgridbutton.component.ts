import {Component, HostListener} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AspectRatioService} from '../aspectratiocalculation/AspectRatioService'

declare var $: any;
@Component({
    selector: 'siftgridbutton',
    template: `<div id="SiftGridButton">
    <a href="#" ><img src="images/Layer-SiftGridLogo-mum0mtzc.png" id="SiftGridLogo" >
    </a>
        `
})
export class SiftGridButtonComponent {

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
        let currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["SiftGridButton"])["width"]);
        let currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["SiftGridButton"])["height"] / (this.json["SiftGridButton"])["width"]);
        let currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["SiftGridButton"])["left"]);
        let currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["SiftGridButton"])["top"] / (this.json["SiftGridButton"])["left"]);
        
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#SiftGridButton": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "background-color": "#333333",
                "position": "absolute"
            }
        }); // end of dynamic css

        let logoCurrentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["SiftGridLogo"])["width"]);
        let logoCurrentComponentHeight = this.aspectRatio.ComponentHeight(logoCurrentComponentWidth, (this.json["SiftGridLogo"])["height"] / (this.json["SiftGridLogo"])["width"]);
        let logoCurrentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["SiftGridLogo"])["left"]);
        let logoCurrentComponentTop = this.aspectRatio.ComponentTop(logoCurrentComponentLeft, (this.json["SiftGridLogo"])["top"] / (this.json["SiftGridLogo"])["left"]);

        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#SiftGridLogo": {
                "height": logoCurrentComponentHeight,
                "width": logoCurrentComponentWidth,
                "margin-left": logoCurrentComponentLeft,
                "margin-top": logoCurrentComponentTop,
                "background-color": "#333333",
                "position": "absolute"
            }
        }); // end of dynamic css

    }


}