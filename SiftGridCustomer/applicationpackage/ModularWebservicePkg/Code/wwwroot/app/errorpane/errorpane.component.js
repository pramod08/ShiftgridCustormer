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
var Observable_1 = require('rxjs/Observable');
var AspectRatioService_1 = require('../aspectratiocalculation/AspectRatioService');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var errorService_1 = require('./errorService');
var diagramService_1 = require("../diagram/diagramService");
var ErrorPaneComponent = (function () {
    function ErrorPaneComponent(http, inspector, errorService, aspectRatio) {
        var _this = this;
        this.http = http;
        this.inspector = inspector;
        this.errorService = errorService;
        this.aspectRatio = aspectRatio;
        var self = this;
        this.diagram = inspector._diagram;
        console.log(self.diagram);
        errorService.GetErrorsBy$.subscribe(function (res) { return _this.GetErrorsBy(res); });
        inspector.errorObjectObservable.map(function (res) { return res; })
            .subscribe(function (res) {
            _this.diagram = inspector._diagram;
            console.log(_this.diagram);
            console.log("errorObjectObservable subscribing");
            self.JsonId = res;
            Observable_1.Observable.from(self.JsonId)
                .filter(function (res) { return res["ValidationType"] == "Business"; })
                .subscribe(function (res) { return _this.ColoringObject(res, "blue"); });
            Observable_1.Observable.from(self.JsonId)
                .filter(function (res) { return res["ValidationType"] == "Application"; })
                .subscribe(function (res) { return self.ColoringObject(res, "pink"); });
            Observable_1.Observable.from(self.JsonId)
                .filter(function (res) { return res["ValidationType"] == "Compliance"; })
                .subscribe(function (res) { return self.ColoringObject(res, "red"); });
            //   }
            console.log("node lenght", self.diagram.model.nodeDataArray.length);
        }, function (err) { return console.log(err); }, function () { return console.log("completed error comp"); });
    }
    /**
     * this function is used to get device width
     */
    ErrorPaneComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
    };
    ErrorPaneComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    ErrorPaneComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.http.get("app/css.json")
            .subscribe(function (json) {
            _this.json = json.json();
            _this.createDynamicCSS();
        });
    };
    ErrorPaneComponent.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["FooterPane"])["width"]);
        var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["FooterPane"])["height"] / (this.json["FooterPane"])["width"]);
        var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["FooterPane"])["left"]);
        var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["FooterPane"])["top"] / (this.json["FooterPane"])["left"]);
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#FooterPane": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "margin-right": 0,
                "padding": 0,
                "background-color": "#333333",
                "color": "white",
                "position": "absolute"
            }
        }); // end of dynamic css
    };
    ErrorPaneComponent.prototype.ColoringObject = function (res, color) {
        var fieldColoring = {};
        var node = this.diagram.findNodeForKey(res["LocationId"]);
        console.log(node);
        this.diagram.model.setDataProperty(node.data, "color", color);
        fieldColoring[res["LocationId"]] = {};
        fieldColoring[res["LocationId"]][res["Missing_Field"]] = color;
        this.errorService.fieldColorEmitter$.next(fieldColoring);
    };
    ErrorPaneComponent.prototype.GetErrorsBy = function (guid) {
        console.log("Diagram id for error :" + guid);
        this.inspector.getErrors(guid);
    };
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], ErrorPaneComponent.prototype, "onResize", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', go.Diagram)
    ], ErrorPaneComponent.prototype, "diagram", void 0);
    ErrorPaneComponent = __decorate([
        core_1.Component({
            selector: 'errorpane',
            templateUrl: 'app/errorpane/errorpane.template.html',
            styleUrls: ['app/errorpane/error.style.css']
        }), 
        __metadata('design:paramtypes', [http_1.Http, diagramService_1.DiagramService, errorService_1.ErrorService, AspectRatioService_1.AspectRatioService])
    ], ErrorPaneComponent);
    return ErrorPaneComponent;
}());
exports.ErrorPaneComponent = ErrorPaneComponent;
//# sourceMappingURL=errorpane.component.js.map