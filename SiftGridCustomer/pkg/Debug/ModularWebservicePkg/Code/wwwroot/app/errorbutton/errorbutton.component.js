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
var errorService_1 = require('../errorpane/errorService');
var diagramService_1 = require('../diagram/diagramService');
var AspectRatioService_1 = require('../aspectratiocalculation/AspectRatioService');
var UIBackground_component_1 = require('../UIBackground/UIBackground.component');
var ErrorsButtonComponent = (function () {
    function ErrorsButtonComponent(http, uiBackground, inspector, errorService, aspectRatio) {
        this.http = http;
        this.uiBackground = uiBackground;
        this.inspector = inspector;
        this.errorService = errorService;
        this.aspectRatio = aspectRatio;
    }
    /**
     * this function is used to get device width
     */
    ErrorsButtonComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
    };
    /**
     * this method is used to show the error pane
     */
    ErrorsButtonComponent.prototype.showErrorPane = function () {
        if (this.uiBackground.showErrorPane === true) {
            this.uiBackground.showErrorPane = false;
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
            this.uiBackground.showEnterprisePane = true;
            this.uiBackground.showDocumentPane = true;
            this.uiBackground.showFuelConsumersPane = true;
        }
        else {
            this.uiBackground.showErrorPane = true;
        }
        this.errorService.GetErrorsBy$.next(this.inspector.diagramGuid);
    };
    ErrorsButtonComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    ErrorsButtonComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.http.get("app/css.json")
            .subscribe(function (json) {
            _this.json = json.json();
            _this.createDynamicCSS();
        });
    };
    ErrorsButtonComponent.prototype.extractData = function (res) {
        alert("dfdf");
        var body = res.json();
        return body.data || {};
    };
    ErrorsButtonComponent.prototype.handleError = function (error) {
    };
    ErrorsButtonComponent.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["ErrorsButton"])["width"]);
        var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["ErrorsButton"])["height"] / (this.json["ErrorsButton"])["width"]);
        var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["ErrorsButton"])["left"]);
        var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["ErrorsButton"])["top"] / (this.json["ErrorsButton"])["left"]);
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#ErrorsButton": {
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
    ], ErrorsButtonComponent.prototype, "onResize", null);
    ErrorsButtonComponent = __decorate([
        core_1.Component({
            selector: 'errorbutton',
            templateUrl: 'app/errorbutton/errorbutton.template.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, UIBackground_component_1.UIBackgroundComponent, diagramService_1.DiagramService, errorService_1.ErrorService, AspectRatioService_1.AspectRatioService])
    ], ErrorsButtonComponent);
    return ErrorsButtonComponent;
}());
exports.ErrorsButtonComponent = ErrorsButtonComponent;
//# sourceMappingURL=errorbutton.component.js.map