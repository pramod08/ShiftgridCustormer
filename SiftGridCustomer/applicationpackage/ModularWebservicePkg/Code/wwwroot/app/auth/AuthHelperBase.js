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
var JwtHelper_1 = require('./JwtHelper');
var AuthHelperBase = (function () {
    function AuthHelperBase() {
    }
    AuthHelperBase.prototype.isUserAuthenticated = function () {
        var access_token = this.getAccessToken();
        return access_token != null;
    };
    AuthHelperBase.prototype.getAccessToken = function () {
        return "This needs to be implemented in the inherited class.";
    };
    AuthHelperBase.prototype.logIn = function (state) {
        if (state === void 0) { state = "/"; }
        console.log("This needs to be implemented in the inherited class.");
    };
    AuthHelperBase.prototype.logOut = function (state) {
        if (state === void 0) { state = "/"; }
        console.log("This needs to be implemented in the inherited class.");
    };
    Object.defineProperty(AuthHelperBase.prototype, "userName", {
        get: function () {
            var jwtHelper = new JwtHelper_1.JwtHelper();
            var parsedToken = jwtHelper.decodeToken(this.getAccessToken());
            var expiryTime = new Date(parsedToken.exp * 1000);
            var now = new Date();
            if (now > expiryTime)
                this.logOut();
            return parsedToken.upn;
        },
        enumerable: true,
        configurable: true
    });
    AuthHelperBase.prototype.ServiceConstants = function () {
        alert("This needs to be implemented in the inherited class.");
        return null;
    };
    AuthHelperBase = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AuthHelperBase);
    return AuthHelperBase;
}());
exports.AuthHelperBase = AuthHelperBase;
//# sourceMappingURL=AuthHelperBase.js.map