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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var Authenticator_1 = require('./Authenticator');
var Observable_1 = require('rxjs/Observable');
var http_1 = require('@angular/http');
require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var AuthenticatedHttpService = (function () {
    function AuthenticatedHttpService(http, authenticator) {
        this._authenticator = authenticator;
        this._http = http;
    }
    AuthenticatedHttpService.prototype.createAuthorizationHeader = function (headers) {
        headers.append('Authorization', 'Bearer ' + this._authenticator.getAccessToken());
        headers.append('Content-Type', 'application/json');
        //console.log("--Header---"+headers)
    };
    AuthenticatedHttpService.prototype.createAuthorizationHeaderGoDady = function (headers) {
        console.log("--Authorization  godady account---");
        headers.append('Authorization', 'sso-key ' + '' + 'dKYSZpfcEdo2_XBy6SmUB95CDe1gknX1Mey' + ':' + '8J6mr87eMP1wd5K9SnvYMk');
        headers.append('Content-Type', 'application/json');
        //console.log("--Header---"+headers)
    };
    AuthenticatedHttpService.prototype.createAuthorizationHeaderSendWithUS = function (headers) {
        headers.append('Authorization', 'Basic ' + btoa('live_e25beff59128a8eb6fcca5e59fe4780705e0c093:'));
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        headers.append('Access-Control-Allow-Credentials', 'true');
    };
    AuthenticatedHttpService.prototype.sendmail = function (url, data) {
        console.log("send mail  postData");
        var headers = new http_1.Headers({
            'X-Requested-With': 'XMLHttpRequest'
        });
        this.createAuthorizationHeaderSendWithUS(headers);
        return this._http.post(url, data, {
            headers: headers,
        });
    };
    AuthenticatedHttpService.prototype.get = function (url) {
        var headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        return this._http.get(url, { headers: headers })
            .map(function (res) { return res.json(); })
            .publishReplay(-1)
            .refCount()
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    AuthenticatedHttpService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Inject(Authenticator_1.Authenticator)), 
        __metadata('design:paramtypes', [http_1.Http, Authenticator_1.Authenticator])
    ], AuthenticatedHttpService);
    return AuthenticatedHttpService;
}());
exports.AuthenticatedHttpService = AuthenticatedHttpService;
//# sourceMappingURL=AuthenticatedHttpService.js.map