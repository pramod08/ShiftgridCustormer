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
var areaService_1 = require("../area/areaService");
var AspectRatioService_1 = require('../aspectratiocalculation/AspectRatioService');
var EnterprisePaneComponent = (function () {
    function EnterprisePaneComponent(http, areaService, aspectRatio) {
        var _this = this;
        this.http = http;
        this.areaService = areaService;
        this.aspectRatio = aspectRatio;
        this.showArea = true;
        this.showLocation = true;
        this.showGroup = true;
        this.showPeople = true;
        areaService.displayAreaTree$
            .subscribe(function (res) { return _this.displayArea(); });
        areaService.displayDiagramTree$
            .subscribe(function (res) { return _this.displayDiagram(); });
        areaService.displayPeopleDiagramTree$
            .subscribe(function (res) { return _this.displayPeopleDiagram(); });
    }
    EnterprisePaneComponent.prototype.displayArea = function () {
        this.showArea = false;
        this.showLocation = true;
        this.showPeople = true;
    };
    EnterprisePaneComponent.prototype.displayDiagram = function () {
        this.showArea = true;
        this.showLocation = false;
        this.showPeople = true;
    };
    EnterprisePaneComponent.prototype.displayPeopleDiagram = function () {
        this.showArea = true;
        this.showLocation = true;
        this.showPeople = false;
    };
    /**
     * this function is used to get device width
     */
    EnterprisePaneComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
        //this.createDynamicCSS();
    };
    EnterprisePaneComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.http.get("app/css.json")
            .subscribe(function (json) {
            _this.json = json.json();
            _this.createDynamicCSS();
        });
    };
    EnterprisePaneComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    EnterprisePaneComponent.prototype.extractData = function (res) {
        alert("dfdf");
        var body = res.json();
        return body.data || {};
    };
    EnterprisePaneComponent.prototype.handleError = function (error) {
    };
    EnterprisePaneComponent.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["EnteprisePane"])["width"]);
        var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["EnteprisePane"])["height"] / (this.json["EnteprisePane"])["width"]);
        var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["EnteprisePane"])["left"]);
        var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["EnteprisePane"])["top"] / (this.json["EnteprisePane"])["left"]);
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
    };
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], EnterprisePaneComponent.prototype, "onResize", null);
    EnterprisePaneComponent = __decorate([
        core_1.Component({
            selector: 'enterprise',
            templateUrl: 'app/EnteprisePane/enterprise.template.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, areaService_1.AreaService, AspectRatioService_1.AspectRatioService])
    ], EnterprisePaneComponent);
    return EnterprisePaneComponent;
}());
exports.EnterprisePaneComponent = EnterprisePaneComponent;
//# sourceMappingURL=enterprise.component.js.map