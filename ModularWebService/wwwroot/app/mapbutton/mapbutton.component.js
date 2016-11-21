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
var AspectRatioService_1 = require('../aspectratiocalculation/AspectRatioService');
var MapButtonComponent = (function () {
    function MapButtonComponent(http, aspectRatio) {
        this.http = http;
        this.aspectRatio = aspectRatio;
    }
    /**
     * this function is used to get device width
     */
    MapButtonComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
    };
    MapButtonComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    MapButtonComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.http.get("app/css.json")
            .subscribe(function (json) {
            _this.json = json.json();
            _this.createDynamicCSS();
        });
    };
    MapButtonComponent.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["MapButton"])["width"]);
        var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["MapButton"])["height"] / (this.json["MapButton"])["width"]);
        var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["MapButton"])["left"]);
        var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["MapButton"])["top"] / (this.json["MapButton"])["left"]);
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#MapButton": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "background-color": "#333333",
                "position": "absolute",
                "color": "white",
                "padding": "1%"
            }
        }); // end of dynamic css
    };
    MapButtonComponent.prototype.widthRatio = function (referenceWidth, deviceWidth) {
        return deviceWidth / referenceWidth;
    };
    MapButtonComponent.prototype.componentWidth = function (ratioWidth, referenceWidth) {
        return referenceWidth * ratioWidth;
    };
    MapButtonComponent.prototype.componentLeft = function (componentWidthRatio, componentJsonRefLeft) {
        return componentWidthRatio * componentJsonRefLeft;
    };
    MapButtonComponent.prototype.componentHeight = function (currentComponentWidth, componentJsonRefHeightRatio) {
        return currentComponentWidth * componentJsonRefHeightRatio;
    };
    MapButtonComponent.prototype.componentTop = function (componentLeft, componentJsonRefTopRatio) {
        return componentLeft * componentJsonRefTopRatio;
    };
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], MapButtonComponent.prototype, "onResize", null);
    MapButtonComponent = __decorate([
        core_1.Component({
            selector: 'mapbutton',
            templateUrl: 'app/mapbutton/mapbutton.template.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, AspectRatioService_1.AspectRatioService])
    ], MapButtonComponent);
    return MapButtonComponent;
}());
exports.MapButtonComponent = MapButtonComponent;
//# sourceMappingURL=mapbutton.component.js.map