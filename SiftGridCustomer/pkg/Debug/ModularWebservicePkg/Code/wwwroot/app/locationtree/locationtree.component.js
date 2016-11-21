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
var LocationTree = (function () {
    function LocationTree(http) {
        this.http = http;
    }
    /**
     * this function is used to get device width
     */
    LocationTree.prototype.ngOnInit = function () {
        this.getCSSJSONData();
        //this.createDynamicCSS();
    };
    LocationTree.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    LocationTree.prototype.getCSSJSONData = function () {
        var _this = this;
        this.http.get("app/css.json")
            .subscribe(function (json) {
            _this.json = json.json();
            _this.createDynamicCSS();
        });
    };
    LocationTree.prototype.handleError = function (error) {
    };
    LocationTree.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.widthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.componentWidth(currentWidthRatio, (this.json["LocationTree"])["width"]);
        var currentComponentHeight = this.componentHeight(currentComponentWidth, (this.json["LocationTree"])["height"] / (this.json["LocationTree"])["width"]);
        var currentComponentLeft = this.componentLeft(currentWidthRatio, (this.json["LocationTree"])["left"]);
        var currentComponentTop = this.componentTop(currentComponentLeft, (this.json["LocationTree"])["top"] / (this.json["LocationTree"])["left"]);
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#LocationTree": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "margin-right": 0,
                "padding": 0,
                "background-color": "#1c1a1a",
                "color": "white",
                "position": "absolute"
            }
        }); // end of dynamic css
    };
    LocationTree.prototype.widthRatio = function (referenceWidth, deviceWidth) {
        return deviceWidth / referenceWidth;
    };
    LocationTree.prototype.componentWidth = function (ratioWidth, referenceWidth) {
        return referenceWidth * ratioWidth;
    };
    LocationTree.prototype.componentLeft = function (componentWidthRatio, componentJsonRefLeft) {
        return componentWidthRatio * componentJsonRefLeft;
    };
    LocationTree.prototype.componentHeight = function (currentComponentWidth, componentJsonRefHeightRatio) {
        return currentComponentWidth * componentJsonRefHeightRatio;
    };
    LocationTree.prototype.componentTop = function (componentLeft, componentJsonRefTopRatio) {
        return componentLeft * componentJsonRefTopRatio;
    };
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], LocationTree.prototype, "onResize", null);
    LocationTree = __decorate([
        core_1.Component({
            selector: 'locationtree',
            templateUrl: 'app/locationtree/locationtree.template.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LocationTree);
    return LocationTree;
}());
exports.LocationTree = LocationTree;
//# sourceMappingURL=locationtree.component.js.map