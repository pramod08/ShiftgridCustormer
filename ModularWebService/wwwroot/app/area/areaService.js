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
var diagramService_1 = require('../diagram/diagramService');
var Authenticator_1 = require('../auth/Authenticator');
require("rxjs/add/operator/map");
require("rxjs/add/operator/buffer");
var Rx_1 = require("rxjs/Rx");
var Rx_2 = require("rxjs/Rx");
/// <summary>
/// Injecting Inspector to all components.
/// </sumary>
var AreaService = (function () {
    function AreaService(http, diagramService, _authenticator) {
        this.http = http;
        this.diagramService = diagramService;
        this._authenticator = _authenticator;
        this.createObjectInfoObservable = new Rx_1.Subject();
        this.createDiagramInfoObservable = new Rx_1.Subject();
        this.getInfoPaneObservable = new Rx_1.Subject();
        this.DiagramJson = new Rx_1.Subject();
        this.infoApiCache = new Rx_2.ReplaySubject();
        this.updateDiagramInfoObservable = new Rx_1.Subject();
        this.updateInfoPaneObservable = new Rx_1.Subject();
        this.updateObjectProperties = new Rx_1.Subject();
        this.updateAreaInfoObservable = new Rx_1.Subject();
        this.createAreaInfoObservable = new Rx_1.Subject();
        this.errorObjectObservable = new Rx_1.Subject();
        this.getDiagramObservable = new Rx_1.Subject();
        this.showDiagramInfoObservable = new Rx_1.Subject();
        this.displayAreaPaletteDiagram$ = new Rx_1.Subject();
        this.displayDiagram$ = new Rx_1.Subject();
        this.displayPeopleDiagram$ = new Rx_1.Subject();
        this.displayAreaTree$ = new Rx_1.Subject();
        this.displayDiagramTree$ = new Rx_1.Subject();
        this.displayPeopleDiagramTree$ = new Rx_1.Subject();
        this.showEnterprisePane$ = new Rx_1.Subject();
        this.CreateAreasDiagram$ = new Rx_1.Subject();
        this.CreateAreasPaletteDiagram$ = new Rx_1.Subject();
        this.cachedData = new Map();
        this.IntializeObservables();
    }
    AreaService.prototype.IntializeObservables = function () {
        var _this = this;
        this.createObjectInfoObservable.subscribe(function (val) {
            var url = "/Home/CreateObjectInfo";
            var body = JSON.stringify(val);
            console.log(val);
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            var result = null;
            _this.http.post(url, body, options).map(function (res) { return res.json(); }).
                subscribe(function (response) {
                console.log(response);
                //this.updateInfoPaneObservable.next(response)
            }, function (error) { console.log(error); }, function () { console.log("completed."); });
        });
        this.getInfoPaneObservable.subscribe(function (val) {
            var url = "/Home/GetInfo?nodeInfo=" + val;
            _this.http.get(url).map(function (res) { return res.json(); }).
                subscribe(function (response) { console.log(response); _this.updateInfoPaneObservable.next(response); }, function (error) { console.log(error); }, function () { console.log("completed."); });
        });
        this.createDiagramInfoObservable.subscribe(function (val) {
            console.log("val is diagramId :" + val);
            var url = "/Home/GetDiagramInfo?diagramId=" + val;
            _this.http.get(url).map(function (res) { return res.json(); }).cache().
                subscribe(function (response) {
                console.log("Response for diagram info :" + response);
                _this.showDiagramInfoObservable.next(response);
            }, function (error) { console.log(error); }, function () { console.log("completed."); });
        });
        this.getDiagramObservable.subscribe(function (val) {
            var url = "/Home/GetInfo?nodeInfo=" + val;
            _this.http.get(url).map(function (res) { return res.json(); }).cache().
                subscribe(function (response) { console.log(response); _this.updateInfoPaneObservable.next(response); }, function (error) { console.log(error); }, function () { console.log("completed."); });
        });
        this.updateDiagramInfoObservable.subscribe(function (val) {
            var body = JSON.stringify(val);
            var url = "/Home/Put";
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.put(url, body, options).map(function (res) { return res.json(); }).cache().
                subscribe(function (response) { console.log(response); }, function (error) { console.log(error); }, function () { console.log("completed."); });
        });
        this.updateObjectProperties.subscribe(function (res) {
            var body = JSON.stringify(res);
            console.log("request to UpdateProps");
            console.log(res);
            console.log(body);
            var url = "/Home/UpdateObjectProps";
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.put(url, body, options).map(function (res) { return res.json(); }).
                subscribe(function (response) {
                console.log("Response from UpdateProps");
                _this.updateInfoPaneObservable.next(response);
                console.log(response);
            }, function (error) { console.log(error); }, function () { console.log("completed."); });
        });
        this.updateAreaInfoObservable.subscribe(function (val) {
            var body = JSON.stringify(val);
            var url = "/Home/PutArea";
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.put(url, body, options).map(function (res) { return res.json(); }).cache().
                subscribe(function (response) { console.log(response); }, function (error) { console.log(error); }, function () { console.log("completed."); });
        });
    };
    AreaService.prototype.getDiagramJson = function (diagramId) {
        return this.http.get("/Home/GetDiagramJson?diagramId=" + diagramId)
            .map(function (res) { return res.json(); }).cache();
    };
    AreaService.prototype.init = function (diagram) {
        this._diagram = diagram;
        var self = this;
    };
    AreaService.prototype.getErrors = function (id) {
        var _this = this;
        console.log("Inside getErrors, guid :" + id);
        this.http.get('/Home/GetDocument?diagramId=' + id + "&tenantName=" + this._authenticator.TenantName + "&tenantId=" + this.diagramService.tenantId)
            .map(function (res) { return res.json(); }).subscribe(function (res) {
            //console.log(res);
            _this.errorObjectObservable.next(res);
        }, function (error) { console.log(error); }, function () { console.log("Get Error list completed"); });
    };
    AreaService.prototype.UpdateAreaDiagramJson = function (diagramData, tenantName) {
        console.log(diagramData);
        var url = "/Home/UpdateAreaDiagramJson";
        var body = { "data": JSON.stringify(diagramData), "tenantName": tenantName };
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var result = null;
        return this.http.put(url, body, options).map(function (res) { return res.json(); });
    };
    AreaService.prototype.GetTenantId = function (tenantName) {
        return this.http.get('/Home/GetTenantId?tenantName=' + tenantName).do(function (res) { return console.log(res); })
            .map(function (res) { return res.text(); });
    };
    AreaService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, diagramService_1.DiagramService, Authenticator_1.Authenticator])
    ], AreaService);
    return AreaService;
}());
exports.AreaService = AreaService;
//# sourceMappingURL=areaService.js.map