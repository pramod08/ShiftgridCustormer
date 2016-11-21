"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var areaService_1 = require('../area/areaService');
var AspectRatioService_1 = require('../aspectratiocalculation/AspectRatioService');
var UIBackground_component_1 = require('../UIBackground/UIBackground.component');
var EnterpriseButtonComponent = (function () {
    function EnterpriseButtonComponent(http, ui, areaService, aspectRatio) {
        var _this = this;
        this.http = http;
        this.ui = ui;
        this.areaService = areaService;
        this.aspectRatio = aspectRatio;
        areaService.showEnterprisePane$.subscribe(function (res) {
            ui.showEnterprisePane = true;
            _this.showEnterprisePane();
        });
    }
    /**
     * this method is used to show the enterprise pane when user clicked on enterprise button
     */
    EnterpriseButtonComponent.prototype.showEnterprisePane = function () {
        if (this.ui.showEnterprisePane === true) {
            this.ui.showEnterprisePane = false;
            this.ui.showDocumentPane = true;
            this.ui.showErrorPane = true;
            this.ui.showFuelConsumersPane = true;
            var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
            var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
            var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["SmallDiagramArea"])["width"]);
            var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["SmallDiagramArea"])["height"] / (this.json["SmallDiagramArea"])["width"]);
            var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["SmallDiagramArea"])["left"]);
            var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["SmallDiagramArea"])["top"] / (this.json["SmallDiagramArea"])["left"]);
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
            var areaPalletcurrentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
            var areaPalletcurrentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["AreaPaneSmall"])["width"]);
            var areaPalletcurrentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["AreaPaneSmall"])["height"] / (this.json["AreaPaneSmall"])["width"]);
            var areaPalletcurrentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["AreaPaneSmall"])["left"]);
            var areaPalletcurrentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["AreaPaneSmall"])["top"] / (this.json["AreaPaneSmall"])["left"]);
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
            var areaDiagramcurrentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
            var areaDiagramcurrentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["AreaDiagramSmall"])["width"]);
            var areaDiagramcurrentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["AreaDiagramSmall"])["height"] / (this.json["AreaDiagramSmall"])["width"]);
            var areaDiagramcurrentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["AreaDiagramSmall"])["left"]);
            var areaDiagramcurrentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["AreaDiagramSmall"])["top"] / (this.json["AreaDiagramSmall"])["left"]);
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
        }
        else {
            this.ui.showEnterprisePane = true;
            var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
            var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
            var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["DiagramArea"])["width"]);
            var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["DiagramArea"])["height"] / (this.json["DiagramArea"])["width"]);
            var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["DiagramArea"])["left"]);
            var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["DiagramArea"])["top"] / (this.json["DiagramArea"])["left"]);
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
            var areaPalletcurrentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
            var areaPalletcurrentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["AreaPaneBig"])["width"]);
            var areaPalletcurrentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["AreaPaneBig"])["height"] / (this.json["AreaPaneBig"])["width"]);
            var areaPalletcurrentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["AreaPaneBig"])["left"]);
            var areaPalletcurrentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["AreaPaneBig"])["top"] / (this.json["AreaPaneBig"])["left"]);
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
            var areaDiagramcurrentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
            var areaDiagramcurrentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["AreaDiagramBig"])["width"]);
            var areaDiagramcurrentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["AreaDiagramBig"])["height"] / (this.json["AreaDiagramBig"])["width"]);
            var areaDiagramcurrentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["AreaDiagramBig"])["left"]);
            var areaDiagramcurrentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["AreaDiagramBig"])["top"] / (this.json["AreaDiagramBig"])["left"]);
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
    };
    /**
     * this function is used to get device width
     */
    EnterpriseButtonComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
    };
    EnterpriseButtonComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.http.get("app/css.json")
            .subscribe(function (json) {
            _this.json = json.json();
            _this.createDynamicCSS();
        });
    };
    EnterpriseButtonComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    EnterpriseButtonComponent.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["EnterpriseButton"])["width"]);
        var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["EnterpriseButton"])["height"] / (this.json["EnterpriseButton"])["width"]);
        var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["EnterpriseButton"])["left"]);
        var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["EnterpriseButton"])["top"] / (this.json["EnterpriseButton"])["left"]);
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
    };
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], EnterpriseButtonComponent.prototype, "onResize", null);
    EnterpriseButtonComponent = __decorate([
        core_1.Component({
            selector: 'enterprisebutton',
            templateUrl: 'app/enterprisebutton/enterprisebutton.template.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, UIBackground_component_1.UIBackgroundComponent, areaService_1.AreaService, AspectRatioService_1.AspectRatioService])
    ], EnterpriseButtonComponent);
    return EnterpriseButtonComponent;
}());
exports.EnterpriseButtonComponent = EnterpriseButtonComponent;
//# sourceMappingURL=enterprisebutton.component.js.map