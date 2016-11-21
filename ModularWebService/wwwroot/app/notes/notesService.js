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
var diagramService_1 = require('../diagram/diagramService');
var Authenticator_1 = require('../auth/Authenticator');
var NotesService = (function () {
    function NotesService(http, diagramService, _authenticator) {
        this.http = http;
        this.diagramService = diagramService;
        this._authenticator = _authenticator;
        this.saveNotesObservable = new Rx_1.Subject();
        this.getNotesObservable = new Rx_1.Subject();
        this.showNotesObservable = new Rx_1.Subject();
        this.UpdateNotesObservable = new Rx_1.Subject();
        this.DeleteNoteObservable = new Rx_1.Subject();
        this.IntializeObservables();
    }
    NotesService.prototype.IntializeObservables = function () {
        var _this = this;
        this.saveNotesObservable.subscribe(function (val) {
            var url = "/Home/saveNotes";
            var body = JSON.stringify(val);
            console.log(body);
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            var result = null;
            console.log("Before Http Call...");
            _this.http.post(url, body, options).subscribe(function (res) {
                console.log("Subscribed : " + res.json());
                _this.showNotesObservable.next(res.json());
            });
        });
        console.log("After Http Call...");
        this.getNotesObservable.subscribe(function (val) {
            var url = "/Home/getNotesInfo?locationId=" + val + "&tenantName=" + _this._authenticator.TenantName + "&tenantId=" + _this.diagramService.tenantId;
            _this.http.get(url).map(function (res) { return res.json(); }).
                subscribe(function (response) {
                console.log("Response from GetNotes");
                console.log(response);
                _this.showNotesObservable.next(response);
            }, function (error) { console.log(error); }, function () { console.log("completed."); });
        });
        this.UpdateNotesObservable.subscribe(function (val) {
            var url = "/Home/updateNote";
            var body = JSON.stringify(val);
            console.log("Body : " + body);
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.put(url, body, options).map(function (res) { return res.json(); }).
                subscribe(function (response) {
                console.log("Response from UpdateNotes" + response);
                _this.showNotesObservable.next(response);
                console.log(response);
            }, function (error) { console.log(error); }, function () { console.log("completed."); });
        });
        this.DeleteNoteObservable.subscribe(function (val) {
            var url = "/Home/deleteNote?noteId=" + val + "&tenantName=" + _this._authenticator.TenantName + "&tenantId=" + _this.diagramService.tenantId;
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.delete(url, options).subscribe(function (response) {
                console.log("Response from DeleteNotes" + response);
                console.log(response);
                _this.showNotesObservable.next(response.json());
            }, function (error) { console.log(error); }, function () { console.log("completed."); });
        });
    };
    NotesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, diagramService_1.DiagramService, Authenticator_1.Authenticator])
    ], NotesService);
    return NotesService;
}());
exports.NotesService = NotesService;
//# sourceMappingURL=notesService.js.map