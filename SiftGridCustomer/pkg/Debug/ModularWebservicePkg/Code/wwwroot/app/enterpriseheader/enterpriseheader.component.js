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
var EntepriseHeaderComponent = (function () {
    function EntepriseHeaderComponent(http, aspectRatio) {
        this.http = http;
        this.aspectRatio = aspectRatio;
    }
    /**
     * this function is used to get device width
     */
    EntepriseHeaderComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
        //this.createDynamicCSS();
    };
    EntepriseHeaderComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    EntepriseHeaderComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.http.get("app/css.json")
            .subscribe(function (json) {
            _this.json = json.json();
            _this.createDynamicCSS();
        });
    };
    EntepriseHeaderComponent.prototype.extractData = function (res) {
        alert("dfdf");
        var body = res.json();
        return body.data || {};
    };
    EntepriseHeaderComponent.prototype.handleError = function (error) {
    };
    EntepriseHeaderComponent.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["EntepriseHeader"])["width"]);
        var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["EntepriseHeader"])["height"] / (this.json["EntepriseHeader"])["width"]);
        var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["EntepriseHeader"])["left"]);
        var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["EntepriseHeader"])["top"] / (this.json["EntepriseHeader"])["left"]);
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#EntepriseHeader": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "margin-right": 0,
                "padding": 0,
                "background-color": "#1c1a1a"
            }
        }); // end of dynamic css
    };
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], EntepriseHeaderComponent.prototype, "onResize", null);
    EntepriseHeaderComponent = __decorate([
        core_1.Component({
            selector: 'enterpriseheader',
            templateUrl: 'app/enterpriseheader/enterpriseheader.template.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, AspectRatioService_1.AspectRatioService])
    ], EntepriseHeaderComponent);
    return EntepriseHeaderComponent;
}());
exports.EntepriseHeaderComponent = EntepriseHeaderComponent;
//# sourceMappingURL=enterpriseheader.component.js.map