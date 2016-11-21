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
var peopleService_1 = require('../people/peopleService');
var enterprise_component_1 = require('../EnteprisePane/enterprise.component');
var areaService_1 = require('../area/areaService');
var AspectRatioService_1 = require('../aspectratiocalculation/AspectRatioService');
var PeopleButtonComponent = (function () {
    function PeopleButtonComponent(http, peopleService, areaService, uiBackground, aspectRatio) {
        this.http = http;
        this.peopleService = peopleService;
        this.areaService = areaService;
        this.uiBackground = uiBackground;
        this.aspectRatio = aspectRatio;
    }
    /**
     * this function is used to get device width
     */
    PeopleButtonComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
        //this.createDynamicCSS();
    };
    PeopleButtonComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    PeopleButtonComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.http.get("app/css.json")
            .subscribe(function (json) {
            _this.json = json.json();
            _this.createDynamicCSS();
        });
    };
    PeopleButtonComponent.prototype.extractData = function (res) {
        alert("dfdf");
        var body = res.json();
        return body.data || {};
    };
    PeopleButtonComponent.prototype.handleError = function (error) {
    };
    PeopleButtonComponent.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["PeopleButton"])["width"]);
        var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["PeopleButton"])["height"] / (this.json["PeopleButton"])["width"]);
        var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["PeopleButton"])["left"]);
        var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["PeopleButton"])["top"] / (this.json["PeopleButton"])["left"]);
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
    };
    PeopleButtonComponent.prototype.GeneratePeopleDiagram = function (diagramID) {
        this.uiBackground.showArea = true;
        this.uiBackground.showLocation = true;
        this.uiBackground.showPeople = false;
        this.areaService.displayPeopleDiagram$.next(10);
        this.peopleService.CreatePeopleDiagram$.next(diagramID);
    };
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], PeopleButtonComponent.prototype, "onResize", null);
    PeopleButtonComponent = __decorate([
        core_1.Component({
            selector: 'peoplebutton',
            templateUrl: 'app/peoplebutton/peoplebutton.template.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, peopleService_1.PeopleService, areaService_1.AreaService, enterprise_component_1.EnterprisePaneComponent, AspectRatioService_1.AspectRatioService])
    ], PeopleButtonComponent);
    return PeopleButtonComponent;
}());
exports.PeopleButtonComponent = PeopleButtonComponent;
//# sourceMappingURL=peoplebutton.component.js.map