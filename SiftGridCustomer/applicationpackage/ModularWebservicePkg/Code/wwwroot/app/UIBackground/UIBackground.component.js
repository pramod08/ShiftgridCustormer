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
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var areaService_1 = require('../area/areaService');
var AspectRatioService_1 = require('../aspectratiocalculation/AspectRatioService');
var UIBackgroundComponent = (function () {
    function UIBackgroundComponent(aspectRatio, areaService) {
        this.aspectRatio = aspectRatio;
        this.areaService = areaService;
        this.showEnterprisePane = true;
        this.showInfoPane = true;
        this.showDocumentPane = true;
        this.showErrorPane = true;
        this.showFuelConsumersPane = true;
        this.showNotesPane = true;
    }
    /**
     * this function is used to get device width
     */
    UIBackgroundComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
    };
    UIBackgroundComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    UIBackgroundComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.aspectRatio.GetCSSJSONData().subscribe(function (json) {
            _this.json = json;
            _this.createDynamicCSS();
        });
    };
    UIBackgroundComponent.prototype.createDynamicCSS = function () {
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
            "#UIBackground": {
                height: 1024,
                width: deviceWidth,
                left: 0,
                top: 0,
                position: "absolute"
            },
            "#container": {
                height: 1024,
                width: deviceWidth,
                left: 0,
                top: 0,
                position: "absolute"
            }
        }); // end of dynamic css
    };
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], UIBackgroundComponent.prototype, "onResize", null);
    UIBackgroundComponent = __decorate([
        core_1.Component({
            selector: 'UIBackground',
            templateUrl: 'app/UIBackground/uibackground.template.html'
        }), 
        __metadata('design:paramtypes', [AspectRatioService_1.AspectRatioService, areaService_1.AreaService])
    ], UIBackgroundComponent);
    return UIBackgroundComponent;
}());
exports.UIBackgroundComponent = UIBackgroundComponent;
//# sourceMappingURL=UIBackground.component.js.map