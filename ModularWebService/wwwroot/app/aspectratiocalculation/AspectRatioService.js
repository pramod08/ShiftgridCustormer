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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/buffer");
var AspectRatioService = (function () {
    function AspectRatioService(http) {
        this.http = http;
    }
    AspectRatioService.prototype.GetCSSJSONData = function () {
        return this.http.get("app/css.json").map(function (res) { return res.json(); }).cache();
    };
    AspectRatioService.prototype.WidthRatio = function (referenceWidth, deviceWidth) {
        return deviceWidth / referenceWidth;
    };
    AspectRatioService.prototype.ComponentWidth = function (ratioWidth, referenceWidth) {
        return referenceWidth * ratioWidth;
    };
    AspectRatioService.prototype.ComponentLeft = function (componentWidthRatio, componentJsonRefLeft) {
        return componentWidthRatio * componentJsonRefLeft;
    };
    AspectRatioService.prototype.ComponentHeight = function (currentComponentWidth, componentJsonRefHeightRatio) {
        return currentComponentWidth * componentJsonRefHeightRatio;
    };
    AspectRatioService.prototype.ComponentTop = function (componentLeft, componentJsonRefTopRatio) {
        return componentLeft * componentJsonRefTopRatio;
    };
    AspectRatioService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AspectRatioService);
    return AspectRatioService;
}());
exports.AspectRatioService = AspectRatioService;
//# sourceMappingURL=AspectRatioService.js.map