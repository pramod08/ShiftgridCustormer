import {Component, HostListener} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {PeopleService} from '../people/peopleService'
import {UIBackgroundComponent}  from '../UIBackground/UIBackground.component'
import {EnterprisePaneComponent}  from '../EnteprisePane/enterprise.component'
import {DiagramAreaComponent}  from '../diagramarea/diagramarea.component'
import {AreaService} from '../area/areaService'
import {AspectRatioService} from '../aspectratiocalculation/AspectRatioService'

declare var $: any;
@Component({
    selector: 'peoplebutton',
    templateUrl: 'app/peoplebutton/peoplebutton.template.html'
})
export class PeopleButtonComponent {

    json: Object;
    constructor(public http: Http, public peopleService: PeopleService,
        public areaService: AreaService, public uiBackground: EnterprisePaneComponent,
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
        this.http.get("app/css.json")
            //.map(this.extractData)
            .subscribe(json => {
                this.json = json.json();
                this.createDynamicCSS();
            });
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
        let currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["PeopleButton"])["width"]);
        let currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["PeopleButton"])["height"] / (this.json["PeopleButton"])["width"]);
        let currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["PeopleButton"])["left"]);
        let currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["PeopleButton"])["top"] / (this.json["PeopleButton"])["left"]);
        
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#PeopleButton": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "margin-right": 0,
                "padding": 0,
                "color": "white",
                "position": "absolute"
            }
        }); // end of dynamic css

    }




    GeneratePeopleDiagram(diagramID) {

        this.uiBackground.showArea = true;
        this.uiBackground.showLocation = true;
        this.uiBackground.showPeople = false;
        this.areaService.displayPeopleDiagram$.next(10);

        this.peopleService.CreatePeopleDiagram$.next(diagramID);

    }
}