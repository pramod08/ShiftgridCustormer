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
var HeaderComponent = (function () {
    function HeaderComponent(http, aspectRatio) {
        this.http = http;
        this.aspectRatio = aspectRatio;
    }
    /**
     * this function is used to get device width
     */
    HeaderComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
    };
    HeaderComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    HeaderComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.http.get("app/css.json")
            .subscribe(function (json) {
            _this.json = json.json();
            _this.createDynamicCSS();
        });
    };
    HeaderComponent.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["Header"])["width"]);
        var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["Header"])["height"] / (this.json["Header"])["width"]);
        var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["Header"])["left"]);
        var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["Header"])["top"] / (this.json["Header"])["left"]);
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#Header": {
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
    ], HeaderComponent.prototype, "onResize", null);
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'header',
            templateUrl: 'app/Header/header.template.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, AspectRatioService_1.AspectRatioService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map