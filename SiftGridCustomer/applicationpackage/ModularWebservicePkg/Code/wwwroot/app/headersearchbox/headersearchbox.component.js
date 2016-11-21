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
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var searchService_1 = require("../search/searchService");
var AspectRatioService_1 = require('../aspectratiocalculation/AspectRatioService');
var areaService_1 = require('../area/areaService');
var Authenticator_1 = require('../auth/Authenticator');
var HeaderSeachboxComponent = (function () {
    function HeaderSeachboxComponent(http, searchservice, aspectRatio, areaService, _authenticator) {
        this.http = http;
        this.searchservice = searchservice;
        this.aspectRatio = aspectRatio;
        this.areaService = areaService;
        this._authenticator = _authenticator;
        this.filteredList = [];
        this.query = '';
        searchservice.tenantName = _authenticator.TenantName;
        areaService.GetTenantId(_authenticator.TenantName).do(function (res) { return console.log(res); })
            .subscribe(function (res) { return searchservice.tenantId = res; });
    }
    /**
     * this function is used to get device width
     */
    HeaderSeachboxComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
        //this.createDynamicCSS();
    };
    HeaderSeachboxComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    HeaderSeachboxComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.http.get("app/css.json")
            .subscribe(function (json) {
            _this.json = json.json();
            _this.createDynamicCSS();
        });
    };
    HeaderSeachboxComponent.prototype.handleError = function (error) {
    };
    HeaderSeachboxComponent.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["HeaderSeachbox"])["width"]);
        var currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["HeaderSeachbox"])["height"] / (this.json["HeaderSeachbox"])["width"]);
        var currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["HeaderSeachbox"])["left"]);
        var currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["HeaderSeachbox"])["top"] / (this.json["HeaderSeachbox"])["left"]);
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#HeaderSeachbox": {
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
        var suggestionComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["SuggestionSeachbox"])["width"]);
        var suggesstionComponentHeight = this.aspectRatio.ComponentHeight(suggestionComponentWidth, (this.json["SuggestionSeachbox"])["height"] / (this.json["SuggestionSeachbox"])["width"]);
        var suggestionComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["SuggestionSeachbox"])["left"]);
        var suggestionComponentTop = this.aspectRatio.ComponentTop(suggestionComponentLeft, (this.json["SuggestionSeachbox"])["top"] / (this.json["SuggestionSeachbox"])["left"]);
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            ".SuggestionSeachbox": {
                "height": 0,
                "width": suggestionComponentWidth,
                "margin-left": suggestionComponentLeft,
                "margin-top": suggestionComponentTop,
                "margin-right": 0,
                "padding": 0,
                "background-color": "#333333",
                "color": "white",
                "position": "absolute"
            }
        }); // end of dynamic css
    };
    HeaderSeachboxComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var input = document.getElementById('HeaderSeachbox');
        //console.log(input);
        var search$ = Observable_1.Observable.fromEvent(input, 'keyup')
            .do(function () {
            console.log(input.value);
            if (input.value.length === 0)
                _this.filteredList = [];
        })
            .filter(function (val) { return input.value.length > 0; })
            .switchMap(function () {
            return _this.searchservice.search(input.value);
        });
        search$.subscribe(function (res) {
            //console.log(res);
            _this.filteredList = res;
            //console.log(this.filteredList);
        });
        console.log("ok");
    };
    HeaderSeachboxComponent.prototype.select = function (item) {
        var _this = this;
        console.log(item);
        this.query = item;
        this.searchservice.Getid_Name(item)
            .subscribe(function (res) {
            console.log(res);
            if (res[0]['Type'] === "Areas")
                _this.searchservice.createDiagram$.next(res);
            if (res[0]['Type'] === "Location Group") {
                var data = res;
                _this.searchservice.createDiagram$.next(res);
                Observable_1.Observable.of(10).delay(2000).subscribe(function (res) {
                    _this.searchservice.createDiagramWithLocation$.next(data);
                });
            }
            if (res[0]['Type'] === "People") {
                _this.searchservice.createpeopleDiagramWithLocation$.next(res);
            }
        }, function (err) { return console.log(err); }, function () { return console.log("done"); });
        this.filteredList = [];
        this.selectedIdx = -1;
    };
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], HeaderSeachboxComponent.prototype, "onResize", null);
    HeaderSeachboxComponent = __decorate([
        core_1.Component({
            selector: 'headersearchbox',
            templateUrl: 'app/headersearchbox/headersearchbox.template.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, searchService_1.SearchService, AspectRatioService_1.AspectRatioService, areaService_1.AreaService, Authenticator_1.Authenticator])
    ], HeaderSeachboxComponent);
    return HeaderSeachboxComponent;
}());
exports.HeaderSeachboxComponent = HeaderSeachboxComponent;
//# sourceMappingURL=headersearchbox.component.js.map