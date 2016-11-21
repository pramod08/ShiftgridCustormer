import {Component, HostListener} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AreaService} from "../area/areaService";
import {AspectRatioService} from '../aspectratiocalculation/AspectRatioService'

declare var $: any;
@Component({
    selector: 'enterprise',
    templateUrl: 'app/EnteprisePane/enterprise.template.html'
})
export class EnterprisePaneComponent {
    showArea: boolean = true;
    showLocation: boolean = true;
    showGroup: boolean = true;
    showPeople: boolean = true;


    displayArea() {
        this.showArea = false;
        this.showLocation = true;
        this.showPeople = true;
    }

    displayDiagram() {
        this.showArea = true;
        this.showLocation = false;
        this.showPeople = true;
    }

    displayPeopleDiagram() {
        this.showArea = true;
        this.showLocation = true;
        this.showPeople = false
    }

    json: Object;
    constructor(public http: Http, public areaService: AreaService,
        public aspectRatio: AspectRatioService) {
        areaService.displayAreaTree$
            .subscribe(res => this.displayArea());
        areaService.displayDiagramTree$
            .subscribe(res => this.displayDiagram());
        areaService.displayPeopleDiagramTree$
            .subscribe(res => this.displayPeopleDiagram());
    }

    /**
     * this function is used to get device width
     */
    ngOnInit() {

        this.getCSSJSONData();
         //this.createDynamicCSS();

    }

    getCSSJSONData() {
        this.http.get("app/css.json")
            //.map(this.extractData)
            .subscribe(json => {
                this.json = json.json();
                this.createDynamicCSS();
            });
    }

    @HostListener('window:resize')
    onResize() {
        this.getCSSJSONData();
    }

    private extractData(res: Response) {
        alert("dfdf");
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response) {

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
            "#EnteprisePane": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "background-color": "#333333",
                "position": "absolute"
            }
        }); // end of dynamic css

    }



}