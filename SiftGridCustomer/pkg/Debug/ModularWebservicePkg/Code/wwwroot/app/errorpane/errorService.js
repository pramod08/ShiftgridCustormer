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
var Rx_1 = require("rxjs/Rx");
var Authenticator_1 = require('../auth/Authenticator');
var diagramService_1 = require('../diagram/diagramService');
/// <summary>
/// Injecting Inspector to all components.
/// </sumary>
var ErrorService = (function () {
    function ErrorService(http, _authenticator, diagramService) {
        this.http = http;
        this._authenticator = _authenticator;
        this.diagramService = diagramService;
        this.errorObjectObservable = new Rx_1.Subject();
        this.fieldColorEmitter$ = new Rx_1.Subject();
        this.GetErrorsBy$ = new Rx_1.Subject();
    }
    ErrorService.prototype.getErrors = function (id) {
        var _this = this;
        console.log("Inside getErrors, guid :" + id);
        this.http.get('/Home/GetDocument?diagramId=' + id + "&tenantName=" + this._authenticator.TenantName + "&tenantId=" + this.diagramService.tenantId)
            .map(function (res) { return res.json(); }).subscribe(function (res) {
            console.log(res);
            _this.errorObjectObservable.next(res);
        }, function (error) { console.log(error); }, function () { console.log("Get Error list completed"); });
    };
    ErrorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, Authenticator_1.Authenticator, diagramService_1.DiagramService])
    ], ErrorService);
    return ErrorService;
}());
exports.ErrorService = ErrorService;
//# sourceMappingURL=errorService.js.map