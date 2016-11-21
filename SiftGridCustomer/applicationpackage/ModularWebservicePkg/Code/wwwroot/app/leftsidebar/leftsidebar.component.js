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
var LeftSidebarComponent = (function () {
    function LeftSidebarComponent(http, aspectRatio) {
        this.http = http;
        this.aspectRatio = aspectRatio;
    }
    /**
     * this function is used to get device width
     */
    LeftSidebarComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
    };
    LeftSidebarComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    LeftSidebarComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.http.get("app/css.json")
            .subscribe(function (json) {
            _this.json = json.json();
            _this.createDynamicCSS();
        });
    };
    LeftSidebarComponent.prototype.extractData = function (res) {
        alert("dfdf");
        var body = res.json();
        return body.data || {};
    };
    LeftSidebarComponent.prototype.handleError = function (error) {
    };
    LeftSidebarComponent.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["LeftSidebar"])["width"]);
        var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["LeftSidebar"])["height"] / (this.json["LeftSidebar"])["width"]);
        var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["LeftSidebar"])["left"]);
        var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["LeftSidebar"])["top"] / (this.json["LeftSidebar"])["top"]);
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#LeftSidebar": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentWidth,
                "margin-right": 0,
                "padding": 0,
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
    ], LeftSidebarComponent.prototype, "onResize", null);
    LeftSidebarComponent = __decorate([
        core_1.Component({
            selector: 'leftsidebar',
            templateUrl: 'app/leftsidebar/leftsidebar.template.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, AspectRatioService_1.AspectRatioService])
    ], LeftSidebarComponent);
    return LeftSidebarComponent;
}());
exports.LeftSidebarComponent = LeftSidebarComponent;
//# sourceMappingURL=leftsidebar.component.js.map