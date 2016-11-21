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
var PeopleService = (function () {
    function PeopleService(http) {
        this.http = http;
        this.updateUserObservable = new Rx_1.Subject();
        this.CreatePeopleDiagram$ = new Rx_1.Subject();
        this.IntializeObservables();
    }
    PeopleService.prototype.getUserById = function (id, tenantName) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.get("/Home/GetPeopleById?id=" + id + "&tenantName=" + tenantName, headers)
            .map(function (res) {
            console.log(res.json());
            return res.json();
        })
            .publishReplay(-1)
            .refCount()
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); }).cache();
    };
    PeopleService.prototype.IntializeObservables = function () {
        var _this = this;
        this.updateUserObservable.subscribe(function (val) {
            console.log(val);
            var body = JSON.stringify(val);
            console.log("===> body :" + body);
            var url = "/Home/PutPeople";
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.put(url, body, options).map(function (res) { return res.json(); }).cache().
                subscribe(function (response) { console.log(response); }, function (error) { console.log(error); }, function () { console.log("completed."); });
        });
    };
    PeopleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PeopleService);
    return PeopleService;
}());
exports.PeopleService = PeopleService;
//# sourceMappingURL=peopleService.js.map