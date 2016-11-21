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
var AuthHelperBase_1 = require('./AuthHelperBase');
var Authenticator = (function () {
    function Authenticator(_authHelperBase) {
        this._authHelperBase = _authHelperBase;
        this._username = null;
        this._tenantName = null;
    }
    Authenticator.prototype.isUserAuthenticated = function () { return this._authHelperBase.isUserAuthenticated(); };
    Authenticator.prototype.logIn = function (state) {
        if (state === void 0) { state = "/"; }
        return this._authHelperBase.logIn(state);
    };
    Authenticator.prototype.logOut = function (state) {
        if (state === void 0) { state = "/"; }
        return this._authHelperBase.logOut(state);
    };
    Authenticator.prototype.getAccessToken = function () { return this._authHelperBase.getAccessToken(); };
    Object.defineProperty(Authenticator.prototype, "userName", {
        get: function () { return this._authHelperBase.userName; },
        enumerable: true,
        configurable: true
    });
    Authenticator.prototype.serviceConstants = function () { return this._authHelperBase.ServiceConstants(); };
    Object.defineProperty(Authenticator.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function (value) {
            this._username = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Authenticator.prototype, "TenantName", {
        get: function () {
            return this._tenantName;
        },
        set: function (value) {
            this._tenantName = value;
        },
        enumerable: true,
        configurable: true
    });
    Authenticator = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [AuthHelperBase_1.AuthHelperBase])
    ], Authenticator);
    return Authenticator;
}());
exports.Authenticator = Authenticator;
//# sourceMappingURL=Authenticator.js.map