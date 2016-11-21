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
/// <reference path="../enteprisepane/enterprise.component.ts" />
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var areaService_1 = require('../area/areaService');
var enterprise_component_1 = require('../EnteprisePane/enterprise.component');
var AspectRatioService_1 = require('../aspectratiocalculation/AspectRatioService');
var AreaButtonComponent = (function () {
    function AreaButtonComponent(http, areaService, uiBackground, aspectRatio) {
        this.http = http;
        this.areaService = areaService;
        this.uiBackground = uiBackground;
        this.aspectRatio = aspectRatio;
        this.createAreaDiagramEvent = new core_1.EventEmitter();
    }
    /**
     * this function is used to get device width
     */
    AreaButtonComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
        //this.createDynamicCSS();
    };
    AreaButtonComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    AreaButtonComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.aspectRatio.GetCSSJSONData().subscribe(function (json) {
            _this.json = json;
            _this.createDynamicCSS();
        });
    };
    AreaButtonComponent.prototype.handleError = function (error) {
    };
    AreaButtonComponent.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["AreasButton"])["width"]);
        var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["AreasButton"])["height"] / (this.json["AreasButton"])["width"]);
        var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["AreasButton"])["left"]);
        var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["AreasButton"])["top"] / (this.json["AreasButton"])["left"]);
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#AreasButton": {
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
    };
    AreaButtonComponent.prototype.GenerateAreaDiagram = function (diagramID) {
        this.uiBackground.showArea = false;
        this.uiBackground.showLocation = true;
        this.uiBackground.showPeople = true;
        this.areaService.showEnterprisePane$.next(10);
        this.areaService.displayAreaPaletteDiagram$.next(10);
        this.areaService.showEnterprisePane$.next(10);
        this.areaService.CreateAreasDiagram$.next(diagramID);
        this.areaService.CreateAreasPaletteDiagram$.next(10);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AreaButtonComponent.prototype, "createAreaDiagramEvent", void 0);
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], AreaButtonComponent.prototype, "onResize", null);
    AreaButtonComponent = __decorate([
        core_1.Component({
            selector: 'areabutton',
            templateUrl: 'app/areabutton/areabutton.template.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, areaService_1.AreaService, enterprise_component_1.EnterprisePaneComponent, AspectRatioService_1.AspectRatioService])
    ], AreaButtonComponent);
    return AreaButtonComponent;
}());
exports.AreaButtonComponent = AreaButtonComponent;
//# sourceMappingURL=areabutton.component.js.map