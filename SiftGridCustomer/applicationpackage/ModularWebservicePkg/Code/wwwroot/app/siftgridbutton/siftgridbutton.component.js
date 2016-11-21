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
var SiftGridButtonComponent = (function () {
    function SiftGridButtonComponent(http, aspectRatio) {
        this.http = http;
        this.aspectRatio = aspectRatio;
    }
    /**
     * this function is used to get device width
     */
    SiftGridButtonComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
    };
    SiftGridButtonComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    SiftGridButtonComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.http.get("app/css.json")
            .subscribe(function (json) {
            _this.json = json.json();
            _this.createDynamicCSS();
        });
    };
    SiftGridButtonComponent.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["SiftGridButton"])["width"]);
        var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["SiftGridButton"])["height"] / (this.json["SiftGridButton"])["width"]);
        var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["SiftGridButton"])["left"]);
        var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["SiftGridButton"])["top"] / (this.json["SiftGridButton"])["left"]);
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#SiftGridButton": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "background-color": "#333333",
                "position": "absolute"
            }
        }); // end of dynamic css
        var logoCurrentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["SiftGridLogo"])["width"]);
        var logoCurrentComponentHeight = this.aspectRatio.ComponentHeight(logoCurrentComponentWidth, (this.json["SiftGridLogo"])["height"] / (this.json["SiftGridLogo"])["width"]);
        var logoCurrentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["SiftGridLogo"])["left"]);
        var logoCurrentComponentTop = this.aspectRatio.ComponentTop(logoCurrentComponentLeft, (this.json["SiftGridLogo"])["top"] / (this.json["SiftGridLogo"])["left"]);
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#SiftGridLogo": {
                "height": logoCurrentComponentHeight,
                "width": logoCurrentComponentWidth,
                "margin-left": logoCurrentComponentLeft,
                "margin-top": logoCurrentComponentTop,
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
    ], SiftGridButtonComponent.prototype, "onResize", null);
    SiftGridButtonComponent = __decorate([
        core_1.Component({
            selector: 'siftgridbutton',
            template: "<div id=\"SiftGridButton\">\n    <a href=\"#\" ><img src=\"images/Layer-SiftGridLogo-mum0mtzc.png\" id=\"SiftGridLogo\" >\n    </a>\n        "
        }), 
        __metadata('design:paramtypes', [http_1.Http, AspectRatioService_1.AspectRatioService])
    ], SiftGridButtonComponent);
    return SiftGridButtonComponent;
}());
exports.SiftGridButtonComponent = SiftGridButtonComponent;
//# sourceMappingURL=siftgridbutton.component.js.map