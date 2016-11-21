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
var Authenticator_1 = require('../auth/Authenticator');
var ProfileNameComponent = (function () {
    function ProfileNameComponent(http, aspectRatio, _authenticator) {
        this.http = http;
        this.aspectRatio = aspectRatio;
        this._authenticator = _authenticator;
    }
    /**
     * this function is used to get device width
     */
    ProfileNameComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
    };
    ProfileNameComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    ProfileNameComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.http.get("app/css.json")
            .subscribe(function (json) {
            _this.json = json.json();
            _this.createDynamicCSS();
        });
    };
    ProfileNameComponent.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["ProfileName"])["width"]);
        var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["ProfileName"])["height"] / (this.json["ProfileName"])["width"]);
        var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["ProfileName"])["left"]);
        var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["ProfileName"])["top"] / (this.json["ProfileName"])["left"]);
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#ProfileName": {
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
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], ProfileNameComponent.prototype, "onResize", null);
    ProfileNameComponent = __decorate([
        core_1.Component({
            selector: 'profilename',
            templateUrl: 'app/profilename/profilename.template.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, AspectRatioService_1.AspectRatioService, Authenticator_1.Authenticator])
    ], ProfileNameComponent);
    return ProfileNameComponent;
}());
exports.ProfileNameComponent = ProfileNameComponent;
//# sourceMappingURL=profilename.component.js.map