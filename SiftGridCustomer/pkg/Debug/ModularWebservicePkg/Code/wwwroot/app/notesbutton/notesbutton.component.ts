import {Component, HostListener} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {UIBackgroundComponent} from '../UIBackground/UIBackground.component'
import {AspectRatioService} from '../aspectratiocalculation/AspectRatioService'

declare var $: any;
@Component({
    selector: 'notesbutton',
    templateUrl: 'app/notesbutton/notesbutton.template.html'
})
export class NotesButtonComponent {

    json: Object;
    constructor(public http: Http, public uiBackground: UIBackgroundComponent
        , public aspectRatio: AspectRatioService) {

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
        let currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["NotesButton"])["width"]);
        let currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["NotesButton"])["height"] / (this.json["NotesButton"])["width"]);
        let currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["NotesButton"])["left"]);
        let currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["NotesButton"])["top"] / (this.json["NotesButton"])["left"]);
        
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#NotesButton": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "margin-right": 0,
                "padding": 0
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

    showNotePane() {
        if (this.uiBackground.showNotesPane === true) {
            this.uiBackground.showNotesPane = false;
            this.uiBackground.showDocumentPane = true;
            this.uiBackground.showErrorPane = true;
            this.uiBackground.showFuelConsumersPane = true;
        } else {
            this.uiBackground.showNotesPane = true;
        }
    }
}