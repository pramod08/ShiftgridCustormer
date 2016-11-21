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
var Authenticator_1 = require('../auth/Authenticator');
require("rxjs/add/operator/map");
require("rxjs/add/operator/buffer");
var Rx_1 = require("rxjs/Rx");
var areaService_1 = require('../area/areaService');
var SearchService = (function () {
    function SearchService(http, _authenticator, areaService) {
        var _this = this;
        this.http = http;
        this._authenticator = _authenticator;
        this.areaService = areaService;
        //InsertObjectDocObservable = new Subject();
        //TexteditingObjectDocObservable = new Subject();
        //createDiagram$ = new Subject();
        //deletingDocObservable = new Subject();
        //constructor(private http: Http) {
        //    this.InsertObjectDocObservable.subscribe(val => {
        //        let body = JSON.stringify(val);
        //        let url = "/Home/InsertDocObject";
        //        let headers = new Headers({ 'Content-Type': 'application/json' });
        //        let options = new RequestOptions({ headers: headers });
        //        this.http.post(url, body, options).map(res => res).
        //            subscribe((response) => { console.log(response) },
        //            (error) => { console.log(error); },
        //            () => { console.log("Insert document completed."); });
        //    });
        //    this.TexteditingObjectDocObservable.subscribe(val => {
        //        let body = JSON.stringify(val);
        //        let url = "/Home/EditingTextDocObject";
        //        let headers = new Headers({ 'Content-Type': 'application/json' });
        //        let options = new RequestOptions({ headers: headers });
        //        this.http.put(url, body, options).map(res => res).
        //            subscribe((response) => { console.log(response) },
        //            (error) => { console.log(error); },
        //            () => { console.log("EditingText document completed."); });
        //    });
        //    this.deletingDocObservable.subscribe(val => {
        //        // let body = JSON.stringify(val);
        //        console.log("deleting doc val  id " + val);
        //        let url = `/Home/DeletingDocObject?deleteid=${val}`;
        //        let headers = new Headers({ 'Content-Type': 'application/json' });
        //        let options = new RequestOptions({ headers: headers });
        //        this.http.delete(url, options).map(res => res).
        //            subscribe((response) => { console.log(response) },
        //            (error) => { console.log(error); },
        //            () => { console.log("EditingText document completed."); });
        //    });
        //}
        //search(search: string) {
        //    return this.http.get(`/Home/GetSearchDocument?search=${search}`).map(res => {
        //        console.log(res.json());
        //        return res.json();
        //        //   this.filteredList = res.json();
        //    }).cache();
        //}
        //Getid_Name(item: string) {
        //    return this.http.get(`/Home/GetSearchDetails?item=${item}`).map(res => { return res.json() }).cache();
        //}
        //Areas 
        this.InsertObjectDocObservable = new Rx_1.Subject();
        this.TexteditingObjectDocObservable = new Rx_1.Subject();
        this.deletingDocObservable = new Rx_1.Subject();
        this.createDiagram$ = new Rx_1.Subject();
        //Location Group Names
        this.InsertLoc_GroupDocObservable = new Rx_1.Subject();
        this.Textediting_groupObjDocObservable = new Rx_1.Subject();
        this.deletingGroupDocObservable = new Rx_1.Subject();
        this.createDiagramWithLocation$ = new Rx_1.Subject();
        //ungroup 
        this.GetGroupID = new Rx_1.Subject();
        // People 
        this.InsertPeopleDocObservable = new Rx_1.Subject();
        this.EditPeopleDocObservable = new Rx_1.Subject();
        this.deletePeopleDocObservable = new Rx_1.Subject();
        this.createpeopleDiagramWithLocation$ = new Rx_1.Subject();
        // People Title
        this.InsertPeoplewithTitleDocObservable = new Rx_1.Subject();
        this.EditPeoplewithTitleDocObservable = new Rx_1.Subject();
        //Areas
        this.InsertObjectDocObservable.subscribe(function (val) {
            var body = JSON.stringify(val);
            var url = "/Home/InsertAreaDocObject";
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.post(url, body, options).map(function (res) { return res; }).
                subscribe(function (response) { console.log(response); }, function (error) { console.log(error); }, function () { console.log("Insert document completed."); });
        });
        this.TexteditingObjectDocObservable.subscribe(function (val) {
            var body = JSON.stringify(val);
            var url = "/Home/UpdateTextAreaDocObject";
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.put(url, body, options).map(function (res) { return res; }).
                subscribe(function (response) { console.log(response); }, function (error) { console.log(error); }, function () { console.log("EditingText document completed."); });
        });
        this.deletingDocObservable.subscribe(function (val) {
            // let body = JSON.stringify(val);
            console.log("deleting doc val  id " + val);
            var url = ("/Home/DeletingAreaDocObject?deleteid=" + val) + '&secretKey=' + _this.tenantName + "-" + _this.tenantId;
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.delete(url, options).map(function (res) { return res; }).
                subscribe(function (response) { console.log(response); }, function (error) { console.log(error); }, function () { console.log("deleting document completed."); });
        });
        //location Group
        this.InsertLoc_GroupDocObservable.subscribe(function (val) {
            var body = JSON.stringify(val);
            var url = "/Home/InsertLoc_GroupDocObject";
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.post(url, body, options).map(function (res) { return res; }).
                subscribe(function (response) { console.log(response); }, function (error) { console.log(error); }, function () { console.log("Insert document completed."); });
        });
        this.Textediting_groupObjDocObservable.subscribe(function (val) {
            var body = JSON.stringify(val);
            var url = "/Home/EditingText_GroupDocObject";
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.put(url, body, options).map(function (res) { return res; }).
                subscribe(function (response) { console.log(response); }, function (error) { console.log(error); }, function () { console.log("EditingText document completed."); });
        });
        this.deletingGroupDocObservable.subscribe(function (val) {
            // let body = JSON.stringify(val);
            console.log("deleting doc val  id " + val);
            var url = ("/Home/DeletingLoc_GroupDocObject?deleteid=" + val) + '&secretKey=' + _this.tenantName + "-" + _this.tenantId;
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.delete(url, options).map(function (res) { return res; }).
                subscribe(function (response) { console.log(response); }, function (error) { console.log(error); }, function () { console.log("deleting document completed."); });
        });
        // People 
        this.InsertPeopleDocObservable.subscribe(function (val) {
            var body = JSON.stringify(val);
            var url = "/Home/InsertPeopleDocObject";
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.post(url, body, options).map(function (res) { return res; }).
                subscribe(function (response) { console.log(response); }, function (error) { console.log(error); }, function () { console.log("Insert people document completed."); });
        });
        this.EditPeopleDocObservable.subscribe(function (val) {
            var body = JSON.stringify(val);
            var url = "/Home/EditingText_PeopleDocObject";
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.put(url, body, options).map(function (res) { return res; }).
                subscribe(function (response) { console.log(response); }, function (error) { console.log(error); }, function () { console.log("EditingText document completed."); });
        });
        this.deletePeopleDocObservable.subscribe(function (val) {
            // let body = JSON.stringify(val);
            console.log("deleting doc val  id " + val);
            var url = ("/Home/DeletingPeopleDocObject?deleteid=" + val) + '&secretKey=' + _this.tenantName + "-" + _this.tenantId;
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.delete(url, options).map(function (res) { return res; }).
                subscribe(function (response) { console.log(response); }, function (error) { console.log(error); }, function () { console.log("deleting document completed."); });
        });
        this.InsertPeoplewithTitleDocObservable.subscribe(function (val) {
            var body = JSON.stringify(val);
            var url = "/Home/InsertPeopleWithTitleDocObject";
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.post(url, body, options).map(function (res) { return res; }).
                subscribe(function (response) { console.log(response); }, function (error) { console.log(error); }, function () { console.log("Insert people document completed."); });
        });
        this.EditPeoplewithTitleDocObservable.subscribe(function (val) {
            var body = JSON.stringify(val);
            var url = "/Home/EditingText_PeopleTitleDocObject";
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.put(url, body, options).map(function (res) { return res; }).
                subscribe(function (response) { console.log(response); }, function (error) { console.log(error); }, function () { console.log("EditingText document completed."); });
        });
        this.tenantName = this._authenticator.TenantName;
    }
    SearchService.prototype.search = function (search) {
        return this.http.get(("/Home/GetSearchDocument?search=" + search) + '&secretKey=' + this.tenantName + "-" + this.tenantId)
            .map(function (res) {
            console.log(res.json());
            return res.json();
            //   this.filteredList = res.json();
        }).cache();
    };
    SearchService.prototype.Getid_Name = function (item) {
        return this.http.get(("/Home/GetSearchDetails?item=" + item) + '&secretKey=' + this.tenantName + "-" + this.tenantId)
            .map(function (res) {
            console.log("get id_Name", res);
            return res.json();
        }).cache();
    };
    SearchService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, Authenticator_1.Authenticator, areaService_1.AreaService])
    ], SearchService);
    return SearchService;
}());
exports.SearchService = SearchService;
//# sourceMappingURL=searchService.js.map