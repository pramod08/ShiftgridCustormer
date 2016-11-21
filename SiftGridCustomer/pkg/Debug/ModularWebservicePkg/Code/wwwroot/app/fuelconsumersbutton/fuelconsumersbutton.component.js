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
var UIBackground_component_1 = require('../UIBackground/UIBackground.component');
var AspectRatioService_1 = require('../aspectratiocalculation/AspectRatioService');
var FuelConsumersButtonComponent = (function () {
    function FuelConsumersButtonComponent(http, uiBackground, aspectRatio) {
        this.http = http;
        this.uiBackground = uiBackground;
        this.aspectRatio = aspectRatio;
    }
    /**
     * this method is used to show fuel consumer pane
     */
    FuelConsumersButtonComponent.prototype.showFuelConsumersPane = function () {
        if (this.uiBackground.showFuelConsumersPane === true) {
            this.uiBackground.showFuelConsumersPane = false;
            if (this.uiBackground.showEnterprisePane === false) {
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
                //This is used for AreaPane Big Size
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
            this.uiBackground.showDocumentPane = true;
            this.uiBackground.showEnterprisePane = true;
            this.uiBackground.showErrorPane = true;
        }
        else {
            this.uiBackground.showFuelConsumersPane = true;
        }
    };
    /**
     * this function is used to get device width
     */
    FuelConsumersButtonComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
    };
    FuelConsumersButtonComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    FuelConsumersButtonComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.http.get("app/css.json")
            .subscribe(function (json) {
            _this.json = json.json();
            _this.createDynamicCSS();
        });
    };
    FuelConsumersButtonComponent.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["FuelConsumersButton"])["width"]);
        var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["FuelConsumersButton"])["height"] / (this.json["FuelConsumersButton"])["width"]);
        var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["FuelConsumersButton"])["left"]);
        var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["FuelConsumersButton"])["top"] / (this.json["FuelConsumersButton"])["left"]);
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
    };
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], FuelConsumersButtonComponent.prototype, "onResize", null);
    FuelConsumersButtonComponent = __decorate([
        core_1.Component({
            selector: 'fuelconsumersbutton',
            templateUrl: 'app/fuelconsumersbutton/fuelconsumersbutton.template.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, UIBackground_component_1.UIBackgroundComponent, AspectRatioService_1.AspectRatioService])
    ], FuelConsumersButtonComponent);
    return FuelConsumersButtonComponent;
}());
exports.FuelConsumersButtonComponent = FuelConsumersButtonComponent;
//# sourceMappingURL=fuelconsumersbutton.component.js.map