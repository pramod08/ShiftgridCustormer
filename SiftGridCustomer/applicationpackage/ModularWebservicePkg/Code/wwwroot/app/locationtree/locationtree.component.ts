import {Component, HostListener} from '@angular/core';
import {Http, Response} from '@angular/http';

declare var $: any;
@Component({
    selector: 'locationtree',
    templateUrl: 'app/locationtree/locationtree.template.html'
})
export class LocationTree {

    json: Object;
    diagramName;

    constructor(public http: Http) { }

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
        this.http.get("app/css.json")
            //.map(this.extractData)
            .subscribe(json => {
                this.json = json.json();
                this.createDynamicCSS();
            });
    }

    private handleError(error: Response) {

    }

    createDynamicCSS() {

        let deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        let UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        let currentWidthRatio = this.widthRatio((this.json["UIBackground"])["width"], deviceWidth);
        let currentComponentWidth = this.componentWidth(currentWidthRatio, (this.json["LocationTree"])["width"]);
        let currentComponentHeight = this.componentHeight(currentComponentWidth, (this.json["LocationTree"])["height"] / (this.json["LocationTree"])["width"]);
        let currentComponentLeft = this.componentLeft(currentWidthRatio, (this.json["LocationTree"])["left"]);
        let currentComponentTop = this.componentTop(currentComponentLeft, (this.json["LocationTree"])["top"] / (this.json["LocationTree"])["left"]);

        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#LocationTree": {
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

    widthRatio(referenceWidth: number, deviceWidth: number): number {
        return deviceWidth / referenceWidth;
    }

    componentWidth(ratioWidth: number, referenceWidth: number): number {
        return referenceWidth * ratioWidth;
    }

    componentLeft(componentWidthRatio: number, componentJsonRefLeft: number): number {
        return componentWidthRatio * componentJsonRefLeft;
    }

    componentHeight(currentComponentWidth: number, componentJsonRefHeightRatio: number): number {
        return currentComponentWidth * componentJsonRefHeightRatio;
    }

    componentTop(componentLeft: number, componentJsonRefTopRatio: number): number {
        return componentLeft * componentJsonRefTopRatio;
    }

}