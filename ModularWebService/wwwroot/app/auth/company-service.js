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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/catch');
require("rxjs/add/operator/map");
require("rxjs/add/operator/buffer");
var Rx_1 = require("rxjs/Rx");
var CompanyService = (function () {
    function CompanyService(http) {
        this.http = http;
        this.updateFindCompanyObservable = new Rx_1.Subject();
        this.updatePasswordObservable = new Rx_1.Subject();
        this.updateDomainObservable = new Rx_1.Subject();
        this.IntializeObservables();
    }
    CompanyService.prototype.IntializeObservables = function () {
        var _this = this;
        this.updateFindCompanyObservable.subscribe(function (val) {
            console.log(val);
            var body = JSON.stringify(val);
            console.log(body);
            var url = "/api/values/";
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.post(url, body, options).map(function (res) { return res.json(); }).
                subscribe(function (response) {
                console.log(response);
            }, function (error) { console.log(error); }, function () { console.log("completed."); });
        });
        this.updatePasswordObservable.subscribe(function (val) {
            console.log(val);
            var body = JSON.stringify(val);
            console.log(body);
            var url = "/Home/PostPassword";
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.post(url, body, options).map(function (res) { return res.json(); }).
                subscribe(function (response) {
                console.log(response);
            }, function (error) { console.log(error); }, function () { console.log("completed."); });
        });
        this.updateDomainObservable.subscribe(function (val) {
            console.log(val);
            var body = JSON.stringify(val);
            console.log(body);
            var url = "/Home/PostDomain";
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.post(url, body, options).map(function (res) { return res.json(); }).
                subscribe(function (response) {
                console.log(response);
            }, function (error) { console.log(error); }, function () { console.log("completed."); });
        });
    };
    CompanyService.prototype.createAuthorizationHeader = function (headers) {
        var token = localStorage.getItem('auth_token');
        headers.append('Authorization', 'Bearer ' + token);
    };
    CompanyService.prototype.get = function (url) {
        var headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    CompanyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CompanyService);
    return CompanyService;
}());
exports.CompanyService = CompanyService;
//# sourceMappingURL=company-service.js.map