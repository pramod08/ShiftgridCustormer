import {Component, HostListener} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AreaService} from '../area/areaService'
import {AspectRatioService} from '../aspectratiocalculation/AspectRatioService'

import {UIBackgroundComponent} from '../UIBackground/UIBackground.component';

declare var $: any;
@Component({
    selector: 'enterprisebutton',
    templateUrl: 'app/enterprisebutton/enterprisebutton.template.html'
})
export class EnterpriseButtonComponent {

    json: Object;
    constructor(public http: Http, public ui: UIBackgroundComponent,
        public areaService: AreaService, public aspectRatio: AspectRatioService) {
        areaService.showEnterprisePane$.subscribe(res => {
            ui.showEnterprisePane = true;
            this.showEnterprisePane();
    });
    }
    
    /**
     * this method is used to show the enterprise pane when user clicked on enterprise button
     */


    showEnterprisePane() {
        if (this.ui.showEnterprisePane === true) {
            this.ui.showEnterprisePane = false;
            this.ui.showDocumentPane = true;
            this.ui.showErrorPane = true;
            this.ui.showFuelConsumersPane = true;

            let deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            let UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
            let currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
            let currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["SmallDiagramArea"])["width"]);
            let currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["SmallDiagramArea"])["height"] / (this.json["SmallDiagramArea"])["width"]);
            let currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["SmallDiagramArea"])["left"]);
            let currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["SmallDiagramArea"])["top"] / (this.json["SmallDiagramArea"])["left"]);

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

            let areaPalletcurrentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
            let areaPalletcurrentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["AreaPaneSmall"])["width"]);
            let areaPalletcurrentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["AreaPaneSmall"])["height"] / (this.json["AreaPaneSmall"])["width"]);
            let areaPalletcurrentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["AreaPaneSmall"])["left"]);
            let areaPalletcurrentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["AreaPaneSmall"])["top"] / (this.json["AreaPaneSmall"])["left"]);

            /**
             * this is used to create dynamic CSS
             */
            $.injectCSS({
                ".AreaPaneSmall": {
                    "height": areaPalletcurrentComponentHeight,
                    "width": areaPalletcurrentComponentWidth,
                    "margin-left": areaPalletcurrentComponentLeft,
                    "margin-top": areaPalletcurrentComponentTop,
                    "position": "absolute"
                   
                }
            }); // end of dynamic css

            let areaDiagramcurrentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
            let areaDiagramcurrentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["AreaDiagramSmall"])["width"]);
            let areaDiagramcurrentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["AreaDiagramSmall"])["height"] / (this.json["AreaDiagramSmall"])["width"]);
            let areaDiagramcurrentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["AreaDiagramSmall"])["left"]);
            let areaDiagramcurrentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["AreaDiagramSmall"])["top"] / (this.json["AreaDiagramSmall"])["left"]);

            /**
             * this is used to create dynamic CSS
             */
            $.injectCSS({
                ".AreaDiagram": {
                    "height": areaDiagramcurrentComponentHeight,
                    "width": areaDiagramcurrentComponentWidth,
                    "margin-left": areaDiagramcurrentComponentLeft,
                    "margin-top": areaPalletcurrentComponentHeight,
                    "position": "absolute",
                   
                }
            }); // end of dynamic css

        } else {
            this.ui.showEnterprisePane = true;
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

    @HostListener('window:resize')
    onResize() {
        this.getCSSJSONData();
    }

    createDynamicCSS() {
        let deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        let UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        let currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        let currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["EnterpriseButton"])["width"]);
        let currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["EnterpriseButton"])["height"] / (this.json["EnterpriseButton"])["width"]);
        let currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["EnterpriseButton"])["left"]);
        let currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["EnterpriseButton"])["top"] / (this.json["EnterpriseButton"])["left"]);
        
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#EnterpriseButton": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "background-color": "#333333",
                "position": "absolute",
                "padding": "1%"
            }
        }); // end of dynamic css

    }



}