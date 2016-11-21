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
var UIBackground_component_1 = require('../UIBackground/UIBackground.component');
var AspectRatioService_1 = require('../aspectratiocalculation/AspectRatioService');
var NotesButtonComponent = (function () {
    function NotesButtonComponent(http, uiBackground, aspectRatio) {
        this.http = http;
        this.uiBackground = uiBackground;
        this.aspectRatio = aspectRatio;
    }
    /**
     * this function is used to get device width
     */
    NotesButtonComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
        //this.createDynamicCSS();
    };
    NotesButtonComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    NotesButtonComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.http.get("app/css.json")
            .subscribe(function (json) {
            _this.json = json.json();
            _this.createDynamicCSS();
        });
    };
    NotesButtonComponent.prototype.extractData = function (res) {
        alert("dfdf");
        var body = res.json();
        return body.data || {};
    };
    NotesButtonComponent.prototype.handleError = function (error) {
    };
    NotesButtonComponent.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["NotesButton"])["width"]);
        var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["NotesButton"])["height"] / (this.json["NotesButton"])["width"]);
        var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["NotesButton"])["left"]);
        var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["NotesButton"])["top"] / (this.json["NotesButton"])["left"]);
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#NotesButton": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "margin-right": 0,
                "padding": 0
            }
        }); // end of dynamic css
    };
    NotesButtonComponent.prototype.widthRatio = function (referenceWidth, deviceWidth) {
        return deviceWidth / referenceWidth;
    };
    NotesButtonComponent.prototype.componentWidth = function (ratioWidth, referenceWidth) {
        return referenceWidth * ratioWidth;
    };
    NotesButtonComponent.prototype.componentLeft = function (componentWidthRatio, componentJsonRefLeft) {
        return componentWidthRatio * componentJsonRefLeft;
    };
    NotesButtonComponent.prototype.componentHeight = function (currentComponentWidth, componentJsonRefHeightRatio) {
        return currentComponentWidth * componentJsonRefHeightRatio;
    };
    NotesButtonComponent.prototype.componentTop = function (componentLeft, componentJsonRefTopRatio) {
        return componentLeft * componentJsonRefTopRatio;
    };
    NotesButtonComponent.prototype.showNotePane = function () {
        if (this.uiBackground.showNotesPane === true) {
            this.uiBackground.showNotesPane = false;
            this.uiBackground.showDocumentPane = true;
            this.uiBackground.showErrorPane = true;
            this.uiBackground.showFuelConsumersPane = true;
        }
        else {
            this.uiBackground.showNotesPane = true;
        }
    };
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NotesButtonComponent.prototype, "onResize", null);
    NotesButtonComponent = __decorate([
        core_1.Component({
            selector: 'notesbutton',
            templateUrl: 'app/notesbutton/notesbutton.template.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, UIBackground_component_1.UIBackgroundComponent, AspectRatioService_1.AspectRatioService])
    ], NotesButtonComponent);
    return NotesButtonComponent;
}());
exports.NotesButtonComponent = NotesButtonComponent;
//# sourceMappingURL=notesbutton.component.js.map