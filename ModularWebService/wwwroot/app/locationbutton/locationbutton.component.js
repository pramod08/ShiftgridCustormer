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
var enterprise_component_1 = require('../EnteprisePane/enterprise.component');
var areaService_1 = require("../area/areaService");
var AspectRatioService_1 = require('../aspectratiocalculation/AspectRatioService');
var LocationsButtonComponent = (function () {
    function LocationsButtonComponent(http, uiBackground, areaService, aspectRatio) {
        this.http = http;
        this.uiBackground = uiBackground;
        this.areaService = areaService;
        this.aspectRatio = aspectRatio;
    }
    /**
     * this function is used to get device width
     */
    LocationsButtonComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
        //this.createDynamicCSS();
    };
    LocationsButtonComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    LocationsButtonComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.http.get("app/css.json")
            .subscribe(function (json) {
            _this.json = json.json();
            _this.createDynamicCSS();
        });
    };
    LocationsButtonComponent.prototype.extractData = function (res) {
        alert("dfdf");
        var body = res.json();
        return body.data || {};
    };
    LocationsButtonComponent.prototype.handleError = function (error) {
    };
    LocationsButtonComponent.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["LocationsButton"])["width"]);
        var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["LocationsButton"])["height"] / (this.json["LocationsButton"])["width"]);
        var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["LocationsButton"])["left"]);
        var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["LocationsButton"])["top"] / (this.json["LocationsButton"])["left"]);
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#LocationsButton": {
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
    };
    LocationsButtonComponent.prototype.GenerateLocationDiagram = function () {
        this.uiBackground.showArea = true;
        this.uiBackground.showLocation = false;
        this.uiBackground.showPeople = true;
        this.areaService.displayDiagram$.next(10);
    };
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], LocationsButtonComponent.prototype, "onResize", null);
    LocationsButtonComponent = __decorate([
        core_1.Component({
            selector: 'locationbutton',
            templateUrl: 'app/locationbutton/locationbutton.template.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, enterprise_component_1.EnterprisePaneComponent, areaService_1.AreaService, AspectRatioService_1.AspectRatioService])
    ], LocationsButtonComponent);
    return LocationsButtonComponent;
}());
exports.LocationsButtonComponent = LocationsButtonComponent;
//# sourceMappingURL=locationbutton.component.js.map