import {Component, HostListener} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {UIBackgroundComponent} from '../UIBackground/UIBackground.component';
import {AspectRatioService} from '../aspectratiocalculation/AspectRatioService'

declare var $: any;
@Component({
    selector: 'fuelconsumersbutton',
    templateUrl: 'app/fuelconsumersbutton/fuelconsumersbutton.template.html'
})
export class FuelConsumersButtonComponent {

    json: Object;
    constructor(public http: Http, public uiBackground: UIBackgroundComponent,
     public aspectRatio: AspectRatioService) {

    }

    /**
     * this method is used to show fuel consumer pane
     */
    showFuelConsumersPane() {
        if (this.uiBackground.showFuelConsumersPane === true) {
            this.uiBackground.showFuelConsumersPane = false;

            if (this.uiBackground.showEnterprisePane === false) {
                let deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                let UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
                let currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
                let currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["DiagramArea"])["width"]);
                let currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["DiagramArea"])["height"] / (this.json["DiagramArea"])["width"]);
                let currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["DiagramArea"])["left"]);
                let currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["DiagramArea"])["top"] / (this.json["DiagramArea"])["left"]);

                $.injectCSS({
                    ".DiagramArea": {
                        "height": currentComponentHeight,
                        "width": currentComponentWidth,
                        "margin-left": currentComponentLeft,
                        "margin-top": currentComponentTop,
                        "position": "absolute",
                        "z-index": 0,
                    }
                });

                //This is used for AreaPane Big Size

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

                //This is used for AreaDiagram Big Size

                let areaDiagramcurrentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
                let areaDiagramcurrentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["AreaDiagramBig"])["width"]);
                let areaDiagramcurrentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["AreaDiagramBig"])["height"] / (this.json["AreaDiagramBig"])["width"]);
                let areaDiagramcurrentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["AreaDiagramBig"])["left"]);
                let areaDiagramcurrentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["AreaDiagramBig"])["top"] / (this.json["AreaDiagramBig"])["left"]);

                /**
                 * this is used to create dynamic CSS
                 */
                $.injectCSS({
                    ".AreaDiagram": {
                        "height": areaDiagramcurrentComponentHeight,
                        "width": areaDiagramcurrentComponentWidth,
                        "margin-left": areaDiagramcurrentComponentLeft,
                        "margin-top": areaPalletcurrentComponentHeight,
                        "position": "absolute"
                        
                    }
                }); // end of dynamic css
            }

            this.uiBackground.showDocumentPane = true;
            this.uiBackground.showEnterprisePane = true;
            this.uiBackground.showErrorPane = true;
        } else {
            this.uiBackground.showFuelConsumersPane = true;
        }
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
        let currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["FuelConsumersButton"])["width"]);
        let currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["FuelConsumersButton"])["height"] / (this.json["FuelConsumersButton"])["width"]);
        let currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["FuelConsumersButton"])["left"]);
        let currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["FuelConsumersButton"])["top"] / (this.json["FuelConsumersButton"])["left"]);
        
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#FuelConsumersButton": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "margin-right": 0,
                "padding": 0
            }
        }); // end of dynamic css

    }


}